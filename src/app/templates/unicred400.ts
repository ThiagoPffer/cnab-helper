import { EnumPositionType, NoteContentType, NoteIndex, Template, WHITES, ZEROS } from "../models/segment";

const notes: NoteIndex = {
  1: {
    "id": 1,
    "description": "Informações adicionais sobre campos fixos do Header",
    "content": [
      {
        "type": NoteContentType.TEXT,
        "text": [
          "Os campos fixos nas posições 20-26 e 122-394 devem ser desconsiderados. Eles estão reservados para melhorias."
        ]
      }
    ]
  },
  2: {
    "id": 2,
    "description": "Informações adicionais sobre os campos fixos do Detalhe",
    "content": [
      {
        "type": NoteContentType.TEXT,
        "text": [
          "Os campos fixos nas posições 63-73, 76-85 e 120-146 devem ser desconsiderados. Eles estão reservados para melhorias."
        ]
      },
      {
        "type": NoteContentType.TEXT,
        "text": [
          "O campo fixo na posição 75-75 é '1' para títulos 'SIMPLES'."
        ]
      }
    ]
  },
  3: {
    "id": 3,
    "description": "Código de Movimento",
    "content": [
      {
        "type": NoteContentType.LIST,
        "title": "Códigos de Movimento",
        "listData": [
          "01 - Pago (Título protestado pago em cartório)",
          "02 - Instrução Confirmada",
          "03 - Instrução Rejeitada",
          "04 - Sustado Judicial (Título protestado sustado judicialmente)",
          "06 - Liquidação Normal",
          "07 - Liquidação em Condicional (Título liquidado em cartório com cheque do próprio devedor)",
          "08 - Sustado Definitivo (Título protestado sustado judicialmente)",
          "09 - Liquidação de Título Descontado",
          "10 - Protesto solicitado",
          "11 - Protesto Em cartório",
          "12 - Sustação solicitada",
          "13 - Títulos Descontado (título utilizado como garantia em operação de desconto)",
          "14 - Títulos Descontável (título com desistência de garantia em operação de desconto)",
          "15 - Enviada Negativação",
          "16 - Enviada Sustação Negativação"
        ]
      }
    ]
  },
  4: {
    "id": 4,
    "description": "Canal de Liquidação",
    "content": [
      {
        "type": NoteContentType.LIST,
        "title": "Códigos de Canal de Liquidação",
        "listData": [
          "000 - Sem informação relevante",
          "161 - Internet Banking",
          "162 - ATM",
          "163 - Caixa",
          "164 - Retaguarda",
          "165 - Monitor de TED",
          "166 - Compe",
          "167 - DDA",
          "168 - Banco Correspondente",
          "190 - Lotérica",
          "234 - Agendamento",
          "268 - Mobile",
          "308 - Cartório",
          "333 - Pix"
        ]
      }
    ]
  },
  5: {
    "id": 5,
    "description": "Informações adicionais sobre o campo DATA DE DÉBITO DA TARIFA",
    "content": [
      {
        "type": NoteContentType.TEXT,
        "text": [
          "O campo é preenchido com 'DDMMAAAA'. Se não houver data, será preenchido com zeros."
        ]
      }
    ]
  },
  6: {
    "id": 6,
    "description": "Informações adicionais sobre o campo VALOR DESCONTO CONCEDIDO",
    "content": [
      {
        "type": NoteContentType.TEXT,
        "title": "Observação",
        "text": [
          "Quando o título for liquidado em outros Bancos, essa informação não será retornada. A compensação de títulos enviada por estes bancos, não retorna o valor do desconto concedido de forma discriminada, somente, o valor pago pelo seu total, sendo assim não sendo informada."
        ]
      }
    ]
  },
  7: {
    "id": 7,
    "description": "Informações adicionais sobre o campo SEU NÚMERO",
    "content": [
      {
        "type": NoteContentType.TEXT,
        "text": [
          "No do Documento (Seu número). As 10 primeiras posições alinhado à esquerda (Alfanumérico) e preenchido com brancos a direita, até o limite de 26."
        ]
      }
    ]
  },
  8: {
    "id": 8,
    "description": "Códigos de Complemento do Movimento",
    "content": [
      {
        "type": NoteContentType.LIST,
        "title": "Códigos de Complemento do Movimento",
        "listData": [
          "00 - Sem Complemento a informar;",
          "01 - Código do Banco Inválido;",
          "04 - Código de Movimento não permitido para a carteira;",
          "05 - Código de Movimento Inválido;",
          "06 - Número de Inscrição do Beneficiário Inválido;",
          "07 - Agência Conta Inválida;",
          "08 - Nosso Número Inválido;",
          "09 - Nosso Número Duplicado;",
          "10 - Carteira inválida;",
          "12 - Tipo de Documento Inválido;",
          "15 - Data de Vencimento inferior a 5 dias uteis para remessa gráfica;",
          "16 - Data de Vencimento Inválida;",
          "17 - Data de Vencimento Anterior à Data de Emissão;",
          "18 - Vencimento fora do Prazo de Operação;",
          "20 - Valor do Título Inválido;",
          "24 - Data de Emissão Inválida;",
          "25 - Data de Emissão Posterior à data de Entrega;",
          "26 - Código de juros inválido;",
          "27 - Valor de juros inválido;",
          "28 - Código de Desconto inválido;",
          "29 - Valor de Desconto inválido;",
          "30 - Alteração de Dados Rejeitada;",
          "33 - Valor de Abatimento Inválido;",
          "34 - Valor do Abatimento Maior ou Igual ao Valor do título;",
          "37 - Código para Protesto Inválido; (Protesto via SGR, não é CRA);",
          "38 - Prazo para Protesto Inválido; (Protesto via SGR, não é CRA);",
          "39 - Pedido de Protesto Não Permitido para o Título;",
          "40 - Título com Ordem de Protesto Emitida;",
          "41 - Pedido de Cancelamento/Sustação para Títulos sem Instrução de Protesto ou Instrução de Protesto não confirmada pelo cartório;",
          "45 - Nome do Pagador não informado;",
          "46 - Número de Inscrição do Pagador Inválido;",
          "47 - Endereço do Pagador Não Informado;",
          "48 - CEP Inválido;",
          "49 - Titulo em processo de Protesto, não pode ser baixado por Decurso de Prazo;",
          "52 - Unidade Federativa Inválida;",
          "57 - Código de Multa inválido;",
          "58 - Data de Multa inválido;",
          "59 - Valor/percentual de Multa inválido;",
          "60 - Movimento para Título não Cadastrado;",
          "63 - Entrada para Título já cadastrado;",
          "79 - Data de Juros inválida;",
          "80 - Data de Desconto inválida;",
          "86 - Seu Número Inválido;",
          "A5 - Título Liquidado;",
          "A8 - Valor do Abatimento Inválido para Cancelamento;",
          "CO - Sistema Intermitente Entre em contato com sua Cooperativa;",
          "C1 - Situação do título Aberto;",
          "C3 - Status do Borderô Inválido;",
          "C4 - Nome do Beneficiário Inválido;",
          "C5 - Documento Inválido;",
          "C6 - Instrução não Atualiza Cadastro do Título;",
          "C7 - Título não registrado na CIP;",
          "C8 - Situação do Borderô inválida;",
          "C9 - Título inválido conforme situação CIP;",
          "C10 - Protesto: Título precisa estar em Aberto;",
          "DO - Beneficiário não autorizado a operar com produto Desconto;",
          "D1 - Alteração de status de desconto não permitido para título;",
          "D2 - Operação de desconto não permitida para título vencido;",
          "D3 - Alteração de status de desconto não permitido para situação do título;",
          "EO - CEP indicado para o endereço do Pagador não compatível com os Correios;",
          "E1 - Logradouro para o endereço do Pagador não compatível com os Correios, para o CEP indicado;",
          "E2 - Tipo de logradouro para o endereço do Pagador não compatível com os Correios, para o CEP indicado;",
          "E3 - Bairro para o endereço do Pagador não compatível com os Correios, para o CEP indicado;",
          "E4 - Cidade para o endereço do Pagador não compatível com os Correios, para o CEP indicado;",
          "E5 - UF para o endereço do Pagador não compatível com os Correios, para o CEP indicado;",
          "E6 - Dados do segmento/registro opcional de endereço do pagador, incompletos no arquivo remessa;",
          "E7 - Beneficiário não autorizado a enviar boleto por e-mail;",
          "E8 - Indicativo para pagador receber boleto por e-mail sinalizado, porém sem o endereço do e-mail;",
          "E9 - Beneficiário não autorizado a enviar títulos para protesto;",
          "E10 - Instrução '09 Protestar', usada erroneamente para título a vencer ou ainda dentro do período de Carência de '1 dia' do vencimento, referente a liquidação por Compensação;",
          "E11 - Instrução '26 - Protesto Automático', usada erroneamente para título vencido;",
          "E12 - Cancelamento de protesto automático não permitido, título não possui configuração de protesto automático;",
          "E13 - Configuração de Número de Dias para Protesto, foi informado para cancelamento de protesto automático;",
          "E14 - Configuração de Número de Dias para Protesto, não foi informado para protesto automático;",
          "E15 - Cancelamento de protesto automático não permitido, para protesto já enviado a cartório;",
          "E16 - Código para Protesto inválido;",
          "E17 - Instrução não permitida para título descontado;",
          "E18 - Configuração de Número de Dias para Protesto, foi informado para opção de não protestar;",
          "E19 - Baixa por decurso de prazo foi encaminhada em duplicidade pela CIP;",
          "E20 - Títulos com múltiplos pagamentos devem ter permissão para receber qualquer valor de pagamento;",
          "E21 - Instrução não permitida para títulos com múltiplos pagamentos;",
          "E22 - Funcionalidade para títulos com múltiplos pagamentos não está habilitada;",
          "E23 - Quantidade de pagamentos parciais, deve ser 99;",
          "E24 - Quantidade de pagamentos parciais não deve ser informado;",
          "E25 - Modelo de calculo invalido para titulo com pagamentos parciais;",
          "10 - Título possui baixa operacional ativa na cip;",
          "N1 - Beneficiário não autorizado a enviar títulos para Negativação;",
          "N2 - Instrução 45 Negativar, usada erroneamente para título a vencer ou ainda dentro do período de Carência de '1 dia' do vencimento, referente a liquidação por Compensação;",
          "N3 - Instrução 27 - Negativação Automática', usada erroneamente para título já vencido;",
          "N4 - Cancelamento de negativação automática não permitido, título não possui configuração de negativação automática;",
          "N5 - Configuração de Número de Dias para Negativação, não foi informado para negativação automático;",
          "N6 - Configuração de Número de Dias para Negativação, foi informado para cancelamento de negativação automático;",
          "N7 - Cancelamento de negativação automática não permitido, para negativação já enviada ao SERASA;",
          "N8 - Negativação: Título precisa estar em situação Aberto;",
          "N9 - Título com instrução de Negativação já enviada ao SERASA;",
          "N10 - Pedido de Cancelamento/Sustação para Título sem Instrução de Negativação ou Instrução de Negativação não confirmada pelo SERASA;",
          "N11 - Título Negativado, não pode ser baixado por Decurso de Prazo;",
          "N13 - Configuração de Código para Negativação e/ou Número de Dias para Negativação, foi informado erroneamente para Instrução 45 Negativar;",
          "N14 - Título não pode ser negativado, foi encaminhado para protesto;",
          "N15 - Título não pode receber instrução normal pois está negativado, deve ser usado instrução específica 47 Sustar Negativação e Baixar Título ou 46 Sustar Negativação e Manter Título em Carteira;",
          "N16 - Título não pode receber instrução de negativação automática, já possui protesto automatico cadastrado;",
          "N17 - Título não pode receber instrução de protesto automático, já possui negativação automatica cadastrada;",
          "N18 - Título com negativação automática não pode ser protestado;",
          "N19 - Título em processo de negativação ou negativado não pode receber instruções de protesto;",
          "N20 - Código de negativação automática inválido;",
          "N21 - Dados do endereço do beneficiário inválidos;",
          "N22 - Dados do telefone do beneficiário inválidos;",
          "N23 - Tipo documento do beneficiário inválido;",
          "N24 - Tipo pessoa beneficiário inválido;",
          "N25 - Documento do beneficiário inválido;",
          "N26 - Nome razão social do beneficiário inválido;",
          "N27 - Nome fantasia do beneficiário inválido;",
          "N28 - Dados do endereço do pagador inválidos;",
          "N29 - Nome razão social do pagador inválido;",
          "N30 - Data vencimento do título inválida;",
          "N31 - Título com negativação em andamento;",
          "N32 - Título não possui status válido;",
          "PX - Não foi possível registrar o título com QR Code, por favor, tente novamente."
        ]
      },
      {
        "type": NoteContentType.LIST,
        "title": "Códigos de Complemento do Movimento, relacionados a Protesto de título:",
        "listData": [
          "101 - Data da apresentação inferior à data de vencimento;",
          "102 - Falta de comprovante da prestação de serviço;",
          "103 - Nome do sacado incompleto/incorreto;",
          "104 - Nome do cedente incompleto/incorreto;",
          "105 - Nome do sacador incompleto/incorreto;",
          "106 - Endereço do sacado insuficiente;",
          "107 - CNPJ/CPF do sacado inválido/incorreto;",
          "108 - CNPJ/CPF incompatível c/ o nome do sacado/sacador/avalista;",
          "109 - CNPJ/CPF do sacado incompatível com o tipo de documento;",
          "110 - CNPJ/CPF do sacador incompatível com a espécie;",
          "111 - Título aceito sem a assinatura do sacado;",
          "112 - Título aceito rasurado ou rasgado;",
          "113 - Título aceito - falta título (ag ced: enviar);",
          "114 - CEP incorreto;",
          "115 - Praça de pagamento incompatível com endereço;",
          "116 - Falta número do título;",
          "117 - Título sem endosso do cedente ou irregular;",
          "118 - Falta data de emissão do título;",
          "119 - Título aceito: valor por extenso diferente do valor por numérico;",
          "120 - Data de emissão posterior ao vencimento;",
          "121 - Espécie inválida para protesto;",
          "122 - CEP do sacado incompatível com a praça de protesto;",
          "123 - Falta espécie do título;",
          "124 - Saldo maior que o valor do título;",
          "125 - Tipo de endosso inválido;",
          "126 - Devolvido por ordem judicial;",
          "127 - Dados do título não conferem com disquete;",
          "128 - Sacado e Sacador/Avalista são a mesma pessoa;",
          "129 - Corrigir a espécie do título;",
          "130 - Aguardar um dia útil após o vencimento para protestar;",
          "131 - Data do vencimento rasurada;",
          "132 - Vencimento – extenso não confere com número;",
          "133 - Falta data de vencimento no título;",
          "134 - DM/DMI sem comprovante autenticado ou declaração;",
          "135 - Comprovante ilegível para conferência e microfilmagem;",
          "136 - Nome solicitado não confere com emitente ou sacado;",
          "137 - Confirmar se são 2 emitentes. Se sim, indicar os dados dos 2;",
          "138 - Endereço do sacado igual ao do sacador ou do portador;",
          "139 - Endereço do apresentante incompleto ou não informado;",
          "140 - Rua / Número inexistente no endereço;",
          "141 - Informar a qualidade do endosso (M ou T);",
          "142 - Falta endosso do favorecido para o apresentante;",
          "143 - Data da emissão rasurada;",
          "144 - Protesto de cheque proibido – motivo 20/25/28/30 ou 35;",
          "145 - Falta assinatura do emitente no cheque;",
          "146 - Endereço do emitente no cheque igual ao do banco sacado;",
          "147 - Falta o motivo da devolução no cheque ou motivo ilegível;",
          "148 - Falta assinatura do sacador no título;",
          "149 - Nome do apresentante não informado/incompleto/incorreto;",
          "150 - Erro de preenchimento do título;",
          "151 - Título com direito de regresso vencido;",
          "152 - Título apresentado em duplicidade;",
          "153 - Título já protestado;",
          "154 - Letra de Câmbio vencida – falta aceite do sacado;",
          "155 - Título – falta tradução por tradutor público;",
          "156 - Falta declaração de saldo assinada no título;",
          "157 - Contrato de Câmbio – falta conta gráfica;",
          "158 - Ausência do Documento Físico;",
          "159 - Sacado Falecido;",
          "160 - Sacado Apresentou Quitação do Título;",
          "161 - Título de outra jurisdição territorial;",
          "162 - Título com emissão anterior à concordata do sacado;",
          "163 - Sacado consta na lista de falência;",
          "164 - Apresentante não aceita publicação de edital;",
          "165 - Dados do sacador em branco ou inválido;",
          "166 - Título sem autorização para protesto por edital;",
          "167 - Valor divergente entre título e comprovante;",
          "168 - Condomínio não pode ser protestado para fins falimentares;",
          "169 - Vedada a intimação por edital para protesto falimentar;",
          "170 - Dados do Cedente em branco ou inválido."
        ]
      }
    ]
  },
  10: {
    "id": 10,
    "description": "Códigos de Tipo de Instrução Origem",
    "content": [
      {
        "type": NoteContentType.LIST,
        "title": "Códigos de Tipo de Instrução Origem",
        "listData": [
          "00 - Sem Tipo de Instrução Origem a informar – usado para Código de Movimento 01; 06; 07; 09; 13 e 14",
          "01 - Remessa",
          "02 - Pedido de Baixa",
          "04 - Concessão de Abatimento",
          "05 - Cancelamento de Abatimento",
          "06 - Alteração de vencimento",
          "09 - Protestar",
          "10 - Baixa por Decurso de Prazo – Solicitação CIP",
          "11 - Sustar Protesto e Manter em Carteira",
          "22 - Alteração do Seu Número",
          "23 - Alteração de dados do Pagador",
          "25 - Sustar Protesto e Baixar Título",
          "26 - Protesto automático",
          "27 - Negativação automática",
          "40 - Alteração de Status Desconto",
          "45 - Negativar",
          "46 - Sustar Negativação e Manter Título em Carteira",
          "47 - Sustar Negativação e Baixar Título"
        ]
      }
    ]
  },
  11: {
    "id": 11,
    "description": "Informações adicionais sobre campos fixos do Trailer",
    "content": [
      {
        "type": NoteContentType.TEXT,
        "text": [
          "O campo fixo na posição 2-394 deve ser desconsiderado. Ele está reservado para melhorias."
        ]
      }
    ]
  }
};

