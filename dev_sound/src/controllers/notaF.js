const mongoose = require('mongoose')
module.exports = app => {
    const notaController = {
        buscaNota(request, response) {
            mongoose.connect(
                app.constantes.constsDB.connectDB,
                app.constantes.constsDB.connectParams
            )
            .then(()=>{
                const notaDB = app.src.models.schemaNotaFiscal
                notaDB.findOne({numeroNF: request.params.numeroNF })
                .then((notas) => {
                    console.log(notas)
                    response.status(200).send(notas)
                })
                .catch((erro) => {
                    response.status(400).send(`Erro ao consultar notas: ${erro}`)
                })
            })
            .catch((erro) => {
                response.status(500).send(`Erro ao conectar no banco de dados MongoDB: ${erro}`)
            })
        }
    }
    return notaController
}