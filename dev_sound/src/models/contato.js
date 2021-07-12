const mongoose = require('mongoose');

module.exports = app => {
    const schemaContato = mongoose.Schema
    (
        {
            nome: {type : String,  required: true},
            email: {type: String, required: true},
            assunto: {type: String, required: true},
            mensagem: {type: String, required: true} 
        }
        
    )
    const contatoDB = mongoose.model('Contatos', schemaContato)
    return contatoDB
}