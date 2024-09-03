CREATE TABLE Emocional (
    ID_Emocional INT AUTO_INCREMENT PRIMARY KEY,
    ID_Paciente INT,
    DataRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Descricao TEXT NOT NULL,
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente)
);