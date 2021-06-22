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

            Endereco: {
                cep: { type: String },
                rua: { type: String },
                numero: { type: Number },
                bairro: { type: String },
                cidade: { type: String },
                UF: { type: String }, 
            },

            // Pedidos: [
            //     {
            //         idPedido: { type: Number, required: true, index: { unique: true } },
            //         dataPedido: { type: Date, required: true },
            //         formaPagamento: { type: String, required: true },
            //         status: { type: String },
            //     }

            //     , {
            //         idPedido: { type: Number, required: true, index: { unique: true } },
            //         dataPedido: { type: Date, required: true },
            //         formaPagamento: { type: String, required: true },
            //         status: { type: String },
            //     }
            // ]

        }
    );
    const UsuarioDB = mongoose.model('usuarios', schemaUsuarios);

    return UsuarioDB;

}