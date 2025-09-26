import { EnumPositionType, NoteContentType, NoteIndex, Template, WHITES } from "../models/segment";

const notes: NoteIndex = {
    1: {
        id: 1,
        description: 'Identificação Ocorrências de Título(Detalhe Campo 109-110)',
        content: [
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columnGroup: [
                        { label: 'Tabela de ocorrências', colspan: 2 }
                    ],
                    columns: [
                        { label: 'Número', field: 'num', width: '10%' },
                        { label: 'Identificação', field: 'iden', width: '90%' },
                    ],
                    data: [
                        { num: '0', iden: 'Ocorrência Desconhecida' },
                        { num: '2', iden: 'Entrada confirmada' },
                        { num: '3', iden: 'Entrada rejeitada' },
                        { num: '4', iden: 'Transferência de carteira/entrada' },
                        { num: '5', iden: 'Transferência de carteira/baixa' },
                        { num: '6', iden: 'Liquidação' },
                        { num: '7', iden: 'Confirmação do Recebimento da Instrução de Desconto' },
                        { num: '8', iden: 'Confirmação do Recebimento do Cancelamento do Desconto' },
                        { num: '9', iden: 'Baixa' },
                        { num: '11', iden: 'Títulos em carteira (em ser)' },
                        { num: '12', iden: 'Confirmação recebimento instrução de abatimento' },
                        { num: '13', iden: 'Confirmação recebimento instrução de cancelamento de abatimento' },
                        { num: '14', iden: 'Confirmação recebimento instrução alteração de vencimento' },
                        { num: '15', iden: 'Franco de pagamento' },
                        { num: '17', iden: 'Liquidação após baixa ou liquidação de título não registrado' },
                        { num: '19', iden: 'Confirmação recebimento instrução de protesto' },
                        { num: '20', iden: 'Confirmação recebimento instrução de sustação/cancelamento de protesto' },
                        { num: '23', iden: 'Remessa a cartório (aponte em cartório)' },
                        { num: '24', iden: 'Retirada de cartório e manutenção em carteira' },
                        { num: '25', iden: 'Protestado e baixado (baixa por ter sido protestado)' },
                        { num: '26', iden: 'Instrução rejeitada' },
                        { num: '27', iden: 'Confirmação do pedido de alteração de outros dados' },
                        { num: '28', iden: 'Débito de tarifas/custas' },
                        { num: '29', iden: 'Ocorrências do pagador' },
                        { num: '30', iden: 'Alteração de dados rejeitada' },
                        { num: '33', iden: 'Confirmação da Alteração dos Dados do Rateio de Crédito' },
                        { num: '34', iden: 'Confirmação do Cancelamento dos Dados do Rateio de Crédito' },
                        { num: '35', iden: 'Confirmação do Desagendamento do Débito Automático' },
                        { num: '36', iden: 'Confirmação de envio de e-mail/SMS' },
                        { num: '37', iden: 'Envio de e-mail/SMS rejeitado' },
                        { num: '38', iden: 'Confirmação de alteração do Prazo Limite de Recebimento' },
                        { num: '39', iden: 'Confirmação de Dispensa de Prazo Limite de Recebimento' },
                        { num: '40', iden: 'Confirmação da alteração do número do título dado pelo cedente' },
                        { num: '41', iden: 'Confirmação da alteração do número controle do Participante' },
                        { num: '42', iden: 'Confirmação da alteração dos dados do Sacado' },
                        { num: '43', iden: 'Confirmação da alteração dos dados do Sacador/Avalista' },
                        { num: '44', iden: 'Título pago com cheque devolvido' },
                        { num: '45', iden: 'Título pago com cheque compensado' },
                        { num: '46', iden: 'Instrução para cancelar protesto confirmada' },
                        { num: '47', iden: 'Instrução para protesto para fins falimentares confirmada' },
                        { num: '48', iden: 'Confirmação de instrução de transferência de carteira/modalidade de cobrança' },
                        { num: '49', iden: 'Alteração de contrato de cobrança' },
                        { num: '50', iden: 'Título pago com cheque pendente de liquidação' },
                        { num: '51', iden: 'Título DDA reconhecido pelo sacado' },
                        { num: '52', iden: 'Título DDA não reconhecido pelo sacado' },
                        { num: '53', iden: 'Título DDA recusado pela CIP' },
                        { num: '54', iden: 'Confirmação da Instrução de Baixa de Título Negativado sem Protesto' },
                        { num: '55', iden: 'Confirmação de Pedido de Dispensa de Multa' },
                        { num: '56', iden: 'Confirmação do Pedido de Cobrança de Multa' },
                        { num: '57', iden: 'Confirmação do Pedido de Alteração de Cobrança de Juros' },
                        { num: '58', iden: 'Confirmação do Pedido de Alteração do Valor/Data de Desconto' },
                        { num: '59', iden: 'Confirmação do Pedido de Alteração do Cedente do Título' },
                        { num: '60', iden: 'Confirmação do Pedido de Dispensa de Juros de Mora' }
                    ]
                }]
            }
        ]
    },
    2: {
        id: 2,
        description: 'Detalhes',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                '21-21 = Zero',
                '22-24 = Código da Carteira',
                '25-29 = Agência (sem DV)',
                '30-36 = Conta Corrente',
                '37-37 = Dígito da Conta',
                '(fornecido pela Cooperativa)`',
            ]
        }]
    },
}

