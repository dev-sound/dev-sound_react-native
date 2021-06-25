const mongoose =  require('mongoose')

module.exports = app => {

    const ControllerProdutos = {
        
        cadastro(request, response){

            const infoProduto =  request.body
            let convertInt = parseInt(infoProduto.Estoque)
            infoProduto.Estoque =  convertInt

            const ProdutosDB  = app.src.models.schemaProdutos


            if(infoProduto.Estoque > 0) { 
               
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
            else {
                response.status(401).send('Estoque não pode ser 0')
                console.log('Erro Estoque nao pode ser 0')
            }

        },


        addEstoque(request,response){

            const infoProduto = request.body
            const ProdutosDB = app.src.models.schemaProdutos


            console.log(ProdutosDB)
            
            if(infoProduto.Estoque > 0){

                mongoose.connect(
                    app.constantes.constsDB.connectDB ,
                    app.constantes.constsDB.connectParams
                )
                .then(()=> {

                    ProdutosDB.findOne({id_Produto:infoProduto.id_Produto})
                        .then(Produto => {
                            const estoqueDB = Produto.Estoque
                            const produtoNumero = parseInt(infoProduto.Estoque)
                            
                            ProdutosDB.updateOne(
                                {id_Produto:infoProduto.id_Produto},
                                {$set:{Estoque:estoqueDB+produtoNumero}}
                            
                            ).then(Estoque => {
                                response.status(200).send('Estoque Inserido com sucesso')
                                console.log(Estoque)
                            })
                            .catch(erro => {
                                response.status(401).send('Erro que inserir novo Estoque')
                                console.log(erro)
                            })
                        })
                        .catch(erro => {
                            response.send('erro')
                            console.log(erro)
                        })

                })
                .catch(erro => {
                    response.status(500).send('Erro ao conectar ao Banco de dados')
                    console.log(`Erro ao Conectar ao Banco ${erro}`)
                })
            }
            else{
                response.status(401).send('Estque invalido')
            }

        }
    }

    return ControllerProdutos
}