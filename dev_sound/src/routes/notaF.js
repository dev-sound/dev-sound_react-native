module.exports = app => {
    app.get(
        '/notafiscal/:numeroNF',
        app.src.controllers.notaF.buscaNota
    )
}