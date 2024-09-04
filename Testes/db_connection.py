import mysql.connector
from config import get_db_config

class DatabaseConnection:
    @classmethod
    def connect(cls):
        config = get_db_config()
        cls.conn = mysql.connector.connect(**config)
        cls.cursor = cls.conn.cursor()
        print(f"Connected to database with user: {config['user']}")

    @classmethod
    def close(cls):
        cls.cursor.close()
        cls.conn.close()
