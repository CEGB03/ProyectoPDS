function searchTenant() {
    const documento = document.getElementById('tenant-document').value; // Obtener el valor del input
    const resultDiv = document.getElementById('result'); // Elemento para mostrar el resultado
    resultDiv.innerHTML = ''; // Limpiar resultados anteriores

    if (!documento) {
        alert('Por favor, ingrese un número de documento.');
        return; // Si el campo está vacío, no continuar
    }

    fetch(`http://localhost:3000/api/inquilinos/${documento}`) // Hacer la petición GET
        .then(response => {
            if (!response.ok) {
                throw new Error('Inquilino no encontrado'); // Lanzar un error si no se encuentra el inquilino
            }
            return response.json(); // Retornar la respuesta en formato JSON
        })
        .then(inquilino => {
            // Aquí puedes mostrar los datos del inquilino en tu interfaz
            console.log('Inquilino encontrado:', inquilino);
            resultDiv.innerHTML = `Inquilino encontrado: ${inquilino.nombre}, Teléfono: ${inquilino.telefono}`;
        })
        .catch(error => {
            openRegisterTenantForm()
            console.error('Error:', error);
            resultDiv.innerHTML = `Error: ${error.message}`; // Mostrar mensaje de error en la interfaz
        });
}

function openRegisterTenantForm() {
    // Abre el formulario de registro de inquilino en una nueva pestaña
    window.open('RegistrarInquilino.html', '_blank'); // Asegúrate de que la ruta sea correcta
}
