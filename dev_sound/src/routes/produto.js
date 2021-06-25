
module.exports = app => {

    app.post('/cadastroProdutos',app.src.controllers.produto.cadastro),

    app.get(
        '/produtos/:nome',app.src.controllers.produto.barraPesquisa
    )
}