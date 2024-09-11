//Alergia Schema

const { model, Schema } = require('mongoose');

const alergiaSchema = new Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 100
    },
    descricao: {
        type: String
    },
    tipo: {
        type: String,
        enum: [     
            'Alimentar',             // Alergia a alimentos específicos (ex: amendoim, frutos do mar)
            'Medicamento',           // Alergia a medicamentos (ex: penicilina, ibuprofeno)
            'Ambiental',             // Alergia a poluentes, pólen, mofo, poeira, ácaros
            'Insectos',              // Alergia a picadas de insetos (ex: abelha, vespa)
            'Animais',               // Alergia a pelos, saliva ou urina de animais (ex: gatos, cães)
            'Latex',                 // Alergia ao látex, usado em luvas e outros produtos médicos
            'Fragrâncias',           // Alergia a perfumes ou produtos com fragrâncias fortes
            'Metais',                // Alergia a metais como níquel, cobalto ou ouro
            'Cosméticos',            // Alergia a produtos de higiene ou maquiagem (ex: sabão, shampoo)
            'Conservantes',          // Alergia a conservantes em alimentos ou produtos cosméticos
            'Temperatura',           // Alergia ao frio ou ao calor extremos
            'Outros'                 // Outros tipos de alergia não listados acima
            ],
        required: true
    },
    severidade: {
        type: String,
        enum: ['Leve', 'Moderada', 'Grave', 'Anafilática'],
        required: true
    },
    pacientes: [{ type: Schema.Types.ObjectId, ref: 'Paciente' }]
}, { timestamps: true });

module.exports = alergiaSchema;