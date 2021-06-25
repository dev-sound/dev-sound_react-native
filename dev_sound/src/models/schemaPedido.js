const mongoose = require('mongoose');

module.exports = app => {

    const schemaPedido = mongoose.Schema(
        {
            id_cliente:{type:String,required:true},
            EmailCliente:{},
            data_compra:{},
            previsao_entrega:{},
            Produtos:[
                {}
            ],

            Forma_pagamento:{
                ehBoleto::{},
                Numero_Boleto:{},
                Numero_transacao:{},
            },

            Frete: {},
            Total_items:{},
            Total_Valor:{},
    )

    const PedidoDB =  mongoose.model('Pedido',schemaPedido);

    return PedidoDB

}