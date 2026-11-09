<template>
  <div class="min-h-screen bg-[#090D16] text-slate-100 font-sans flex flex-col">
    <!-- Header -->
    <header class="bg-[#0D1527] border-b border-slate-800/80 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-lg backdrop-blur-md bg-opacity-90">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
          <Icon name="lucide:layers" class="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            ConveerSites <span class="text-xs px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold rounded-full uppercase tracking-wider">Docs & Playground</span>
          </h1>
          <p class="text-xs text-slate-400 mt-0.5">Интерактивный конструктор и каталог готовых дизайн-блоков</p>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <!-- Main Tabs -->
        <div class="bg-slate-900/95 p-1 rounded-xl border border-slate-800 flex space-x-1">
          <button 
            @click="currentTab = 'playground'"
            :class="['px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2', 
                     currentTab === 'playground' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' : 'text-slate-400 hover:text-white']"
          >
            <Icon name="lucide:layout-template" class="w-4 h-4" />
            Блоки (Playground)
          </button>
          <button 
            @click="currentTab = 'styleguide'"
            :class="['px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2', 
                     currentTab === 'styleguide' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' : 'text-slate-400 hover:text-white']"
          >
            <Icon name="lucide:palette" class="w-4 h-4" />
            Стили (Styleguide)
          </button>
        </div>

        <a 
          href="/" 
          class="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl text-sm font-semibold text-slate-200 transition flex items-center gap-2"
        >
          <Icon name="lucide:home" class="w-4 h-4" />
          На главную
        </a>
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <!-- ================= PLAYGROUND TAB ================= -->
      <template v-if="currentTab === 'playground'">
        <!-- Left Sidebar: Component Catalog -->
        <aside class="w-80 bg-[#0B1220] border-r border-slate-800/80 flex flex-col flex-shrink-0">
          <div class="p-4 border-b border-slate-800/50">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text"
                placeholder="Поиск блоков..."
                class="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 text-slate-200 placeholder-slate-500"
              />
              <Icon name="lucide:search" class="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <button 
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
              >
                <Icon name="lucide:x" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            <div v-for="family in families" :key="family">
              <h3 class="text-xs font-bold tracking-widest text-slate-500 uppercase px-2 mb-2 flex items-center justify-between">
                {{ family }} 
                <span class="text-[10px] bg-slate-800/80 text-slate-400 px-1.5 py-0.5 rounded-md font-normal">
                  {{ filteredBlocks.filter(b => b.family === family).length }}
                </span>
              </h3>
              <div class="space-y-1">
                <button
                  v-for="block in filteredBlocks.filter(b => b.family === family)"
                  :key="block.component"
                  @click="selectBlock(block)"
                  :class="['w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex flex-col gap-0.5',
                           selectedBlock?.component === block.component 
                             ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold shadow-inner shadow-emerald-500/5' 
                             : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent']"
                >
                  <span class="text-slate-200 font-medium text-sm flex items-center gap-2">
                    <Icon :name="getFamilyIcon(block.family)" class="w-4 h-4" />
                    {{ block.component }}
                  </span>
                  <span class="text-xs text-slate-400 opacity-90 truncate pl-6">{{ block.nameRu }}</span>
                </button>
              </div>
            </div>
            
            <div v-if="filteredBlocks.length === 0" class="text-center py-8">
              <Icon name="lucide:inbox" class="w-8 h-8 text-slate-600 mb-2" />
              <p class="text-xs text-slate-500">Ничего не найдено</p>
            </div>
          </div>
        </aside>

        <!-- Main Workspace (Center + Right) -->
        <main class="flex-1 flex overflow-hidden bg-[#070A13]">
          <!-- Component Preview Panel -->
          <div class="flex-1 flex flex-col overflow-hidden relative">
            <!-- Controls Bar -->
            <div class="bg-[#0B1220] border-b border-slate-800/80 px-6 py-3 flex items-center justify-between z-10">
              <div class="flex items-center space-x-3">
                <span class="text-xs text-slate-400 font-semibold">Устройство:</span>
                <div class="bg-slate-900 p-0.5 rounded-lg border border-slate-800 flex space-x-1">
                  <button 
                    @click="previewDevice = 'desktop'"
                    :class="['p-1.5 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium', 
                             previewDevice === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white']"
                    title="Компьютер (100%)"
                  >
                    <Icon name="lucide:monitor" class="w-4 h-4" />
                    <span>Десктоп</span>
                  </button>
                  <button 
                    @click="previewDevice = 'tablet'"
                    :class="['p-1.5 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium', 
                             previewDevice === 'tablet' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white']"
                    title="Планшет (768px)"
                  >
                    <Icon name="lucide:tablet" class="w-4 h-4" />
                    <span>Планшет</span>
                  </button>
                  <button 
                    @click="previewDevice = 'mobile'"
                    :class="['p-1.5 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium', 
                             previewDevice === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white']"
                    title="Мобильный (375px)"
                  >
                    <Icon name="lucide:smartphone" class="w-4 h-4" />
                    <span>Мобильный</span>
                  </button>
                </div>
              </div>

              <!-- Replay / Animation trigger -->
              <div class="flex items-center space-x-4">
                <!-- Theme / Font preview info -->
                <div class="flex items-center gap-1.5 text-xs text-slate-400">
                  <span class="font-medium">Шрифт:</span>
                  <span class="px-2 py-0.5 bg-slate-950 text-slate-300 rounded border border-slate-800 uppercase text-[10px] font-bold">{{ activeFont }}</span>
                  <span class="font-medium ml-2">Тема:</span>
                  <span 
                    class="w-3.5 h-3.5 rounded-full border border-white/20 inline-block shadow-sm"
                    :style="{ backgroundColor: activeThemeColorComputed }"
                  ></span>
                  <span class="px-1.5 py-0.5 bg-slate-950 text-slate-300 rounded border border-slate-800 uppercase text-[10px] font-bold">
                    {{ customThemeColor ? 'Custom' : activeTheme }}
                  </span>
                </div>

                <button 
                  @click="triggerAnimationReplay"
                  class="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 active:scale-95 transition-all text-xs font-bold rounded-xl flex items-center gap-1.5"
                  title="Перерендерить компонент для повтора анимации AOS"
                >
                  <Icon name="lucide:refresh-cw" class="w-3.5 h-3.5" />
                  Перезапустить
                </button>
              </div>
            </div>

            <!-- Block Display Container -->
            <div class="flex-1 overflow-y-auto p-8 flex justify-center items-start custom-scrollbar relative">
              <ClientOnly>
                <div 
                  v-if="selectedBlock && !componentError"
                  :class="['w-full bg-white transition-all duration-300 overflow-hidden shadow-2xl relative border border-slate-800/10 rounded-2xl',
                           previewDevice === 'tablet' ? 'max-w-[768px]' : previewDevice === 'mobile' ? 'max-w-[375px]' : 'max-w-full',
                           `theme-${activeTheme}`,
                           `font-${activeFont}`]"
                  :style="activeThemeStyles"
                  :key="renderKey"
                >
                  <!-- BadgeStyle override class container -->
                  <div :class="`badge-style-${activeBadgeStyle}`">
                    <div
                      :data-aos="blockAnimation"
                      :data-aos-duration="blockAnimationDuration"
                      :data-aos-delay="blockAnimationDelay"
                      class="w-full"
                    >
                      <component 
                        :is="resolveComponent(selectedBlock.component)"
                        v-bind="blockProps"
                      />
                    </div>
                  </div>
                </div>

                <!-- Error state -->
                <div v-else-if="selectedBlock && componentError" class="m-auto text-center py-16 text-red-400 max-w-md">
                  <Icon name="lucide:alert-triangle" class="w-12 h-12 text-red-500 mb-3 mx-auto" />
                  <h3 class="text-lg font-bold text-red-300">Ошибка рендера: {{ selectedBlock.component }}</h3>
                  <p class="text-sm text-red-400/80 mt-2 leading-relaxed">{{ componentError }}</p>
                  <button @click="componentError = ''; triggerAnimationReplay()" class="mt-4 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500/20 transition">
                    Попробовать снова
                  </button>
                </div>

                <div v-else class="m-auto text-center py-16 text-slate-500 max-w-sm">
                  <Icon name="lucide:mouse-pointer-click" class="w-16 h-16 text-slate-600 mb-4 mx-auto animate-bounce" />
                  <h3 class="text-lg font-bold text-slate-300">Выберите блок</h3>
                  <p class="text-sm text-slate-500 mt-1">Выберите любой блок в каталоге слева, чтобы начать работу и настроить его.</p>
                </div>

                <template #fallback>
                  <div class="m-auto text-center py-16 text-slate-500 max-w-sm">
                    <Icon name="lucide:loader-2" class="w-10 h-10 text-emerald-500 mb-3 mx-auto animate-spin" />
                    <p class="text-sm text-slate-400">Загрузка компонента...</p>
                  </div>
                </template>
              </ClientOnly>
            </div>

            <!-- Block Information (Name, Description, Animation specs) -->
            <div v-if="selectedBlock" class="bg-[#0B1220] border-t border-slate-800/80 p-5 px-6">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    {{ selectedBlock.component }}
                    <span class="text-xs px-2.5 py-0.5 bg-slate-800 text-slate-400 font-semibold rounded-full uppercase tracking-wider">
                      Дизайн: {{ selectedBlock.family }}
                    </span>
                  </h3>
                  <p class="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">{{ selectedBlock.description }}</p>
                </div>
                
                <!-- Animation Config in Preview -->
                <div class="flex-shrink-0 bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col gap-1.5 text-xs text-slate-400 min-w-[240px]">
                  <span class="font-semibold text-slate-300 text-[10px] uppercase tracking-wider">Анимация контейнера (AOS)</span>
                  <div class="flex items-center justify-between">
                    <span>Эффект:</span>
                    <select v-model="blockAnimation" class="bg-slate-950 border border-slate-800 text-slate-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:border-emerald-500">
                      <option value="">Без анимации</option>
                      <option v-for="anim in aosAnimations" :key="anim" :value="anim">{{ anim }}</option>
                    </select>
                  </div>
                  <div class="flex items-center justify-between">
                    <span>Длительность:</span>
                    <div class="flex items-center gap-1">
                      <input v-model.number="blockAnimationDuration" type="number" step="100" min="0" max="3000" class="w-14 bg-slate-950 border border-slate-800 text-slate-300 rounded px-1.5 py-0.5 text-xs text-center" />
                      <span>мс</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Sidebar: Properties & Code -->
          <aside class="w-96 bg-[#0B1220] border-l border-slate-800/80 flex flex-col flex-shrink-0">
            <div class="bg-slate-900/95 p-1 rounded-xl border border-slate-800 m-4 flex space-x-1">
              <button 
                @click="playgroundTab = 'props'"
                :class="['flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5', 
                         playgroundTab === 'props' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white']"
              >
                <Icon name="lucide:sliders" class="w-3.5 h-3.5" />
                Параметры
              </button>
              <button 
                @click="playgroundTab = 'json'"
                :class="['flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5', 
                         playgroundTab === 'json' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white']"
              >
                <Icon name="lucide:code" class="w-3.5 h-3.5" />
                Код JSON
              </button>
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto px-5 pb-6 custom-scrollbar">
              <div v-if="!selectedBlock" class="text-center py-12 text-slate-500">
                <p class="text-sm">Выберите блок для настройки</p>
              </div>

              <template v-else>
                <!-- Tab: Props Editor -->
                <div v-if="playgroundTab === 'props'" class="space-y-5">
                  <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Свойства компонента</h3>
                  
                  <div v-for="field in selectedBlock.editableFields" :key="field.name" class="space-y-1.5">
                    <label class="text-xs font-bold text-slate-300 flex justify-between">
                      <span>{{ field.label }}</span>
                      <span class="text-[10px] font-mono text-slate-500 font-normal">{{ field.name }}</span>
                    </label>
                    
                    <!-- Type: string -->
                    <input 
                      v-if="field.type === 'string'"
                      v-model="blockProps[field.name]"
                      type="text"
                      class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
                    />

                    <!-- Type: color -->
                    <div v-else-if="field.type === 'color'" class="flex items-center gap-2">
                      <input 
                        v-model="blockProps[field.name]"
                        type="color"
                        class="w-9 h-9 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer p-0.5"
                      />
                      <input 
                        v-model="blockProps[field.name]"
                        type="text"
                        class="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-1.5 text-sm text-slate-200 uppercase font-mono"
                      />
                    </div>

                    <!-- Type: boolean -->
                    <div v-else-if="field.type === 'boolean'" class="flex items-center">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="blockProps[field.name]" class="sr-only peer" />
                        <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:bg-white peer-checked:after:border-white"></div>
                        <span class="ml-3 text-xs text-slate-400 font-medium">{{ blockProps[field.name] ? 'Включено' : 'Выключено' }}</span>
                      </label>
                    </div>

                    <!-- Type: select -->
                    <select
                      v-else-if="field.type === 'select'"
                      v-model="blockProps[field.name]"
                      class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                    </select>

                    <!-- Type: image -->
                    <div v-else-if="field.type === 'image'" class="space-y-1">
                      <input 
                        v-model="blockProps[field.name]"
                        type="text"
                        placeholder="/img/..."
                        class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 text-xs font-mono"
                      />
                      <!-- Quick select stock images -->
                      <div class="flex flex-wrap gap-1.5 pt-1">
                        <button 
                          v-for="imgUrl in stockImages" 
                          :key="imgUrl"
                          @click="blockProps[field.name] = imgUrl"
                          class="px-2 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-850 rounded text-[10px] text-slate-400 hover:text-slate-200 font-mono transition"
                        >
                          {{ getBasename(imgUrl) }}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Array / Object notice -->
                  <div class="p-4 bg-slate-950 border border-slate-800/80 rounded-xl mt-6">
                    <p class="text-xs text-slate-500 leading-relaxed">
                      <Icon name="lucide:info" class="w-3.5 h-3.5 text-emerald-500 mr-1.5 inline-block" />
                      Сложные структуры данных (массивы, списки отзывов, категории прайса) редактируются непосредственно через вкладку <strong>Код JSON</strong>.
                    </p>
                  </div>
                </div>

                <!-- Tab: JSON Generator -->
                <div v-if="playgroundTab === 'json'" class="space-y-4 h-full flex flex-col">
                  <div class="flex items-center justify-between">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Настройка блока JSON</h3>
                    <button 
                      @click="copyJsonCode"
                      class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700/80 rounded-lg text-xs font-bold text-emerald-400 flex items-center gap-1.5 transition"
                    >
                      <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="w-3.5 h-3.5" />
                      {{ copied ? 'Скопировано!' : 'Копировать' }}
                    </button>
                  </div>
                  
                  <div class="relative flex-1 bg-slate-950 border border-slate-850 rounded-xl overflow-hidden flex flex-col font-mono text-xs text-emerald-400/90 min-h-[350px]">
                    <textarea 
                      v-model="rawJsonInput"
                      @blur="parseRawJson"
                      class="w-full flex-1 bg-transparent p-4 focus:outline-none resize-none overflow-y-auto leading-relaxed custom-scrollbar text-emerald-400"
                    ></textarea>
                  </div>
                  <p class="text-[11px] text-slate-500 leading-snug">
                    <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 text-slate-500 mr-1 inline-block" />
                    Вы можете вносить изменения прямо в JSON, они сразу отобразятся в превью при выходе из поля ввода.
                  </p>
                </div>
              </template>
            </div>
          </aside>
        </main>
      </template>

      <!-- ================= STYLEGUIDE TAB ================= -->
      <template v-else-if="currentTab === 'styleguide'">
        <main class="flex-1 overflow-y-auto p-8 bg-[#070A13] custom-scrollbar space-y-12 max-w-6xl mx-auto pb-16">
          <div class="border-b border-slate-800/80 pb-6">
            <h2 class="text-2xl font-bold text-white tracking-tight">Каталог Списков Свистов и Красок (Styleguide)</h2>
            <p class="text-sm text-slate-400 mt-2 leading-relaxed">
              Общие настройки дизайн-системы, используемые вашим сайд-билдером. Здесь вы можете визуально примерить темы, шрифты и протестировать анимации.
            </p>
          </div>

          <!-- Section 1: Colors & Themes -->
          <section class="space-y-5">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h3 class="text-lg font-bold text-white">Цветовые темы и основной цвет (theme / themeColor)</h3>
            </div>
            <p class="text-sm text-slate-400 max-w-4xl">
              Задают основной цвет сайта через CSS-переменную <code class="bg-slate-900 border border-slate-800 px-1 py-0.5 rounded text-xs font-mono text-emerald-400">--color-primary</code>. Вы можете использовать одну из предустановленных тем или задать собственный HEX-код.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
              <!-- Left: Preset Themes -->
              <div class="bg-[#0B1220] border border-slate-800/80 rounded-2xl p-6 space-y-4">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Готовые темы (theme)</h4>
                <div class="grid grid-cols-2 gap-3">
                  <button 
                    v-for="t in presetThemes"
                    :key="t.name"
                    @click="applyPresetTheme(t.name)"
                    :class="['p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between h-20 shadow-md',
                             activeTheme === t.name && !customThemeColor
                               ? 'border-emerald-500/80 bg-emerald-500/5' 
                               : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80']"
                  >
                    <div class="flex items-center justify-between w-full">
                      <span class="text-xs font-bold text-slate-300 font-mono">{{ t.name }}</span>
                      <span 
                        class="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                        :style="{ backgroundColor: t.color }"
                      ></span>
                    </div>
                    <span class="text-[11px] text-slate-500 truncate">{{ t.desc }}</span>
                  </button>
                </div>
              </div>

              <!-- Right: Custom ThemeColor Picker -->
              <div class="bg-[#0B1220] border border-slate-800/80 rounded-2xl p-6 space-y-4">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Произвольный цвет (themeColor)</h4>
                <p class="text-xs text-slate-400 leading-normal">
                  Используйте параметр <code class="bg-slate-950 px-1 py-0.5 rounded font-mono text-emerald-400">themeColor</code> для установки произвольного бренда.
                </p>
                <div class="flex items-center space-x-4 pt-2">
                  <div class="relative">
                    <input 
                      v-model="customColorInput"
                      type="color"
                      @input="applyCustomColor"
                      class="w-14 h-14 bg-slate-900 border border-slate-700 rounded-xl cursor-pointer p-0.5"
                    />
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="relative">
                      <input 
                        v-model="customColorInput"
                        type="text"
                        @input="applyCustomColor"
                        placeholder="#15803d"
                        class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono uppercase focus:outline-none focus:border-emerald-500 text-slate-200"
                      />
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slate-500 px-1">
                      <span>Нажмите для палитры или введите HEX</span>
                      <button v-if="customThemeColor" @click="resetTheme" class="text-emerald-400 hover:text-emerald-300 font-semibold">Сбросить</button>
                    </div>
                  </div>
                </div>

                <!-- Theme usage block code -->
                <div class="bg-slate-950 rounded-xl p-3.5 border border-slate-850 text-[11px] font-mono text-emerald-400/90 leading-relaxed mt-4">
                  <span class="text-slate-500">// Вставьте в корень config.json:</span>
                  <div class="mt-1" v-if="customThemeColor">
                    <span class="text-slate-400">"themeColor":</span> "{{ customColorInput }}"
                  </div>
                  <div class="mt-1" v-else>
                    <span class="text-slate-400">"theme":</span> "{{ activeTheme }}"
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 2: Fonts Catalog -->
          <section class="space-y-5">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h3 class="text-lg font-bold text-white">Каталог Шрифтов (font)</h3>
            </div>
            <p class="text-sm text-slate-400 max-w-4xl">
              Сайт-билдер поддерживает подгрузку шрифтов из Google Fonts. Переключайте шрифты, чтобы проверить, как это скажется на читаемости и стиле текстов.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <button 
                v-for="font in presetFonts"
                :key="font.name"
                @click="applyFont(font.name)"
                :class="['p-6 rounded-2xl border text-left transition-all space-y-3',
                         activeFont === font.name 
                           ? 'border-emerald-500/80 bg-emerald-500/5' 
                           : 'border-slate-800/80 bg-[#0B1220] hover:bg-slate-900/40']"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-bold text-slate-200 capitalize font-mono">{{ font.name }}</span>
                  <span class="text-xs text-slate-500">Google Fonts</span>
                </div>
                <div :class="[`font-${font.name}`, 'space-y-1.5 bg-slate-950/40 p-4 rounded-xl border border-slate-850/50']">
                  <p class="text-2xl font-bold text-white tracking-tight leading-none">Строительство & Клининг</p>
                  <p class="text-xs text-slate-400 leading-normal">The quick brown fox jumps over the lazy dog. 1234567890</p>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed">{{ font.desc }}</p>
              </button>
            </div>
          </section>

          <!-- Section 3: Section Badge Styles -->
          <section class="space-y-5">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h3 class="text-lg font-bold text-white">Стили бэджей разделов (badgeStyle)</h3>
            </div>
            <p class="text-sm text-slate-400 max-w-4xl">
              Бэйджи над заголовками разделов автоматически перекрашиваются и меняют форму в зависимости от параметра <code class="bg-slate-900 border border-slate-850 px-1 py-0.5 rounded font-mono text-emerald-400 text-xs">badgeStyle</code>.
            </p>

            <div class="bg-[#0B1220] border border-slate-800/80 rounded-2xl p-6">
              <div class="flex flex-wrap gap-4 items-center justify-between border-b border-slate-800/50 pb-5 mb-5">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Выберите стиль для примерки:</span>
                <div class="bg-slate-900 p-0.5 rounded-lg border border-slate-800 flex space-x-1">
                  <button 
                    v-for="style in badgeStyles" 
                    :key="style"
                    @click="activeBadgeStyle = style"
                    :class="['px-3 py-1.5 rounded-md text-xs font-bold capitalize transition-all',
                             activeBadgeStyle === style ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white']"
                  >
                    {{ style }}
                  </button>
                </div>
              </div>

              <!-- Live Demo of Badges -->
              <div :class="['p-8 rounded-xl border border-slate-850 flex items-center justify-center gap-8 bg-white text-zinc-900 shadow-inner', `theme-${activeTheme}`]" :style="activeThemeStyles">
                <div :class="`badge-style-${activeBadgeStyle}`" class="flex flex-col items-center gap-4 text-center">
                  <!-- Render SectionBadge -->
                  <SectionBadge text="О компании" />
                  <SectionBadge text="Наши Услуги" />
                  
                  <div class="mt-4 max-w-sm text-center">
                    <p class="text-xs font-bold text-zinc-500 uppercase tracking-wider">Пример стиля: {{ activeBadgeStyle }}</p>
                    <p class="text-[11px] text-zinc-400 mt-1 leading-normal">
                      Стиль автоматически гармонизирует все бэйджи сайтов при использовании смешанных секций (Struct, Vital и т.д.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 4: Animations (AOS) -->
          <section class="space-y-5">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h3 class="text-lg font-bold text-white">Анимации проявления блоков (AOS)</h3>
            </div>
            <p class="text-sm text-slate-400 max-w-4xl">
              Сайты используют библиотеку <strong class="text-slate-200 font-bold">AOS (Animate On Scroll)</strong>. Ниже вы можете опробовать каждый эффект в действии.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div 
                v-for="anim in aosAnimationCards"
                :key="anim.name"
                class="bg-[#0B1220] border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between h-48 hover:border-slate-700/60 transition"
              >
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      {{ anim.name }}
                    </span>
                    <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{{ anim.type }}</span>
                  </div>
                  <p class="text-xs text-slate-400 mt-2 leading-relaxed">{{ anim.desc }}</p>
                </div>

                <div class="flex items-center justify-between border-t border-slate-800/50 pt-4 mt-2">
                  <!-- Animated Box Preview -->
                  <div class="w-12 h-12 rounded-lg bg-emerald-500 border border-emerald-400 shadow-md shadow-emerald-500/10 flex items-center justify-center relative overflow-hidden">
                    <div 
                      :key="anim.key" 
                      :data-aos="anim.name" 
                      data-aos-duration="600" 
                      class="absolute inset-0 bg-emerald-300"
                    ></div>
                    <Icon name="lucide:sparkles" class="w-4 h-4 text-emerald-950 relative z-10" />
                  </div>

                  <button 
                    @click="replayAosCard(anim)"
                    class="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    <Icon name="lucide:play" class="w-3.5 h-3.5" />
                    Воспроизвести
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, onErrorCaptured } from 'vue'
import { blockRegistry, type BlockConfig } from '~/utils/docs-mock-registry'

