async function loadDietas() {
    const contentDiv = document.getElementById('registroContent');

    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }

    try {
        const response = await fetch('/api/dietas');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const dietas = await response.json();

        const html = `
            <h2>Registrar Nova Dieta</h2>
            <form id="dietaForm">
                <label for="nomeDieta">Nome da Dieta:</label>
                <input type="text" id="nomeDieta" required>
                <button type="submit">Adicionar Dieta</button>
            </form>
            <h2>Lista de Dietas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Dieta</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="dietaTableBody">
                    <!-- Dietas serão listadas aqui -->
                </tbody>
            </table>
        `;

        contentDiv.innerHTML = html;

        const tableBody = document.getElementById('dietaTableBody');
        if (!tableBody) {
            console.error('Table body for dietas not found');
            return;
        }

        dietas.forEach(dieta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dieta.paciente.Nome}</td>
                <td>
                    <button onclick="editarDieta('${dieta._id}')">Editar</button>
                    <button onclick="deletarDieta('${dieta._id}')">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading dietas:', error);
        contentDiv.innerHTML = '<p>Erro ao carregar dietas.</p>';
    }
}

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
    const dietaForm = document.getElementById('dietaForm');
    if (dietaForm) {
        dietaForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const nomeDieta = document.getElementById('nomeDieta').value;

            try {
                const response = await fetch('/api/dietas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome: nomeDieta })
                });
                if (!response.ok) {
                    throw new Error('Failed to add dieta');
                }
                loadDietas(); // Reload the dietas after adding
            } catch (error) {
                console.error('Error adding dieta:', error);
            }
        });
    }
});
