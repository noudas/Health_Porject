from test_base import TestBase

class TestInsertPacienteAlergia(TestBase):
    def test_insert_paciente_alergia(self):
        # Insert a new Paciente
        self.cursor.execute("""INSERT INTO Paciente (CPF, Telefone, Celular, Nome, Sexo, Email, Altura, Peso, DataNascimento)
                               VALUES ('98765432100', '11987654300', '11987654300', 'Jane Doe', 'Feminino', 'jane.doe@example.com', 1.65, 60, '1992-02-02')""")
        paciente_id = self.cursor.lastrowid

        # Insert a new Alergia
        self.cursor.execute("""INSERT INTO Alergia (Nome, Descricao, Tipo, Severidade)
                               VALUES ('Glúten', 'Alergia a produtos com glúten', 'Alimentar', 'Grave')""")
        alergia_id = self.cursor.lastrowid

        # Link the Paciente and Alergia in PacienteAlergia table
        self.cursor.execute("""INSERT INTO PacienteAlergia (ID_Paciente, ID_Alergia)
                               VALUES (%s, %s)""", (paciente_id, alergia_id))

        # Verify the insertion in PacienteAlergia
        self.cursor.execute("SELECT * FROM PacienteAlergia WHERE ID_Paciente = %s AND ID_Alergia = %s", (paciente_id, alergia_id))
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[0], paciente_id)
        self.assertEqual(result[1], alergia_id)
