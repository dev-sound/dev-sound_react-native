module.exports = app => {

    app.post('/cadastroProdutos',app.src.controllers.produto.cadastro)

    app.put('/addEstoque',app.src.controllers.produto.addEstoque)

    app.get('/exibirProduto/:id_Produto', app.src.controllers.exibirProduto.verProduto)

}