create table SintomaDoenca(
ID_Doenca int,
ID_Sintoma int,
primary key (ID_Doenca,ID_Sintoma),
foreign key (ID_Sintoma) references Sintoma(ID),
foreign key (ID_Doenca) references Doenca(ID)
)