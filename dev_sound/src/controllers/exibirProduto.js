const mongoose =  require('mongoose')
module.exports = (app) => {
    
    const getProduto = {

        verProduto (request, response) {
                mongoose.connect(
                    app.constantes.constsDB.connectDB,
                    app.constantes.constsDB.connectParams
                )
                .then(() => {
                    const Produto = app.src.models.schemaProdutos

                    Produto.find( { id_Produto: request.params.id_Produto } )
                    .then((itensProduto) => {
                        console.log(itensProduto)
                        response.status(200).send(itensProduto)
                    })
                    .catch((erro) => {
                        response.status(500).send(`Erro ao consultar produtos: ${erro}`)
                    })
                })
                .catch((erro) => {
                    response.status(500).send(`Erro ao conectar no banco de dados MongoDB: ${erro}`)
                })
            }
        }
    return getProduto
}