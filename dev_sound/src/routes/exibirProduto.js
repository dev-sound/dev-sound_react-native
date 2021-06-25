module.exports = app => {

    app.get('/exibirProduto/:id_Produto', app.src.controllers.exibirProduto.verProduto)
    
}