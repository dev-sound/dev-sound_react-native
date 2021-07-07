const mongoose = require('mongoose');


module.exports = app => {

    const schemaProdutos = mongoose.Schema
    (
        {

            nome:{type:String,required:true},
            descricao:{type:String,required:true},
            categoria:{type:String,required:true},
            subCategoria:{type:String,required:true},
            img:{type:String},
            fabricante:{type:String,required:true},
            especificacao:{type:String},
            modelo:{type:String,required:true,index:{unique:true}},
            preco:{type:Number,required:true},
            estoque:{type:Number,required:true},
            data:{type:Date}
<<<<<<< HEAD
=======

>>>>>>> 26dbcece7ea99c1ec4831e69be880d0a3e12fe97
        }
    ) 

    const produtosDB = mongoose.model('Produtos', schemaProdutos)
    
    return produtosDB
}


