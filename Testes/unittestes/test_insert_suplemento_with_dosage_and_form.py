from test_base import TestBase

class TestInsertSuplementoWithDosageAndForm(TestBase):
    def test_insert_suplemento_with_dosage_and_form(self):
        query = """INSERT INTO Suplemento (Nome, Descricao, Dosagem, Tipo, Forma)
                   VALUES ('Ômega 3', 'Suplemento de Ômega 3 para saúde do coração', '2000 mg/dia', 'Outros', 'Gel')"""
        self.cursor.execute(query)
        self.cursor.execute("SELECT * FROM Suplemento WHERE Nome = 'Ômega 3'")
        result = self.cursor.fetchone()
        self.assertIsNotNone(result)
        self.assertEqual(result[1], 'Ômega 3')
        self.assertEqual(result[3], '2000 mg/dia')
        self.assertEqual(result[4], 'Outros')
