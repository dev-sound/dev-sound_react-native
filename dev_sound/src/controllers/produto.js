const mongoose =  require('mongoose')

module.exports = app => {

    const ControllerProdutos = {
        
        cadastro(request, response){

            const infoProduto =  request.body
            let convertInt = parseInt(infoProduto.Estoque)
            infoProduto.Estoque =  convertInt

            const ProdutosDB  = app.src.models.schemaProdutos

            mongoose.connect(
                app.constantes.constsDB.connectDB ,
                app.constantes.constsDB.connectParams
            )
            .then(()=> {

                ProdutosDB.create(infoProduto)
                    .then(infosCadastradas => {
                        response.status(200).send(`PRODUTOS CADASTRADOS -> ${infosCadastradas}`)
                    })
                    .catch(erro =>{
                        response.status(401).send('PRODUTOS NÃO CADASTRADOS.')
                        console.log(erro)
                    })

            })
            .catch(erro => {
                console.log(erro)
                response.status(500).send('Erro ao conectar ao banco ')
            })

        }
    }

    return ControllerProdutos
}