// Dynamic client-only AOS import to avoid SSR crash
let aosInstance: any = null

// State
const currentTab = ref<'playground' | 'styleguide'>('playground')
const searchQuery = ref('')
const previewDevice = ref<'desktop' | 'tablet' | 'mobile'>('desktop')
const playgroundTab = ref<'props' | 'json'>('props')

// Global Preview Styles Override
const activeTheme = ref<string>('emerald')
const customThemeColor = ref<string>('')
const customColorInput = ref<string>('#10b981')
const activeFont = ref<string>('outfit')
const activeBadgeStyle = ref<string>('pill')

const siteConfig = useSiteConfig()
watch(activeBadgeStyle, (newVal) => {
  if (!siteConfig.value) {
    siteConfig.value = {}
  }
  siteConfig.value.badgeStyle = newVal
}, { immediate: true })

// Error boundary for dynamic components
const componentError = ref<string>('')
onErrorCaptured((err: Error) => {
  componentError.value = err.message || String(err)
  console.warn('[Docs Playground] Component render error:', err)
  return false // prevent propagation
})

// Selected Component State
const selectedBlock = ref<BlockConfig | null>(null)
const blockProps = ref<Record<string, any>>({})
const blockAnimation = ref<string>('fade-up')
const blockAnimationDuration = ref<number>(800)
const blockAnimationDelay = ref<number>(0)
const renderKey = ref<number>(0)
const copied = ref<boolean>(false)

