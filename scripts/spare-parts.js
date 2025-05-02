document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация по бренду


    // Функция для сохранения выбранного бренда
    function saveSelectedBrand(brand) {
        localStorage.setItem('selectedBrand', brand);
    }

    // Функция для получения выбранного бренда
    function getSelectedBrand() {
        return localStorage.getItem('selectedBrand');
    }

    // Фильтрация запчастей по бренду
    function filterPartsByBrand() {
        const urlParams = new URLSearchParams(window.location.search);
        const brandParam = urlParams.get('brand');
        const activeBrand = brandParam || getSelectedBrand();

        if (activeBrand) {
            // Обновляем заголовок раздела
            const sectionTitle = document.querySelector('.spare_parts-head h2');
            if (sectionTitle) {
                sectionTitle.innerHTML = `Запасные части <span class="brand-highlight">${activeBrand}</span>`;
            }

            // Создаем панель с информацией о фильтре
            if (!document.querySelector('.selected-brand-title')) {
                const brandTitle = document.createElement('div');
                brandTitle.className = 'selected-brand-title';
                brandTitle.innerHTML = `
                    <span>Показаны запчасти для бренда: <strong>${activeBrand}</strong></span>
                    <button class="reset-brand-filter">Показать все бренды</button>
                `;

                const sparePartsContainer = document.querySelector('.spare_parts');
                if (sparePartsContainer) {
                    sparePartsContainer.prepend(brandTitle);
                }

                //кнопка сброса фильтра
                const resetButton = brandTitle.querySelector('.reset-brand-filter');
                resetButton.addEventListener('click', function() {
                    localStorage.removeItem('selectedBrand');
                    window.location.href = 'spare-parts.html';
                });
            }

            // Фильтруем
            const allItems = document.querySelectorAll('.spare_parts__item');
            let visibleItems = 0;

            allItems.forEach(item => {
                const itemBrand = item.dataset.brand || '';

                if (itemBrand.toLowerCase().includes(activeBrand.toLowerCase())) {
                    item.style.display = 'flex';
                    visibleItems++;
                } else {
                    item.style.display = 'none';
                }
            });

            //если нет товаров
            if (visibleItems === 0) {
                const noItemsMessage = document.createElement('div');
                noItemsMessage.className = 'no-items-message';
                noItemsMessage.textContent = `По бренду ${activeBrand} запчастей не найдено`;

                const sparePartsItems = document.querySelector('.spare_parts__items');
                if (sparePartsItems && !document.querySelector('.no-items-message')) {
                    sparePartsItems.appendChild(noItemsMessage);
                }
            }
        }
    }

    // Обработчик кнопок бренда в сайдбаре
    function setupBrandLinks() {
        const brandLinks = document.querySelectorAll('.sidebar__list-item a[data-brand]');

        brandLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const brand = this.dataset.brand;
                saveSelectedBrand(brand);
                window.location.href = 'spare-parts.html?brand=' + encodeURIComponent(brand);
            });
        });
    }


    // Фильтрация по первой букве названия


    // База данных запчастей по первой букве (аналогично бензопилам)
    const spareParts = {
        'A': ['AL-KO BKS 4540', 'Atlas AT-0212', 'Aurora Garden Tools ACS 405'],
        'B': ['Black+Decker CS2245', 'Bosch AKE 40-19 S', 'Briggs & Stratton XB35'],
        'C': ['Champion 240-18', 'Champion 137-16', 'CARVER RSG 52-20K'],
        'D': ['DAX 5218', 'DDE CS5018', 'DeWalt DCCS690X1'],
        'E': ['EGO Power+ CS1800', 'Echo CS-353ES', 'Echo CS-501SX'],
        'F': ['FORWARD FGS-4504', 'Fermer PM-160', 'Fieldmann FZP 4516-B'],
        'G': ['Greenworks GD40CS15', 'Greenworks GCS1836', 'Greenworks G40CS30'],
        'H': ['Husqvarna 135 Mark II', 'Husqvarna 445e II', 'HUTER BS-52'],
        'I': ['Interskol PC-16/2000T', 'Ikra Mogatec IECS', 'Ikra EKS 1835'],
        'J': ['Jonsered CS 2252', 'Jonsered CS 2245', 'Jonsered CS 2250'],
        'K': ['Karcher CS 330 Bp', 'Kettensägen K-series', 'Krüger KCG500'],
        'L': ['Laser KSG5000', 'Lider-220 LC152', 'Lynxx 56V'],
        'M': ['Makita EA3201S40B', 'Makita UC4041A', 'McCulloch CS 35S'],
        'N': ['Narex EPR 35-25', 'Nashone NS-4508', 'NOVA NG-5801'],
        'O': ['Oleo-Mac GS 35 C', 'Oleo-Mac GSH 51', 'Oregon CS1500'],
        'P': ['Patriot PT 4520', 'Partner P340S', 'Poulan Pro PR5020'],
        'Q': ['Quattro CY-5201', 'Quattro CY-4218', 'QuickDay QD-5018'],
        'R': ['Ryobi RCS3840T', 'Ryobi RCS2340', 'REBIR KZ1-500/400'],
        'S': ['STIHL MS 180', 'STIHL MS 250', 'STIHL MS 361'],
        'T': ['Taiga Pro CS 45', 'TATRA Garden CS50', 'Texas CSX 5000'],
        'U': ['URAGAN PTC-1500', 'UNION PAC-5016', 'UMKA PS5200'],
        'V': ['VIHR CE-1800/18', 'VIHR CE-2000/16', 'VIKING MS 170'],
        'W': ['WORX WG322E', 'WORX WG305', 'Wolf-Garten CS 46'],
        'X': ['X-LINE X3530', 'X-Treme XG-5600', 'Xforce XF800'],
        'Y': ['Yard Force LI-ION 40V', 'Yard Force YF4000', 'Yard Man YM4518'],
        'Z': ['Zenit ZPG-6021', 'ZUBR ZCP-2001-40', 'ZUBR ZCP-1800'],
        '0-9': ['180N GoodLuck', '5200 Strong', '38CC GigaMaster'],
        'А': ['Атлант АБП-5200', 'Авангард АЦП-1800', 'Агрессор АЦ-5616'],
        'Б': ['Бригадир Б-5200', 'Бурлак Б-4516', 'Буран БП-45-16'],
        'В': ['ВИХРЬ БП-45-18', 'Витязь ВБП-5018', 'Волгарь В-5200'],
        'Г': ['Гранит ГПБ-5200', 'Гладиатор Г-45-16', 'Гранит ГБП-4518'],
        'Д': ['Дружба ДБП-4518', 'Днепр ДП-5200', 'Добрыня Д-45-16'],
        'Е': ['Енисей ЕБП-4518', 'Егоза Е-5200', 'Ермак ЕБП-5018'],
        'Ж': ['Железный Дровосек ЖД-45-16', 'Жнец Ж-5018', 'Жигули ЖБП-4518'],
        'З': ['Зенит ЗБП-5018', 'Зубр ЗЦП-2000-40', 'Заря ЗБП-4516'],
        'И': ['Интерскол ПЦБ-14/37Л', 'Ижмаш БП-5200', 'Искра ИБП-4518'],
        'К': ['Кратон GCS-45/450', 'Кедр К-5018', 'Калибр БП-5200'],
        'Л': ['Лесник ЛБП-4518', 'Лидер Л-5200', 'Лесоруб ЛБП-5018'],
        'М': ['Минск МБП-5018', 'Молот МБП-4516', 'Мастер М-5200'],
        'Н': ['Новатор НБП-5018', 'Ника Н-4516', 'Нева НБП-4518'],
        'О': ['Омск О-5200', 'Орион ОБП-4516', 'Орёл О-5018'],
        'П': ['Патриот PT 4520', 'Пионер П-5018', 'Прораб 8208П'],
        'Р': ['Ростов РБП-5200', 'Ресанта БП-5218', 'Рысь Р-4516'],
        'С': ['Скиф СБП-5018', 'Сталь С-5200', 'Союз ПТС-99450'],
        'Т': ['Тайга Т-5018', 'Техас ТБП-4516', 'Тора Т-5200'],
        'У': ['Урал УБП-5200', 'Ударник У-4518', 'Уралмаш УБП-5018'],
        'Ф': ['Форвард ФБП-4516', 'Фермер Ф-5200', 'Фиолент ФБП-5018'],
        'Х': ['Хутер БС-45', 'Хопер Х-5018', 'Хозяин Х-4516'],
        'Ц': ['Циклон Ц-5200', 'Центр ЦБП-4518', 'Цезарь Ц-5018'],
        'Э': ['Эксперт Э-5200', 'Энергомаш ПТ-99452', 'Эврика ЭБП-5018']
    };

    // Функция для отображения товаров по выбранной букве
    function showPartsByLetter(letter) {
        const resultsContainer = document.querySelector('.filters__results') || createResultsContainer();
        const resultsTitle = resultsContainer.querySelector('.filters__results-title');
        const resultsItems = resultsContainer.querySelector('.filters__results-items');

        // Очищаем предыдущие результаты
        resultsItems.innerHTML = '';

        // Устанавливаем заголовок
        resultsTitle.textContent = `Запчасти на букву "${letter}"`;

        // Проверяем наличие запчастей для выбранной буквы
        if (spareParts[letter] && spareParts[letter].length > 0) {
            // Добавляем запчасти на выбранную букву
            spareParts[letter].forEach(part => {
                const partElement = document.createElement('div');
                partElement.classList.add('filters__results-item');
                partElement.textContent = part;

                // добавляем обработчик для выбора запчасти
                partElement.addEventListener('click', function() {
                    window.location.href = `part-details.html?name=${encodeURIComponent(part)}`;
                });

                resultsItems.appendChild(partElement);
            });

            // показываем контейнер с результатами
            resultsContainer.style.display = 'block';
        } else {
            // запчастей нет - показываем сообщение
            const emptyMessage = document.createElement('div');
            emptyMessage.textContent = `Запчасти на букву "${letter}" не найдены`;
            emptyMessage.classList.add('filters__results-empty');
            resultsItems.appendChild(emptyMessage);
            resultsContainer.style.display = 'block';
        }
    }

    //контейнер для результатов, если его еще нет
    function createResultsContainer() {
        const filtersSection = document.querySelector('.filters') || document.createElement('section');
        if (!filtersSection.classList.contains('filters')) {
            filtersSection.classList.add('filters');
            document.querySelector('.container').appendChild(filtersSection);
        }

        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add('filters__results');
        resultsContainer.innerHTML = `
            <h3 class="filters__results-title"></h3>
            <div class="filters__results-items"></div>
        `;
        filtersSection.appendChild(resultsContainer);
        return resultsContainer;
    }

    // обработчики для алфавитной фильтрации
    function setupAlphabetFilters() {
        // получаем все элементы алфавита
        const alphabetItems = document.querySelectorAll('.filters__inner-item');

        if (alphabetItems.length > 0) {
            // обработчик клика для каждой буквы
            alphabetItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Убираем активный класс у всех букв
                    alphabetItems.forEach(i => i.classList.remove('active'));

                    // Делаем текущую букву активной
                    this.classList.add('active');

                    // Показываем запчасти для выбранной буквы
                    const letter = this.textContent.trim();
                    showPartsByLetter(letter);
                });
            });
        }
    }


    // Интеграция с поиском


    function setupSearch() {
        const searchBtn = document.querySelector('.header__searching-btn');
        const searchInput = document.querySelector('.header__searching-input');
        const mobileSearchBtn = document.querySelector('.header__mobile-search-icon');
        const mobileSearchInput = document.querySelector('.header__mobile-search');

        function performSearch(query) {
            if (!query || query.trim() === '') return;

            const selectedBrand = getSelectedBrand();
            let searchUrl = '../search-results.html?query=' + encodeURIComponent(query);

            if (selectedBrand) {
                searchUrl += '&brand=' + encodeURIComponent(selectedBrand);
            }

            window.location.href = searchUrl;
        }

        // поиск
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                performSearch(searchInput.value);
            });

            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch(searchInput.value);
                }
            });
        }

        // Мобильный поиск
        if (mobileSearchBtn && mobileSearchInput) {
            mobileSearchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                performSearch(mobileSearchInput.value);
            });

            mobileSearchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch(mobileSearchInput.value);
                }
            });
        }
    }


    // стили


    function addStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Стили для фильтрации по бренду */
            .selected-brand-title {
                margin: 15px 0;
                padding: 10px 15px;
                background-color: #f8f8f8;
                border-left: 4px solid #FF6B35;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .reset-brand-filter {
                background-color: #FF6B35;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s;
            }

            .reset-brand-filter:hover {
                background-color: #e55a00;
            }

            .brand-highlight {
                color: #FF6B35;
                font-weight: bold;
            }

            .no-items-message {
                padding: 30px;
                text-align: center;
                background-color: #f8f8f8;
                margin: 20px auto;
                border-radius: 4px;
                color: #666;
                font-size: 16px;
            }

            /* Стили для алфавитной фильтрации */
            .filters__inner-item {
                cursor: pointer;
                padding: 5px 10px;
                border-radius: 4px;
                transition: background-color 0.3s;
            }

            .filters__inner-item:hover {
                background-color: #f0f0f0;
            }

            .filters__inner-item.active {
                background-color: #FF6B35;
                color: white;
            }

            .filters__results {
                margin-top: 20px;
                padding: 15px;
                background-color: #f8f8f8;
                border-radius: 4px;
                display: none;
            }

            .filters__results-title {
                margin-bottom: 15px;
                font-size: 18px;
                color: #333;
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;
            }

            .filters__results-items {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                grid-gap: 15px;
            }

            .filters__results-item {
                padding: 10px;
                background-color: white;
                border: 1px solid #eee;
                border-radius: 4px;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
            }

            .filters__results-item:hover {
                transform: translateY(-3px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }

            .filters__results-empty {
                grid-column: 1 / -1;
                text-align: center;
                padding: 20px;
                color: #666;
            }
        `;
        document.head.appendChild(styleElement);
    }


    // Инициализация функций


    // Добавляем стили
    addStyles();

    // Настраиваем фильтрацию по бренду
    filterPartsByBrand();
    setupBrandLinks();

    // Настраиваем фильтрацию по алфавиту
    setupAlphabetFilters();

    // Настраиваем поиск с учетом бренда
    setupSearch();
});