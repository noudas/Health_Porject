CREATE TABLE Suplemento (
    ID_Suplemento INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    Dosagem VARCHAR(50) NOT NULL,
    Tipo ENUM('Vitamina', 'Mineral', 'Aminoácido', 'Fitoterápico', 'Proteína', 'Outros') NOT NULL,
    Forma ENUM('Comprimido', 'Cápsula', 'Pó', 'Líquido', 'Gel', 'Outros') NOT NULL
);
