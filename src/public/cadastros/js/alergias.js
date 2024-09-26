// alergias.js

async function loadAlergias() {
    const contentDiv = document.getElementById('registroContent');

    try {
        const response = await fetch('/api/alergias');
        const alergias = await response.json();

        const html = `
            <h2>Registrar Nova Alergia</h2>
            <form id="alergiaForm">
                <input type="text" id="nome" placeholder="Nome" required>
                <textarea id="descricao" placeholder="Descrição"></textarea>
                <select id="tipo" required>
                    <option value="" disabled selected>Selecione o Tipo</option>
                    <option value="Alimentar">Alimentar</option>
                    <option value="Medicamento">Medicamento</option>
                    <option value="Ambiental">Ambiental</option>
                    <option value="Insectos">Insectos</option>
                    <option value="Animais">Animais</option>
                    <option value="Latex">Latex</option>
                    <option value="Fragrâncias">Fragrâncias</option>
                    <option value="Metais">Metais</option>
                    <option value="Cosméticos">Cosméticos</option>
                    <option value="Conservantes">Conservantes</option>
                    <option value="Temperatura">Temperatura</option>
                    <option value="Outros">Outros</option>
                </select>
                <select id="severidade" required>
                    <option value="" disabled selected>Selecione a Severidade</option>
                    <option value="Leve">Leve</option>
                    <option value="Moderada">Moderada</option>
                    <option value="Grave">Grave</option>
                    <option value="Anafilática">Anafilática</option>
                </select>
                <button type="submit">Registrar</button>
            </form>

            <h2>Lista de Alergias</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Severidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="alergiaTableBody">
                    <!-- Alergias serão listadas aqui -->
                </tbody>
            </table>
        `;

        contentDiv.innerHTML = html;

        document.getElementById('alergiaForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const descricao = document.getElementById('descricao').value;
            const tipo = document.getElementById('tipo').value;
            const severidade = document.getElementById('severidade').value;

            const response = await fetch('/api/alergias', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, descricao, tipo, severidade })
            });

            if (response.ok) {
                alert('Alergia registrada com sucesso!');
                loadAlergias(); // Recarregar a lista após registrar
                e.target.reset(); // Limpar formulário
            } else {
                alert('Erro ao registrar alergia.');
            }
        });

        const tableBody = document.getElementById('alergiaTableBody');
        tableBody.innerHTML = '';

        alergias.forEach(alergia => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${alergia.nome}</td>
                <td>${alergia.tipo}</td>
                <td>${alergia.severidade}</td>
                <td>
                    <button onclick="editarAlergia('${alergia._id}')">Editar</button>
                    <button onclick="deletarAlergia('${alergia._id}')">Deletar</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading alergias:', error);
        contentDiv.innerHTML = '<p>Erro ao carregar alergias.</p>';
    }
}

async function editarAlergia(id) {
    const novoNome = prompt('Digite o novo nome:');
    const novaDescricao = prompt('Digite a nova descrição:');
    const novoTipo = prompt('Digite o novo tipo:');
    const novaSeveridade = prompt('Digite a nova severidade:');

    if (novoNome && novoTipo && novaSeveridade) {
        const response = await fetch(`/api/alergias/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome, descricao: novaDescricao, tipo: novoTipo, severidade: novaSeveridade })
        });

        if (response.ok) {
            alert('Alergia atualizada com sucesso!');
            loadAlergias(); // Recarregar a lista após editar
        } else {
            alert('Erro ao editar alergia.');
        }
    } else {
        alert('Todos os campos obrigatórios são necessários para editar.');
    }
}

async function deletarAlergia(id) {
    if (confirm('Tem certeza que deseja deletar esta alergia?')) {
        const response = await fetch(`/api/alergias/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Alergia deletada com sucesso!');
            loadAlergias(); // Recarregar a lista após deletar
        } else {
            alert('Erro ao deletar alergia.');
        }
    }
}