export const CRESOL_400: Template[] = [
    {
        "id": 1,
        "description": "5.1 CNAB400 – HEADER (Identificação do Registro: 0)",
        "optional": false,
        "matchSegment": (line: string) => line.startsWith('0'),
        "positions": [
            {
                "id": 1001001,
                "init": 1,
                "end": 1,
                "name": "Identificação do Registro",
                "description": "Identificação do Registro (Tipo de Registro)",
                "type": EnumPositionType.N,
                "default": "0"
            },
            {
                "id": 1002002,
                "init": 2,
                "end": 2,
                "name": "Identificação do Arquivo Retorno",
                "description": "Identificação do Arquivo (Retorno)",
                "type": EnumPositionType.N,
                "default": "2"
            },
            {
                "id": 1003009,
                "init": 3,
                "end": 9,
                "name": "Literal Retorno",
                "description": "Literal 'RETORNO'",
                "type": EnumPositionType.A,
                "default": "RETORNO"
            },
            {
                "id": 1010011,
                "init": 10,
                "end": 11,
                "name": "Código do Serviço",
                "description": "Código do Serviço",
                "type": EnumPositionType.N,
                "default": "01"
            },
            {
                "id": 1012026,
                "init": 12,
                "end": 26,
                "name": "Literal Serviço",
                "description": "Literal 'COBRANCA'",
                "type": EnumPositionType.A,
                "default": "COBRANCA"
            },
            {
                "id": 1027046,
                "init": 27,
                "end": 46,
                "name": "Código da Empresa",
                "description": "Número da conta do cooperado",
                "type": EnumPositionType.N
            },
            {
                "id": 1047076,
                "init": 47,
                "end": 76,
                "name": "Nome da Empresa por Extenso",
                "description": "Razão Social",
                "type": EnumPositionType.A
            },
            {
                "id": 1077079,
                "init": 77,
                "end": 79,
                "name": "Número da Cresol na Câmara de Compensação",
                "description": "Código do Banco Cresol",
                "type": EnumPositionType.N,
                "default": "133"
            },
            {
                "id": 1080094,
                "init": 80,
                "end": 94,
                "name": "Nome do Banco por Extenso",
                "description": "Nome do Banco por Extenso",
                "type": EnumPositionType.A,
                "default": "CRESOL"
            },
            {
                "id": 1095100,
                "init": 95,
                "end": 100,
                "name": "Data da Gravação do Arquivo",
                "description": "Data da Gravação do Arquivo",
                "type": EnumPositionType.D
            },
            {
                "id": 1101108,
                "init": 101,
                "end": 108,
                "name": "Densidade de Gravação",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 1109113,
                "init": 109,
                "end": 113,
                "name": "Número do Aviso Bancário",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 1114379,
                "init": 114,
                "end": 379,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 1380385,
                "init": 380,
                "end": 385,
                "name": "Data do Crédito",
                "description": "Data do Crédito",
                "type": EnumPositionType.D
            },
            {
                "id": 1386394,
                "init": 386,
                "end": 394,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 1395400,
                "init": 395,
                "end": 400,
                "name": "Número Sequencial do Registro de Um em Um",
                "description": "Número Sequencial do Registro",
                "type": EnumPositionType.N,
                "default": "000001"
            }
        ]
    },
    {
        "id": 2,
        "description": "5.2 CNAB400 - DETALHE (Identificação do Registro: 1)",
        "matchSegment": (line: string) => line.startsWith('1'),
        "optional": false,
        "positions": [
            {
                "id": 2001001,
                "init": 1,
                "end": 1,
                "name": "Identificação do Registro",
                "description": "Identificação do Registro (Tipo de Registro)",
                "type": EnumPositionType.N,
                "default": "1"
            },
            {
                "id": 2002003,
                "init": 2,
                "end": 3,
                "name": "Tipo de Inscrição Empresa",
                "description": "Identificação do Tipo de Inscrição do Beneficiário",
                "type": EnumPositionType.N,
                "options": [
                    {
                        "id": 1,
                        "content": "01",
                        "description": "Pessoa Física (CPF)"
                    },
                    {
                        "id": 2,
                        "content": "02",
                        "description": "Pessoa Jurídica (CNPJ)"
                    }
                ]
            },
            {
                "id": 2004017,
                "init": 4,
                "end": 17,
                "name": "Número Inscrição da Empresa",
                "description": "CPF/CNPJ do Beneficiário",
                "type": EnumPositionType.N
            },
            {
                "id": 2018020,
                "init": 18,
                "end": 20,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2021037,
                "init": 21,
                "end": 37,
                "name": "Identificação da Empresa Beneficiário no Banco",
                "description": "Identificação da Empresa no Banco",
                "type": EnumPositionType.A,
                "note": notes[2]
            },
            {
                "id": 2038062,
                "init": 38,
                "end": 62,
                "name": "Número Controle do Participante",
                "description": "Número de controle do Beneficiário",
                "type": EnumPositionType.A
            },
            {
                "id": 2063070,
                "init": 63,
                "end": 70,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2071081,
                "init": 71,
                "end": 81,
                "name": "Identificação do Título no Banco",
                "description": "Número Bancário para Cobrança Com e Sem Registro",
                "type": EnumPositionType.N
            },
            {
                "id": 2082082,
                "init": 82,
                "end": 82,
                "name": "Dígito de Auto Conferência do Número Bancário",
                "description": "Dígito N/N",
                "type": EnumPositionType.N
            },
            {
                "id": 2083092,
                "init": 83,
                "end": 92,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2093104,
                "init": 93,
                "end": 104,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2105105,
                "init": 105,
                "end": 105,
                "name": "Indicador Rateio Crédito",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2106107,
                "init": 106,
                "end": 107,
                "name": "Pagamento parcial",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2108108,
                "init": 108,
                "end": 108,
                "name": "Carteira",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2109110,
                "init": 109,
                "end": 110,
                "name": "Identificação da Ocorrência",
                "description": "Código de Ocorrência",
                "type": EnumPositionType.N,
                "note": notes[1]
            },
            {
                "id": 2111116,
                "init": 111,
                "end": 116,
                "name": "Data Ocorrência no Banco",
                "description": "Data Ocorrência no Banco",
                "type": EnumPositionType.D
            },
            {
                "id": 2117126,
                "init": 117,
                "end": 126,
                "name": "Número do Documento",
                "description": "Número do Documento",
                "type": EnumPositionType.A
            },
            {
                "id": 2127146,
                "init": 127,
                "end": 146,
                "name": "Identificação do Título no Banco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2147152,
                "init": 147,
                "end": 152,
                "name": "Data Vencimento do Título",
                "description": "Data Vencimento do Título",
                "type": EnumPositionType.D
            },
            {
                "id": 2153165,
                "init": 153,
                "end": 165,
                "name": "Valor do Título",
                "description": "Valor Nominal do Título",
                "type": EnumPositionType.M
            },
            {
                "id": 2166168,
                "init": 166,
                "end": 168,
                "name": "Banco Cobrador",
                "description": "Código do Banco na Câmara de Compensação",
                "type": EnumPositionType.N
            },
            {
                "id": 2169173,
                "init": 169,
                "end": 173,
                "name": "Agência Cobradora",
                "description": "Código da Agência do Banco Cobrador",
                "type": EnumPositionType.N
            },
            {
                "id": 2174175,
                "init": 174,
                "end": 175,
                "name": "Espécie do Título",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2176188,
                "init": 176,
                "end": 188,
                "name": "Valor de Tarifa",
                "description": "Valor da Tarifa de Cobrança",
                "type": EnumPositionType.M
            },
            {
                "id": 2189201,
                "init": 189,
                "end": 201,
                "name": "Valor de Outras Despesas",
                "description": "Valor de Outras Despesas",
                "type": EnumPositionType.M
            },
            {
                "id": 2202214,
                "init": 202,
                "end": 214,
                "name": "Juros Operação em Atraso",
                "description": "Juros Operação em Atraso",
                "type": EnumPositionType.M
            },
            {
                "id": 2215227,
                "init": 215,
                "end": 227,
                "name": "IOF Devido",
                "description": "IOF Devido",
                "type": EnumPositionType.M
            },
            {
                "id": 2228240,
                "init": 228,
                "end": 240,
                "name": "Abatimento Concedido sobre o Título",
                "description": "Abatimento Concedido sobre o Título",
                "type": EnumPositionType.M
            },
            {
                "id": 2241253,
                "init": 241,
                "end": 253,
                "name": "Desconto Concedido",
                "description": "Desconto Concedido",
                "type": EnumPositionType.M
            },
            {
                "id": 2254266,
                "init": 254,
                "end": 266,
                "name": "Valor Pago",
                "description": "Valor Efetivamente Pago",
                "type": EnumPositionType.M
            },
            {
                "id": 2267279,
                "init": 267,
                "end": 279,
                "name": "Juros de Mora",
                "description": "Juros de Mora",
                "type": EnumPositionType.M
            },
            {
                "id": 2280292,
                "init": 280,
                "end": 292,
                "name": "Outros Créditos",
                "description": "Outros Créditos",
                "type": EnumPositionType.M
            },
            {
                "id": 2293294,
                "init": 293,
                "end": 294,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2295295,
                "init": 295,
                "end": 295,
                "name": "Motivo do Código de Ocorrência 25",
                "description": "Motivo do Código de Ocorrência 25",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2296301,
                "init": 296,
                "end": 301,
                "name": "Data do Crédito",
                "description": "Data Efetiva do Crédito",
                "type": EnumPositionType.D
            },
            {
                "id": 2302304,
                "init": 302,
                "end": 304,
                "name": "Origem Pagamento",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2305314,
                "init": 305,
                "end": 314,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2315318,
                "init": 315,
                "end": 318,
                "name": "Quando cheque Cresol informe 0133",
                "description": "Campo de uso exclusivo, preenchido com Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2319328,
                "init": 319,
                "end": 328,
                "name": "Motivos das Rejeições para os Códigos de Ocorrência da Posição 109 a 110",
                "description": "Motivo",
                "type": EnumPositionType.A
            },
            {
                "id": 2329368,
                "init": 329,
                "end": 368,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2369370,
                "init": 369,
                "end": 370,
                "name": "Número do Cartório",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2371380,
                "init": 371,
                "end": 380,
                "name": "Número do Protocolo",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2381394,
                "init": 381,
                "end": 394,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2395400,
                "init": 395,
                "end": 400,
                "name": "Número Sequencial de Registro",
                "description": "Número Sequencial do Registro",
                "type": EnumPositionType.N
            }
        ]
    },
    {
        "id": 3,
        "description": "5.3 CNAB400 – TRAILER (Identificação do Registro: 9)",
        "optional": false,
        "matchSegment": (line: string) => line.startsWith('9'),
        "positions": [
            {
                "id": 3001001,
                "init": 1,
                "end": 1,
                "name": "Identificação do Registro",
                "description": "Identificação do Registro (Tipo de Registro)",
                "type": EnumPositionType.N,
                "default": "9"
            },
            {
                "id": 3002002,
                "init": 2,
                "end": 2,
                "name": "Identificação do Retorno",
                "description": "Identificação do Retorno",
                "type": EnumPositionType.N,
                "default": "2"
            },
            {
                "id": 3003004,
                "init": 3,
                "end": 4,
                "name": "Identificação Tipo de Registro",
                "description": "Identificação Tipo de Registro",
                "type": EnumPositionType.N,
                "default": "01"
            },
            {
                "id": 3005007,
                "init": 5,
                "end": 7,
                "name": "Código do Banco",
                "description": "Código do Banco Cresol",
                "type": EnumPositionType.N,
                "default": "133"
            },
            {
                "id": 3008394,
                "init": 8,
                "end": 394,
                "name": "Branco",
                "description": "Branco",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 3395400,
                "init": 395,
                "end": 400,
                "name": "Número Sequencial de Registro",
                "description": "Número Sequencial do Registro",
                "type": EnumPositionType.N
            }
        ]
    }
];