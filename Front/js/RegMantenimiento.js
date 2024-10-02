// Función para validar el formulario
function validateForm() {
    const unidad = document.getElementById('unidad').value;
    const personal = document.getElementById('personal').value;
    const fecha = document.getElementById('fecha').value;
    const comentarios = document.getElementById('comentarios').value;

    // Verificar si todos los campos están completos
    if (!unidad || !personal || !fecha || !comentarios) {
        alert('Por favor, complete todos los campos antes de enviar.');
        return false; // No envía el formulario
    }
    return true; // Envía el formulario si todo es válido
}