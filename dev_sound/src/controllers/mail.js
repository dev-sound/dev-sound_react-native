const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
module.exports = app => {
    const enviaEmail ={
        refazSenha(request,response){
            // config do email que vai enviar
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: "devsoundcontato@gmail.com",
                    pass: "dev.sound"
                },
                tls:{
                    rejectUnauthorized: false
                },
            })
            mongoose.connect(
                app.constantes.constsDB.connectDB,
                app.constantes.constsDB.connectParams
            )
            .then(()=> {
                const UsuarioDB = app.src.models.schemaUsuarios;
                UsuarioDB.find({email: request.body.email})
                .then(resultado=>{
                    if(resultado.length > 0){
                       let rng = Math.random() * 10000
                       let tempSenha = crypto.randomBytes(4)
                       let tempSenhaUser = tempSenha.toString('hex')
                       console.log(tempSenhaUser)
                       let forUser = tempSenhaUser
                       tempSenhaUser =  bcrypt.hashSync(`${tempSenhaUser}`, app.constantes.constSec.custoHash)
                       let userEmail = request.body.email
                       UsuarioDB.updateOne({
                        email: request.body.email,
                       }, {
                           $set: {
                               senhaValida : tempSenhaUser
                           }
                       }).then(resultado => {
                           console.log(resultado)
                           transporter.sendMail({
                                from: "Equipe Dev.Sound <devsoundcontato@gmail.com>",
                                to: `${userEmail}`,
                                subject: "Esqueci minha senha",
                                text: `Você solicitou a troca de senha, use essa senha temporaria: ${forUser}`
                            })
                            .then(mensagem => {
                                console.log(mensagem)
                                response.status(200).send(mensagem);
                            }).catch(err => {
                                console.log(err)
                                response.status(500).send(`Erro ao enviar o email ${erro}`);
                            })  
                       })
                    }else {
                        response.status(404).send('Email não encontrado.');
                    }
                    

                }).catch((erro) => {
                    console.log(`Erro ao tentar localizar o usuário: ${erro}`);
                    console.log(erro);
                    response.status(500).send(`Erro ao tentar localizar o usuário: ${erro}`);
                });  
               
                
            }) 
            .catch(err => {
                console.log(err)
                response.status(500).send(`Erro ao conectar no banco MongoDB: ${err}`);
            })  

        },
        
    }
    return enviaEmail
}