from test_base import TestBase

class TestInsertPacienteEsporte(TestBase):
    def test_insert_paciente_esporte(self):
        # Insert a new Paciente
        self.cursor.execute("""INSERT INTO Paciente (CPF, Telefone, Celular, Nome, Sexo, Email, Altura, Peso, DataNascimento)
                               VALUES ('12345678902', '11987654323', '11987654324', 'Maria Doe', 'Feminino', 'maria.doe@example.com', 1.70, 65, '1995-05-05')""")
        paciente_id = self.cursor.lastrowid

        # Insert a new Esporte
        self.cursor.execute("""INSERT INTO Esporte (Nome, Categoria, Intensidade, DuracaoMedia, CaloriasQueimadasPorHora, Localizacao)
                               VALUES ('Natação', 'Aeróbico', 'Moderada', 45, 400, 'Piscina')""")
        esporte_id = self.cursor.lastrowid

        # Link the Paciente and Esporte in PacienteEsporte table
        self.cursor.execute("""INSERT INTO PacienteEsporte (ID_Paciente, ID_Esporte, Frequencia)
                               VALUES (%s, %s, '3 vezes por semana')""", (paciente_id, esporte_id))

        # Verify the insertion in PacienteEsporte
        self.cursor.execute("SELECT * FROM PacienteEsporte WHERE ID_Paciente = %s AND ID_Esporte = %s", (paciente_id, esporte_id))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[0], paciente_id)
        self.assertEqual(result[1], esporte_id)
        self.assertEqual(result[2], '3 vezes por semana')