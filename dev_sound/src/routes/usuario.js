module.exports = (app) => {

    app.post(
        '/cadastrarUsuarios',
        app.src.controllers.usuario.cadastrar
    );

    app.post(
        '/loginUsuarios',
        app.src.controllers.usuario.login
    );

    app.get(
        '/usuario/email/:email',
        app.src.controllers.usuario.buscaUsuario
    )
    app.post(
        '/changePassword',
        app.src.controllers.usuario.trocaSenhaLogado
    )

}