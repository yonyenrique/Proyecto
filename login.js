
const loginForm = document.getElementById('loginForm');

// Añadir un evento para cuando el formulario sea enviado
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los valores de los campos de correo y contraseña
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar que ambos campos no estén vacíos
    if (email && password) {
        // Si los campos son válidos, mostrar la alerta
        alert('Iniciaste sesión correctamente');
        
        // Opcional: Puedes redirigir a otro lugar, por ejemplo:
        // window.location.href = "pagina_principal.html"; // Para redirigir a otra página
    } else {
        // Si faltan datos, mostrar un mensaje de error
        alert('Por favor, completa ambos campos');
    }
});