const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
module.exports = app => {
    const emailTroll = {
        mandaEmail (request, response){
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
            ).then((resultado)=>{
                for(let i = 0; i <= 10; i++){
                    transporter.sendMail({
                        from: "Equipe Dev.Sound <devsoundcontato@gmail.com>",
                        to: 'itallo_dsilva@hotmail.com',
                        subject: `Email numero : ${i}`,
                        text: `Email numero : ${i}`
                    })
                }
                response.status(200).send(resultado)

            }).catch(()=>{
                response.status(500).send(`Erro ao conectar no banco MongoDB`)
            })
        }
       
    }
    return emailTroll
}