// Raw JSON Editor Input
const rawJsonInput = ref<string>('')

// AOS Key trigger for full preview
const triggerAnimationReplay = () => {
  renderKey.value++
  nextTick(() => {
    if (import.meta.client && aosInstance) {
      setTimeout(() => {
        aosInstance.refreshHard()
      }, 50)
    }
  })
}

// Preset assets
const presetThemes = [
  { name: 'emerald', color: '#10b981', desc: 'Изумрудный. Медицина, экология.' },
  { name: 'blue', color: '#3b82f6', desc: 'Синий. Технологии, IT, услуги.' },
  { name: 'roofmax', color: '#3d44e9', desc: 'Индиго. Профессиональное строительство.' },
  { name: 'orange', color: '#f97316', desc: 'Оранжевый. Логистика, энергетика.' },
  { name: 'red', color: '#ef4444', desc: 'Красный. Тяжелая промышленность.' },
  { name: 'csp', color: '#2a3890', desc: 'Темно-синий. ЖБИ, стройматериалы.' }
]

const presetFonts = [
  { name: 'outfit', desc: 'Современный, геометрический шрифт без засечек. Отлично подходит для заголовков строительных и IT-компаний.', label: 'Outfit' },
  { name: 'sans', desc: 'Стандартный системный шрифт без засечек. Быстрый и нейтральный.', label: 'System Sans' },
  { name: 'heebo', desc: 'Чистый, плотный шрифт без засечек, с отличной поддержкой кириллицы.', label: 'Heebo' },
  { name: 'dm-sans', desc: 'Мягкий геометрический шрифт без засечек для стильного контента.', label: 'DM Sans' }
]

