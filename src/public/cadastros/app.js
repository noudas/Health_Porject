// Função para carregar suplementos da API
async function loadSuplementos() {
    const response = await fetch('/api/suplementos');  // Updated with /api prefix
    const suplementos = await response.json();
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
}

// Função para registrar um novo suplemento
document.getElementById('suplementoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const dosagem = document.getElementById('dosagem').value;
    const tipo = document.getElementById('tipo').value;
    const forma = document.getElementById('forma').value;

    const response = await fetch('/api/suplementos', {  // Updated with /api prefix
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

// Função para deletar suplemento
async function deletarSuplemento(id) {
    if (confirm('Tem certeza que deseja deletar este suplemento?')) {
        const response = await fetch(`/api/suplementos/${id}`, { method: 'DELETE' });  // Updated with /api prefix
        if (response.ok) {
            alert('Suplemento deletado com sucesso!');
            loadSuplementos(); // Recarregar a lista após deletar
        } else {
            alert('Erro ao deletar suplemento.');
        }
    }
}

// Função para editar suplemento
async function editarSuplemento(id) {
    const novoNome = prompt('Digite o novo nome:');
    const novaDosagem = prompt('Digite a nova dosagem:');
    const novoTipo = prompt('Digite o novo tipo:');
    const novaForma = prompt('Digite a nova forma:');

    if (novoNome && novaDosagem && novoTipo && novaForma) {
        const response = await fetch(`/api/suplementos/${id}`, {  // Updated with /api prefix
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

// Carregar suplementos ao carregar a página
window.onload = loadSuplementos;
