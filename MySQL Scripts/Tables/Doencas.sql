CREATE TABLE Doenca (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Tipo ENUM('Infecciosa', 'Genética', 'Crônica', 'Aguda', 'Degenerativa', 'Autoimune', 'Outros') NOT NULL,
    CID10 VARCHAR(10) NOT NULL
);