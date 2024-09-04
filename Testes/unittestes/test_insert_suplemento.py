from test_base import TestBase

class TestInsertSuplemento(TestBase):
    def test_insert_suplemento(self):
        query = """INSERT INTO Suplemento (Nome, Descricao, Dosagem, Tipo, Forma)
                   VALUES ('Vitamina D', 'Suplemento de vitamina D para fortalecer os ossos', '1000 IU/dia', 'Vitamina', 'Comprimido')"""
        self.cursor.execute(query)
        self.cursor.execute("SELECT * FROM Suplemento WHERE Nome = 'Vitamina D'")
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[1], 'Vitamina D')
