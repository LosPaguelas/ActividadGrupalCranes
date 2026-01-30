// Datos de ejemplo de aplicantes
const applicantsData = {
    'Jessica Lee': {
        email: 'jessica.lee@email.com',
        position: 'Frontend Developer',
        avatar: 'JL',
        avatarColor: '',
        skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Git'],
        experience: '5 años de experiencia en desarrollo frontend con React y TypeScript. Ha trabajado en empresas como Google y Meta.',
        education: 'Ingeniería en Sistemas - Universidad de Stanford (2019)'
    }
};

// Función para ver el perfil de un aplicante
function viewApplicant(name) {
    const applicant = applicantsData[name];
    if (!applicant) return;

    document.getElementById('modalApplicantAvatar').textContent = applicant.avatar;
    document.getElementById('modalApplicantAvatar').className = `avatar-large mx-auto mb-3 ${applicant.avatarColor}`;
    document.getElementById('modalApplicantName').textContent = name;
    document.getElementById('modalApplicantEmail').textContent = applicant.email;
    document.getElementById('modalApplicantPosition').textContent = applicant.position;
    document.getElementById('modalExperience').textContent = applicant.experience;
    document.getElementById('modalEducation').textContent = applicant.education;

    // Actualizar skills
    const skillsContainer = document.getElementById('modalSkills');
    skillsContainer.innerHTML = applicant.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
}

// Función para hacer match con un aplicante
function makeMatch(name) {
    if (confirm(`¿Deseas hacer match con ${name}?`)) {
        alert(`¡Match realizado con ${name}! Ahora puedes contactar al candidato.`);
        console.log(`Match realizado con: ${name}`);
        
        // Guardar match en localStorage
        let matches = JSON.parse(localStorage.getItem('matches')) || [];
        const applicant = applicantsData[name];
        if (applicant) {
            matches.push({
                name: name,
                ...applicant,
                matchDate: new Date().toISOString()
            });
            localStorage.setItem('matches', JSON.stringify(matches));
        }
    }
}

// Función para contactar a un aplicante
function contactApplicant(name) {
    const applicant = applicantsData[name];
    if (applicant) {
        alert(`Enviando mensaje a ${name} (${applicant.email})...`);
        console.log(`Contactando a: ${name} - ${applicant.email}`);
        
        // Guardar contacto en localStorage
        let contacted = JSON.parse(localStorage.getItem('contacted')) || [];
        contacted.push({
            name: name,
            email: applicant.email,
            contactDate: new Date().toISOString()
        });
        localStorage.setItem('contacted', JSON.stringify(contacted));
    }
}

// Función para rechazar a un aplicante
function rejectApplicant(name) {
    if (confirm(`¿Estás seguro de rechazar a ${name}?`)) {
        alert(`${name} ha sido rechazado.`);
        console.log(`Rechazado: ${name}`);
        
        // Guardar rechazo en localStorage
        let rejected = JSON.parse(localStorage.getItem('rejected')) || [];
        rejected.push({
            name: name,
            rejectDate: new Date().toISOString()
        });
        localStorage.setItem('rejected', JSON.stringify(rejected));
    }
}

// Filtrar aplicantes por oferta
document.getElementById('filterJob')?.addEventListener('change', function() {
    const value = this.value;
    console.log('Filtrando por oferta:', value);
    // Aquí iría la lógica para filtrar la tabla
});

// Filtrar aplicantes por estado
document.getElementById('filterStatus')?.addEventListener('change', function() {
    const value = this.value;
    console.log('Filtrando por estado:', value);
    // Aquí iría la lógica para filtrar la tabla
});

// Cargar nombre de la compañía al iniciar
document.addEventListener('DOMContentLoaded', function() {
    const savedCompany = localStorage.getItem('company');
    if (savedCompany) {
        const company = JSON.parse(savedCompany);
        const sidebarLogo = document.getElementById('sidebarCompanyName');
        if (sidebarLogo) {
            sidebarLogo.textContent = company.name;
        }
    }
});
