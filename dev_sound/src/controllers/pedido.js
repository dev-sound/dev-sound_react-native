const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt =  require('bcrypt')


module.exports = app => {

    const ControllerPagamento = {

        Pedido(request,response){
            /*   
                Precisamos, validar o token, 
                Após validar o token cadastrar o cartão de credito,e cadastrar Endereço, 
            */

            const usuarioDB = app.src.models.schemaUsuarios
            const produtoDB = app.src.models.schemaProdutos
            const infosUser = request.body
            const tokenLogin = request.headers.authorization
            const verifyLogin = jwt.verify(tokenLogin, app.constantes.constSec.chaveJWT)
            

            if(verifyLogin) { // Verificação Login .. 

                mongoose.connect(
                    app.constantes.constsDB.connectDB ,
                    app.constantes.constsDB.connectParams
                )
                .then(()=> {

                    usuarioDB.findOne({email:verifyLogin.login}) //Inserção de Cartão
                        .then(usuarioInfo => {
                            
                            if(!usuarioInfo.cartaoCredito) { // Inicio Inserção Cartão
                                // Cair aqui é pq nao tem cartão..

                               const cartaoUsuario = infosUser.cartaoCredito.toString()
                               const cartaUser = cartaoUsuario.substring(0,12)
                               const ultimosNumeros = cartaoUsuario.substring(12,16)
                               const cartaoCrypt =  bcrypt.hashSync(cartaUser,app.constantes.constSec.custoHash)
                               const fullCartaoCrypto = cartaoCrypt+ultimosNumeros

                                usuarioDB.updateOne(
                                    {email:verifyLogin.login} ,
                                    {$set:{cartaoCredito:fullCartaoCrypto}}
                                   )
                                   .then(CadastroCartao => {
                                        console.log(verifyLogin.login)
                                        response.status(200).send(`Cartão cadastrado com sucesso..  ************${ultimosNumeros}`)
                                        console.log(CadastroCartao)
                                   })
                                   .catch(err => erroOp(err,response,'Cartão Credito Criptgrafia'))

                            }else { //FIM Inserção de Cartão

                                // Inicio cadastro Endereço 

                                if(Object.entries(usuarioInfo.Endereco)[1][1] == undefined) {

                                    usuarioDB.updateOne(
                                        {email:verifyLogin.login},        
                                        {$set:{Endereco:{
                                            cep:infosUser.cep,
                                            rua:infosUser.rua,
                                            numero:infosUser.numero,
                                            bairro:infosUser.bairro,
                                            cidade:infosUser.cidade,
                                            UF:infosUser.uf
                                        }}}
                                    )
                                    .then(infoEndereco => {
                                        response.status(200).send(`Endereço Cadastrado com sucesso -> ${infoEndereco}`)
                                        console.log('Cadastro de Endereço')
                                    })
                                    .catch(err => erroOp(err,response,'Cadastro Endereço'))
    
                                }
                                else { 
                                    console.log('Tem Cadastro')
                                    response.send('Cadastro de Cartao e endereço finalizado')
                                }
                            }
                        })
                        .catch(err => erroOp(err,response,'Cartão Credito'))//FIM Inserção de Cartão

                })
                .catch(err => erroConnectBD(err,response))// Catch do Mongo
            }
            else{
               response.status(401).send('Token expirado.. ') //Se erro do login
            }
        }
    }

    return ControllerPagamento

}



function erroConnectBD(erro,resp){
    console.log(`Erro ao conectar ao banco -->  ${erro} `)
    resp.status(500).send('Erro ao conectar ao banco de dados')
}

function erroOp(erro,resp,motivo){
    console.log(`Erro operação de ${motivo}`)
    response.status(500).send(`Erro de operaçã --> Motivo -- > ${motivo}`)
}