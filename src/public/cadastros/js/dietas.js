async function loadDietas() {
    const contentDiv = document.getElementById('registroContent');

    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }

    try {
        // Fetch dietas with populated alimentos
        const responseDietas = await fetch('/api/dietas');
        if (!responseDietas.ok) {
            throw new Error('Failed to fetch dietas');
        }
        const dietas = await responseDietas.json();

        // Fetch alimentos
        const responseAlimentos = await fetch('/api/alimentos');
        if (!responseAlimentos.ok) {
            throw new Error('Failed to fetch alimentos');
        }
        const alimentos = await responseAlimentos.json();

        // Fetch horarios
        const responseHorarios = await fetch('/api/horarios');
        if (!responseHorarios.ok) {
            throw new Error('Failed to fetch horarios');
        }
        const horarios = await responseHorarios.json();

        const html = `
            <h2>Registrar Nova Dieta</h2>
            <form id="dietaForm">
                <label for="nomeDieta">Nome da Dieta:</label>
                <input type="text" id="nomeDieta" required>
                
                <label for="descricao">Descrição:</label>
                <textarea id="descricao"></textarea>

                <div id="horariosContainer">
                    <h3>Horários</h3>
                    <div class="horario-item">
                        <label for="horarioSelect_0">Selecione um Horário:</label>
                        <select id="horarioSelect_0">
                            ${horarios.map(horario => `<option value="${horario._id}">${horario.tipo} - ${new Date(horario.hora).toLocaleTimeString()}</option>`).join('')}
                        </select>

                        
                        
                        <label for="alimentoSelect_0">Selecione um Alimento:</label>
                        <select id="alimentoSelect_0" class="alimentoSelect">
                            ${alimentos.map(alimento => `<option value="${alimento._id}">${alimento.nome}</option>`).join('')}
                        </select>

                        <button type="button" class="addAlimentoBtn">Adicionar Alimento</button>
                        <ul class="alimentosList"></ul>
                    </div>
                    <button type="button" id="addHorarioBtn">Adicionar Horário</button>
                </div>
                
                <div class="form-group">
                    <label for="rotina">Rotina:</label>
                    <textarea id="rotina"></textarea>
                </div>

                <button type="submit">Adicionar Dieta</button>
            </form>
            <h2>Lista de Dietas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome da Dieta</th>
                        <th>Descrição</th>
                        <th>Horários</th>
                        <th>Rotina</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="dietaTableBody">
                    <!-- Dietas serão listadas aqui -->
                </tbody>
            </table>
            <h2>Lista de Alimentos</h2>
            <ul id="alimentoList">
                <!-- Alimentos serão listados aqui -->
            </ul>
        `;

        contentDiv.innerHTML = html;

        const tableBody = document.getElementById('dietaTableBody');
        if (!tableBody) {
            console.error('Table body for dietas not found');
            return;
        }

        dietas.forEach(dieta => {
            const horariosString = dieta.horarios.map(horario => {
                const alimentosList = horario.alimento.map(alimento => alimento.nome).join(', ');
                return `${horario.tipo}: ${alimentosList}`;
            }).join(', ');

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dieta.nome}</td>
                <td>${dieta.descricao}</td>
                <td>${horariosString}</td>
                <td>${dieta.rotina}</td>
                <td>
                    <button onclick="editarDieta('${dieta._id}')">Editar</button>
                    <button onclick="deletarDieta('${dieta._id}')">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        const alimentoList = document.getElementById('alimentoList');
        alimentos.forEach(alimento => {
            const listItem = document.createElement('li');
            listItem.textContent = `${alimento.nome} - ${alimento.tipo}`;
            alimentoList.appendChild(listItem);
        });

        // Add event listener for adding more alimentos in a single horario
        document.getElementById('horariosContainer').addEventListener('click', (event) => {
            if (event.target && event.target.className === 'addAlimentoBtn') {
                const horarioItem = event.target.closest('.horario-item');
                const alimentoSelect = horarioItem.querySelector('.alimentoSelect');
                const alimentoId = alimentoSelect.value;
                const alimentoText = alimentoSelect.options[alimentoSelect.selectedIndex].text;

                const alimentosList = horarioItem.querySelector('.alimentosList');
                const listItem = document.createElement('li');
                listItem.textContent = alimentoText;
                listItem.dataset.id = alimentoId;
                alimentosList.appendChild(listItem);
            }
        });

        // Add event listener to add a new horario block
        document.getElementById('addHorarioBtn').addEventListener('click', () => {
            const horarioItems = document.querySelectorAll('.horario-item');
            const newHorarioIndex = horarioItems.length;
            
            const horarioItem = document.createElement('div');
            horarioItem.className = 'horario-item';
            horarioItem.innerHTML = `
                <label for="horarioSelect_${newHorarioIndex}">Selecione um Horário:</label>
                <select id="horarioSelect_${newHorarioIndex}">
                    ${horarios.map(horario => `<option value="${horario._id}">${horario.tipo} - ${new Date(horario.hora).toLocaleTimeString()}</option>`).join('')}
                </select>
                
                <label for="alimentoSelect_${newHorarioIndex}">Selecione um Alimento:</label>
                <select id="alimentoSelect_${newHorarioIndex}" class="alimentoSelect">
                    ${alimentos.map(alimento => `<option value="${alimento._id}">${alimento.nome}</option>`).join('')}
                </select>

                <button type="button" class="addAlimentoBtn">Adicionar Alimento</button>
                <ul class="alimentosList"></ul>
            `;
            document.getElementById('horariosContainer').appendChild(horarioItem);
        });

        // Add event listener to handle form submission
        document.getElementById('dietaForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const nome = document.getElementById('nomeDieta').value;
            const descricao = document.getElementById('descricao').value;

            // Collect horarios and their alimentos
            const horarios = Array.from(document.querySelectorAll('.horario-item')).map(horarioItem => {
                const horarioId = horarioItem.querySelector('select').value;
                const alimentosList = horarioItem.querySelectorAll('.alimentosList li');
                const alimentoIds = Array.from(alimentosList).map(item => item.dataset.id);

                return {
                    tipo: horarioId,
                    alimento: alimentoIds
                };
            });

            const newDieta = {
                nome,
                descricao,
                horarios
            };

            // Send POST request to add new dieta
            try {
                const response = await fetch('/api/dietas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newDieta),
                });

                if (!response.ok) {
                    throw new Error('Failed to create new dieta');
                }
                alert('Nova dieta adicionada com sucesso!');
                loadDietas(); // Refresh dietas list
            } catch (error) {
                console.error('Error creating new dieta:', error);
                alert('Erro ao criar nova dieta.');
            }
        });
    } catch (error) {
        console.error('Error loading dietas, horários, and alimentos:', error);
        contentDiv.innerHTML = '<p>Erro ao carregar dietas, horários e alimentos.</p>';
    }
}
