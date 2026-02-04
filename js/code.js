document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias de Elementos ---
    const roleSelection = document.getElementById('role-selection');
    const loginSection = document.getElementById('login-section') || document.getElementById('login-form');
    const chooseCandidate = document.getElementById('choose-candidate');
    const chooseCompany = document.getElementById('choose-company');
    const btnChangeRole = document.querySelector('.btn-change');
    
    const badgeIcon = document.getElementById('badge-icon');
    const badgeText = document.getElementById('badge-text');
    
    const loginForm = document.getElementById('loginForm') || document.getElementById('main-form');
    const passwordInput = document.querySelector('input[type="password"]');
    const togglePassword = document.getElementById('togglePassword') || document.querySelector('.toggle-pass');
    const errorMessage = document.getElementById('errorMessage');

    let selectedRole = '';

    // --- Lógica de Selección de Rol ---
    const showLogin = (role) => {
        selectedRole = role;
        roleSelection.classList.add('d-none');
        loginSection.classList.remove('d-none');

        // Actualizar el Badge según el rol
        if (role === 'candidate') {
            badgeIcon.textContent = '👤';
            badgeText.textContent = 'Candidate Login';
        } else {
            badgeIcon.textContent = '💼';
            badgeText.textContent = 'Company Login';
        }
    };

    chooseCandidate.addEventListener('click', () => showLogin('candidate'));
    chooseCompany.addEventListener('click', () => showLogin('company'));

    // --- Volver a la selección de rol ---
    btnChangeRole.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.add('d-none');
        roleSelection.classList.remove('d-none');
        if (errorMessage) errorMessage.textContent = ''; // Limpiar errores
    });

    // --- Mostrar/Ocultar Contraseña ---
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Opcional: Cambiar el icono del ojo
            togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // --- Manejo del Formulario ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = passwordInput.value;

        // Simulación de validación
        console.log(`Intentando login como: ${selectedRole}`);
        console.log(`Email: ${email}`);

        // Aquí iría tu llamada a la API (fetch)
        if (email && password) {
            // Ejemplo de feedback visual de carga
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Authenticating...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(`¡Bienvenido, ${selectedRole}! Redirigiendo...`);
                // window.location.href = '/dashboard'; 
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            if (errorMessage) errorMessage.textContent = 'Please fill in all fields.';
        }
    });
});