import unittest
import unittestes

# Import test cases
from unittestes.test_insert_paciente import TestInsertPaciente
from unittestes.test_insert_alergia import TestInsertAlergia
from unittestes.test_insert_paciente_alergia import TestInsertPacienteAlergia
from unittestes.test_insert_doenca import TestInsertDoenca
from unittestes.test_insert_esporte import TestInsertEsporte
from unittestes.test_insert_paciente_esporte import TestInsertPacienteEsporte
from unittestes.test_insert_suplemento import TestInsertSuplemento
from unittestes.test_insert_suplemento_with_dosage_and_form import TestInsertSuplementoWithDosageAndForm
from unittestes.test_insert_historicofamiliar import TestInsertHistoricoFamiliar

def suite():
    # Create a test suite
    suite = unittest.TestSuite()
    
    # Create a test loader
    loader = unittest.TestLoader()
    
    # Add test cases to the suite
    suite.addTests(loader.loadTestsFromTestCase(TestInsertPaciente))
    suite.addTests(loader.loadTestsFromTestCase(TestInsertAlergia))
    suite.addTests(loader.loadTestsFromTestCase(TestInsertPacienteAlergia))
    suite.addTests(loader.loadTestsFromTestCase(TestInsertDoenca))
    suite.addTests(loader.loadTestsFromTestCase(TestInsertEsporte))
    suite.addTests(loader.loadTestsFromTestCase(TestInsertPacienteEsporte))
    suite.addTests(loader.loadTestsFromTestCase(TestInsertSuplemento))
    suite.addTests(loader.loadTestsFromTestCase(TestInsertSuplementoWithDosageAndForm))
    suite.addTests(loader.loadTestsFromTestCase(TestInsertHistoricoFamiliar))
    
    return suite

if __name__ == '__main__':
    # Run the test suite
    runner = unittest.TextTestRunner()
    runner.run(suite())
