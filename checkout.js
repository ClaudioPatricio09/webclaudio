document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const paymentForm = document.getElementById('paymentForm');
    const cardNumber = document.getElementById('cardNumber');
    const expirationDate = document.getElementById('expirationDate');
    const cvv = document.getElementById('cvv');
    const cartItems = document.getElementById('cartItems');

    // Simular cambio de pasos
    let currentStep = 0;
    setInterval(() => {
        steps[currentStep].classList.remove('active');
        currentStep = (currentStep + 1) % steps.length;
        steps[currentStep].classList.add('active');
    }, 3000);

    // Validación simple de tarjeta de crédito
    cardNumber.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    });

    expirationDate.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5);
    });

    cvv.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').slice(0, 3);
    });

    // Prevenir envío del formulario (para demostración)
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu compra! Este es un formulario de demostración.');
    });

    // Simular carrito de compras
    const demoItems = [
        { name: 'Producto 1', quantity: 2, price: 19.99 },
        { name: 'Producto 2', quantity: 1, price: 29.99 },
        { name: 'Producto 3', quantity: 3, price: 9.99 }
    ];

    // Llenar la tabla del carrito
    demoItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td class="text-end">$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItems.appendChild(row);
    });

    // Calcular y actualizar el resumen de costos
    function updateCostSummary() {
        const subtotal = demoItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = 9.99;
        const taxes = subtotal * 0.1;
        const total = subtotal + shipping + taxes;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    updateCostSummary();

    // Simular detección de tipo de tarjeta
    cardNumber.addEventListener('input', function() {
        const number = this.value.replace(/\s+/g, '');
        const visaLogo = document.getElementById('visaLogo');
        const mastercardLogo = document.getElementById('mastercardLogo');
        const amexLogo = document.getElementById('amexLogo');

        visaLogo.style.opacity = '0.3';
        mastercardLogo.style.opacity = '0.3';
        amexLogo.style.opacity = '0.3';

        if (number.startsWith('4')) {
            visaLogo.style.opacity = '1';
        } else if (number.startsWith('5')) {
            mastercardLogo.style.opacity = '1';
        } else if (number.startsWith('3')) {
            amexLogo.style.opacity = '1';
        }
    });
});