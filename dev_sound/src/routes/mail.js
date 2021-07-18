module.exports = app => {
    app.post('/tempPassword', app.src.controllers.mail.refazSenha)
}