const badgeStyles = ['pill', 'sharp', 'dot', 'wavy']

const aosAnimations = [
  'fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right',
  'zoom-in', 'zoom-in-up', 'zoom-in-down', 'zoom-out',
  'slide-up', 'slide-down', 'flip-left', 'flip-right'
]

// Stock images
const stockImages = [
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=300'
]

// AOS list cards in styleguide
interface AosCard {
  name: string;
  type: string;
  desc: string;
  key: number;
}
const aosAnimationCards = ref<AosCard[]>([
  { name: 'fade-up', type: 'Fade', desc: 'Плавное проявление элемента со сдвигом снизу вверх. Классический эффект.', key: 0 },
  { name: 'fade-down', type: 'Fade', desc: 'Плавное проявление со сдвигом сверху вниз.', key: 0 },
  { name: 'fade-left', type: 'Fade', desc: 'Плавное появление сбоку справа налево.', key: 0 },
  { name: 'zoom-in', type: 'Zoom', desc: 'Эффект приближения: элемент масштабируется от малого размера к исходному.', key: 0 },
  { name: 'zoom-out', type: 'Zoom', desc: 'Эффект отдаления: элемент уменьшается от крупного к обычному размеру.', key: 0 },
  { name: 'flip-left', type: 'Flip', desc: 'Поворот элемента вокруг вертикальной оси (трехмерное перелистывание).', key: 0 }
])

