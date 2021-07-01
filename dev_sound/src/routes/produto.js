module.exports = app => {

    app.post('/cadastroProdutos',app.src.controllers.produto.cadastro)

    app.put('/addEstoque',app.src.controllers.produto.addEstoque)

    app.get(
        '/produtos/:nome',app.src.controllers.produto.barraPesquisa
    ),

    app.get(
        '/produtos/categoria/:categoria',app.src.controllers.produto.buscaCategoria
    ),

    app.get(
        '/produtos/id/:id',app.src.controllers.produto.buscaId
    ),

    app.get(
        '/produtosDestaque',app.src.controllers.produto.buscaDestaque
    ),

    app.get(
        '/produtos/',app.src.controllers.produto.buscaNovidades
    )

}