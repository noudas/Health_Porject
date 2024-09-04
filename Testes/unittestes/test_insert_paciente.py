from test_base import TestBase

class TestInsertPaciente(TestBase):
    def test_insert_paciente(self):
        query = """INSERT INTO Paciente (CPF, Telefone, Celular, Nome, Sexo, Email, Altura, Peso, DataNascimento)
                   VALUES ('12345678901', '11987654321', '11987654322', 'John Doe', 'Masculino', 'john.doe@example.com', 1.75, 70, '1990-01-01')"""
        self.cursor.execute(query)
        self.cursor.execute("SELECT * FROM Paciente WHERE CPF = '12345678901'")
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[4], 'John Doe')
