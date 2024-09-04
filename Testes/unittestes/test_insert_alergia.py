from test_base import TestBase

class TestInsertAlergia(TestBase):
    def test_insert_alergia(self):
        query = """INSERT INTO Alergia (Nome, Descricao, Tipo, Severidade)
                   VALUES ('Pólen', 'Alergia a pólen de flores', 'Ambiental', 'Moderada')"""
        self.cursor.execute(query)
        self.cursor.execute("SELECT * FROM Alergia WHERE Nome = 'Pólen'")
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[1], 'Pólen')
