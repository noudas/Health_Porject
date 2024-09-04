from test_base import TestBase

class TestInsertHistoricoFamiliar(TestBase):
    def test_insert_historico(self):
        # Insert a new Paciente
        query = """INSERT INTO Paciente (CPF, Telefone, Celular, Nome, Sexo, Email, Altura, Peso, DataNascimento)
                   VALUES ('12345678902', '11987654323', '11987654324', 'Jane Doe', 'Feminino', 'jane.doe@example.com', 1.65, 60, '1992-02-02')"""
        self.cursor.execute(query)
        paciente_id = self.cursor.lastrowid  # Retrieve the ID of the inserted Paciente

        # Insert a new Doenca
        query = """INSERT INTO Doenca (Nome, Descricao, Tipo, CID10)
                   VALUES ('Hipertensão', 'Pressão arterial elevada', 'Crônica', 'I10')"""
        self.cursor.execute(query)
        doenca_id = self.cursor.lastrowid  # Retrieve the ID of the inserted Doenca

        # Insert into HistoricoFamiliar to link Paciente and Doenca
        query = """INSERT INTO HistoricoFamiliar (ID_Paciente, ID_Doenca, RelacaoFamilia)
                   VALUES (%s, %s, 'Pai')"""
        self.cursor.execute(query, (paciente_id, doenca_id))

        # Verify the insertion in HistoricoFamiliar
        query = """SELECT * FROM HistoricoFamiliar WHERE ID_Paciente = %s AND ID_Doenca = %s"""
        self.cursor.execute(query, (paciente_id, doenca_id))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[1], paciente_id)
        self.assertEqual(result[2], doenca_id)
        self.assertEqual(result[3], 'Pai')
