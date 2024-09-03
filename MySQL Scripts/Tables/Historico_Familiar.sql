CREATE TABLE HistoricoFamiliar (
    ID_Historico INT AUTO_INCREMENT PRIMARY KEY,
    ID_Paciente INT,
    ID_Doenca INT,
    RelacaoFamilia VARCHAR(100),
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente),
    FOREIGN KEY (ID_Doenca) REFERENCES Doenca(ID)
);