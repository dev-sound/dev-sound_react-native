module.exports = app => {

    const ControllerPagamento = {

        Pedido(request,response){
            /*   
                Precisamos, validar o token, 

                Após validar o token cadastrar o cartão de credito,e cadastrar Endereço, 
            */

            const usuarioDB = app.src.models.schemaUsuarios
            const produtoDB = app.src.models.schemaProdutos
            const infosUser = request.body
            
        

        }
    }

    return ControllerPagamento

}