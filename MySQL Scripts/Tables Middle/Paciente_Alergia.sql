CREATE TABLE PacienteAlergia (
    ID_Paciente INT,
    ID_Alergia INT,
    PRIMARY KEY (ID_Paciente, ID_Alergia),
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente),
    FOREIGN KEY (ID_Alergia) REFERENCES Alergia(ID_Alergia)
);
