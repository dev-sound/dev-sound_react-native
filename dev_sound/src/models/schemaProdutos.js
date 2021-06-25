const mongoose = require('mongoose');


module.exports = app => {

    const schemaProdutos = mongoose.Schema
    (
        {

            nome:{type:String,required:true},
            descricao:{type:String,required:true},
            categoria:{type:String,required:true},
            serie:{type:String,required:true},
            img:{type:String},
            fabricante:{type:String,required:true},
            especificacao:{type:String},
            modelo:{type:String,required:true},
            preco:{type:Number,required:true},
            estoque:{type:Number,required:true},
            data:{type:Date}
        }
    ) 

    const produtosDB = mongoose.model('Produtos', schemaProdutos)
    
    return produtosDB
}

//Convenção Para ID'S de produto -> PROD01

