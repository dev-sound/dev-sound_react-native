const mongoose = require('mongoose');

module.exports = (app) => {

    const Schema = mongoose.Schema;

    const schemaUsuarios = Schema(
        {
            nome: { type: String, required: true },
            sobrenome: { type: String, required: true },
            email: { type: String, required: true, index: { unique: true } },
            telefone: { type: Number, required: true },
            senhaValida: { type: String, required: true },
            cartaoCredito:{type:String},
            Endereco: {
                cep: { type: String },
                rua: { type: String },
                numero: { type: Number },
                bairro: { type: String },
                cidade: { type: String },
                UF: { type: String }, 
            },

            Pedidos: []

        }
    );
    const UsuarioDB = mongoose.model('usuarios', schemaUsuarios);

    return UsuarioDB;

}