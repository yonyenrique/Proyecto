$(document).ready(function() {
    // Despliegue con hover
    $('.dropdown-submenu').hover(
        function() {
            $(this).children('.dropdown-menu').stop(true, true).show();
        },
        function() {
            $(this).children('.dropdown-menu').stop(true, true).hide();
        }
    );

    // Despliegue con clic
    $('.dropdown-submenu > a').on("click", function(e) {
        e.preventDefault();
        var submenu = $(this).next('.dropdown-menu');
        $('.dropdown-submenu .dropdown-menu').not(submenu).hide(); // Cerrar otros submenús
        submenu.toggle(); // Alternar el submenú actual
    });

    // Array para almacenar los productos en el carrito (usando localStorage)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Función para agregar productos al carrito
    function addToCart(product, price) {
        const existingProduct = cart.find(item => item.product === product);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ product, price, quantity: 1 });
        }
        updateCart();
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(product) {
        cart = cart.filter(item => item.product !== product);
        updateCart();
    }

    // Función para actualizar el carrito en el almacenamiento local y la interfaz
    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart)); // Guardar carrito en localStorage
        console.log(cart); // Para depuración

        // Actualizar visualización del carrito en la UI (si quieres)
        let total = 0;
        $('#cart-items').empty(); // Limpiar el carrito visual
        cart.forEach(item => {
            total += item.price * item.quantity;
            $('#cart-items').append(`
                <tr>
                    <td>${item.product}</td>
                    <td>$${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price * item.quantity}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.product}')">Eliminar</button>
                    </td>
                </tr>
            `);
        });
        $('#cart-total').text('$' + total.toFixed(2)); // Actualizar el total en la interfaz
    }

    // Manejo del formulario de inicio de sesión o registro
    $('#loginForm').on('submit', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
        
        // Obtener los valores de los campos
        let email = $('#email').val().trim();
        let password = $('#password').val().trim();

        // Validación de los campos
        if (!email || !password) {
            alert('Por favor, ingresa tu correo electrónico y contraseña.');
            return;
        }

        // Verificación del estado actual: si estamos en login o registro
        let action = $('#welcomeMessage').text().includes('Iniciar') ? 'login' : 'register';
        
        if (action === 'login') {
            // Validación de inicio de sesión (verificar datos en localStorage)
            let storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                // Inicio de sesión exitoso
                alert('Inicio de sesión exitoso!');
                localStorage.setItem('loggedIn', true); // Guardamos el estado de sesión
                window.location.href = '/dashboard'; // Redirige a una página protegida
            } else {
                alert('Correo electrónico o contraseña incorrectos.');
            }
        } else if (action === 'register') {
            // Registro de un nuevo usuario
            let newUser = { email, password };
            localStorage.setItem('user', JSON.stringify(newUser)); // Guardar el usuario en localStorage
            alert('Registro exitoso! Ahora puedes iniciar sesión.');
            
            // Cambiar el formulario para que vuelva a mostrar "Iniciar Sesión"
            $('#welcomeMessage').text('Iniciar Sesión o Registrarse'); 
            $('button').text('Iniciar Sesión');
            $('p').html('¿No tienes una cuenta? <a href="#">Regístrate aquí</a>');
        }
    });

    // Enlace de "¿No tienes cuenta?" que cambia entre registro e inicio de sesión
    $('p a').on('click', function(e) {
        e.preventDefault();

        // Cambiar entre los formularios de inicio de sesión y registro
        if ($('#welcomeMessage').text().includes('Iniciar')) {
            $('#welcomeMessage').text('Regístrate');
            $('button').text('Registrarse');
            $('p').html('¿Ya tienes cuenta? <a href="#">Inicia sesión aquí</a>');
        } else {
            $('#welcomeMessage').text('Iniciar Sesión');
            $('button').text('Iniciar Sesión');
            $('p').html('¿No tienes una cuenta? <a href="#">Regístrate aquí</a>');
        }
    });

    // Para agregar y eliminar productos del carrito en alguna parte de tu HTML
    // Esto es solo un ejemplo, deberías colocar estos botones en tu HTML
    $('#addToCartBtn').on('click', function() {
        addToCart('Producto 1', 100);  // Ejemplo de producto
    });

    $('#removeFromCartBtn').on('click', function() {
        removeFromCart('Producto 1');  // Ejemplo de eliminación de producto
    });

    // Cargar el carrito en la página de carrito de compras
    loadCart();

    // Función para cargar el carrito de compras en la página de carrito
    function loadCart() {
        // Llamar a la función que actualiza el carrito y lo muestra
        updateCart();
    }
});
