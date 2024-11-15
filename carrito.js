// Array para almacenar los productos del carrito
let cart = [];

// Función para agregar un producto al carrito
function addProduct(name, price, quantity) {
    // Crear un objeto para el producto
    const product = {
        name: name,
        price: price,
        quantity: quantity,
        total: price * quantity
    };

    // Agregar el producto al carrito
    cart.push(product);

    // Actualizar la vista del carrito
    updateCart();
}

// Función para eliminar un producto del carrito
function removeProduct(index) {
    // Eliminar el producto del carrito
    cart.splice(index, 1);

    // Actualizar la vista del carrito
    updateCart();
}

// Función para actualizar la vista del carrito
function updateCart() {
    // Obtener el contenedor de la tabla
    const cartItems = document.getElementById('cart-items');
    
    // Limpiar la tabla antes de volver a agregar los productos
    cartItems.innerHTML = '';

    let total = 0;

    // Recorrer el carrito y agregar las filas a la tabla
    cart.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
            <td>$${product.total}</td>
            <td><button class="btn btn-danger" onclick="removeProduct(${index})">Eliminar</button></td>
        `;

        cartItems.appendChild(row);

        // Sumar el total del carrito
        total += product.total;
    });

    // Actualizar el total en la interfaz
    document.getElementById('cart-total').textContent = `$${total}`;
}

// Función de pago (solo muestra un mensaje por ahora)
function checkout() {
    alert("Redirigiendo a la página de pago...");
}

// Ejemplo de cómo agregar productos
addProduct('Taladro', 50, 1);
addProduct('PINTURA', 20, 2);
addProduct('LAMINA', 15, 3);

function buyNow() {
    // Aquí puedes agregar cualquier lógica para el proceso de compra.
    alert("¡Compra realizada con éxito! Redirigiendo al pago...");
    
    // Si quieres redirigir a una página de pago, descomenta la línea siguiente:
    // window.location.href = 'pagina_de_pago.html';
}