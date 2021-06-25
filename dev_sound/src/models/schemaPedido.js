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
                    id_produto:{type:String,index:{unique:true}},
                    nome:{type:String}, 
                    categoria:{type:String},
                    qtd_Produto:{type:Number},
                    valor_unitario:{type:Number},    
                    valor_total_produto:{type:Number}   
                }
            ],  

            Forma_pagamento:{
                ehBoleto:{type:Boolean},
                Numero_Boleto:{type:String}
            },

            Frete: {type:Number,required:true},
            Valor_Total_items:{type:Number,required:true},
            Total_Valor:{type:Number,required:true},
        }
    )

    const PedidoDB =  mongoose.model('Pedido',schemaPedido);

    return PedidoDB

}