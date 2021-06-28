const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports = app => {

    const ControllerPagamento = {

        Pedido(request, response) {
            /*   
                Precisamos, validar o token, 
                Após validar o token cadastrar o cartão de credito,e cadastrar Endereço, 
            */

            const usuarioDB = app.src.models.schemaUsuarios
            const infosUser = request.body
            const tokenLogin = request.headers.authorization
            const verifyLogin = jwt.verify(tokenLogin, app.constantes.constSec.chaveJWT)


            if (verifyLogin) { // Verificação Login .. 

                mongoose.connect(
                        app.constantes.constsDB.connectDB,
                        app.constantes.constsDB.connectParams
                    )
                    .then(() => {

                        usuarioDB.findOne({
                                email: verifyLogin.login
                            }) //Inserção de Cartão
                            .then(usuarioInfo => {

                                /* Primeira Etapa do processo de pedido, 
                                   aqui começamos cadastrando o cartão e criptografando, aplicando regras do negocio..
                                */

                                const cartaoUsuario = infosUser.cartaoCredito.toString()
                                const cartaUser = cartaoUsuario.substring(0, 12)
                                const ultimosNumeros = cartaoUsuario.substring(12, 16)
                                const cartaoCrypt = bcrypt.hashSync(cartaUser, app.constantes.constSec.custoHash)
                                const fullCartaoCrypto = cartaoCrypt + ultimosNumeros

                                usuarioDB.updateOne({
                                            email: verifyLogin.login
                                        }, {
                                            $set: {
                                                cartaoCredito: fullCartaoCrypto
                                            }
                                        }
                                        /* Fim cadastro de cartão, e começo de cadastro de endereço. */
                                    )
                                    .then(CadastroCartao => {

                                        usuarioDB.updateOne({
                                                    email: verifyLogin.login
                                                }, {
                                                    $set: {
                                                        Endereco: {
                                                            cep: infosUser.cep,
                                                            rua: infosUser.rua,
                                                            numero: infosUser.numero,
                                                            bairro: infosUser.bairro,
                                                            cidade: infosUser.cidade,
                                                            UF: infosUser.UF
                                                        }
                                                    }
                                                }


                                            )
                                            .then(infoEndereco => {

                                                /* Fim Cadastro de endereço e inicio de cadastro de Produtos do Pedido*/

                                                const PedidoDB = app.src.models.schemaPedido
                                                const ProdutoDB = app.src.models.schemaProdutos

                                                const idClient = usuarioInfo.id
                                                const emailClient = usuarioInfo.email
                                                const DataCompra = new Date()
                                                const previsaoEntrega = "7 Dias"

                                                const frete = 100

                                                const infosPedido = request.body
                                                const produtos = request.body.Produtos

                                                /* Nesta etapa de Produtos do pedido, inserimos diversas regras ,
                                                   começamos setando valores fixos , e realizando operações aritmeticas,
                                                   como valor total da compra.. 
                                                */

                                                let Valor_Total_items = 0
                                                let valoresTotais = []




                                                for (let i = 0; i < produtos.length; i++) {
                                                    let qtdProdValor = produtos[i].qtd_Produto * produtos[i].valor_unitario
                                                    valoresTotais.push(qtdProdValor)
                                                }

                                                for (let i = 0; i < valoresTotais.length; i++) {
                                                    Valor_Total_items += valoresTotais[i]
                                                }

                                                let Total_Valor = Valor_Total_items + frete

                                                /* Nesta etapa estamos setando informaçoes fixas*/

                                                infosPedido.id_cliente = idClient
                                                infosPedido.EmailCliente = emailClient
                                                infosPedido.data_compra = DataCompra
                                                infosPedido.previsao_entrega = previsaoEntrega
                                                infosPedido.Produtos = produtos
                                                infosPedido.Frete = frete
                                                infosPedido.Valor_Total_items = Valor_Total_items
                                                infosPedido.Total_Valor = Total_Valor



                                                /* Aqui começa o cadastro dos Produtos do pedido.. */

                                                PedidoDB.create(infosPedido) // Cadastro do pedido..
                                                    .then(Pedido => {

                                                        /* Aqui começamos a etapa que verificar se temos estoque, e abater do estoque a qtd de produtos do 
                                                            Pedido , alem disso, impedidos de abater do estoque se o pedido for uma quantidade acima do que temos
                                                            em estoque..
                                                        */
                                                        const pedidosUsuario = Pedido.Produtos
                                                        pedidosUsuario.forEach(produtoVendas => {

                                                            const produtoIdClient = produtoVendas.id_Produto
                                                            const ProdutoQtdeClient = produtoVendas.qtd_Produto

                                                            ProdutoDB.find({
                                                                    _id: produtoIdClient
                                                                })
                                                                .then(produtosDoDB => {

                                                                    produtosDoDB.forEach(element => {
                                                                        if (produtoIdClient == element._id && element.estoque >= ProdutoQtdeClient) {

                                                                            const novoValorEstoqueBanco = element.estoque - ProdutoQtdeClient

                                                                            ProdutoDB.updateOne({
                                                                                    _id: produtoIdClient
                                                                                }, {
                                                                                    $set: {
                                                                                        estoque: novoValorEstoqueBanco
                                                                                    }
                                                                                })
                                                                                .then(novoEstoqueBD => {
                                                                                    // console.log('estoque att com sucesso -- ')
                                                                                    // console.log(novoEstoqueBD)
                                                                                }).catch(erro => console.log(erro))

                                                                        } else {
                                                                            console.log('Estoque insuficiente ou id de produto invalido..')
                                                                        }

                                                                    })
                                                                    /*Aqui finalizamos mais uma etapa..  */



                                                                    /*  Nesta etapa, verificamos se temos estoque para o produto, caso o produto nao tenha estoque,
                                                                        é gravado no banco apenas o que tem estoque.. 
                                                                    */
                                                                    produtosDoDB.forEach(dbItem => {

                                                                        if (produtoVendas.id_Produto == dbItem._id && produtoVendas.qtd_Produto > dbItem.estoque) {
                                                                            const PedidoClienteID = Pedido._id
                                                                            const produtoInv = produtoVendas.id_Produto

                                                                            PedidoDB.update({
                                                                                _id: PedidoClienteID
                                                                            }, {
                                                                                $pull: {
                                                                                    Produtos: {
                                                                                        id_Produto: produtoInv
                                                                                    }
                                                                                }
                                                                            }).then(ItemInvalidoExcluido => console.log('Item invalido detectado..'))
                                                                        }
                                                                    })
                                                                    /* Fim da etapa de deletar produto do pedido sem estoque*/

                                                                })
                                                                .catch(erro => console.log(erro))


                                                            /* Fim da etapa do cadastro do pedido..*/
                                                        });

                                                        /* Nesta etapa estamos setando a forma de pagamento, atraves de  logica simples,
                                                            
                                                        */

                                                        if (Pedido.Forma_pagamento.ehBoleto) {
                                                            PedidoDB.updateOne({
                                                                _id: Pedido._id
                                                            }, {
                                                                $set: {
                                                                    Forma_pagamento: {
                                                                        ehBoleto: true,
                                                                        numeroBoleto: '003399.69925.58700.001801.85108.001018 8 746500000010000'
                                                                    }
                                                                }
                                                            }).then(setNumBoleto => console.log(setNumBoleto))
                                                        }



                                                        usuarioDB.updateOne({
                                                                email: Pedido.EmailCliente
                                                            }, {
                                                                $push: {
                                                                    Pedidos: {
                                                                        idPedido: Pedido._id,
                                                                        dataPedido: Pedido.data_compra,
                                                                        formaPagamento: Pedido.Forma_pagamento,
                                                                        status: 'Gerado'

                                                                    }
                                                                }
                                                            })
                                                            .then(setPedidoClienteDB => console.log(setPedidoClienteDB))
                                                            .catch(erro => console.log(erro))

                                                        response.status(200).send('Pedido Cadastrado com Sucesso')
                                                    })
                                                    .catch(err => console.log(err))
                                            })
                                            .catch(err => console.log(err))
                                    })
                                    .catch(err => console.log(err))


                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(`Erro conexão com banco de dados  ---> ${err}`)) // Catch do Mongo
            } else {
                response.status(401).send('Token expirado.. ')
            }
        }
    }

    return ControllerPagamento

}