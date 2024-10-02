const { jsPDF } = window.jspdf;
const doc = new jsPDF();

document.addEventListener('DOMContentLoaded', function() {
    // Definir los valores de cada concepto
    const conceptValues = {
        "Renta Mensual": 500,
        "Depósito de Seguridad": 1000,
        "Mantenimiento": 50,
        "Servicios Públicos": 150,
        "Multas o Penalidades": 250,
        "Reparaciones": 350,
        "Mejoras o Modificaciones": 250,
        "Intereses Moratorios": 0.30
    };

    let currentTotal = 0;  // Variable para almacenar el total actual

    const form = document.getElementById('paymentForm');
    const totalAmount = document.getElementById('totalAmount');
    const acceptTermsContainer = document.getElementById('acceptTermsContainer');
    const payButton = document.getElementById('payButton');
    const acceptTerms = document.getElementById('acceptTerms');

    // Inicialmente ocultar el checkbox de términos y el botón de pagar
    acceptTermsContainer.style.display = 'none';
    payButton.style.display = 'none';

    // Evento para verificar selección de conceptos
    form.addEventListener('change', updateTotal);

    // Evento para mostrar el botón de pagar cuando se aceptan los términos
    acceptTerms.addEventListener('change', function() {
        if (acceptTerms.checked) {
            payButton.style.display = 'block'; // Mostrar botón de pagar
        } else {
            payButton.style.display = 'none';  // Ocultar botón de pagar
        }
    });

    // Función para actualizar el total y manejar la casilla de verificación de aceptación
    function updateTotal() {
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        let newTotal = 0;
        let selectedConcepts = [];
        let hasNonInterestConcept = false;

        checkboxes.forEach(checkbox => {
            const concept = checkbox.value;
            selectedConcepts.push(concept);

            // Verificar si no es "Intereses Moratorios"
            if (concept !== "Intereses Moratorios") {
                hasNonInterestConcept = true;
            }

            // Calcular el total
            if (concept === "Intereses Moratorios") {
                newTotal += currentTotal * conceptValues[concept];
            } else if (conceptValues[concept] !== undefined) {
                newTotal += conceptValues[concept];
            }
        });

        currentTotal = newTotal; // Actualizar el total acumulado
        totalAmount.textContent = newTotal.toFixed(2); // Mostrar el total con dos decimales

        // Mostrar casilla de verificación si al menos un concepto no es "Intereses Moratorios"
        if (hasNonInterestConcept) {
            acceptTermsContainer.style.display = 'block';
        } else {
            acceptTermsContainer.style.display = 'none';
            payButton.style.display = 'none';  // Ocultar el botón si no se acepta o no hay conceptos válidos
            acceptTerms.checked = false; // Desmarcar términos si se oculta
        }
    }

    // Función para generar el PDF de la factura
    payButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título de la factura
        doc.setFontSize(18);
        doc.text('Factura de Pago', 105, 20, null, null, 'center');

        // Conceptos seleccionados y totales
        doc.setFontSize(12);
        doc.text('Conceptos Seleccionados:', 20, 40);
        let yPosition = 50;
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            const concept = checkbox.value;
            const value = concept === "Intereses Moratorios"
                ? "30% del total" // Mostrar este texto si es Intereses Moratorios
                : conceptValues[concept];
            doc.text(`${concept}: $${value}`, 20, yPosition);
            yPosition += 10;
        });

        // Total final
        doc.text(`Total a pagar: $${currentTotal.toFixed(2)}`, 20, yPosition + 10);

        // Generar y descargar el PDF
        doc.save('factura_pago.pdf');
    });
});
