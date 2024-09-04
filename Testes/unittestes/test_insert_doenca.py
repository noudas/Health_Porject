from test_base import TestBase

class TestInsertDoenca(TestBase):
    def test_insert_doenca(self):
        query = """INSERT INTO Doenca (Nome, Descricao, Tipo, CID10)
                   VALUES ('Diabetes', 'Doença crônica que afeta o metabolismo do corpo', 'Crônica', 'E10')"""
        self.cursor.execute(query)
        self.cursor.execute("SELECT * FROM Doenca WHERE Nome = 'Diabetes'")
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[1], 'Diabetes')