// Functions
const getBasename = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1)
}

const selectBlock = (block: BlockConfig) => {
  componentError.value = '' // clear previous error
  selectedBlock.value = block
  blockProps.value = JSON.parse(JSON.stringify(block.props))
  blockAnimation.value = block.props.animation || 'fade-up'
  triggerAnimationReplay()
}

// Watch props to update JSON output
watch(
  [blockProps, blockAnimation, blockAnimationDuration],
  () => {
    if (selectedBlock.value) {
      const configObj = {
        component: selectedBlock.value.component,
        animation: blockAnimation.value || undefined,
        animationDuration: blockAnimationDuration.value !== 800 ? blockAnimationDuration.value : undefined,
        props: blockProps.value
      }
      rawJsonInput.value = JSON.stringify(configObj, null, 2)
    }
  },
  { deep: true, immediate: true }
)

const parseRawJson = () => {
  try {
    const parsed = JSON.parse(rawJsonInput.value)
    if (parsed.component && parsed.props) {
      // If component name matches
      if (selectedBlock.value && parsed.component === selectedBlock.value.component) {
        blockProps.value = parsed.props
        if (parsed.animation) blockAnimation.value = parsed.animation
      } else {
        // Find matching block in registry
        const found = blockRegistry.find(b => b.component === parsed.component)
        if (found) {
          selectedBlock.value = found
          blockProps.value = parsed.props
          if (parsed.animation) blockAnimation.value = parsed.animation
        }
      }
    }
  } catch (e) {
    // Ignore invalid JSON edits while typing
  }
}

