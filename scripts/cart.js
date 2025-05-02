document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    let cart = {
        items: [],
        total: 0
    };

    // DOM-элементы корзины
    const modalOverlay = document.querySelector('.modal-overlay');
    const cartPriceElement = document.querySelector('.header__cart-price-value');
    const headerCartIcon = document.querySelector('.header__cart');
    const body = document.body;

    // Создаем элемент корзины, если его еще нет
    let cartSidebar = document.querySelector('.cart-sidebar');
    if (!cartSidebar) {
        cartSidebar = document.createElement('div');
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
    }

    // Получаем ссылки на элементы внутри корзины
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartSidebarClose = document.getElementById('cartSidebarClose');
    const checkoutButton = document.querySelector('.cart-sidebar__checkout');

    // Функция загрузки корзины из localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
        }
    }

    // Сохранение корзины в localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Открытие корзины
    function openCart() {
        cartSidebar.classList.add('show');
        modalOverlay.classList.add('show');
        body.classList.add('lock');
    }

    // Закрытие корзины
    function closeCart() {
        console.log('Закрытие корзины...');
        cartSidebar.classList.remove('show');
        modalOverlay.classList.remove('show');
        body.classList.remove('lock');
    }

    // Обновление отображения корзины
    function updateCartDisplay() {
        // Обновляем стоимость в шапке
        if (cartPriceElement) {
            cartPriceElement.textContent = `${cart.total} ₽`;
        }

        // Обновляем общую стоимость в корзине
        if (cartTotal) {
            cartTotal.textContent = `${cart.total} ₽`;
        }

        // Обновляем содержимое корзины
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

            // Добавляем обработчики событий для кнопок в корзине
            setupCartButtons();
        }
    }

    // Настройка кнопок управления в корзине
    function setupCartButtons() {
        const plusButtons = document.querySelectorAll('.quantity-btn.plus');
        const minusButtons = document.querySelectorAll('.quantity-btn.minus');
        const removeButtons = document.querySelectorAll('.cart-sidebar__item-remove');

        plusButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                increaseQuantity(index);
            });
        });

        minusButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                decreaseQuantity(index);
            });
        });

        removeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                removeFromCart(index);
            });
        });
    }

    // Увеличение количества товара
    function increaseQuantity(index) {
        cart.items[index].quantity += 1;
        cart.total += cart.items[index].price;
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

    // Удаление товара из корзины
    function removeFromCart(index) {
        cart.total -= cart.items[index].price * cart.items[index].quantity;
        cart.items.splice(index, 1);
        saveCart();
        updateCartDisplay();
    }

    // Добавление товара в корзину
    function addToCart(product) {
        const existingItemIndex = cart.items.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            // Если товар уже в корзине, увеличиваем количество
            cart.items[existingItemIndex].quantity += 1;
            cart.total += product.price;
        } else {
            // Добавляем новый товар
            cart.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
            cart.total += product.price;
        }

        saveCart();
        updateCartDisplay();
    }

    // Получаем все кнопки "Добавить в корзину"
    const addToCartButtons = document.querySelectorAll('.spare_parts__item-btn');

    // Добавляем обработчики для кнопок
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Находим родительский элемент товара
            const productItem = this.closest('.spare_parts__item');

            // Получаем информацию о товаре
            const name = productItem.querySelector('.spare_parts__item-head').textContent.trim();
            const priceText = productItem.querySelector('.spare_parts__item-price').textContent.trim();
            const price = parseFloat(priceText.replace(/\s+/g, '').replace('₽', ''));
            const image = productItem.querySelector('img').src;
            const id = name.replace(/\s+/g, '_').toLowerCase();

            // Добавляем товар в корзину
            addToCart({
                id: id,
                name: name,
                price: price,
                image: image
            });

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

            // Открываем корзину
            openCart();
        });
    });

    // Обработчик для кнопки закрытия корзины
    if (cartSidebarClose) {
        cartSidebarClose.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            console.log('Клик по кнопке закрытия обработан');
            closeCart();
        });
    } else {
        console.error('Элемент кнопки закрытия не найден');
    }

    // Обработчик для иконки корзины в шапке
    if (headerCartIcon) {
        headerCartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }

    // Единый обработчик для modalOverlay
    modalOverlay.addEventListener('click', function() {
        if (cartSidebar.classList.contains('show')) {
            closeCart();
        } else if (document.querySelector('.modal_bid.show')) {
            document.querySelector('.modal_bid').classList.remove('show');
            modalOverlay.classList.remove('show');
            document.body.style.overflow = '';
        } else if (document.querySelector('.sidebar.sidebar--show')) {
            body.classList.remove('lock');
            document.querySelector('.sidebar').classList.remove('sidebar--show');
            modalOverlay.classList.remove('show');
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartSidebar.classList.contains('show')) {
            closeCart();
        }
    });

    // Оформление заказа
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Заказ успешно оформлен!');
            cart = { total: 0, items: [] };
            saveCart();
            updateCartDisplay();
            closeCart();
        });
    }

    // Добавляем стили для корзины
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .cart-sidebar {
            position: fixed;
            top: 0;
            right: -400px; /* изначально скрыт справа */
            width: 350px;
            height: 100vh;
            background-color: #fff;
            z-index: 1001;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            overflow-y: auto;
            transition: right 0.3s ease; /* плавная анимация */
        }
        
        .cart-sidebar.show {
            right: 0; /* при активации показываем */
        }
        
        .cart-sidebar__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .cart-sidebar__close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            position: relative;
            z-index: 10;
        }
        
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
        
        .cart-sidebar__empty {
            text-align: center;
            padding: 20px 0;
            color: #999;
        }
        
        .cart-sidebar__footer {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #f0f0f0;
        }
        
        .cart-sidebar__total {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            margin-bottom: 15px;
        }
        
        .cart-sidebar__checkout {
            width: 100%;
            padding: 10px;
            background-color: #FF6B35;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .cart-sidebar__checkout:hover {
            background-color: #e85a2a;
        }
        
        .modal-overlay.show {
            display: block;
            opacity: 0.5;
        }
    `;
    document.head.appendChild(styleElement);

    // Загружаем корзину из localStorage при загрузке страницы
    loadCart();
});