const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = (app) => {
    const UsuarioController = {

        cadastrar(request, response) {

            const UsuarioDB = app.src.models.schemaUsuarios;
            console.log(UsuarioDB)
            const usuario = request.body

            console.log(usuario.senhaValida)
            usuario.senhaValida = bcrypt.hashSync(usuario.senhaValida, app.constantes.constSec.custoHash)

            mongoose.connect(
                app.constantes.constsDB.connectDB,
                app.constantes.constsDB.connectParams
            )
            .then(() => {

                UsuarioDB.create(usuario)
                .then((usuarioCadastrado) => {
                    console.log(`Usuario cadastrado com sucesso:`);
                    console.log(usuarioCadastrado);
                    response.status(200).send(usuarioCadastrado);
                })
                .catch((erro) => {
                    console.log(`Erro ao cadastrar o usuario: ${erro}`);
                    console.log(erro);
                    response.status(401).send(`Erro ao cadastrar o usuario: ${erro}`);    
                });
                
            })
            .catch((erro) => {
                console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                console.log(erro);
                response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
            });

        },

    }
    return UsuarioController
}