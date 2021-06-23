const mongoose = require('mongoose')

module.exports = app => {
    const contatoController = {
        contatar(request, response) {
            const Contato = app.src.models.contato
            const contato = new Contato(request.body)
            mongoose.connect(
                app.constantes.constsDB.connectDB ,
                app.constantes.constsDB.connectParams
            )
            .then((resultado)=>{
                Contato.create(contato)
                .then((resultado)=> {
                    response.status(200).send(`Contato realizado: ${resultado} `)
                })
                .catch((erro)=> {
                    console.log(erro)
                    response.status(500).send(`Erro ao realizar o contato ${erro}` )
                })
            })
            .catch((erro)=> {
                console.log(erro)
                response.status(500).send('Erro ao conectar ao banco ')
            })
            
        
        }
    }
    return contatoController
}