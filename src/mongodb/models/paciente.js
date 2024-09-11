const { model, Schema } = require('mongoose');

const schemas = require('./schemas');


const pacienteSchema = new Schema({
    CPF: {
        type: String,
        required: true,
        unique: true,
        minlength: 11,
        maxlength: 11
    },
    Telefone: {
        type: String,
        required: true,
        maxlength: 20  // Limita a 20 caracteres
    },
    Celular: {
        type: String,
        maxlength: 20  // Limita a 20 caracteres
    },
    Nome: {
        type: String,
        required: true,
        maxlength: 100  // Limita a 100 caracteres
    },
    Sexo: {
        type: String,
        enum: ['Masculino', 'Feminino'],
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255  // Limita a 255 caracteres
    },
    Altura: {
        type: Number,
        min: 0,
        max: 9999.99, // Altura com até 4 dígitos no total e 2 casas decimais
    },
    Peso: {
        type: Number,
        min: 0,
        max: 999.99, // Peso com até 5 dígitos no total e 2 casas decimais
    },
    IMC: {
        type: Number,
        default: function () {
            if (this.Altura && this.Peso) {
                return this.Peso / (this.Altura * this.Altura);
            }
            return null;
        }
    },
    CircunferenciaAbdominal: {
        type: Number,
        min: 0,
        max: 999.99, // Limita a 5 dígitos no total e 2 casas decimais
    },
    HorarioAcordar: {
        type: Date,
    },
    Hidratacao: {
        type: String,
        maxlength: 255
    },
    Sono: {
        type: String,
        maxlength: 255
    },
    Intestino: {
        type: String,
        maxlength: 255
    },
    DataNascimento: {
        type: Date,
    },
    DataRegistro: {
        type: Date,
        default: Date.now
    },

    alergias: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Alergia' 
    }],

    emocionais: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Emocional' 
    }],

    esportes: [{
        esporte: {
            type: Schema.Types.ObjectId,
            ref: 'Esporte',
            required: true
        },
        frequencia: {
            type: String,
            maxlength: 50
        }
    }],

    suplementos: [{
        suplemento: {
            type: Schema.Types.ObjectId,
            ref: 'Suplemento',
            required: true
        },
        frequencia: {
            type: String,
            maxlength: 50
        },
        dosagemPaciente: {
            type: String,
            maxlength: 50
        }
    }],

    sintomas: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Sintoma' 
    }],

    doencas: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Doenca' 
    }],

    historicosFamiliares: [{
        familia: {
            type: String,
            maxlength: 100,
            enum: ['Pai', 'Mãe', 'Avô', 'Avó', 'Tio', 'Tia', 'Primo', 'Prima', 'Outro']
        },
        doenca: {
            type: Schema.Types.ObjectId,
            ref: 'Doenca'
        }
    }],

    dieta: {
        type: dietaSchema,
        default: null
    },

    horarios: {
        type: [horarioSchema],
        default: []
    },

    medicamentos: [{
        type: Schema.Types.ObjectId,
        ref: 'Medicamento'
    }],

});

const Paciente = model('Paciente', pacienteSchema);

module.exports = Paciente;
