CREATE TABLE Paciente (
    ID_Paciente INT AUTO_INCREMENT PRIMARY KEY,
    CPF CHAR(11) NOT NULL UNIQUE,
    Telefone varchar(20) not null,
    Celular varchar(20),
    Nome VARCHAR(100) NOT NULL,
    Sexo ENUM('Masculino', 'Feminino') NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Altura DECIMAL(4,2),
    Peso DECIMAL(5,2),
    IMC DECIMAL(5,2) AS (Peso / (Altura * Altura)) STORED,
    DataNascimento DATE,
    DataRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)