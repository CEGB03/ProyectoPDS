document.addEventListener('DOMContentLoaded', function() {
    // Simulated data - in a real application, this would come from a server
    const rentalData = {
        unitName: "Nombre de unidad funcional",
        unitAddress: "Dirección unidad funcional",
        unitStatus: "Ocupado/Desocupado",
        tenantName: "Nombre completo",
        tenantDNI: "DNI",
        tenantPhone: "Teléfono",
        rentalCost: "XXX",
        lastMaintenance: "DD/MM/AAAA"
    };

    // Populate the rental details
    document.getElementById('unitName').textContent = rentalData.unitName;
    document.getElementById('unitAddress').textContent = rentalData.unitAddress;
    document.getElementById('unitStatus').textContent = rentalData.unitStatus;
    document.getElementById('tenantName').textContent = rentalData.tenantName;
    document.getElementById('tenantDNI').textContent = rentalData.tenantDNI;
    document.getElementById('tenantPhone').textContent = rentalData.tenantPhone;
    document.getElementById('rentalCost').textContent = rentalData.rentalCost;
    document.getElementById('lastMaintenance').textContent = rentalData.lastMaintenance;

    // Add functionality to the back button
    document.getElementById('backButton').addEventListener('click', function() {
        // In a real application, this would navigate back or to a specific page
        console.log('Back button clicked');
        alert('Navigating back...');
    });
});