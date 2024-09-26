document.addEventListener('DOMContentLoaded', () => {
    const registroType = document.getElementById('registroType');
    
    // Event listener for changes in the dropdown
    registroType.addEventListener('change', changeRegistro);

    // Call changeRegistro on initial load
    changeRegistro();
});

function changeRegistro() {
    const registroType = document.getElementById('registroType').value;
    const contentDiv = document.getElementById('registroContent');

    switch(registroType) {
        case 'suplementos':
            contentDiv.innerHTML = ''; // Clear content before loading
            loadSuplementos();
            break;
        case 'alergias':
            contentDiv.innerHTML = ''; // Clear content before loading
            loadAlergias();
            break;
        case 'esportes':
            contentDiv.innerHTML = ''; // Clear content before loading
            loadEsportes();
            break;
        case 'medicamentos':
            contentDiv.innerHTML = ''; // Clear content before loading
            loadMedicamentos();
            break;
        case 'alimentos':
            contentDiv.innerHTML = ''; // Clear content before loading
            loadAlimentos();
            break;
        case 'horarios':
            contentDiv.innerHTML = ''; // Clear content before loading
            loadHorarios(); 
            break;
        case 'dietas':
            contentDiv.innerHTML = ''; // Clear content before loading
            loadDietas();
            break;
        default:
            contentDiv.innerHTML = '<p>Por favor, selecione um tipo de registro.</p>';
    }
}
