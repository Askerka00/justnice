import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  await page.goto('https://grexa-template.framer.website/', {
    waitUntil: 'networkidle'
  });
  
  const results = await page.evaluate(async () => {
    // 1. Let's find the bottom badges (Carbon Scan wrapper) and get their exact computed styles
    const carbonText = Array.from(document.querySelectorAll('*')).find(el => el.textContent.trim() === 'Carbon Scan');
    const badgeWrapper = carbonText ? carbonText.closest('div') : null;
    
    // We want the parent wrapper style (the pill container)
    let badgePillStyle = null;
    let badgePillClass = '';
    if (badgeWrapper) {
      // It might be badgeWrapper itself or its parent
      const parent = badgeWrapper.parentElement;
      const computed = window.getComputedStyle(badgeWrapper);
      
      badgePillStyle = {
        'background-color': computed.backgroundColor,
        'border': computed.border,
        'border-radius': computed.borderRadius,
        'backdrop-filter': computed.backdropFilter,
        '-webkit-backdrop-filter': computed.webkitBackdropFilter,
        'padding': computed.padding,
        'display': computed.display,
        'align-items': computed.alignItems,
        'gap': computed.gap,
        'height': computed.height
      };
      badgePillClass = badgeWrapper.className;
    }

    // 2. Let's analyze about us animations
    // Framer elements often have data-framer-appear-id or similar attributes
    const aboutTitle = Array.from(document.querySelectorAll('*')).find(el => el.textContent.trim().includes('Innovative systems designed to reduce'));
    const aboutSection = aboutTitle ? aboutTitle.closest('section') : null;
    
    const elementsToAnalyze = [];
    if (aboutSection) {
      const allElements = aboutSection.querySelectorAll('*');
      allElements.forEach(el => {
        // Look for attributes like style, data-framer-component-type, etc.
        const styleAttr = el.getAttribute('style') || '';
        const appearId = el.getAttribute('data-framer-appear-id') || '';
        const animate = el.getAttribute('animate') || '';
        if (styleAttr || appearId || animate) {
          elementsToAnalyze.push({
            tag: el.tagName.toLowerCase(),
            className: el.className,
            textSnippet: el.textContent.trim().substring(0, 30),
            styleAttr,
            appearId,
            animate
          });
        }
      });
    }

    return {
      badgePillStyle,
      badgePillClass,
      aboutElementsWithAnimation: elementsToAnalyze
    };
  });

  console.log('=== ANALYSIS RESULTS ===');
  console.log(JSON.stringify(results, null, 2));

  // Let's scroll down to trigger animations and extract computed transitions or inline styles
  await page.evaluate(() => {
    window.scrollTo(0, 1000);
  });
  // Wait a moment for animations
  await page.waitForTimeout(1000);

  const afterScroll = await page.evaluate(() => {
    const aboutTitle = Array.from(document.querySelectorAll('*')).find(el => el.textContent.trim().includes('Innovative systems designed to reduce'));
    const aboutSection = aboutTitle ? aboutTitle.closest('section') : null;
    const items = [];
    if (aboutSection) {
      const all = aboutSection.querySelectorAll('*');
      all.forEach(el => {
        const styleAttr = el.getAttribute('style') || '';
        if (styleAttr) {
          items.push({
            tag: el.tagName.toLowerCase(),
            className: el.className,
            textSnippet: el.textContent.trim().substring(0, 30),
            styleAttr
          });
        }
      });
    }
    return items;
  });

  console.log('=== AFTER SCROLL INLINE STYLES ===');
  console.log(JSON.stringify(afterScroll, null, 2));

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