export const UNICRED_400: Template[] = [
    {
        "id": 1,
        "description": "Header",
        "optional": false,
        "matchSegment": (content: string) => {
            return content.substring(0, 26) === '02RETORNO01COBRANCA       ';
        },
        "positions": [
            {
                "id": 1001001,
                "init": 1,
                "end": 1,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": ZEROS
            },
            {
                "id": 1002002,
                "init": 2,
                "end": 2,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": "2"
            },
            {
                "id": 1009003,
                "init": 3,
                "end": 9,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.A,
                "default": "RETORNO"
            },
            {
                "id": 1010011,
                "init": 10,
                "end": 11,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": "01"
            },
            {
                "id": 1012019,
                "init": 12,
                "end": 19,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.A,
                "default": "COBRANCA"
            },
            {
                "id": 1020026,
                "init": 20,
                "end": 26,
                "name": "FIXO",
                "description": "BRANCOS* Este campo deve ser desconsiderado. Ele está reservado para melhorias.",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 1027030,
                "init": 27,
                "end": 30,
                "name": "NÚMERO DA AGÊNCIA",
                "description": "",
                "type": EnumPositionType.N
            },
            {
                "id": 1031031,
                "init": 31,
                "end": 31,
                "name": "DÍGITO VERIFICADOR DA AGÊNCIA",
                "description": "",
                "type": EnumPositionType.A
            },
            {
                "id": 1032039,
                "init": 32,
                "end": 39,
                "name": "CONTA CORRENTE DO BENEFICIÁRIO",
                "description": "Número da conta com brancos à esquerda",
                "type": EnumPositionType.N
            },
            {
                "id": 1040040,
                "init": 40,
                "end": 40,
                "name": "DÍGITO VERIFICADOR DA CONTA DO BENEFICIÁRIO",
                "description": "",
                "type": EnumPositionType.A
            },
            {
                "id": 1041046,
                "init": 41,
                "end": 46,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": ZEROS
            },
            {
                "id": 1047076,
                "init": 47,
                "end": 76,
                "name": "NOME DO BENEFICIÁRIO",
                "description": "",
                "type": EnumPositionType.A
            },
            {
                "id": 1094077,
                "init": 77,
                "end": 94,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.A,
                "default": "136UNICREDDOBRASIL"
            },
            {
                "id": 1095100,
                "init": 95,
                "end": 100,
                "name": "DATA DA GERAÇÃO DO ARQUIVO",
                "description": "DDMMAA",
                "type": EnumPositionType.N
            },
            {
                "id": 1101107,
                "init": 101,
                "end": 107,
                "name": "SEQUENCIAL DO RETORNO",
                "description": "Incremental por arquivo",
                "type": EnumPositionType.N
            },
            {
                "id": 1121108,
                "init": 108,
                "end": 121,
                "name": "CÓDIGO DO BENEFICIÁRIO",
                "description": "Código do beneficiário com zeros à esquerda",
                "type": EnumPositionType.A
            },
            {
                "id": 1394122,
                "init": 122,
                "end": 394,
                "name": "FIXO",
                "description": "BRANCOS* Este campo deve ser desconsiderado. Ele está reservado para melhorias.",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 1400395,
                "init": 395,
                "end": 400,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": "000001"
            }
        ]
    },
    {
        "id": 2,
        "description": "Detalhe",
        "optional": false,
        "matchSegment": (content: string) => { return content.substring(0, 1) === '1'; },
        "positions": [
            {
                "id": 2001001,
                "init": 1,
                "end": 1,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": "1"
            },
            {
                "id": 2003002,
                "init": 2,
                "end": 3,
                "name": "TIPO DE INSCRIÇÃO DA EMPRESA",
                "description": "",
                "type": EnumPositionType.N,
                "options": [
                    {
                        "id": 1,
                        "content": "01",
                        "description": "CPF"
                    },
                    {
                        "id": 2,
                        "content": "02",
                        "description": "CNPJ"
                    }
                ]
            },
            {
                "id": 2017004,
                "init": 4,
                "end": 17,
                "name": "NÚMERO DE INSCRIÇÃO DA EMPRESA",
                "description": "Número do documento com zeros à esquerda",
                "type": EnumPositionType.N
            },
            {
                "id": 2018021,
                "init": 18,
                "end": 21,
                "name": "NÚMERO DA AGÊNCIA",
                "description": "",
                "type": EnumPositionType.N
            },
            {
                "id": 2022022,
                "init": 22,
                "end": 22,
                "name": "DÍGITO VERIFICADOR DA AGÊNCIA",
                "description": "",
                "type": EnumPositionType.A
            },
            {
                "id": 2023030,
                "init": 23,
                "end": 30,
                "name": "CONTA CORRENTE DO BENEFICIÁRIO",
                "description": "Número da conta com brancos à esquerda",
                "type": EnumPositionType.N
            },
            {
                "id": 2031031,
                "init": 31,
                "end": 31,
                "name": "DÍGITO VERIFICADOR DA CONTA DO BENEFICIÁRIO",
                "description": "",
                "type": EnumPositionType.A
            },
            {
                "id": 2032045,
                "init": 32,
                "end": 45,
                "name": "CÓDIGO DO BENEFICIÁRIO",
                "description": "Código do beneficiário com zeros à esquerda",
                "type": EnumPositionType.A
            },
            {
                "id": 2046062,
                "init": 46,
                "end": 62,
                "name": "NOSSO NÚMERO",
                "description": "",
                "type": EnumPositionType.N
            },
            {
                "id": 2073063,
                "init": 63,
                "end": 73,
                "name": "FIXO",
                "description": "BRANCOS* Este campo deve ser desconsiderado. Ele está reservado para melhorias.",
                "type": EnumPositionType.A,
                "default": WHITES,
            },
            {
                "id": 2074074,
                "init": 74,
                "end": 74,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": ZEROS
            },
            {
                "id": 2075075,
                "init": 75,
                "end": 75,
                "name": "FIXO",
                "description": "SIMPLES",
                "type": EnumPositionType.N,
                "default": "1"
            },
            {
                "id": 2085076,
                "init": 76,
                "end": 85,
                "name": "FIXO",
                "description": "BRANCOS* Este campo deve ser desconsiderado. Ele está reservado para melhorias.",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2088086,
                "init": 86,
                "end": 88,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": "019"
            },
            {
                "id": 2089106,
                "init": 89,
                "end": 106,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": ZEROS
            },
            {
                "id": 2107108,
                "init": 107,
                "end": 108,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": "18"
            },
            {
                "id": 2110109,
                "init": 109,
                "end": 110,
                "name": "CÓDIGO DE MOVIMENTO",
                "description": "Vide Informações Adicionais.",
                "type": EnumPositionType.N,
                "note": notes[3]
            },
            {
                "id": 2111116,
                "init": 111,
                "end": 116,
                "name": "DATA LIQUIDAÇÃO",
                "description": "DDMMAA",
                "type": EnumPositionType.N
            },
            {
                "id": 2117119,
                "init": 117,
                "end": 119,
                "name": "CANAL DE LIQUIDAÇÃO",
                "description": "Vide Informações Adicionais.",
                "type": EnumPositionType.N,
                "note": notes[8]
            },
            {
                "id": 2120146,
                "init": 120,
                "end": 146,
                "name": "FIXO",
                "description": "BRANCOS* Este campo deve ser desconsiderado. Ele está reservado para melhorias.",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2147152,
                "init": 147,
                "end": 152,
                "name": "DATA DE VENCIMENTO",
                "description": "DDMMAA",
                "type": EnumPositionType.N
            },
            {
                "id": 2165153,
                "init": 153,
                "end": 165,
                "name": "VALOR DO TÍTULO",
                "description": "",
                "type": EnumPositionType.N
            },
            {
                "id": 2168166,
                "init": 166,
                "end": 168,
                "name": "CÓDIGO DO BANCO RECEBEDOR",
                "description": "",
                "type": EnumPositionType.A
            },
            {
                "id": 2172169,
                "init": 169,
                "end": 172,
                "name": "PREFIXO DA AGÊNCIA RECEBEDORA",
                "description": "",
                "type": EnumPositionType.A
            },
            {
                "id": 2173173,
                "init": 173,
                "end": 173,
                "name": "DV-PREFIXO AGÊNCIA RECEBEDORA",
                "description": "",
                "type": EnumPositionType.A
            },
            {
                "id": 2174175,
                "init": 174,
                "end": 175,
                "name": "FIXO",
                "description": "BRANCOS* Este campo deve ser desconsiderado. Ele está reservado para melhorias.",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2176181,
                "init": 176,
                "end": 181,
                "name": "DATA PROGRAMADA PARA REPASSE (Data de Crédito do valor pago pelo titulo)",
                "description": "DDMMAA",
                "type": EnumPositionType.N
            },
            {
                "id": 2188182,
                "init": 182,
                "end": 188,
                "name": "VALOR DA TARIFA",
                "description": "",
                "type": EnumPositionType.N
            },
            {
                "id": 2196189,
                "init": 189,
                "end": 196,
                "name": "DATA DE DÉBITO DA TARIFA",
                "description": "DDMMAAAA. Se não houver data será preenchido com zeroS",
                "type": EnumPositionType.N
            },
            {
                "id": 2227187,
                "init": 187,
                "end": 227,
                "name": "FIXO",
                "description": "BRANCOS* Este campo deve ser desconsiderado. Ele está reservado para melhorias.",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2228240,
                "init": 228,
                "end": 240,
                "name": "VALOR ABATIMENTO",
                "description": "",
                "type": EnumPositionType.N
            },
            {
                "id": 2241253,
                "init": 241,
                "end": 253,
                "name": "VALOR DESCONTO CONCEDIDO",
                "description": "Vide Informações Adicionais.",
                "type": EnumPositionType.N,
                "note": notes[6]
            },
            {
                "id": 2266254,
                "init": 254,
                "end": 266,
                "name": "VALOR PAGO",
                "description": "",
                "type": EnumPositionType.N
            },
            {
                "id": 2267279,
                "init": 267,
                "end": 279,
                "name": "JUROS DE MORA",
                "description": "",
                "type": EnumPositionType.N
            },
            {
                "id": 2280305,
                "init": 280,
                "end": 305,
                "name": "SEU NÚMERO",
                "description": "Vide Informações Adicionais.",
                "type": EnumPositionType.A,
                "note": notes[7]
            },
            {
                "id": 2306318,
                "init": 306,
                "end": 318,
                "name": "VALOR LÍQUIDO",
                "description": "Diferença entre: Valor Pago e Valor da Tarifa (Valor Pago Valor da Tarifa)",
                "type": EnumPositionType.A
            },
            {
                "id": 2319326,
                "init": 319,
                "end": 326,
                "name": "COMPLEMENTO DO MOVIMENTO",
                "description": "Vide Informações Adicionais",
                "type": EnumPositionType.A,
                "note": notes[8]
            },
            {
                "id": 2327328,
                "init": 327,
                "end": 328,
                "name": "TIPO DE INSTRUÇÃO ORIGEM",
                "description": "Vide Informações Adicionais",
                "type": EnumPositionType.A,
                "note": notes[10],
            },
            {
                "id": 2329394,
                "init": 329,
                "end": 394,
                "name": "FIXO",
                "description": "BRANCOS* Este campo deve ser desconsiderado. Ele está reservado para melhorias.",
                "type": EnumPositionType.A,
                "default": WHITES
            },
            {
                "id": 2395400,
                "init": 395,
                "end": 400,
                "name": "SEQUENCIAL DO REGISTRO",
                "description": "SEQUENCIAL A PARTIR DO HEADER",
                "type": EnumPositionType.N
            }
        ]
    },
    {
        "id": 3,
        "description": "Trailer",
        "optional": false,
        "matchSegment": (content: string) => { return content.substring(0, 1) === '9' },
        "positions": [
            {
                "id": 3001001,
                "init": 1,
                "end": 1,
                "name": "FIXO",
                "description": "",
                "type": EnumPositionType.N,
                "default": "9"
            },
            {
                "id": 3394002,
                "init": 2,
                "end": 394,
                "name": "FIXO",
                "description": "BRANCOS* Este campo deve ser desconsiderado. Ele está reservado para melhorias.",
                "type": EnumPositionType.A,
                "default": WHITES,
            },
            {
                "id": 3400395,
                "init": 395,
                "end": 400,
                "name": "SEQUENCIAL DO REGISTRO",
                "description": "SEQUENCIAL CONSIDERANDO O HEADER, DETALHE E TRAILER",
                "type": EnumPositionType.N
            }
        ]
    }
];