// Copy JSON
const copyJsonCode = () => {
  navigator.clipboard.writeText(rawJsonInput.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

// Filter lists
const families = ['Cover', 'Vital', 'Struct', 'Shine', 'Grexa', 'Navu', 'Others']

const filteredBlocks = computed(() => {
  if (!searchQuery.value) return blockRegistry
  const q = searchQuery.value.toLowerCase()
  return blockRegistry.filter(b => 
    b.component.toLowerCase().includes(q) || 
    b.nameRu.toLowerCase().includes(q) ||
    b.family.toLowerCase().includes(q)
  )
})

const getFamilyIcon = (family: string) => {
  switch (family) {
    case 'Vital': return 'lucide:heart-pulse'
    case 'Struct': return 'lucide:building-2'
    case 'Shine': return 'lucide:sparkles'
    case 'Grexa': return 'lucide:leaf'
    case 'Navu': return 'lucide:cpu'
    case 'Cover': return 'lucide:maximize'
    default: return 'lucide:component'
  }
}

// Theme functions
function hexToRgb(hex: string) {
  if (!hex) return null
  const cleanHex = hex.replace('#', '')
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16)
    const g = parseInt(cleanHex[1] + cleanHex[1], 16)
    const b = parseInt(cleanHex[2] + cleanHex[2], 16)
    return `${r} ${g} ${b}`
  } else if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)
    return `${r} ${g} ${b}`
  }
  return null
}

