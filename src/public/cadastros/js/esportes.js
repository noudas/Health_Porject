// esportes.js

async function loadEsportes() {
    const contentDiv = document.getElementById('registroContent');

    try {
        const response = await fetch('/api/esportes');
        const esportes = await response.json();

        const html = `
            <h2>Registrar Novo Esporte</h2>
            <form id="esporteForm">
                <input type="text" id="nome" placeholder="Nome" required>
                <select id="categoria" required>
                    <option value="" disabled selected>Selecione a Categoria</option>
                    <option value="Aeróbico">Aeróbico</option>
                    <option value="Anaeróbico">Anaeróbico</option>
                    <option value="Flexibilidade">Flexibilidade</option>
                    <option value="Força">Força</option>
                    <option value="Resistência">Resistência</option>
                </select>
                <select id="intensidade" required>
                    <option value="" disabled selected>Selecione a Intensidade</option>
                    <option value="Baixa">Baixa</option>
                    <option value="Moderada">Moderada</option>
                    <option value="Alta">Alta</option>
                </select>
                <input type="number" id="duracaoMedia" placeholder="Duração Média (min)">
                <input type="number" id="caloriasQueimadasPorHora" placeholder="Calorias Queimadas por Hora">
                <input type="text" id="localizacao" placeholder="Localização">
                <button type="submit">Registrar</button>
            </form>

            <h2>Lista de Esportes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Intensidade</th>
                        <th>Duração Média</th>
                        <th>Calorias/Hora</th>
                        <th>Localização</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="esporteTableBody">
                    <!-- Esportes serão listados aqui -->
                </tbody>
            </table>
        `;

        contentDiv.innerHTML = html;

        document.getElementById('esporteForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const categoria = document.getElementById('categoria').value;
            const intensidade = document.getElementById('intensidade').value;
            const duracaoMedia = parseFloat(document.getElementById('duracaoMedia').value) || 0;
            const caloriasQueimadasPorHora = parseFloat(document.getElementById('caloriasQueimadasPorHora').value) || 0;
            const localizacao = document.getElementById('localizacao').value;

            const response = await fetch('/api/esportes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nome, 
                    categoria, 
                    intensidade, 
                    duracaoMedia, 
                    caloriasQueimadasPorHora, 
                    localizacao 
                })
            });

            if (response.ok) {
                alert('Esporte registrado com sucesso!');
                loadEsportes(); // Recarregar a lista após registrar
                e.target.reset(); // Limpar formulário
            } else {
                alert('Erro ao registrar esporte.');
            }
        });

        const tableBody = document.getElementById('esporteTableBody');
        tableBody.innerHTML = '';

        esportes.forEach(esporte => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${esporte.nome}</td>
                <td>${esporte.categoria}</td>
                <td>${esporte.intensidade}</td>
                <td>${esporte.duracaoMedia} min</td>
                <td>${esporte.caloriasQueimadasPorHora} kcal/h</td>
                <td>${esporte.localizacao}</td>
                <td>
                    <button onclick="editarEsporte('${esporte._id}')">Editar</button>
                    <button onclick="deletarEsporte('${esporte._id}')">Deletar</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading esportes:', error);
        contentDiv.innerHTML = '<p>Erro ao carregar esportes.</p>';
    }
}

async function editarEsporte(id) {
    const nome = prompt('Digite o novo nome:');
    const categoria = prompt('Digite a nova categoria:');
    const intensidade = prompt('Digite a nova intensidade:');
    const duracaoMedia = parseFloat(prompt('Digite a nova duração média:') || 0);
    const caloriasQueimadasPorHora = parseFloat(prompt('Digite as novas calorias queimadas por hora:') || 0);
    const localizacao = prompt('Digite a nova localização:');

    if (nome && categoria && intensidade) {
        const response = await fetch(`/api/esportes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nome, 
                categoria, 
                intensidade, 
                duracaoMedia, 
                caloriasQueimadasPorHora, 
                localizacao 
            })
        });

        if (response.ok) {
            alert('Esporte atualizado com sucesso!');
            loadEsportes(); // Recarregar a lista após editar
        } else {
            alert('Erro ao editar esporte.');
        }
    } else {
        alert('Todos os campos obrigatórios são necessários para editar.');
    }
}

async function deletarEsporte(id) {
    if (confirm('Tem certeza que deseja deletar este esporte?')) {
        const response = await fetch(`/api/esportes/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Esporte deletado com sucesso!');
            loadEsportes(); // Recarregar a lista após deletar
        } else {
            alert('Erro ao deletar esporte.');
        }
    }
}