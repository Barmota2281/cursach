


document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что элемент существует перед инициализацией
    const swiperContainer = document.querySelector('.swiper');

    if (swiperContainer) {
        const swiper = new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,

            // Параметры для плавности
            speed: 800, // Скорость перехода (миллисекунды)
            effect: 'slide', // Тип эффекта (можно использовать 'fade', 'cube', 'coverflow')

            // Добавьте плавность при автопрокрутке
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },

            // Эффект затухания для плавности
            fadeEffect: {
                crossFade: true
            },

            // Настройка CSS-режима
            cssMode: false, // Отключаем для более плавной анимации

            // Добавляем эффект перетаскивания
            grabCursor: true,

            // Плавность навигации
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // Пагинация
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true, // Динамические точки
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

    // Получаем все элементы алфавита
    const alphabetItems = document.querySelectorAll('.filters__inner-item');

    // Получаем элементы для отображения результатов
    const resultsContainer = document.querySelector('.filters__results');
    const resultsTitle = document.querySelector('.filters__results-title');
    const resultsItems = document.querySelector('.filters__results-items');

    // Добавляем обработчик клика для каждой буквы
    alphabetItems.forEach(item => {
        item.addEventListener('click', function() {
            // Получаем текст буквы
            const letter = this.textContent;

            // Проверяем, есть ли бензопилы для этой буквы
            if (chainsawsDatabase[letter]) {
                // Очищаем предыдущие результаты
                resultsItems.innerHTML = '';

                // Устанавливаем заголовок
                resultsTitle.textContent = letter;

                // Добавляем все бензопилы на данную букву
                chainsawsDatabase[letter].forEach(chainsaw => {
                    const chainsawElement = document.createElement('div');
                    chainsawElement.classList.add('filters__results-item');
                    chainsawElement.textContent = chainsaw;
                    resultsItems.appendChild(chainsawElement);
                });

                // Показываем контейнер с результатами
                resultsContainer.style.display = 'block';
            } else {
                // Если бензопил нет, скрываем контейнер
                resultsContainer.style.display = 'none';
            }
        });
    });

    // Инициализация корзины с поддержкой localStorage
    function initCart() {
        // Попытка загрузить корзину из localStorage
        let savedCart = localStorage.getItem('cart');

        if (savedCart) {
            return JSON.parse(savedCart);
        } else {
            return { total: 0, items: [] };
        }
    }

    // Сохранение корзины в localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Инициализируем корзину из localStorage
    let cart = initCart();

    // Получаем все кнопки добавления в корзину
    const addToCartButtons = document.querySelectorAll('.spare_parts__item-btn');
    const cartPriceElement = document.querySelector('.header__cart-price-value');

 // Обработчик для кнопок добавления в корзину
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        // Находим родительский элемент товара
        const productItem = this.closest('.spare_parts__item');

        // Получаем информацию о товаре
        const name = productItem.querySelector('.spare_parts__item-head').textContent.trim();
        const priceElement = productItem.querySelector('.spare_parts__item-price');
        const priceText = priceElement.textContent.trim();
        const price = parseFloat(priceText.replace(/\s+/g, '').replace('₽', ''));
        const image = productItem.querySelector('img').src;
        const id = name.replace(/\s+/g, '_').toLowerCase(); // Создаем ID из названия

        // Проверяем, есть ли товар уже в корзине
        const existingItemIndex = cart.items.findIndex(item => item.id === id);

        if (existingItemIndex > -1) {
            // Если товар уже в корзине, увеличиваем количество
            cart.items[existingItemIndex].quantity += 1;
            cart.total += price;
        } else {
            // Добавляем новый товар в корзину
            cart.items.push({
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
            cart.total += price;

            // Меняем вид кнопки на галочку
            this.classList.add('added');
            const oldSVG = this.querySelector('svg');
            if (oldSVG) {
                oldSVG.remove();
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16" id="Check-mark">
                      <path d="M0 8.51 5.48 14 16 3.49 14.49 2l-9.01 9-3.99-3.99z" fill="#ffffff" class="color000000 svgShape"></path>
                    </svg>
                `;
            }
        }

        // Сохраняем корзину и обновляем отображение
        saveCart();
        updateCartDisplay();
        openCart();
    });
});
    // Функция обновления отображения корзины

    // Добавляем стиль для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Получаем элементы
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

    // Обработчик клика по кнопке отправки
    formLabel.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });

    // Закрытие при клике на оверлей
    modalOverlay.addEventListener('click', closeModal);

    // Закрытие при клике на кнопку в модальном окне
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

    // Добавьте код корзины в document.addEventListener('DOMContentLoaded', function() {...})

    // Инициализация корзины

    const cartSidebar = document.createElement('div');
    cartSidebar.className = 'cart-sidebar';
    document.body.appendChild(cartSidebar);

    // Наполняем корзину содержимым
    cartSidebar.innerHTML = `
        <div class="cart-sidebar__header">
            <h3>Корзина</h3>
            <button class="cart-sidebar__close" id="cartSidebarClose">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="cart-sidebar__items" id="cartItems">
            <div class="cart-sidebar__empty">Ваша корзина пуста</div>
        </div>
        <div class="cart-sidebar__footer">
            <div class="cart-sidebar__total">
                <span>Итого:</span>
                <span id="cartTotal">0 ₽</span>
            </div>
            <button class="cart-sidebar__checkout">Оформить заказ</button>
        </div>
    `;

    // Получаем все кнопки добавления в корзину
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartSidebarClose = document.getElementById('cartSidebarClose');
    const headerCartIcon = document.querySelector('.header__cart');

    // Функция открытия корзины
    function openCart() {
        cartSidebar.classList.add('show');
        modalOverlay.classList.add('show');
        document.body.classList.add('lock');
    }

    // Функция закрытия корзины
    function closeCart() {
        cartSidebar.classList.remove('show');
        modalOverlay.classList.remove('show');
        document.body.classList.remove('lock');
    }


    // Обновление отображения корзины
    function updateCartDisplay() {
        // Обновляем общую стоимость
        if (cartPriceElement) {
            cartPriceElement.textContent = `${cart.total} ₽`;
        }

        if (cartTotal) {
            cartTotal.textContent = `${cart.total} ₽`;
        }

        if (cartItems) {
            cartItems.innerHTML = '';

            if (cart.items.length === 0) {
                cartItems.innerHTML = '<div class="cart-sidebar__empty">Ваша корзина пуста</div>';
                return;
            }

            cart.items.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-sidebar__item');
                cartItem.innerHTML = `
                    <img src="${item.image || './images/default-product.jpg'}" alt="${item.name}" class="cart-sidebar__item-img">
                    <div class="cart-sidebar__item-info">
                        <div class="cart-sidebar__item-name">${item.name}</div>
                        <div class="cart-sidebar__item-price">${item.price} ₽</div>
                    </div>
                    <div class="cart-sidebar__item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="cart-sidebar__item-remove" data-index="${index}">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });

            // Добавляем обработчики на кнопки удаления
            const removeButtons = document.querySelectorAll('.cart-sidebar__item-remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    removeFromCart(index);
                });
            });

            // Добавляем обработчики на кнопки изменения количества
            const plusButtons = document.querySelectorAll('.quantity-btn.plus');
            const minusButtons = document.querySelectorAll('.quantity-btn.minus');

            plusButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    increaseQuantity(index);
                });
            });

            minusButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    decreaseQuantity(index);
                });
            });
        }
    }

    // Увеличение количества товара
        function increaseQuantity(index) {
            cart.items[index].quantity += 1;
            cart.total += cart.items[index].price;
            saveCart();
            updateCartDisplay();
        }

    // Удаление товара из корзины
    function removeFromCart(index) {
        const price = cart.items[index].price * cart.items[index].quantity;
        cart.items.splice(index, 1);
        cart.total -= price;
        saveCart();
        updateCartDisplay();
    }

    // Уменьшение количества товара
        function decreaseQuantity(index) {
            if (cart.items[index].quantity > 1) {
                cart.items[index].quantity -= 1;
                cart.total -= cart.items[index].price;
            } else {
                removeFromCart(index);
            }
            saveCart();
            updateCartDisplay();
        }


        // Добавляем стили для кнопок изменения количества
        const styleElement = document.createElement('style');
        styleElement.textContent = `
        .cart-sidebar__item {
            display: flex;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            position: relative;
        }
        
        .cart-sidebar__item-img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            margin-right: 10px;
        }
        
        .cart-sidebar__item-info {
            flex-grow: 1;
        }
        
        .cart-sidebar__item-quantity {
            display: flex;
            align-items: center;
            margin-right: 15px;
        }
        
        .quantity-btn {
            width: 25px;
            height: 25px;
            background-color: #f1f1f1;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: bold;
        }
        
        .quantity-btn:hover {
            background-color: #e0e0e0;
        }
        
        .quantity-value {
            margin: 0 8px;
            font-weight: bold;
        }
        
        .cart-sidebar__item-remove {
            cursor: pointer;
            background: none;
            border: none;
            padding: 5px;
        }
    `;
        document.head.appendChild(styleElement);


    // Добавьте эту проверку после получения элемента
    if (cartSidebarClose) {
        console.log('Кнопка закрытия корзины найдена');
        cartSidebarClose.addEventListener('click', function() {
            console.log('Клик по кнопке закрытия корзины');
            closeCart();
        });
    } else {
        console.error('Кнопка закрытия корзины не найдена!');
    }


    // Обработчик для клика на иконку корзины в шапке
    if (headerCartIcon) {
        headerCartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }

    // Обработчик для закрытия корзины
    if (cartSidebarClose) {
        cartSidebarClose.addEventListener('click', closeCart);
    }

    // Закрытие при клике на оверлей
    modalOverlay.addEventListener('click', function(e) {
        closeCart();
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartSidebar.classList.contains('show')) {
            closeCart();
        }
    });

    // Оформление заказа
    const checkoutButton = document.querySelector('.cart-sidebar__checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Заказ успешно оформлен!');
            cart = { total: 0, items: [] };
            updateCartDisplay();
            closeCart();
        });
    }

})