CREATE TABLE PacienteSintoma (
    ID_Paciente INT,
    ID_Sintoma INT,
    PRIMARY KEY (ID_Paciente, ID_Sintoma),
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente),
    FOREIGN KEY (ID_Sintoma) REFERENCES Sintoma(ID)
);