document.addEventListener('DOMContentLoaded', function() {
    // En el futuro, aquí podrías cargar propiedades dinámicamente desde un servidor o API
    const propertiesContainer = document.querySelector('.properties-container');

    // Simulación de propiedades cargadas (puedes reemplazarlo con una llamada a una API)
    const properties = [
        { name: 'Departamento en el Centro', price: '$500/mes', location: 'Ciudad A' },
        { name: 'Casa en las Afueras', price: '$800/mes', location: 'Ciudad B' },
        { name: 'Ático en la Playa', price: '$1200/mes', location: 'Ciudad C' }
    ];

    if (properties.length > 0) {
        propertiesContainer.innerHTML = ''; // Limpiar el mensaje anterior

        properties.forEach(property => {
            const propertyElement = document.createElement('div');
            propertyElement.classList.add('property-item');
            propertyElement.innerHTML = `
                <h2>${property.name}</h2>
                <p>Precio: ${property.price}</p>
                <p>Ubicación: ${property.location}</p>
            `;
            propertiesContainer.appendChild(propertyElement);
        });
    } else {
        propertiesContainer.innerHTML = '<p>No hay propiedades disponibles en este momento.</p>';
    }
});
