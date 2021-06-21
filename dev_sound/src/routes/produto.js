
module.exports = app => {

    app.post('/cadastroProdutos',app.src.controllers.produto.cadastro)
}