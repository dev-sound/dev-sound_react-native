module.exports = app => {

    app.post('/cadastroProdutos',app.src.controllers.produto.cadastro)

    app.put('/addEstoque',app.src.controllers.produto.addEstoque)
}