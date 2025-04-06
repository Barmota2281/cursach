


document.addEventListener('DOMContentLoaded', function() {

    const swiperContainer = document.querySelector('.swiper');

    if (swiperContainer) {
        const swiper = new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,


            speed: 800,
            effect: 'slide', // Тип эффекта (можно использовать 'fade', 'cube', 'coverflow')


            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },


            fadeEffect: {
                crossFade: true
            },
            cssMode: false,
            grabCursor: true,


            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

        });
    } else {
        console.error('Элемент слайдера не найден в DOM');
    }
});





//проверка телефона в футере
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('.form__input--tel');

    const formatPhoneNumber = (value) => {
        let phoneNumber = value.replace(/\D/g, '');
        if (!phoneNumber) return '';

        if (phoneNumber.length > 11) {
            phoneNumber = phoneNumber.substr(0, 11);
        }

        if (phoneNumber[0] === '7' || phoneNumber[0] === '8') {
            let formatted = '+7 ';
            if (phoneNumber.length > 1) {
                formatted += '(' + phoneNumber.substr(1, 3);
            }
            if (phoneNumber.length > 4) {
                formatted += ') ' + phoneNumber.substr(4, 3);
            }
            if (phoneNumber.length > 7) {
                formatted += '-' + phoneNumber.substr(7, 2);
            }
            if (phoneNumber.length > 9) {
                formatted += '-' + phoneNumber.substr(9, 2);
            }
            return formatted;
        }
        return phoneNumber;
    };

    phoneInput.addEventListener('input', function(e) {
        const formatted = formatPhoneNumber(e.target.value);
        e.target.value = formatted;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // База данных бензопил по первой букве
    const chainsawsDatabase = {
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


    const alphabetItems = document.querySelectorAll('.filters__inner-item');


    const resultsContainer = document.querySelector('.filters__results');
    const resultsTitle = document.querySelector('.filters__results-title');
    const resultsItems = document.querySelector('.filters__results-items');


    alphabetItems.forEach(item => {
        item.addEventListener('click', function() {

            const letter = this.textContent;


            if (chainsawsDatabase[letter]) {

                resultsItems.innerHTML = '';


                resultsTitle.textContent = letter;

                // Добавление всех бензопил на данную букву
                chainsawsDatabase[letter].forEach(chainsaw => {
                    const chainsawElement = document.createElement('div');
                    chainsawElement.classList.add('filters__results-item');
                    chainsawElement.textContent = chainsaw;
                    resultsItems.appendChild(chainsawElement);
                });

                // Показываем
                resultsContainer.style.display = 'block';
            } else {
                // Если нет, скрываем
                resultsContainer.style.display = 'none';
            }
        });
    });

    // Корзина
    let cart = {
        total: 0,
        items: []
    };

    // все кнопки добавления в корзину
    const addToCartButtons = document.querySelectorAll('.spare_parts__item-btn');
    const cartPriceElement = document.querySelector('.header__cart-price-value');


    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Если товар уже добавлен, ничего не делаем
            if (this.classList.contains('added')) {
                return;
            }

            // Находим родительский элемент товара
            const productItem = this.closest('.spare_parts__item');

            // Получаем цену товара
            const priceElement = productItem.querySelector('.spare_parts__item-price');
            const priceText = priceElement.textContent.trim();
            const price = parseFloat(priceText.replace(/\s+/g, '').replace('₽', ''));

            // Добавляем товар в корзину
            cart.total += price;
            cart.items.push({
                price: price,
                name: productItem.querySelector('.spare_parts__item-head').textContent.trim()
            });

            updateCartDisplay();

            this.classList.add('added');

            // корзину меняем на галочку
            const oldSVG = this.querySelector('svg');
            if (oldSVG) {
                oldSVG.remove();

                // галочка
                this.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"
                    style="fill:#FFFFFF;">
                    <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
                  </svg>
                `;
            }

            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });


    function updateCartDisplay() {
        if (cartPriceElement) {
            cartPriceElement.textContent = `${cart.total} ₽`;
        }
    }


    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);


    const formLabel = document.querySelector('.form__label');
    const modalBid = document.querySelector('.modal_bid');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalBtn = document.querySelector('.modal_bid-btn');

    // Функция для открытия модального окна
    function openModal() {
        modalBid.classList.add('show');
        modalOverlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    }

    // Функция для закрытия модального окна
    function closeModal() {
        modalBid.classList.remove('show');
        modalOverlay.classList.remove('show');
        document.body.style.overflow = ''; // Разблокируем прокрутку страницы
    }


    formLabel.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });

    modalOverlay.addEventListener('click', closeModal);


    if (modalBtn) {
        modalBtn.addEventListener('click', closeModal);
    }

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalBid.classList.contains('show')) {
            closeModal();
        }
    });
    // Обработчик для десктопной формы поиска
    const searchInput = document.querySelector('.header__searching-input');
    const searchBtn = document.querySelector('.header__searching-btn');

    // Обработчик для мобильной формы поиска
    const mobileSearchInput = document.querySelector('.header__mobile-search');
    const mobileSearchIcon = document.querySelector('.header__mobile-search-icon');

    // Функция для перенаправления на страницу поиска
    function redirectToSearch(query) {
        if (query && query.trim().length > 0) {
            window.location.href = './pages/search-results.html?query=' + encodeURIComponent(query);
        }
    }

    // Обработчик для десктопной формы поиска
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            redirectToSearch(searchInput.value);
        });
    }

    // Обработчик для мобильной формы поиска
    if (mobileSearchIcon) {
        mobileSearchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            redirectToSearch(mobileSearchInput.value);
        });
    }

    // Обработчик поиска при нажатии Enter в поле ввода
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                    redirectToSearch(searchInput.value);
            }
        });
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                redirectToSearch(mobileSearchInput.value);
            }
        });
    }
    const body = document.body;
    const headerButton = document.getElementById('headerMenuButton');
    const sidebar = document.getElementById('sidebar');

    headerButton.addEventListener('click', () => {
        body.classList.toggle('lock')
        sidebar.classList.toggle('sidebar--show');
    });

    const sidebarClose = document.getElementById('sidebarClose');

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            body.classList.remove('lock');
            sidebar.classList.remove('sidebar--show');
            modalOverlay.classList.remove('show');
        });
    }


    headerButton.addEventListener('click', () => {
        body.classList.toggle('lock');
        modalOverlay.classList.toggle('show');
    });

    // Закрытие при нажатии на оверлей
    modalOverlay.addEventListener('click', () => {
        body.classList.remove('lock');
        sidebar.classList.remove('sidebar--show');
        modalOverlay.classList.remove('show');
    });
})