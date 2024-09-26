// alimentos.js

document.addEventListener('DOMContentLoaded',async () => {

    let vitaminasEnum = [];
    let unidadesMedidaEnum = [];
    let mineraisEnum = [];

    // Fetch the enum values from the server
    try {
        const enumsResponse = await fetch('/api/enums');
        if (enumsResponse.ok) {
            const enumsData = await enumsResponse.json();
            vitaminasEnum = enumsData.vitaminas;
            unidadesMedidaEnum = enumsData.unidadesMedida;
            mineraisEnum = enumsData.minerais;
        } else {
            console.error('Failed to fetch enum values.');
        }
    } catch (error) {
        console.error('Error fetching enums:', error);
    }

    
    // Function to load alimentos
    async function loadAlimentos() {
        const contentDiv = document.getElementById('registroContent');

        try {
            const response = await fetch('/api/alimentos');
            const alimentos = await response.json();

            const html = `
                <h2>Registrar Novo Alimento</h2>
                <form id="alimentoForm">
                    <div class="field-group">
                        <label for="nome">Nome do Alimento:</label>
                        <input type="text" id="nome" name="nome" required>
                    </div>
                    <div class="field-group">
                        <label for="tipo">Tipo:</label>
                        <select id="tipo" name="tipo" required>
                            <option value="" disabled selected>Selecione</option>
                            <option value="Carboidrato">Carboidrato</option>
                            <option value="Proteína">Proteína</option>
                            <option value="Gordura">Gordura</option>
                            <option value="Fruta">Fruta</option>
                            <option value="Vegetal">Vegetal</option>
                            <option value="Laticínio">Laticínio</option>
                            <option value="Bebida">Bebida</option>
                        </select>
                    </div>
                    <div class="field-group">
                        <label for="porcao">Porção:</label>
                        <input type="text" id="porcao" name="porcao">
                    </div>
                    <div class="field-group">
                        <label for="calorias">Calorias:</label>
                        <input type="number" id="calorias" name="calorias" min="0">
                    </div>

                    <div class="field-group">
                        <label for="vitaminas">Vitaminas:</label>
                        <table id="vitaminasTable">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Quantidade</th>
                                    <th>Unidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" name="vitaminas[0][nome]" placeholder="Nome da vitamina"></td>
                                    <td><input type="number" name="vitaminas[0][quantidade]" placeholder="Quantidade"></td>
                                    <td><select name="vitaminas[0][unidadeMedida]">
                                        ${unidadesMedidaEnum.map(unidade => `<option value="${unidade}">${unidade}</option>`).join('')}
                                    </select></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" onclick="addVitaminaRow()">Adicionar mais vitaminas</button>
                    </div>

                    <div class="field-group">
                        <label for="minerais">Minerais:</label>
                        <table id="mineraisTable">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Quantidade</th>
                                    <th>Unidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" name="minerais[0][nome]" placeholder="Nome do mineral"></td>
                                    <td><input type="number" name="minerais[0][quantidade]" placeholder="Quantidade"></td>
                                    <td><select name="minerais[0][unidadeMedida]">
                                        ${unidadesMedidaEnum.map(unidade => `<option value="${unidade}">${unidade}</option>`).join('')}
                                    </select></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" onclick="addMineralRow()">Adicionar mais minerais</button>
                    </div>
                    <button type="submit">Registrar</button>
                </form>

                <table>
                    ${alimentos.map(alimento => `
                        <tr>
                            <td>${alimento.nome}</td>
                            <td>${alimento.tipo}</td>
                            <td>${alimento.calorias || '-'}</td>
                            <td>${alimento.vitaminas ? alimento.vitaminas.map(vitamina => `${vitamina.tipo}: ${vitamina.quantidade} ${vitamina.unidadeMedida}`).join(', ') : '-'}</td>
                            <td>${alimento.minerais ? alimento.minerais.map(mineral => `${mineral.tipo}: ${mineral.quantidade} ${mineral.unidadeMedida}`).join(', ') : '-'}</td>
                            <td>
                                <button type="button" onclick="editarAlimento('${alimento._id}')">Editar</button>
                                <button type="button" onclick="deletarAlimento('${alimento._id}')">Deletar</button>
                            </td>
                        </tr>
                    `).join('')}
                </table>
            `;

            contentDiv.innerHTML = html;

            // Function to add more rows for vitamins
            window.addVitaminaRow = function addVitaminaRow() {
                const tableBody = document.getElementById('vitaminasTable').querySelector('tbody');
                const newRow = tableBody.insertRow(tableBody.rows.length);
                newRow.innerHTML = `
                    <td><input type="text" name="vitaminas[${tableBody.rows.length - 1}][nome]" placeholder="Nome da vitamina"></td>
                    <td><input type="number" name="vitaminas[${tableBody.rows.length - 1}][quantidade]" placeholder="Quantidade"></td>
                    <td><select name="vitaminas[${tableBody.rows.length - 1}][unidadeMedida]">
                        ${unidadesMedidaEnum.map(unidade => `<option value="${unidade}">${unidade}</option>`).join('')}
                    </select></td>
                `;
            };
        
            // Function to add more rows for minerals
            window.addMineralRow = function addMineralRow() {
                const tableBody = document.getElementById('mineraisTable').querySelector('tbody');
                const newRow = tableBody.insertRow(tableBody.rows.length);
                newRow.innerHTML = `
                    <td><input type="text" name="minerais[${tableBody.rows.length - 1}][nome]" placeholder="Nome do mineral"></td>
                    <td><input type="number" name="minerais[${tableBody.rows.length - 1}][quantidade]" placeholder="Quantidade"></td>
                    <td><select name="minerais[${tableBody.rows.length - 1}][unidadeMedida]">
                        ${unidadesMedidaEnum.map(unidade => `<option value="${unidade}">${unidade}</option>`).join('')}
                    </select></td>
                `;
            };

            // Function to edit an alimento
            window.editarAlimento = function editarAlimento(id) {
                document.getElementById('alimentoForm').dataset.id = id;
                fetch(`/api/alimentos/${id}`)
                    .then(response => response.json())
                    .then(alimento => {
                        document.getElementById('nome').value = alimento.nome;
                        document.getElementById('tipo').value = alimento.tipo;
                        document.getElementById('porcao').value = alimento.porcao;
                        document.getElementById('calorias').value = alimento.calorias;

                        // Preencher vitaminas
                        const vitaminaTable = document.getElementById('vitaminasTable');
                        vitaminaTable.tBodies[0].innerHTML = '';
                        alimento.vitaminas.forEach((vitamina, index) => {
                            addVitaminaRow();
                            const row = vitaminaTable.tBodies[0].rows[index];
                            row.cells[0].querySelector('input').value = vitamina.tipo;
                            row.cells[1].querySelector('input').value = vitamina.quantidade;
                            row.cells[2].querySelector('select').value = vitamina.unidadeMedida;
                        });

                        // Preencher minerais
                        const mineralTable = document.getElementById('mineraisTable');
                        mineralTable.tBodies[0].innerHTML = '';
                        alimento.minerais.forEach((mineral, index) => {
                            addMineralRow();
                            const row = mineralTable.tBodies[0].rows[index];
                            row.cells[0].querySelector('input').value = mineral.tipo;
                            row.cells[1].querySelector('input').value = mineral.quantidade;
                            row.cells[2].querySelector('select').value = mineral.unidadeMedida;
                        });
                    })
                    .catch(error => console.error('Error fetching alimento:', error));

                document.getElementById('nome').focus();
            };

            // Function to delete an alimento
            window.deletarAlimento = async function deletarAlimento(id) {
                if (confirm('Tem certeza que deseja deletar este alimento?')) {
                    const response = await fetch(`/api/alimentos/${id}`, {
                        method: 'DELETE'
                    });
                    const result = await response.json();
                    if (result.success) {
                        alert('Alimento deletado com sucesso!');
                        loadAlimentos(); // reload alimentos after delete
                    } else {
                        alert('Erro ao deletar alimento.');
                    }
                }
            };

            document.getElementById('alimentoForm').addEventListener('submit', async (e) => {
                e.preventDefault();
        
                const formData = new FormData(e.target);
                const id = e.target.dataset.id;
        
                // Convert FormData to JSON, including vitamins and minerals
                const jsonData = {};
                formData.forEach((value, key) => {
                    jsonData[key] = value;
                });
        
                // Handle vitaminas and minerais arrays
                const vitaminas = [];
                const minerais = [];
        
                document.querySelectorAll('#vitaminasTable tbody tr').forEach((row, index) => {
                    vitaminas.push({
                        nome: row.querySelector(`input[name="vitaminas[${index}][nome]"]`).value,
                        quantidade: parseFloat(row.querySelector(`input[name="vitaminas[${index}][quantidade]"]`).value),
                        unidadeMedida: row.querySelector(`select[name="vitaminas[${index}][unidadeMedida]"]`).value,
                    });
                });
        
                document.querySelectorAll('#mineraisTable tbody tr').forEach((row, index) => {
                    minerais.push({
                        nome: row.querySelector(`input[name="minerais[${index}][nome]"]`).value,
                        quantidade: parseFloat(row.querySelector(`input[name="minerais[${index}][quantidade]"]`).value),
                        unidadeMedida: row.querySelector(`select[name="minerais[${index}][unidadeMedida]"]`).value,
                    });
                });
        
                jsonData.vitaminas = vitaminas;
                jsonData.minerais = minerais;
        
                let response;
                try {
                    if (id) {
                        // Update existing alimento
                        response = await fetch(`/api/alimentos/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jsonData)
                        });
                    } else {
                        // Create new alimento
                        response = await fetch('/api/alimentos', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jsonData)
                        });
                    }
        
                    if (response.ok) {
                        alert(id ? 'Alimento atualizado com sucesso!' : 'Alimento registrado com sucesso!');
                        loadAlimentos(); // reload alimentos after successful registration or update
                        e.target.reset(); // clear form
                        delete e.target.dataset.id; // remove stored ID
                    } else {
                        const errorText = await response.text();
                        alert(`Erro ao ${id ? 'atualizar' : 'registrar'} alimento: ${errorText}`);
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('Erro na requisição. Verifique os dados e tente novamente.');
                }
            });
            

        } catch (error) {
            console.error('Error loading alimentos:', error);
            contentDiv.innerHTML = '<p>Erro ao carregar alimentos.</p>';
        }
    }

    // Expose the loadAlimentos function globally
    window.loadAlimentos = loadAlimentos;
});
