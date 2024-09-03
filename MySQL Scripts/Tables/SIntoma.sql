CREATE TABLE Sintoma (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Gravidade ENUM('Leve', 'Moderada', 'Grave'),
    Duracao VARCHAR(50),
    Categoria VARCHAR(100),
    DataInicio DATE
)