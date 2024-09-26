// medicamentos.js

async function loadMedicamentos() {
    const contentDiv = document.getElementById('registroContent');

    try {
        const response = await fetch('/api/medicamentos');
        const medicamentos = await response.json();

        const html = `
            <h2>Registrar Novo Medicamento</h2>
            <form id="medicamentoForm">
                <div class="field-group">
                    <label for="paciente">Paciente:</label>
                    <select id="paciente" name="paciente" required></select>
                </div>
                <div class="field-group">
                    <label for="nome">Nome do Medicamento:</label>
                    <input type="text" id="nome" name="detalhes.nome" required>
                </div>
                <div class="field-group">
                    <label for="marca">Marca:</label>
                    <input type="text" id="marca" name="detalhes.marca">
                </div>
                <div class="field-group">
                    <label for="composicao">Composição:</label>
                    <textarea id="composicao" name="detalhes.composicao"></textarea>
                </div>
                <div class="field-group">
                    <label for="dosagem">Dosagem:</label>
                    <input type="text" id="dosagem" name="detalhes.dosagem">
                </div>
                <div class="field-group">
                    <label for="tipo">Tipo de Posologia:</label>
                    <select id="tipo" name="posologia.tipo" required>
                        <option value="" disabled selected>Selecione</option>
                        <option value="oral">Oral</option>
                        <option value="intravenosa">Intravenosa</option>
                        <option value="tópica">Tópica</option>
                        <option value="parenteral">Parenteral</option>
                        <option value="inhalada">Inhalada</option>
                        <option value="outra">Outra</option>
                    </select>
                </div>
                <div class="field-group">
                    <label for="frequencia">Frequência:</label>
                    <input type="text" id="frequencia" name="posologia.frequencia">
                </div>
                <div class="field-group">
                    <label for="quantidade">Quantidade:</label>
                    <input type="text" id="quantidade" name="posologia.quantidade">
                </div>
                <div class="field-group">
                    <label for="unidade">Unidade:</label>
                    <input type="text" id="unidade" name="posologia.unidade">
                </div>
                <div class="field-group">
                    <label for="duracao">Duração:</label>
                    <input type="text" id="duracao" name="posologia.duracao">
                </div>
                <div class="field-group">
                    <label for="instrucoesEspeciais">Instruções Especiais:</label>
                    <textarea id="instrucoesEspeciais" name="posologia.instrucoesEspeciais"></textarea>
                </div>
                <div class="field-group">
                    <label for="duracaoEfeito">Duração do Efeito:</label>
                    <input type="text" id="duracaoEfeito" name="duracaoEfeito">
                </div>
                <div class="field-group">
                    <label for="tempoParaUso">Tempo para Uso:</label>
                    <input type="text" id="tempoParaUso" name="tempoParaUso">
                </div>
                <div class="field-group">
                    <label for="dataInicioIngestao">Data de Início da Ingestão:</label>
                    <input type="date" id="dataInicioIngestao" name="dataInicioIngestao">
                </div>
                <div class="field-group">
                    <label for="dataFimIngestao">Data de Fim da Ingestão:</label>
                    <input type="date" id="dataFimIngestao" name="dataFimIngestao">
                </div>
                <div class="field-group">
                    <label for="observacoes">Observações:</label>
                    <textarea id="observacoes" name="observacoes"></textarea>
                </div>
                <button type="submit">Registrar</button>
            </form>

            <h2>Lista de Medicamentos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Paciente</th>
                        <th>Nome do Medicamento</th>
                        <th>Tipo de Posologia</th>
                        <th>Duração do Efeito</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="medicamentoTableBody">
                    <!-- Medicamentos serão listados aqui -->
                </tbody>
            </table>
        `;

        contentDiv.innerHTML = html; // Add content to the page

        // Fetch pacientes for select dropdown
        const pacienteSelect = document.getElementById('paciente');
        await fetch('/api/pacientes')
            .then(response => response.json())
            .then(pacientes => {
                pacientes.forEach(paciente => {
                    const option = document.createElement('option');
                    option.value = paciente._id;
                    option.textContent = `${paciente.Nome}`;
                    pacienteSelect.appendChild(option);
                });
            });

        // Add event listener to form only after it is in the DOM
        document.getElementById('medicamentoForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);

            const response = await fetch('/api/medicamentos', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Medicamento registrado com sucesso!');
                loadMedicamentos(); // Recarregar a lista após registrar
                e.target.reset(); // Limpar formulário
            } else {
                alert('Erro ao registrar medicamento.');
            }
        });

        const tableBody = document.getElementById('medicamentoTableBody');
        tableBody.innerHTML = '';

        medicamentos.forEach(medicamento => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${medicamento.paciente.Nome}</td>
                <td>${medicamento.detalhes.nome}</td>
                <td>${medicamento.posologia.tipo}</td>
                <td>${medicamento.duracaoEfeito}</td>
                <td>
                    <button onclick="editarMedicamento('${medicamento._id}')">Editar</button>
                    <button onclick="deletarMedicamento('${medicamento._id}')">Deletar</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading medicamentos:', error);
        contentDiv.innerHTML = '<p>Erro ao carregar medicamentos.</p>';
    }
}