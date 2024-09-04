use health;

CREATE TABLE Paciente (
    ID_Paciente INT AUTO_INCREMENT PRIMARY KEY,
    CPF CHAR(11) NOT NULL UNIQUE,
    Telefone varchar(20) not null,
    Celular varchar(20),
    Nome VARCHAR(100) NOT NULL,
    Sexo ENUM('Masculino', 'Feminino') NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Altura DECIMAL(4,2),
    Peso DECIMAL(5,2),
    IMC DECIMAL(5,2) AS (Peso / (Altura * Altura)) STORED,
    DataNascimento DATE,
    DataRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Suplemento (
    ID_Suplemento INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Dosagem VARCHAR(50) NOT NULL,
    Tipo ENUM('Vitamina', 'Mineral', 'Aminoácido', 'Fitoterápico', 'Proteína', 'Outros') NOT NULL,
    Forma ENUM('Comprimido', 'Cápsula', 'Pó', 'Líquido', 'Gel', 'Outros') NOT NULL
);

CREATE TABLE Sintoma (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Gravidade ENUM('Leve', 'Moderada', 'Grave'),
    Duracao VARCHAR(50),
    Categoria VARCHAR(100),
    DataInicio DATE
);

CREATE TABLE Esporte(
    ID_Esporte INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each sport
    Nome VARCHAR(100) NOT NULL, -- Name of the sport
    Categoria ENUM('Aeróbico', 'Anaeróbico', 'Flexibilidade', 'Força', 'Resistência') NOT NULL,
    Intensidade ENUM('Baixa', 'Moderada', 'Alta') NOT NULL,
    DuracaoMedia INT,
    CaloriasQueimadasPorHora INT,
    Localizacao VARCHAR(100)
);

CREATE TABLE Emocional (
    ID_Emocional INT AUTO_INCREMENT PRIMARY KEY,
    ID_Paciente INT,
    DataRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Descricao TEXT NOT NULL,
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente)
);

CREATE TABLE Doenca (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Tipo ENUM('Infecciosa', 'Genética', 'Crônica', 'Aguda', 'Degenerativa', 'Autoimune', 'Outros') NOT NULL,
    CID10 VARCHAR(10) NOT NULL
);

CREATE TABLE HistoricoFamiliar (
    ID_Historico INT AUTO_INCREMENT PRIMARY KEY,
    ID_Paciente INT,
    ID_Doenca INT,
    RelacaoFamilia VARCHAR(100),
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente),
    FOREIGN KEY (ID_Doenca) REFERENCES Doenca(ID)
);

Create table Alergia(
    ID_Alergia INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Tipo ENUM('Alimentar', 'Medicamento', 'Ambiental', 'Outros') NOT NULL,
    Severidade ENUM('Leve', 'Moderada', 'Grave', 'Anafilática') NOT NULL
);

CREATE TABLE PacienteAlergia (
    ID_Paciente INT,
    ID_Alergia INT,
    PRIMARY KEY (ID_Paciente, ID_Alergia),
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente),
    FOREIGN KEY (ID_Alergia) REFERENCES Alergia(ID_Alergia)
);

create table PacienteEsporte (
ID_Paciente int,
ID_Esporte int,
Frequencia varchar(50),
primary key (ID_Paciente, ID_Esporte),
foreign key (ID_Paciente) references Paciente(ID_Paciente),
foreign key (ID_Esporte) references Esporte(ID_Esporte)
);

create table SintomaDoenca(
ID_Doenca int,
ID_Sintoma int,
primary key (ID_Doenca,ID_Sintoma),
foreign key (ID_Sintoma) references Sintoma(ID),
foreign key (ID_Doenca) references Doenca(ID)
);

CREATE TABLE PacienteSuplemento (
    ID_Paciente INT,
    ID_Suplemento INT,
    Frequencia varchar(50), 
    Dosagem VARCHAR(50),
    PRIMARY KEY (ID_Paciente, ID_Suplemento),
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente),
    FOREIGN KEY (ID_Suplemento) REFERENCES Suplemento(ID_Suplemento)
);