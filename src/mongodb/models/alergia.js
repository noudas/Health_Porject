// mongodb/models/alergia.js

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
            'Alimentar',
            'Medicamento',
            'Ambiental',
            'Insectos',
            'Animais',
            'Latex',
            'Fragrâncias',
            'Metais',
            'Cosméticos',
            'Conservantes',
            'Temperatura',
            'Outros'
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

const Alergia = model('Alergia', alergiaSchema);

module.exports = Alergia;
