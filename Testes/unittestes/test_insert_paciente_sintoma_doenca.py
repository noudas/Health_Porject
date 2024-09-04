from test_base import TestBase

class TestInsertPacienteSintomaDoenca(TestBase):
    def test_insert_Paciente_Sintoma_Doenca(self):
        try:
            # Insert a new Paciente
            paciente_query = """INSERT INTO Paciente (CPF, Telefone, Celular, Nome, Sexo, Email, Altura, Peso, DataNascimento)
                                VALUES ('12345678901', '11987654321', '11987654322', 'John Doe', 'Masculino', 'john.doe@example.com', 1.75, 70, '1990-01-01')"""
            self.cursor.execute(paciente_query)
            self.cursor.execute("SELECT * FROM Paciente WHERE CPF = '12345678901'")
            paciente_result = self.cursor.fetchone()
            self.assertIsNotNone(paciente_result)
            self.assertEqual(paciente_result[4], 'John Doe')
            paciente_id = paciente_result[0]  # Get the ID of the inserted patient

            # Insert a new Sintoma
            sintoma_query = """INSERT INTO Sintoma (Nome, Descricao, Gravidade, Duracao, Categoria, DataInicio)
                            VALUES ('Dor de cabeça', 'Dor intensa na cabeça', 'Grave', '24 horas', 'Neurológico', '2024-09-01')"""
            self.cursor.execute(sintoma_query)
            self.cursor.execute("SELECT * FROM Sintoma WHERE Nome = 'Dor de cabeça'")
            sintoma_result = self.cursor.fetchone()
            self.assertIsNotNone(sintoma_result)
            self.assertEqual(sintoma_result[1], 'Dor de cabeça')
            sintoma_id = sintoma_result[0]  # Get the ID of the inserted symptom

            # Insert a new Doenca
            doenca_query = """INSERT INTO Doenca (Nome, Descricao, Tipo, CID10)
                            VALUES ('Enxaqueca', 'Doença que causa dores de cabeça intensas', 'Crônica', 'G43')"""
            self.cursor.execute(doenca_query)
            self.cursor.execute("SELECT * FROM Doenca WHERE Nome = 'Enxaqueca'")
            doenca_result = self.cursor.fetchone()
            self.assertIsNotNone(doenca_result)
            self.assertEqual(doenca_result[1], 'Enxaqueca')
            doenca_id = doenca_result[0]  # Get the ID of the inserted disease

            # Link Paciente and Sintoma in PacienteSintoma
            paciente_sintoma_query = """INSERT INTO PacienteSintoma (ID_Paciente, ID_Sintoma)
                                        VALUES (%s, %s)"""
            self.cursor.execute(paciente_sintoma_query, (paciente_id, sintoma_id))

            # Verify the insertion in PacienteSintoma
            self.cursor.execute("SELECT * FROM PacienteSintoma WHERE ID_Paciente = %s AND ID_Sintoma = %s", (paciente_id, sintoma_id))
            paciente_sintoma_result = self.cursor.fetchone()
            self.assertIsNotNone(paciente_sintoma_result)
            self.assertEqual(paciente_sintoma_result[0], paciente_id)
            self.assertEqual(paciente_sintoma_result[1], sintoma_id)

            # Link Sintoma and Doenca in SintomaDoenca
            sintoma_doenca_query = """INSERT INTO SintomaDoenca (ID_Sintoma, ID_Doenca)
                                    VALUES (%s, %s)"""
            self.cursor.execute(sintoma_doenca_query, (sintoma_id, doenca_id))

            # Verify the insertion in SintomaDoenca
            self.cursor.execute("SELECT * FROM SintomaDoenca WHERE ID_Sintoma = %s AND ID_Doenca = %s", (sintoma_id, doenca_id))
            sintoma_doenca_result = self.cursor.fetchone()
            self.assertIsNotNone(sintoma_doenca_result)
            self.assertEqual(sintoma_doenca_result[0], doenca_id)
            self.assertEqual(sintoma_doenca_result[1], sintoma_id)

        except Exception as e:
            self.fail(f"Test failed due to an unexpected exception: {e}")
