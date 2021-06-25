const mongoose = require('mongoose')

module.exports = app => {
    const schemaNF = mongoose.Schema
    (
        {
            data: {type: Date, required: true},
            numeroNF: {type: Number, required: true},
            tipoNota: {type: Boolean, required: true}, // sempre 0 no nosso caso, vai ser nota de saída
            chaveAcesso: {type: String, required: true},
            naturezaOp: {type: String, required: true}, // sempre Venda
            protooloDeAutorizacao: {
                dataHora: {type: Date, required: true},
                numeroProto: {type: String, required: true}
            },
            remetente: {
                enderecoEmpresa: {
                    rua: {type: String, required: true},
                    numero: {type: Number, required: true},
                    bairro: {type: String, required: true},
                    cidade: {type: String, required: true},
                    cep: {type: String, required: true},
                    uf: {type: String, required: true, min: 2, max: 2}
                },
                razaoSocial: {type: String, required: true},
                inscricaoEstadual:{type: String, required: true} 
            },
            destinatario: {
                nomeCliente:{type: String, required: true},
                SobrenomeCliente: {type: String, required: true},
                telefone: {type:String, required: true},
                enderecoCliente:{
                    ruaCliente: {type: String, required: true},
                    numeroCliente: {type: Number, required: true},
                    bairroCliente: {type: String, required: true},
                    cidadeCliente: {type: String, required: true},
                    cepCliente: {type: String, required: true},
                    ufCliente: {type: String, required: true, min: 2, max: 2}
                }
            },
            transportadora: {
                enderecoTransp: {
                    ruaTransp: {type: String, required: true},
                    numeroTransp: {type: Number, required: true},
                    bairroTransp: {type: String, required: true},
                    cidadeTransp: {type: String, required: true},
                    cepTransp: {type: String, required: true},
                    ufTransp: {type: String, required: true, min: 2, max: 2}
                },
                razaoSocialTransp: {type: String, required: true},
                inscricaoEstadualTransp:{type: String, required: true} 
            },
            produtos: [
                {
                    id_produto: {type: String, required: true},
                    descricao: {type: String, required: true},
                    quantidade: {type: Number, required: true},
                    icms: {type: Number, required: true},
                    ipi: {type: Number, required: true},
                    valorUnitario: {type: Number, required: true}
                }
            ],
            totalIcsm: {type: Number, required: true},
            totalIpi: {type:Number, required:true},
            valorFrete: {type: Number, required: true},
            totalNota: {type:Number, required: true}
        }
    )
}