import unittest
from db_connection import DatabaseConnection

class TestBase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        DatabaseConnection.connect()

    @classmethod
    def tearDownClass(cls):
        DatabaseConnection.close()

    def setUp(self):
        self.conn = DatabaseConnection.conn
        self.cursor = DatabaseConnection.cursor
        self.conn.autocommit = False

    def tearDown(self):
        self.conn.rollback()
