module.exports = (app) => {

    app.post(
        '/cadastrarUsuarios',
        app.src.controllers.usuario.cadastrar
    );

}