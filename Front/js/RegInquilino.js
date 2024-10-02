// Función para registrar un nuevo inquilino
function registrarInquilino() {
    // Obtener los valores de los campos del formulario
    const documento = document.getElementById('documento').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const idInquilino = document.getElementById('idInquilino').value;
    const direccion = document.getElementById('direccion').value;
    const pago = document.getElementById('pago').value;

    // Validar que todos los campos estén completos
    if (!documento || !nombre || !telefono || !idInquilino || !direccion || !pago) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    // Crear el objeto del nuevo inquilino
    const nuevoInquilino = {
        id: idInquilino,
        documento,
        nombre
    };

    // Hacer una solicitud POST para registrar al inquilino
    fetch('http://localhost:3000/api/inquilinos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoInquilino),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al registrar el inquilino.');
            }
            return response.json();
        })
        .then(data => {
            alert(`Inquilino registrado con éxito: ${data.nombre}`);
            // Limpiar los campos del formulario después del registro
            document.querySelector('.tenant-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

// Función para verificar si el ID de inquilino ya existe
function verificarExistencia(idInquilino) {
    return fetch(`http://localhost:3000/api/inquilinos/id/${idInquilino}`)
        .then(response => {
            if (response.ok) {
                return response.json(); // Devuelve el inquilino existente
            } else {
                return null; // El inquilino no existe
            }
        });
}

// Actualiza la función registrarInquilino para verificar existencia
function registrarInquilinoConVerificacion() {
    const idInquilino = document.getElementById('idInquilino').value;

    if (!idInquilino) {
        alert('El ID Inquilino es obligatorio.');
        return;
    }

    // Verificar si el inquilino ya existe
    verificarExistencia(idInquilino)
        .then(inquilinoExistente => {
            if (inquilinoExistente) {
                alert(`El ID Inquilino ${idInquilino} ya está en uso. Último inquilino registrado: ${inquilinoExistente.nombre}`);
                return; // No registrar nuevo inquilino
            } else {
                // Si no existe, registrar el nuevo inquilino
                registrarInquilino();
            }
        })
        .catch(error => {
            console.error('Error al verificar existencia:', error);
            alert('Error al verificar la existencia del inquilino.');
        });
}

// Asociar la función al botón de registro
document.querySelector('.register-tenant-button').onclick = registrarInquilinoConVerificacion;
