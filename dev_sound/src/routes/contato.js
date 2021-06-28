module.exports = app => {
    app.post('/contato', app.src.controllers.contato.contatar)
}