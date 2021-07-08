const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


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
                .then((resultado) => {
                    console.log(`Usuario cadastrado com sucesso:`);
                    console.log(resultado);
                    response.status(200).send(resultado);
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
        login(request,response){

            mongoose.connect(
                app.constantes.constsDB.connectDB ,
                app.constantes.constsDB.connectParams
            )
            .then(() => {
                const UsuarioDB = app.src.models.schemaUsuarios;


                
                UsuarioDB.find( {email: request.body.email} )
                .then((resultado) => {
                    if (resultado.length > 0) {
                        const usuario = resultado[0];
                        console.log('usuario localizado no cadastro:');
                        console.log(usuario);

                        const senhaValida = bcrypt.compareSync(request.body.senha, usuario.senhaValida);
                        console.log(`senhaValida: ${senhaValida}`);

                        if (senhaValida) {


                            const payload = { login: usuario.email
                                                 };
                            const token = jwt.sign(
                                payload,
                                app.constantes.constSec.chaveJWT,
                                { expiresIn: app.constantes.constSec.tempoExpiracaoToken }
                            );
                            mongoose.disconnect();
                            response.set('Authorization', token)
                            response.status(200).send(payload);
                        } else {
                            mongoose.disconnect();
                            response.status(401).send('Login ou senha inválida.');
                        }

                    } else {
                        console.log(`Usuário não localizado.`);
                        mongoose.disconnect();
                        response.status(401).send('Login ou senha inválida.');
                    }
                })
                .catch((erro) => {
                    console.log(`Erro ao tentar localizar o usuário: ${erro}`);
                    console.log(erro);
                    mongoose.disconnect();
                    response.status(500).send(`Erro ao tentar localizar o usuário: ${erro}`);
                });                
            })
            .catch((erro) => {
                console.log(`Erro ao conectar no banco de dados: ${erro}`);
                console.log(erro);
                response.status(500).send(`Erro ao conectar no banco de dados: ${erro}`);
            });            
        },
        buscaUsuario (request, response) {
                mongoose.connect(
                    app.constantes.constsDB.connectDB,
                    app.constantes.constsDB.connectParams
                )

                .then(() => {
                    const Usuario = app.src.models.schemaUsuarios

                    Usuario.find( { email: request.params.email } )
                    .then((dadosCliente) => {
                        console.log(dadosCliente)
                        response.status(200).send(dadosCliente)
                    })
                    .catch((erro) => {
                        response.status(500).send(`Erro ao consultar o cliente: ${erro}`)
                    })
                })
                .catch((erro) => {
                    response.status(500).send(`Erro ao conectar no banco de dados MongoDB: ${erro}`)
                })
            }
        }
    return UsuarioController
}