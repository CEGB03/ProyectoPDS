document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const adminIdInput = document.getElementById('adminId');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const forgotCredentialsButton = document.getElementById('forgotCredentials');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const adminId = adminIdInput.value.trim();
        const password = passwordInput.value.trim();

        // Verificación de que todos los campos estén completos
        if (adminId === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return; // Detener el proceso si no están completos
        }

        // Aquí puedes hacer una comprobación básica de credenciales
        // Simulación de credenciales correctas
        const validAdminId = "admin";
        const validPasswordAdmin = "admin";
        const validPropoId = "prop";
        const validPasswordPropo = "prop";
        const validInquiId = "inqui";
        const validPasswordInqui = "inqui";

        if (adminId === validAdminId && password === validPasswordAdmin) {
            // Redirigir a la página de acciones del administrador
            window.location.href = "../html/Administrador/AdministradorAcciones.html";
        } else if (adminId === validPropoId && password === validPasswordPropo) {
            // Redirigir a la página de acciones del administrador
            window.location.href = "../html/Propietario/PropietarioAcciones.html";
        } else if (adminId === validInquiId && password === validPasswordInqui) {
            // Redirigir a la página de acciones del administrador
            window.location.href = "../html/Inquilino/InquilinoAcciones.html";
        }else{
            alert("ID de administrador o contraseña incorrectos.");
        }
    });

    forgotCredentialsButton.addEventListener('click', function() {
        console.log('Forgot credentials clicked');
        // Aquí puedes redirigir a una página de restablecimiento de contraseña
    });
});
