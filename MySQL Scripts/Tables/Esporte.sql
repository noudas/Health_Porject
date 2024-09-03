CREATE TABLE Esporte(
    ID_Esporte INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each sport
    Nome VARCHAR(100) NOT NULL, -- Name of the sport
    Categoria ENUM('Aeróbico', 'Anaeróbico', 'Flexibilidade', 'Força', 'Resistência') NOT NULL,
    Intensidade ENUM('Baixa', 'Moderada', 'Alta') NOT NULL,
    DuracaoMedia INT,
    CaloriasQueimadasPorHora INT,
    Localizacao VARCHAR(100)
)
