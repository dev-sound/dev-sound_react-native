module.exports = (app) => {

    app.post(
        '/cadastrarUsuarios',
        app.src.controllers.usuario.cadastrar
    );

    app.post(
        '/loginUsuarios',
        app.src.controllers.usuario.login
    );

}