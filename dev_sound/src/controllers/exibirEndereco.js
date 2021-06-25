const mongoose =  require('mongoose')
module.exports = (app) => {
    
    const getEndereco = {

        verEndereco (request, response) {
                mongoose.connect(
                    app.constantes.constsDB.connectDB,
                    app.constantes.constsDB.connectParams
                )


                .then(() => {
                    const Usuario = app.src.models.schemaUsuarios

                    Usuario.find( { id_Usuario: request.params.email } )
                    .then(({Endereco}) => {
                        console.log({Endereco})
                        response.status(200).send({Endereco})
                    })
                    .catch((erro) => {
                        response.status(500).send(`Erro ao consultar o cliente: ${erro}`)
                    })
                })
                .catch((erro) => {
                    response.status(500).send(`Erro ao conectar no banco de dados MongoDB: ${erro}`)
                })
            }
        }
    return getEndereco
}