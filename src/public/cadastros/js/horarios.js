async function loadHorarios() {
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

        const html = `
            <h2>Registrar Novo Horário</h2>
            <form id="horarioForm">
                <label for="paciente">Paciente:</label>
                <input type="text" id="paciente" required>
                <label for="hora">Hora:</label>
                <input type="datetime-local" id="hora" required>
                <label for="tipo">Tipo:</label>
                <input type="text" id="tipo" required>
                <button type="submit">Adicionar Horário</button>
            </form>
            <h2>Lista de Horários</h2>
            <table>
                <thead>
                    <tr>
                        <th>Paciente</th>
                        <th>Hora</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="horarioTableBody">
                    <!-- Horários serão listados aqui -->
                </tbody>
            </table>
        `;

        contentDiv.innerHTML = html;

        const tableBody = document.getElementById('horarioTableBody');
        if (!tableBody) {
            console.error('Table body for horarios not found');
            return;
        }

        horarios.forEach(horario => {
            const row = document.createElement('tr');
            const pacienteNome = horario.paciente ? `${horario.paciente.Nome}` : 'Paciente não encontrado';
            const horaFormatted = horario.hora ? new Date(horario.hora).toLocaleString() : 'Hora não disponível';

            row.innerHTML = `
                <td>${pacienteNome}</td>
                <td>${horaFormatted}</td>
                <td>${horario.tipo}</td>
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

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
    const horarioForm = document.getElementById('horarioForm');
    if (horarioForm) {
        horarioForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const paciente = document.getElementById('paciente').value;
            const hora = document.getElementById('hora').value;
            const tipo = document.getElementById('tipo').value;

            try {
                const response = await fetch('/api/horarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ paciente, hora, tipo })
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
