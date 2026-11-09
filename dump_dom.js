import { chromium } from 'playwright';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  await page.goto('https://grexa-template.framer.website/', {
    waitUntil: 'networkidle'
  });
  
  // Scroll down slowly to trigger all animations and hydration
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });

  await page.waitForTimeout(2000);

  const html = await page.content();
  fs.writeFileSync('dom_dump.html', html);
  console.log('DOM dumped to dom_dump.html. File size:', html.length, 'bytes');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
