const mongoose = require('mongoose')

module.exports = app => {
    const schemaNF = mongoose.Schema
    (
        {
            data: {type: Date},
            numeroNF: {type: Number},
            tipoNota: {type: Boolean}, // sempre 0 no nosso caso, vai ser nota de saída
            chaveAcesso: {type: String},
            naturezaOp: {type: String}, // sempre Venda
            protooloDeAutorizacao: {
                dataHora: {type: Date},
                numeroProto: {type: String}
            },
            remetente: {
                enderecoEmpresa: {
                    rua: {type: String},
                    numero: {type: Number},
                    bairro: {type: String},
                    cidade: {type: String},
                    cep: {type: String},
                    uf: {type: String, min: 2, max: 2}
                },
                razaoSocial: {type: String},
                inscricaoEstadual:{type: String} 
            },
            destinatario: {
                nomeCliente:{type: String},
                SobrenomeCliente: {type: String},
                telefone: {type:String},
                enderecoCliente:{
                    ruaCliente: {type: String},
                    numeroCliente: {type: Number},
                    bairroCliente: {type: String},
                    cidadeCliente: {type: String},
                    cepCliente: {type: String},
                    ufCliente: {type: String, min: 2, max: 2}
                }
            },
            transportadora: {
                enderecoTransp: {
                    ruaTransp: {type: String},
                    numeroTransp: {type: Number},
                    bairroTransp: {type: String},
                    cidadeTransp: {type: String},
                    cepTransp: {type: String},
                    ufTransp: {type: String, min: 2, max: 2}
                },
                razaoSocialTransp: {type: String},
                inscricaoEstadualTransp:{type: String} 
            },
            Produtos:[
                {
                    id_Produto:{type:String},
                    nome:{type:String}, 
                    categoria:{type:String},
                    modelo:{type:String},
                    qtd_Produto:{type:Number},
                    valor_unitario:{type:Number},    
                    valor_total_produto:{type:Number}   
                }
            ],
            totalIcsm: {type: Number},
            totalIpi: {type:Number, required:true},
            valorFrete: {type: Number},
            totalNota: {type:Number}
        } 
    )
    const NotaDB =  mongoose.model('Notas',schemaNF);

    return NotaDB
}