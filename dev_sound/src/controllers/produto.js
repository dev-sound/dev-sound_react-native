const { text } = require('express')
const mongoose =  require('mongoose')

module.exports = app => {

    const ControllerProdutos = {

        cadastro(request, response){

            const infoProduto =  request.body
            let convertInt = parseInt(infoProduto.estoque)
            infoProduto.estoque =  convertInt

            const ProdutosDB  = app.src.models.schemaProdutos

            console.log(request.body)
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
                ProdutosDB.find( { nome: { $all: pesquisa, $options: 'i' }} )
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
        }
    }

    return ControllerProdutos
}


