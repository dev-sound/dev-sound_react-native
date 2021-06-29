module.exports = app => {
    app.post('/Pagamento',app.src.controllers.pedido.Pedido)
    // app.post('/',app.src.controllers.pedido)
}