const activeThemeColorComputed = computed(() => {
  if (customThemeColor.value) return customThemeColor.value
  const found = presetThemes.find(t => t.name === activeTheme.value)
  return found ? found.color : '#10b981'
})

const activeThemeStyles = computed(() => {
  const color = activeThemeColorComputed.value
  const rgb = hexToRgb(color)
  if (rgb) {
    return {
      '--color-primary': rgb
    }
  }
  return {}
})

const applyPresetTheme = (themeName: string) => {
  activeTheme.value = themeName
  customThemeColor.value = ''
  const found = presetThemes.find(t => t.name === themeName)
  if (found) {
    customColorInput.value = found.color
  }
  triggerAnimationReplay()
}

const applyCustomColor = () => {
  if (customColorInput.value.startsWith('#') && customColorInput.value.length === 7) {
    customThemeColor.value = customColorInput.value
    triggerAnimationReplay()
  }
}

const resetTheme = () => {
  customThemeColor.value = ''
  activeTheme.value = 'emerald'
  customColorInput.value = '#10b981'
  triggerAnimationReplay()
}

const applyFont = (fontName: string) => {
  activeFont.value = fontName
  triggerAnimationReplay()
}

// Replay single card animation in styleguide
const replayAosCard = (card: AosCard) => {
  card.key++
  nextTick(() => {
    if (import.meta.client && aosInstance) {
      setTimeout(() => {
        aosInstance.refreshHard()
      }, 50)
    }
  })
}

