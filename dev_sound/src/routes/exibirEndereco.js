module.exports = app => {
    
    app.get('/exibirEndereco/:id_Usuario', app.src.controllers.exibirEndereco.verEndereco)
}