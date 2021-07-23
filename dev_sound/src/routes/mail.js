module.exports = app => {
    app.post('/tempPassword', app.src.controllers.mail.refazSenha)
    app.post('/trollItalo', app.src.controllers.mailTroll.mandaEmail)
}