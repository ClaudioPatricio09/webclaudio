document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('#darkModeToggle'); // Busca por ID
    const body = document.body;
    const icon = toggleButton.querySelector('i');

    // Verificar si el modo oscuro estaba habilitado anteriormente
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }

    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Variables para el carrito
    let cart = [];
    
    // Función para actualizar la cantidad de productos
    document.querySelectorAll('.quantity-control button').forEach(button => {
        button.addEventListener('click', function () {
            const quantityDisplay = this.parentElement.querySelector('span');
            let currentQuantity = parseInt(quantityDisplay.textContent);
            
            // Incrementar o decrementar la cantidad
            if (this.textContent === '+' && currentQuantity < 10) {  // Limitar a 10 productos por ejemplo
                quantityDisplay.textContent = currentQuantity + 1;
            } else if (this.textContent === '-' && currentQuantity > 1) {
                quantityDisplay.textContent = currentQuantity - 1;
            }
        });
    });

    // Función para añadir el producto al carrito
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productQuantity = parseInt(productCard.querySelector('.quantity-control span').textContent);

            // Crear el producto a añadir al carrito
            const product = {
                title: productTitle,
                price: parseFloat(productPrice.replace('$', '')), // Convertir a número
                quantity: productQuantity
            };

            // Verificar si ya existe en el carrito
            const existingProductIndex = cart.findIndex(item => item.title === product.title);
            if (existingProductIndex >= 0) {
                // Actualizar cantidad si ya existe
                cart[existingProductIndex].quantity += product.quantity;
            } else {
                // Añadir nuevo producto al carrito
                cart.push(product);
            }

            // Mostrar el carrito actualizado en consola (puedes mostrarlo en la interfaz si lo deseas)
            console.log(cart);
            alert(`${productTitle} añadido al carrito con ${productQuantity} unidad(es).`);
        });
    });
});

const cartItems = [
    { name: "Camiseta Elegante", quantity: 2, price: 24.99 },
    { name: "Licuadora Potente", quantity: 1, price: 59.99 }
];

// Function to update cart summary
function updateCartSummary() {
    const cartItemsElement = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');

    let subtotal = 0;
    cartItemsElement.innerHTML = '';

    cartItems.forEach(item => {
        const itemTotal = item.quantity * item.price;
        subtotal += itemTotal;

        cartItemsElement.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    const shipping = 5.00; // Fixed shipping cost
    const total = subtotal + shipping;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Initialize cart summary
updateCartSummary();

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Here you would typically send the payment information to your server or a payment gateway
    alert('¡Pago procesado con éxito! Gracias por su compra.');
});