// Initialize AOS only (do NOT auto-select a block — it causes hydration mismatch)
onMounted(async () => {
  if (import.meta.client) {
    const AOSModule = await import('aos')
    aosInstance = AOSModule.default || AOSModule
    setTimeout(() => {
      aosInstance.init({
        duration: 800,
        easing: 'ease-out',
        once: false // Enable multiple replays
      })
    }, 200)
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #334155;
}

/* Badge Style Overrides inside container */
:deep(.badge-style-pill .badge-custom),
:deep(.badge-style-pill .section-badge) {
  border-radius: 9999px !important;
  background-color: rgba(var(--color-primary), 0.1) !important;
  color: rgb(var(--color-primary)) !important;
  border: 1px solid rgba(var(--color-primary), 0.15) !important;
}

:deep(.badge-style-sharp .badge-custom),
:deep(.badge-style-sharp .section-badge) {
  border-radius: 0px !important;
  background-color: transparent !important;
  color: rgb(var(--color-primary)) !important;
  border: 1.5px solid rgb(var(--color-primary)) !important;
}

:deep(.badge-style-dot .badge-custom),
:deep(.badge-style-dot .section-badge) {
  background-color: transparent !important;
  color: rgb(var(--color-primary)) !important;
  border: none !important;
  padding-left: 0.5rem !important;
  position: relative !important;
}
:deep(.badge-style-dot .badge-custom::before),
:deep(.badge-style-dot .section-badge::before) {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: rgb(var(--color-primary));
  margin-right: 6px;
  vertical-align: middle;
}

:deep(.badge-style-wavy .badge-custom),
:deep(.badge-style-wavy .section-badge) {
  background-color: transparent !important;
  color: rgb(var(--color-primary)) !important;
  border: none !important;
  border-bottom: 2px dashed rgb(var(--color-primary)) !important;
  border-radius: 0 !important;
  padding-bottom: 2px !important;
}
</style>
