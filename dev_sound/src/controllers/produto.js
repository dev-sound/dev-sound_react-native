
const mongoose =  require('mongoose')

module.exports = app => {

    const ControllerProdutos = {

        cadastro(request, response){

            const infoProduto =  request.body
            let convertInt = parseInt(infoProduto.estoque)
            const dataCadastro =  new  Date()
            infoProduto.estoque =  convertInt
            infoProduto.data = dataCadastro
         
            console.log(dataCadastro)
            const ProdutosDB  = app.src.models.schemaProdutos


                if(infoProduto.estoque > 0) { 
               
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


            console.log(infoProduto)
            
            if(infoProduto.estoque > 0){

                mongoose.connect(
                    app.constantes.constsDB.connectDB ,
                    app.constantes.constsDB.connectParams
                )
                .then(()=> {

                    ProdutosDB.findOne({_id:infoProduto._id})
                        .then(Produto => {
                            const estoqueDB = Produto.estoque
                            const produtoNumero = parseInt(infoProduto.estoque)
                            
        
                            ProdutosDB.updateOne(
                                {_id:infoProduto._id},
                                {$set:{estoque:produtoNumero+estoqueDB}}
                            
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

        },

        barraPesquisa(request, response){

            const ProdutosDB  = app.src.models.schemaProdutos
             const nomePesquisa = request.params.nome
             let pesquisa = `${nomePesquisa}`
            console.log(request.params.nome)

            // const regex = /[\s,\.;:\(\)\-'\+]/
            // text.toUpperCase().split(regex) 

            mongoose.connect(
                app.constantes.constsDB.connectDB ,
                app.constantes.constsDB.connectParams
            )
            .then(() =>{
                console.log(request.params.nome)
                ProdutosDB.find( { nome: { $regex: pesquisa, $options: 'i' }} )
                .then((listaProdutos) => {
                    // console.log(listaProdutos)
                    mongoose.disconnect()
                    response.status(200).send(listaProdutos)
                })
                .catch((erro) => {
                    // console.log(erro)
                    mongoose.disconnect()
                    response.status(400).send('Produto não encontrado')
                })
            })
            .catch(erro => {
                console.log(erro)
                response.status(500).send('Erro ao conectar ao banco')
            })  
        },

        buscaId (request, response) {
            console.log(request.params)
            const ProdutosDB  = app.src.models.schemaProdutos
            console.log(ProdutosDB)
            mongoose.connect(
                app.constantes.constsDB.connectDB,
                app.constantes.constsDB.connectParams
            )
        
            .then(() => {

                ProdutosDB.find({_id: request.params.id})
                .then((itensProduto) => {
                    console.log(itensProduto)
                    response.status(200).send(itensProduto)
                })
                .catch((erro) => {
                    response.status(400).send(`Erro ao consultar produtos: ${erro}`)
                })
            })
            .catch((erro) => {
                response.status(500).send(`Erro ao conectar no banco de dados MongoDB: ${erro}`)
            })
        },

        buscaCategoria (request, response) {
            mongoose.connect(
                app.constantes.constsDB.connectDB,
                app.constantes.constsDB.connectParams
            )
            .then(() => {
                const ProdutosDB  = app.src.models.schemaProdutos

                ProdutosDB.find( { subCategoria: request.params.subCategoria } )
                .then((itensProduto) => {
                    console.log(itensProduto)
                    response.status(200).send(itensProduto)
                })
                .catch((erro) => {
                    response.status(400).send(`Erro ao consultar produtos: ${erro}`)
                })
            })
            .catch((erro) => {
                response.status(500).send(`Erro ao conectar no banco de dados MongoDB: ${erro}`)
            })
        },

        // buscaDestaque (request, response) {
        //     mongoose.connect(
        //         app.constantes.constsDB.connectDB,
        //         app.constantes.constsDB.connectParams
        //     )
        //     .then(() => {
        //         const ProdutosDB = app.src.models.schemaProdutos
        //         console.log(`ProdutosDB.find( { destaque: true } )`)
        //         ProdutosDB.find( { destaque: true } )
        //         .then((itensProduto) => {
        //             console.log(itensProduto)
        //             response.status(200).send(itensProduto)
        //         })
        //         .catch((erro) => {
        //             response.status(400).send(`Erro ao consultar produtos: ${erro}`)
        //         })
        //     })
        //     .catch((erro) => {
        //         response.status(500).send(`Erro ao conectar no banco de dados MongoDB: ${erro}`)
        //     })
        // },

        buscaNovidades (request, response) {
            mongoose.connect(
                app.constantes.constsDB.connectDB,
                app.constantes.constsDB.connectParams
            )
            .then(() => {
                const ProdutosDB = app.src.models.schemaProdutos

                ProdutosDB.find().sort({dataCadastro: -1}).limit(5)

                .then((itensProduto) => {

                    response.status(200).send(itensProduto)
                })
                .catch((erro) => {
                    response.status(400).send(`Erro ao consultar produtos: ${erro}`)
                })
            })
            .catch((erro) => {
                response.status(500).send(`Erro ao conectar no banco de dados MongoDB: ${erro}`)
            })
        }
    }
    


    return ControllerProdutos
}


