from test_base import TestBase

class TestInsertEsporte(TestBase):
    def test_insert_esporte(self):
        query = """INSERT INTO Esporte (Nome, Categoria, Intensidade, DuracaoMedia, CaloriasQueimadasPorHora, Localizacao)
                   VALUES ('Corrida', 'Aeróbico', 'Alta', 60, 600, 'Parque')"""
        self.cursor.execute(query)
        self.cursor.execute("SELECT * FROM Esporte WHERE Nome = 'Corrida'")
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[1], 'Corrida')