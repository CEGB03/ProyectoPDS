document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('propertyForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
            // If the form is valid, you would typically send the data to a server here
            console.log('Form is valid. Submitting...');
            alert('Propiedad registrada exitosamente!');
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;
        const fields = form.querySelectorAll('input, select');

        fields.forEach(field => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                isValid = false;
                showError(field, 'Este campo es requerido.');
            } else if (field.type === 'number' && field.value < parseInt(field.min)) {
                isValid = false;
                showError(field, `El valor debe ser mayor o igual a ${field.min}.`);
            } else {
                clearError(field);
            }
        });

        return isValid;
    }

    function showError(field, message) {
        clearError(field);
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
});