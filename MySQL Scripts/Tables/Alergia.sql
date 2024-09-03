Create table Alergia(
    ID_Alergia INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Tipo ENUM('Alimentar', 'Medicamento', 'Ambiental', 'Outros') NOT NULL,
    Severidade ENUM('Leve', 'Moderada', 'Grave', 'Anafilática') NOT NULL
)