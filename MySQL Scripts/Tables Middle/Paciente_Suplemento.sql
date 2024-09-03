CREATE TABLE PacienteSuplemento (
    ID_Paciente INT,
    ID_Suplemento INT,
    PRIMARY KEY (ID_Paciente, ID_Suplemento),
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente),
    FOREIGN KEY (ID_Suplemento) REFERENCES Suplemento(ID_Suplemento)
);