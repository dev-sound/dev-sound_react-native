const mongoose = require('mongoose');


module.exports = app => {

    const schemaProdutos = mongoose.Schema
    (
        {
            id_Produto:{type:String,required:true,index:{unique:true}},
            Descrição_Produto:{type:String,required:true},
            Categoria_Produto:{type:String,required:true},
            Serie_Produto:{type:String,required:true},
            Img_Produto:{type:String},
            Fabricante:{type:String,required:true},
            Especificacao:{type:String,required:true},
            Modelo_Produto:{type:String,required:true},
            Preco_unitario:{type:Number,required:true},
            Estoque:{type:Number,required:true}
        }
    ) 

    const produtosDB = mongoose.model('Produtos', schemaProdutos)
    
    return produtosDB
}

//Convenção Para ID'S de produto -> PROD01

