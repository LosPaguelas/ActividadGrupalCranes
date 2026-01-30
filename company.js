// Función para guardar la oferta
function saveOffer() {
    const form = document.getElementById('addOfferForm');
    const name = document.getElementById('offerName').value;
    const description = document.getElementById('offerDescription').value;
    const requirements = document.getElementById('offerRequirements').value;
    const category = document.getElementById('offerCategory').value;

    // Validar que todos los campos estén llenos
    if (!name || !description || !requirements || !category) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Crear objeto de oferta
    const offer = {
        id: Date.now(),
        name: name,
        description: description,
        requirements: requirements,
        category: category,
        createdAt: new Date().toISOString()
    };

    // Guardar en localStorage
    let offers = JSON.parse(localStorage.getItem('offers')) || [];
    offers.push(offer);
    localStorage.setItem('offers', JSON.stringify(offers));

    // Cerrar modal y limpiar formulario
    const modal = bootstrap.Modal.getInstance(document.getElementById('addOfferModal'));
    modal.hide();
    form.reset();

    // Mostrar mensaje de éxito
    alert('¡Oferta guardada exitosamente!');
    console.log('Oferta guardada:', offer);
}

// Mapa de categorías para mostrar texto legible
const categoryLabels = {
    'technology': 'Tecnología',
    'finance': 'Finanzas',
    'healthcare': 'Salud',
    'education': 'Educación',
    'retail': 'Comercio',
    'manufacturing': 'Manufactura',
    'consulting': 'Consultoría',
    'other': 'Otro'
};

// Función para actualizar la interfaz de la compañía
function updateCompanyDisplay(company) {
    // Actualizar nombre
    document.getElementById('companyNameDisplay').textContent = company.name;
    
    // Actualizar categoría
    const categoryDisplay = document.getElementById('companyCategoryDisplay');
    categoryDisplay.innerHTML = `<i class="bi bi-tag me-1"></i>${categoryLabels[company.category] || company.category}`;
    
    // Actualizar descripción
    document.getElementById('companyDescriptionDisplay').textContent = company.description;
    
    // También actualizar en el sidebar izquierdo
    const sidebarLogo = document.getElementById('sidebarCompanyName');
    if (sidebarLogo) {
        sidebarLogo.textContent = company.name;
    }
}

// Función para guardar los cambios de la compañía
function saveCompany() {
    const name = document.getElementById('companyName').value;
    const category = document.getElementById('companyCategory').value;
    const description = document.getElementById('companyDescription').value;

    // Validar que todos los campos estén llenos
    if (!name || !category || !description) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Crear objeto de compañía
    const company = {
        name: name,
        category: category,
        description: description,
        updatedAt: new Date().toISOString()
    };

    // Guardar en localStorage
    localStorage.setItem('company', JSON.stringify(company));

    // Actualizar la interfaz
    updateCompanyDisplay(company);

    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editCompanyModal'));
    modal.hide();

    // Mostrar mensaje de éxito
    alert('¡Compañía actualizada exitosamente!');
    console.log('Compañía guardada:', company);
}

// Cargar datos de la compañía al iniciar
document.addEventListener('DOMContentLoaded', function() {
    const savedCompany = localStorage.getItem('company');
    if (savedCompany) {
        const company = JSON.parse(savedCompany);
        // Actualizar campos del formulario
        document.getElementById('companyName').value = company.name;
        document.getElementById('companyCategory').value = company.category;
        document.getElementById('companyDescription').value = company.description;
        
        // Actualizar la interfaz
        updateCompanyDisplay(company);
    }
});
