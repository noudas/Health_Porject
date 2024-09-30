// horarios.js
document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('registroContent');

    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }

    try {
        // Fetch existing horarios to display them
        const response = await fetch('/api/horarios');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const horarios = await response.json();

        // Generate the HTML form and table layout
        const html = `
            <h2>Registrar Novo Horário</h2>
            <form id="horarioForm">
                <div class="field-group">
                    <label for="hora">Hora:</label>
                    <input type="datetime-local" id="hora" name="hora" required>
                </div>
                <div class="field-group">
                    <label for="tipo">Tipo:</label>
                    <select id="tipo" name="tipo" required>
                        <option value="" disabled selected>Selecione</option>
                        <option value="Café da manhã">Café da manhã</option>
                        <option value="Lanche da manhã">Lanche da manhã</option>
                        <option value="Almoço">Almoço</option>
                        <option value="Lanche da tarde">Lanche da tarde</option>
                        <option value="Jantar">Jantar</option>
                        <option value="Ceia">Ceia</option>
                        <option value="Hidratação">Hidratação</option>
                    </select>
                </div>
                <div class="field-group">
                    <label for="observacoes">Observações:</label>
                    <input type="text" id="observacoes" name="observacoes" maxlength="100" placeholder="Ex: Tomar com água">
                </div>
                <button type="submit">Adicionar Horário</button>
            </form>
            <h2>Lista de Horários</h2>
            <table>
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Tipo</th>
                        <th>Observações</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="horarioTableBody">
                    <!-- Horários serão listados aqui -->
                </tbody>
            </table>
        `;

        // Insert the generated HTML into the content div
        contentDiv.innerHTML = html;

        // **Move loadHorarios call here**
        // Ensure that `loadHorarios()` is called after content is injected into `registroContent`.
        loadHorarios();

    } catch (error) {
        console.error('Error loading horarios:', error);
        contentDiv.innerHTML = '<p>Erro ao carregar horários.</p>';
    }

    // Form submission handling for adding a new horario
    const horarioForm = document.getElementById('horarioForm');
    if (horarioForm) {
        horarioForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const hora = document.getElementById('hora').value;
            const tipo = document.getElementById('tipo').value;
            const observacoes = document.getElementById('observacoes').value;

            try {
                const response = await fetch('/api/horarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ hora, tipo, observacoes })
                });

                if (!response.ok) {
                    throw new Error('Failed to add horario');
                }
                loadHorarios(); // Reload the horarios after adding
            } catch (error) {
                console.error('Error adding horario:', error);
            }
        });
    }
});

// Function to reload the horarios list after updates or deletions
async function loadHorarios() {
    console.log('Loading horarios...');

    const tableBody = document.getElementById('horarioTableBody');
    if (!tableBody) {
        console.error('Table body for horarios not found');
        return;
    }
    console.log('Found horarioTableBody');

    const contentDiv = document.getElementById('registroContent');
    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }

    try {
        const response = await fetch('/api/horarios');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const horarios = await response.json();

        // Clear existing rows before repopulating
        tableBody.innerHTML = '';

        // Populate the table with updated horarios
        horarios.forEach(horario => {
            const row = document.createElement('tr');
            const horaFormatted = horario.hora ? new Date(horario.hora).toLocaleString() : 'Hora não disponível';

            row.innerHTML = `
                <td>${horaFormatted}</td>
                <td>${horario.tipo}</td>
                <td>${horario.observacoes || '-'}</td>
                <td>
                    <button onclick="editarHorario('${horario._id}')">Editar</button>
                    <button onclick="deletarHorario('${horario._id}')">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading horarios:', error);
        contentDiv.innerHTML = '<p>Erro ao carregar horários.</p>';
    }
}

// Expose the loadHorarios function globally
window.loadHorarios = loadHorarios;
