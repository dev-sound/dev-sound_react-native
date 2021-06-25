module.exports = app => {

    app.post('/cadastroProdutos',app.src.controllers.produto.cadastro)

    app.put('/addEstoque',app.src.controllers.produto.addEstoque)

    app.get(
        '/produtos/:nome',app.src.controllers.produto.barraPesquisa
    )

}