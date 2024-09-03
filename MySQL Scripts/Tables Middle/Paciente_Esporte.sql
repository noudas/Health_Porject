create table PacienteEsporte (
ID_Paciente int,
ID_Esporte int,
Frequencia varchar(50),
primary key (ID_Paciente, ID_Esporte),
foreign key (ID_Paciente) references Paciente(ID_Paciente),
foreign key (ID_Esporte) references Esporte(ID_Esporte)
)