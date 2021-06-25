const mongoose = require('mongoose');

module.exports = app => {

    const schemaPedido = mongoose.Schema(
        {
            id_cliente:{type:String,required:true},
            EmailCliente:{type:String,required:true},
            data_compra:{type:Date,required:true},
            previsao_entrega:{type:String,required:true},
            Produtos:[
                {
                    id_produto:{type:String},
                    Descricao:{type:String},
                    Qtd_Produto:{type:String},
                    Valor_unitario:{type:String}
                }
            ],

            Forma_pagamento:{
                ehBoleto:{type:Boolean},
                Numero_Boleto:{type:String}
            },

            Frete: {type:Number,required:true},
            Total_items:{type:Number,required:true},
            Total_Valor:{type:Number,required:true},
        }
    )

    const PedidoDB =  mongoose.model('Pedido',schemaPedido);

    return PedidoDB

}