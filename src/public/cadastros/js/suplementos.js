// suplemento.js
async function loadSuplementos() {
    const contentDiv = document.getElementById('registroContent');

    try {
        const response = await fetch('/api/suplementos');
        const suplementos = await response.json();

        const html = `
            <h2>Registrar Novo Suplemento</h2>
            <form id="suplementoForm">
                <input type="text" id="nome" placeholder="Nome" required>
                <input type="text" id="dosagem" placeholder="Dosagem" required>
                <select id="tipo" required>
                    <option value="" disabled selected>Selecione o Tipo</option>
                    <option value="Vitamina">Vitamina</option>
                    <option value="Mineral">Mineral</option>
                    <option value="Aminoácido">Aminoácido</option>
                    <!-- ... add more options here -->
                </select>
                <select id="forma" required>
                    <option value="" disabled selected>Selecione a Forma</option>
                    <option value="Comprimido">Comprimido</option>
                    <option value="Cápsula">Cápsula</option>
                    <!-- ... add more options here -->
                </select>
                <button type="submit">Registrar</button>
            </form>

            <h2>Lista de Suplementos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Dosagem</th>
                        <th>Tipo</th>
                        <th>Forma</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="suplementoTableBody">
                    <!-- Suplementos serão listados aqui -->
                </tbody>
            </table>
        `;

        contentDiv.innerHTML = html;

        document.getElementById('suplementoForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const dosagem = document.getElementById('dosagem').value;
            const tipo = document.getElementById('tipo').value;
            const forma = document.getElementById('forma').value;

            const response = await fetch('/api/suplementos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, dosagem, tipo, forma })
            });

            if (response.ok) {
                alert('Suplemento registrado com sucesso!');
                loadSuplementos(); // Recarregar a lista após registrar
                e.target.reset(); // Limpar formulário
            } else {
                alert('Erro ao registrar suplemento.');
            }
        });

        const tableBody = document.getElementById('suplementoTableBody');
        tableBody.innerHTML = '';

        suplementos.forEach(suplemento => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${suplemento.nome}</td>
                <td>${suplemento.dosagem}</td>
                <td>${suplemento.tipo}</td>
                <td>${suplemento.forma}</td>
                <td>
                    <button onclick="editarSuplemento('${suplemento._id}')">Editar</button>
                    <button onclick="deletarSuplemento('${suplemento._id}')">Deletar</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading suplementos:', error);
        contentDiv.innerHTML = '<p>Erro ao carregar suplementos.</p>';
    }
}

async function editarSuplemento(id) {
    const novoNome = prompt('Digite o novo nome:');
    const novaDosagem = prompt('Digite a nova dosagem:');
    const novoTipo = prompt('Digite o novo tipo:');
    const novaForma = prompt('Digite a nova forma:');

    if (novoNome && novaDosagem && novoTipo && novaForma) {
        const response = await fetch(`/api/suplementos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: novoNome, dosagem: novaDosagem, tipo: novoTipo, forma: novaForma })
        });

        if (response.ok) {
            alert('Suplemento atualizado com sucesso!');
            loadSuplementos(); // Recarregar a lista após editar
        } else {
            alert('Erro ao editar suplemento.');
        }
    } else {
        alert('Todos os campos são obrigatórios para editar.');
    }
}

async function deletarSuplemento(id) {
    if (confirm('Tem certeza que deseja deletar este suplemento?')) {
        const response = await fetch(`/api/suplementos/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Suplemento deletado com sucesso!');
            loadSuplementos(); // Recarregar a lista após deletar
        } else {
            alert('Erro ao deletar suplemento.');
        }
    }
}

// Carregar suplementos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadSuplementos();
});
