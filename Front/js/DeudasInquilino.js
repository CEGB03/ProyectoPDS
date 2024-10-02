// Aquí puedes agregar funcionalidad para cargar datos dinámicos o actualizaciones si es necesario

// Ejemplo de cómo podrías actualizar los saldos y fechas dinámicamente si recibes datos de un servidor
window.onload = function () {
    // Puedes modificar estos valores con datos reales de un servidor
    document.getElementById("saldo-adeudado-alquiler").innerText = "$1000";
    document.getElementById("pago-primer-vencimiento-alquiler").innerText = "$500";
    document.getElementById("pago-segundo-vencimiento-alquiler").innerText = "$500";

    document.getElementById("saldo-adeudado-expensas").innerText = "$300";
    document.getElementById("pago-primer-vencimiento-expensas").innerText = "$150";
    document.getElementById("pago-segundo-vencimiento-expensas").innerText = "$150";
};
