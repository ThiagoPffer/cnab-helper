import { EnumPositionType, MatchSegmentFunction, NoteContentType } from './../models/segment';
import { NoteIndex, Template, WHITES, ZEROS } from "../models/segment";

const notes: NoteIndex = {
    1: {
        id: 1,
        description: 'Tipo/Nº de inscrição da empresa/sacador',
        content: [
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columns: [
                        { label: 'Tipo inscrição', field: 'tipoInscricao', width: '30%' },
                        { label: 'Número de inscrição', field: 'numeroInscricao', width: '70%' },
                    ],
                    data: [
                        { tipoInscricao: '01', numeroInscricao: 'Nº DO CPF DO BENEFICIÁRIO' },
                        { tipoInscricao: '02', numeroInscricao: 'Nº DO CNPJ DO BENEFICIÁRIO' },
                        { tipoInscricao: '03', numeroInscricao: 'CPF DO SACADOR' },
                        { tipoInscricao: '04', numeroInscricao: 'CNPJ DO SACADOR' },
                    ]
                }]
            },
            {
                type: NoteContentType.TEXT,
                text:[ `Normalmente definem o tipo (CPF/CNPJ) e o número de inscrição do beneficiário.
Se o título for negociado, deverão ser utilizados para indicar o CNPJ/CPF do sacador (beneficiário
original), uma vez que os cartórios exigem essa informação para efetivação dos protestos. Para este fim,
também poderá ser utilizado o registro tipo “5”.`]
            }
        ]
    },
    2: {
        id: 2,
        description: 'Uso da empresa',
        content: [{
            type: NoteContentType.TEXT,
            text: [`Campo não obrigatório, de livre utilização pela empresa, cuja informação não é consistida pelo Itaú, e não
sai no aviso de cobrança, retornando ao beneficiário no arquivo retorno em qualquer movimento do título
(baixa, liquidação, confirmação de protesto, etc.) com o mesmo conteúdo da entrada.`]
        }]
    },
    3: {
        id: 3,
        description: 'Nosso número',
        content: [{
            type: NoteContentType.LIST,
            listData: [
                "Para carteiras com registros escriturais: é enviado zerado pela empresa e retornado pelo Itaú na confirmação do registro, com exceção da carteira 115 cuja faixa de Nosso Número é de livre utilização pelo beneficiário;",
                "Para carteiras com registros diretos: é de livre utilização pelo beneficiário, não podendo ser repetida se o número ainda estiver registrado no Itaú ou se transcorridos menos de 45 dias de sua baixa / liquidação. Dependendo da carteira de cobrança utilizada a faixa de Nosso Número pode ser definida pelo Banco.",
                "Para todas as movimentações envolvendo o boleto o “Nosso Número” deve ser informado."
            ]
        }]
    },
    4: {
        id: 4,
        description: 'Quantidade de moeda variável',
        content: [{
            type: NoteContentType.TEXT,
            text: ['Este campo deverá ser preenchido com zeros caso a moeda seja o Real.']
        }]
    },
    5: {
        id: 5,
        description: 'Carteiras de cobrança',
        content: [
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columns: [
                        { label: 'Obs', field: 'obs', width: '10%' },
                        { label: 'Cód.', field: 'cod', width: '10%' },
                        { label: 'Tipo (*)', field: 'tipo', width: '10%' },
                        { label: 'Carteiras', field: 'carteiras', width: '10%' },
                        { label: 'Descrição', field: 'descricao', width: '60%' },
                    ],
                    data: [
                        { obs: 'D, E', cod: 'I', tipo: 'D', carteiras: '108', descricao: 'DIRETA ELETRÔNICA EMISSÃO INTEGRAL - CARNÊ' },
                        { obs: 'E', cod: 'I', tipo: 'D', carteiras: '180', descricao: 'DIRETA ELETRÔNICA EMISSÃO INTEGRAL - SIMPLES' },
                        { obs: '', cod: 'I', tipo: 'D', carteiras: '121', descricao: 'DIRETA ELETRÔNICA EMISSÃO PARCIAL - SIMPLES' },
                        { obs: 'E', cod: 'U', tipo: 'D', carteiras: '150', descricao: 'DIRETA ELETRÔNICA SEM EMISSÃO - DÓLAR' },
                        { obs: '', cod: 'I', tipo: 'D', carteiras: '109', descricao: 'DIRETA ELETRÔNICA SEM EMISSÃO - SIMPLES' },
                        { obs: '', cod: '1', tipo: '', carteiras: '191', descricao: 'DUPLICATAS - TRANSFERÊNCIA DE DESCONTO' },
                        { obs: 'D', cod: 'I', tipo: 'E', carteiras: '104', descricao: 'ESCRITURAL ELETRÔNICA - CARNÊ' },
                        { obs: 'F', cod: 'I', tipo: 'E', carteiras: '188', descricao: 'ESCRITURAL ELETRÔNICA - COBRANÇA INTELIGENTE (B2B)' },
                        { obs: '', cod: 'E', tipo: 'E', carteiras: '147', descricao: 'ESCRITURAL ELETRÔNICA - DÓLAR' },
                        { obs: '', cod: 'I', tipo: 'E', carteiras: '112', descricao: 'ESCRITURAL ELETRÔNICA - SIMPLES' },
                        { obs: '', cod: 'I', tipo: 'E', carteiras: '115', descricao: 'ESCRITURAL ELETRÔNICA - SIMPLES - FAIXA NOSSO NÚMERO LIVRE' },
                    ]
                }],
            },
            {
                type: NoteContentType.TEXT,
                listData: [
                    "(*) A coluna 'TIPO' define a modalidade das carteiras: E - Escritural / D - Direta",
                    "(A) No arquivo retorno é informado somente: agência, conta corrente, carteira, nosso número, data dpagamento, multa, desconto/abatimento, tarifa, valor líquido",
                    "(B) No arquivo retorno é informado somente: agência, conta corrente, carteira, nosso número, data do pagamento, multa, desconto/abatimento, tarifa, valor líquido e seu número.",
                    "(C) Para carteiras com impressão de carnês pelo Itaú, o arquivo remessa deverá ser ordenado por PAGADOR e vencimento. A cada alteração no nome do pagador será emitido um carnê (limitado a 99 parcelas), obedecendo a ordem do arquivo remessa. Quando a quantidade de parcelas de um carnê for superior a “99”, é necessária a emissão de mais de um carnê.",
                    "(D) Somente utilizar nosso número dentro de faixa numérica definida pelo Itaú.",
                    "(F) Carteiras com retenção de IOF e uso exclusivo de seguradoras."
                ]
            }
        ]
    },
    6: {
        id: 6,
        description: 'Código de ocorrência (arquivo remessa)',
        content: [
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columns: [
                        { field: 'obs', label: 'OBS', width: '10%' },
                        { field: 'cod', label: 'CÓD.', width: '10%' },
                        { field: 'oco', label: 'OCORRÊNCIA', width: '60%' },
                        { field: 'cne', label: 'CAMPOS NECESSÁRIOS', width: '20%' }
                    ],
                    data: [
                        { obs: '', cod: '01', oco: 'REMESSA', cne: 'TODOS OS CAMPOS' },
                        { obs: 'A', cod: '02', oco: 'PEDIDO DE BAIXA', cne: '' },
                        { obs: 'A,D', cod: '04', oco: 'CONCESSÃO DE ABATIMENTO (INDICADOR 12.5)', cne: 'VALOR DO ABATIMENTO' },
                        { obs: 'A,D', cod: '05', oco: 'CANCELAMENTO DE ABATIMENTO', cne: 'VALOR DO ABATIMENTO' },
                        { obs: 'A,D', cod: '06', oco: 'ALTERAÇÃO DO VENCIMENTO', cne: 'VENCIMENTO' },
                        { obs: 'A,D', cod: '07', oco: 'ALTERAÇÃO DO USO DA EMPRESA', cne: 'USO DA EMPRESA' },
                        { obs: 'A,D', cod: '08', oco: 'ALTERAÇÃO DO SEU NÚMERO', cne: 'SEU NÚMERO' },
                        { obs: 'A,C', cod: '09', oco: 'PROTESTAR', cne: '' },
                        { obs: 'A,D', cod: '10', oco: 'NÃO PROTESTAR', cne: '' },
                        { obs: 'A,C', cod: '11', oco: 'PROTESTO PARA FINS FALIMENTARES', cne: '' },
                        { obs: 'A,F', cod: '18', oco: 'SUSTAR O PROTESTO', cne: '' },
                        { obs: 'B,D', cod: '30', oco: 'EXCLUSÃO DE SACADOR AVALISTA', cne: '' },
                        { obs: 'B,D', cod: '31', oco: 'ALTERAÇÃO DE OUTROS DADOS', cne: 'CAMPOS A ALTERAR' },
                        { obs: 'A', cod: '34', oco: 'BAIXA POR TER SIDO PAGO DIRETAMENTE AO BENEFICIÁRIO', cne: '' },
                        { obs: 'B,G', cod: '35', oco: 'CANCELAMENTO DE INSTRUÇÃO', cne: 'CÓDIGO DA INSTRUÇÃO' },
                        { obs: 'A', cod: '37', oco: 'ALTERAÇÃO DO VENCIMENTO E SUSTAR PROTESTO', cne: 'VENCIMENTO' },
                        { obs: 'A,E', cod: '38', oco: 'BENEFICIÁRIO NÃO CONCORDA COM ALEGAÇÃO DO PAGADOR', cne: 'CÓDIGO DA ALEGAÇÃO' },
                        { obs: 'A,D', cod: '47', oco: 'BENEFICIÁRIO SOLICITA DISPENSA DE JUROS', cne: '' },
                        { obs: 'B,D', cod: '49', oco: 'ALTERAÇÃO DE DADOS EXTRAS (REGISTRO DE MULTA)', cne: '' },
                        { obs: 'B,C', cod: '66', oco: 'ENTRADA EM NEGATIVAÇÃO EXPRESSA', cne: '' },
                        { obs: 'B,D', cod: '67', oco: 'NÃO NEGATIVAR (INIBE A ENTRADA EM NEGATIVAÇÃO EXPRESSA)', cne: '' },
                        { obs: 'B,F', cod: '68', oco: 'EXCLUIR NEGATIVAÇÃO EXPRESSA (ATÉ 15 DIAS CORRIDOS APÓS A ENTRADA EM NEGATIVAÇÃO EXPRESSA)', cne: '' },
                        { obs: 'B', cod: '69', oco: 'CANCELAR NEGATIVAÇÃO EXPRESSA (APÓS TÍTULO TER SIDO NEGATIVADO)', cne: '' },
                        { obs: 'H', cod: '93', oco: 'DESCONTAR TÍTULOS ENCAMINHADOS NO DIA', cne: '' }
                    ]
                }]
            },
            {
                type: NoteContentType.LIST,
                listData: [
                    "(A) São obrigatórios os seguintes campos, além dos indicados na tabela: - Tipo de Registro; - Número da Carteira; - Agência/Conta/Dac da Empresa; - Código da Carteira; - Nosso Número; - Valor do Título. Os demais campos devem ser preenchidos com zeros ou brancos, obedecendo a sua picture.",
                    "(B) São obrigatórios os seguintes campos, além dos indicados na tabela: - Tipo de Registro; - Número da Carteira; - Agência/Conta/Dac da Empresa; - Código da Carteira; - Nosso Número. Os campos sem alteração devem ser preenchidos com zeros ou brancos, obedecendo a sua picture. A alteração do valor do boleto deverá ser feita isoladamente, sem nenhuma outra alteração no mesmo registro.",
                    "(C) Utilizada para agendar uma negativação ou protesto futuro sendo que o prazo de início de protesto deverá ser indicado nas posições 392 à 393, a partir do vencimento. Caso seja informado '00' no campo prazo, o processo de protesto será acionado 02 dias (corridos) após o vencimento. No caso da ocorrência “11”, o beneficiário passa a ter prioridade no recebimento quando o pagador estiver com falência decretada",
                    "(D) Somente são aceitas antes de iniciar o processo de negativação ou protesto. Se a negativação ou o protesto já estiver em andamento, deve-se primeiro excluir a entrada em negativação expressa ou sustar o protesto e em seguida comandar a instrução desejada (a exclusão, a sustação e a instrução podem constar no mesmo arquivo). A instrução de baixa envia a exclusão ou cancelamento da negativação expressa ou susta automaticamente o protesto e o título é baixado.",
                    "(E) O código da alegação do pagador deverá ser informado nas posições 34 a 37 do registro de transação conforme nota 20, tabela 6, campo CÓD.",
                    "(F) Deve ser utilizada também quando se deseja cancelar uma instrução de negativação expressa ou protesto comandada no registro de entrada, mesmo que o título ainda não tenha sido protestado.",
                    "(G) O código da instrução a ser cancelada (1156 - Não Protestar ou 2261 - Dispensar juros/comissão de permanência) deverá ser informado nas posições 34 a 37 do registro de transação.",
                    "(H) Utilizada para indicar títulos encaminhados no dia e que passarão pelo qualificador de crédito e que dependendo da qualificação, poderão ser descontados no próprio dia da remessa do arquivo."
                ]
            }
        ]
    },
    7: {
        id: 7,
        description: 'Vencimento',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                'Conforme determinado pelo Banco Central do Brasil na circular 3.656 e 02/04/2013, todo boleto deve possuir vencimento, não sendo permitido vencimento “à vista” ou “na apresentação”.',
                'Não é mais permitido vencimento “9999999”, onde era até então impresso “À VISTA”.'
            ]
        }]
    },
    8: {
        id: 8,
        description: 'Valor do boleto',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                'O boleto deverá ter seu valor expresso em reais na data de entrada, mesmo quando cobrado em moeda variável.',
                'ATENÇÃO: Conforme determinado pelo Banco Central do Brasil na circular 3.656 e 02/04/2013, todo boleto deve possuir o valor expresso, não sendo permitido valor em branco ou zerado.'
            ]
        }]
    },
    9: {
        id: 9,
        description: 'Agência cobradora',
        content: [
            {
                type: NoteContentType.TEXT,
                text: [ 'No arquivo remessa, preencher com zeros. O Itaú define a agência cobradora pelo CEP do pagador. No arquivo retorno, poderá conter:' ],
            },
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columns: [
                        { field: 'age', label: 'AGÊNCIA', width: '20%' },
                        { field: 'sig', label: 'SIGNIFICADO', width: '80%' }
                    ],
                    data: [
                        { age: '7744', sig: 'PEDIDO DE BAIXA EFETUADO PELO BENEFICIÁRIO' },
                        { age: '7788', sig: 'BAIXA AUTOMÁTICA DECORRENTE DE: INSTRUÇÃO CADASTRADA A NÍVEL CONTA CORRENTE, INSTRUÇÃO COMANDADA NO REGISTRO DE ENTRADA OU PELO PADRÃO DO ITAÚ (120 DIAS APÓS O VENCIMENTO DO TÍTULO)' },
                        { age: '7777', sig: 'BAIXA SOLICITADA VIA BANKLINE OU PELA AGÊNCIA VIA ESTAÇÃO ADMINISTRATIVA' },
                        { age: '9999', sig: 'O ITAÚ NÃO POSSUI AGÊNCIA PARA O CEP INDICADO ' },
                        { age: 'OUTROS', sig: 'Nº DA AGÊNCIA / ÓRGÃO QUE EFETUARÁ A COBRANÇA OU QUE EXECUTOU A BAIXA / LIQUIDAÇÃO' }
                    ]
                }]
            }
        ]
    },
    10: {
        id: 10,
        description: 'Espécie',
        content: [{
            type: NoteContentType.TABLE,
            tableData: [{
                columns: [
                    { field: 'cod', label: 'CÓD.', width: '20%' },
                    { field: 'esp', label: 'ESPÉCIE', width: '80%' }
                ],
                data: [
                    { cod: '01', esp: 'DUPLICATA MERCANTIL' },
                    { cod: '02', esp: 'NOTA PROMISSÓRIA' },
                    { cod: '03', esp: 'NOTA DE SEGURO' },
                    { cod: '04', esp: 'MENSALIDADE ESCOLAR' },
                    { cod: '05', esp: 'RECIBO' },
                    { cod: '06', esp: 'CONTRATO' },
                    { cod: '07', esp: 'COSSEGUROS' },
                    { cod: '08', esp: 'DUPLICATA DE SERVIÇO' },
                    { cod: '09', esp: 'LETRA DE CÂMBIO' },
                    { cod: '13', esp: 'NOTA DE DÉBITOS' },
                    { cod: '15', esp: 'DOCUMENTO DE DÍVIDA' },
                    { cod: '16', esp: 'ENCARGOS CONDOMINIAIS' },
                    { cod: '17', esp: 'CONTA DE PRESTAÇÃO DE SERVIÇOS' },
                    { cod: '18', esp: 'BOLETO DE PROPOSTA*' },
                    { cod: '99', esp: 'DIVERSOS' }
                ],
                observation: "* O Boleto de Proposta é uma modalidade de boleto utilizada para possibilitar o pagamento decorrente da eventual aceitação de uma oferta de produto ou serviço, de uma proposta de contrato civil ou de um convite para associação. Esta modalidade possui layout especifico para desenvolvimento, que deve ser solicitado ao banco."
            }]
        }]
    },
    11: {
        id: 11,
        description: 'Instruções de cobrança',
        content: [
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columns: [
                        { field: 'obs', label: 'OBS', width: '10%' },
                        { field: 'imb', label: 'IMPRESSÃO NO BOLETO', width: '20%' },
                        { field: 'cod', label: 'CÓD.', width: '10%' },
                        { field: 'ins', label: 'INSTRUÇÃO', width: '60%' }
                    ],
                    data: [
                        { obs: '', imb: 'SIM', cod: '02', ins: 'DEVOLVER APÓS 05 DIAS DO VENCIMENTO' },
                        { obs: '', imb: 'SIM', cod: '03', ins: 'DEVOLVER APÓS 30 DIAS DO VENCIMENTO' },
                        { obs: '', imb: 'SIM', cod: '05', ins: 'RECEBER CONFORME INSTRUÇÕES NO PRÓPRIO TÍTULO' },
                        { obs: '', imb: 'SIM', cod: '06', ins: 'DEVOLVER APÓS 10 DIAS DO VENCIMENTO' },
                        { obs: '', imb: 'SIM', cod: '07', ins: 'DEVOLVER APÓS 15 DIAS DO VENCIMENTO' },
                        { obs: '', imb: 'SIM', cod: '08', ins: 'DEVOLVER APÓS 20 DIAS DO VENCIMENTO' },
                        { obs: 'A', imb: 'NÃO', cod: '09', ins: 'PROTESTAR' },
                        { obs: 'G   ', imb: 'NÃO', cod: '10',      ins: 'NÃO PROTESTAR (inibe protesto, quando houver instrução permanente na conta corrente)' },
                        { obs: '    ', imb: 'SIM', cod: '11',      ins: 'DEVOLVER APÓS 25 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '12',      ins: 'DEVOLVER APÓS 35 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '13',      ins: 'DEVOLVER APÓS 40 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '14',      ins: 'DEVOLVER APÓS 45 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '15',      ins: 'DEVOLVER APÓS 50 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '16',      ins: 'DEVOLVER APÓS 55 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '17',      ins: 'DEVOLVER APÓS 60 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '18',      ins: 'DEVOLVER APÓS 90 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '19',      ins: 'NÃO RECEBER APÓS 05 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '20',      ins: 'NÃO RECEBER APÓS 10 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '21',      ins: 'NÃO RECEBER APÓS 15 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '22',      ins: 'NÃO RECEBER APÓS 20 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '23',      ins: 'NÃO RECEBER APÓS 25 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '24',      ins: 'NÃO RECEBER APÓS 30 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '25',      ins: 'NÃO RECEBER APÓS 35 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '26',      ins: 'NÃO RECEBER APÓS 40 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '27',      ins: 'NÃO RECEBER APÓS 45 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '28',      ins: 'NÃO RECEBER APÓS 50 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '29',      ins: 'NÃO RECEBER APÓS 55 DIAS DO VENCIMENTO' },
                        { obs: 'E   ', imb: 'SIM', cod: '30',      ins: 'IMPORTÂNCIA DE DESCONTO POR DIA' },
                        { obs: '    ', imb: 'SIM', cod: '31',      ins: 'NÃO RECEBER APÓS 60 DIAS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '32',      ins: 'NÃO RECEBER APÓS 90 DIAS DO VENCIMENTO' },
                        { obs: 'I   ', imb: 'SIM', cod: '33',      ins: 'CONCEDER ABATIMENTO REF. À PIS-PASEP/COFIN/CSSL, MESMO APÓS VENCIMENTO' },
                        { obs: 'A, H', imb: 'SIM', cod: '34',      ins: 'PROTESTAR APÓS XX DIAS CORRIDOS DO VENCIMENTO' },
                        { obs: 'A, H', imb: 'SIM', cod: '35',      ins: 'PROTESTAR APÓS XX DIAS ÚTEIS DO VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '37',      ins: 'RECEBER ATÉ O ÚLTIMO DIA DO MÊS DE VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '38',      ins: 'CONCEDER DESCONTO MESMO APÓS VENCIMENTO' },
                        { obs: 'A   ', imb: 'SIM', cod: '39',      ins: 'NÃO RECEBER APÓS O VENCIMENTO' },
                        { obs: '    ', imb: 'SIM', cod: '40',      ins: 'CONCEDER DESCONTO CONFORME NOTA DE CRÉDITO' },
                        { obs: 'A   ', imb: 'NÃO', cod: '42',      ins: 'PROTESTO PARA FINS FALIMENTARES' },
                        { obs: '    ', imb: 'SIM', cod: '43',      ins: 'SUJEITO A PROTESTO SE NÃO FOR PAGO NO VENCIMENTO' },
                        { obs: 'F   ', imb: 'SIM', cod: '44',      ins: 'IMPORTÂNCIA POR DIA DE ATRASO A PARTIR DE DDMMAA' },
                        { obs: '    ', imb: 'SIM', cod: '45',      ins: 'TEM DIA DA GRAÇA' },
                        { obs: '    ', imb: 'SIM', cod: '46',      ins: 'USO DO BANCO' },
                        { obs: '    ', imb: 'SIM', cod: '47',      ins: 'DISPENSAR JUROS/COMISSÃO DE PERMANÊNCIA' },
                        { obs: '    ', imb: 'SIM', cod: '51',      ins: 'RECEBER SOMENTE COM A PARCELA ANTERIOR QUITADA' },
                        { obs: '    ', imb: 'SIM', cod: '52',      ins: 'EFETUAR O PAGAMENTO SOMENTE ATRAVÉS DESTE BOLETO E NA REDE BANCÁRIA' },
                        { obs: '    ', imb: 'SIM', cod: '53',      ins: 'USO DO BANCO' },
                        { obs: '    ', imb: 'SIM', cod: '54',      ins: 'APÓS VENCIMENTO PAGÁVEL SOMENTE NA EMPRESA' },
                        { obs: '    ', imb: 'SIM', cod: '56',      ins: 'USO DO BANCO' },
                        { obs: '    ', imb: 'SIM', cod: '57',      ins: 'SOMAR VALOR DO TÍTULO AO VALOR DO CAMPO MORA/MULTA CASO EXISTA' },
                        { obs: '    ', imb: 'SIM', cod: '58',      ins: 'DEVOLVER APÓS 365 DIAS DE VENCIDO' },
                        { obs: '    ', imb: 'SIM', cod: '59',      ins: 'COBRANÇA NEGOCIADA. PAGÁVEL SOMENTE POR ESTE BOLETO NA REDE BANCÁRIA' },
                        { obs: '    ', imb: 'SIM', cod: '61',      ins: 'TÍTULO ENTREGUE EM PENHOR EM FAVOR DO BENEFICIÁRIO ACIMA' },
                        { obs: '    ', imb: 'SIM', cod: '62',      ins: 'TÍTULO TRANSFERIDO A FAVOR DO BENEFICIÁRIO' },
                        { obs: 'A   ', imb: 'SIM', cod: '66',      ins: 'ENTRADA EM NEGATIVAÇÃO EXPRESSA (IMPRIME: SUJEITO A NEGATIVAÇÃO APÓS O VENCIMENTO)' },
                        { obs: 'A,G ', imb: 'NÃO', cod: '67',      ins: 'NÃO NEGATIVAR (INIBE A ENTRADA EM NEGATIVAÇÃO EXPRESSA)' },
                        { obs: '    ', imb: 'SIM', cod: '70 A 75', ins: 'USO DO BANCO' },
                        { obs: '    ', imb: 'SIM', cod: '78',      ins: 'VALOR DA IDA ENGLOBA MULTA DE 10% PRO RATA' },
                        { obs: '    ', imb: 'SIM', cod: '79',      ins: 'COBRAR JUROS APÓS 15 DIAS DA EMISSÃO (para títulos com vencimento à vista)' },
                        { obs: '    ', imb: 'SIM', cod: '80',      ins: 'PAGAMENTO EM CHEQUE: SOMENTE RECEBER COM CHEQUE DE EMISSÃO DO PAGADOR' },
                        { obs: ' ', imb: 'SIM', cod: '83', ins: 'OPERAÇÃO REF A VENDOR' },
                        { obs: ' ', imb: 'SIM', cod: '84', ins: 'APÓS VENCIMENTO CONSULTAR A AGÊNCIA BENEFICIÁRIO' },
                        { obs: ' ', imb: 'SIM', cod: '86', ins: 'ANTES DO VENCIMENTO OU APÓS 15 DIAS, PAGÁVEL SOMENTE EM NOSSA SEDE' },
                        { obs: ' ', imb: 'SIM', cod: '87', ins: 'USO DO BANCO' },
                        { obs: ' ', imb: 'SIM', cod: '88', ins: 'NÃO RECEBER ANTES DO VENCIMENTO' },
                        { obs: ' ', imb: 'SIM', cod: '89', ins: 'USO DO BANCO' },
                        { obs: ' ', imb: 'SIM', cod: '90', ins: 'NO VENCIMENTO PAGÁVEL EM QUALQUER AGÊNCIA BANCÁRIA' },
                        { obs: 'A', imb: 'SIM', cod: '91', ins: 'NÃO RECEBER APÓS XX DIAS DO VENCIMENTO' },
                        { obs: 'A', imb: 'SIM', cod: '92', ins: 'DEVOLVER APÓS XX DIAS DO VENCIMENTO' },
                        { obs: 'B', imb: 'SIM', cod: '93', ins: 'MENSAGENS NOS BOLETOS COM 30 POSIÇÕES' },
                        { obs: 'C', imb: 'SIM', cod: '94', ins: 'MENSAGENS NOS BOLETOS COM 40 POSIÇÕES' },
                        { obs: ' ', imb: 'SIM', cod: '95', ins: 'A 97 USO DO BANCO' },
                        { obs: 'D', imb: 'LER OBS D', cod: '98', ins: 'DUPLICATA / FATURA Nº' }
                    ]
                }],
            },
            {
                type: NoteContentType.LIST,
                listData: [
                    '(A) Informar a quantidade de dias nas posições 392 a 393. No caso da instrução “42”, o beneficiário passa a ter prioridade no recebimento quando o pagador estiver com falência decretada. A quantidade de dias será utilizada para as instruções de negativação expressa e protesto, não sendo possível informar no arquivo remessa de entrada as instruções de negativação e protesto, simultaneamente para o mesmo título. Se forem enviadas as duas instruções, a única a ser considerada será a instrução da negativação. Na negativação, caso o campo quantidade de dias seja informado com zeros, será considerado o prazo de 2 (dois) dias corridos após o vencimento. No caso da instrução “39”, se informar “00” será impresso no boleto a literal “NÃO RECEBER APÓS O VENCIMENTO”.',
                    '(B) Informar a mensagem nas posições 352 a 381; o conteúdo da mensagem será informado na primeira linha disponível no campo de “instruções” do boleto. Caso todas as linhas deste campo estejam ocupadas, a mensagem será impressa acima do campo “Sacador / Avalista”. Utilizando-se deste campo para instrução “93”, para indicação do nome e dados do sacador / avalista, deve-se utilizar-se do registro tipo “1” ou do registro tipo “5”.',
                    '(C) Informar a mensagem nas posições 352 a 391; o conteúdo da mensagem será informado na primeira linha disponível no campo de “instruções” do boleto. Caso todas as linhas deste campo estejam ocupadas, a mensagem será impressa nos campos “Sacador / Avalista” e “data da mora”. Utilizandose deste campo para instrução “94”, para indicação do nome e dados do sacador / avalista, deve-se utilizar-se do registro tipo “1” ou do registro tipo “5”.',
                    '(D) Informar o número da Duplicata/Fatura nas posições 087 a 106. Se este campo estiver com brancos ou zeros, a mensagem não será impressa.',
                    '(E) Informar o valor do desconto por dia nas posições 180 a 192.',
                    '(F) Informar o valor por dia de atraso nas posições 161 a 173 e a data nas posições 386 a 391.',
                    '(G) Pode ser cancelada pela agência, Itaú Empresas na Internet ou através de arquivo, Código de Ocorrência 35, Nota 6, (utilizando a instrução 2196). Depois de cancelada, comandar a instrução de protesto novamente.',
                    '(H) É impressa mensagem no boleto informando prazo de protesto.',
                    '(I) Informar o VALOR do abatimento (nunca em percentual) referente a PIS-PASEP/COFIN/CSSL nas posições 206 a 218. A instrução será impressa no boleto com a literal: “ABATIMENTO DE XXXX.XXX,XX REF. PIS-PASEP/COFIN/CSSL, MESMO APOS VCTO”.'
                ]
            }
        ]
    },
    12: {
        id: 12,
        description: 'Juros de 1 dia',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "Se o cliente optar pelo padrão do Itaú ou solicitar o cadastramento permanente na conta corrente, não haverá a necessidade de informar esse valor no arquivo",
                "Caso seja expresso em moeda variável, deverá ser preenchido com cinco casas decimais."
            ]
        }]
    },
    13: {
        id: 13,
        description: 'Valor do desconto/abatimento',
        content: [{
            type: NoteContentType.TEXT,
            text: ["O sistema limita o desconto concedido a 90% do valor de entrada do boleto. Para um mesmo boleto podem ser concedidos mais dois descontos (Nota 16)."]
        }]
    },
    14: {
        id: 14,
        description: 'Valor do IOF',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "Indica o valor do IOF a ser retido pelo Itaú e repassado à SRF, de uso exclusivo por seguradoras",
                "Quando o título for expresso em moeda variável, esse campo também deverá ser expresso em quantidades dessa moeda, com cinco casas decimais."
            ]
        }]
    },
    15: {
        id: 15,
        description: 'Nome do pagador/brancos',
        content: [{
            type: NoteContentType.TEXT,
            text: ["Os dois campos podem ser agrupados para registrar o nome do pagador. Se agrupados, o sistema do Itaú tentará abreviar o nome para 30 posições (ex.: Companhia = Cia), truncando o restante."]
        }]
    },
    16: {
        id: 16,
        description: 'Sacador/Avalista',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "Normalmente deve ser preenchido com o nome do sacador/avalista. Alternativamente este campo poderá ter dois outros usos: ",
                "(02) 2º e 3º descontos: para se operar com mais de um desconto (depende de cadastramento prévio do indicador 19.0 pelo Itaú, conforme Item 5), deve-se respeitar a seguinte disposição:",
                "- Posição 352 a 353 : Brancos",
                "- Posição 354 a 359 : Data do 2º desconto (DDMMAA)",
                "- Posição 360 a 372 : Valor do 2º desconto",
                "- Posição 373 a 378 : Data do 3º desconto (DDMMAA)",
                "- Posição 379 a 391 : Valor do 3º desconto",
                "- Posição 392 a 394 : Brancos",
                "b) Mensagens ao pagador: se utilizados as instruções 93 ou 94 (Nota 11), transcrever a mensagem desejada.",
                "É proibido o repasse e mensagens de tarifa no boleto ao pagador."
            ]
        }]
    },
    17: {
        id: 17,
        description: 'Código de ocorrência (arquivo retorno)',
        content: [{
            type: NoteContentType.TABLE,
            tableData: [{
                columns: [
                    { field: 'cod', label: 'CÓD.', width: '10%' },
                    { field: 'oco', label: 'OCORRÊNCIAS', width: '90%' }
                ],
                data: [
                    { cod: '02', oco: 'ENTRADA CONFIRMADA COM POSSIBILIDADE DE MENSAGEM (NOTA 20 - TABELA 10)' },
                    { cod: '03', oco: 'ENTRADA REJEITADA (NOTA 20 - TABELA 1)' },
                    { cod: '04', oco: 'ALTERAÇÃO DE DADOS - NOVA ENTRADA OU ALTERAÇÃO/EXCLUSÃO DE DADOS ACATADA' },
                    { cod: '05', oco: 'ALTERAÇÃO DE DADOS - BAIXA' },
                    { cod: '06', oco: 'LIQUIDAÇÃO NORMAL' },
                    { cod: '07', oco: 'LIQUIDAÇÃO PARCIAL - COBRANÇA INTELIGENTE (B2B)' },
                    { cod: '08', oco: 'LIQUIDAÇÃO EM CARTÓRIO' },
                    { cod: '09', oco: 'BAIXA SIMPLES' },
                    { cod: '10', oco: 'BAIXA POR TER SIDO LIQUIDADO' },
                    { cod: '11', oco: 'EM SER (SÓ NO RETORNO MENSAL)' },
                    { cod: '12', oco: 'ABATIMENTO CONCEDIDO' },
                    { cod: '13', oco: 'ABATIMENTO CANCELADO' },
                    { cod: '14', oco: 'VENCIMENTO ALTERADO' },
                    { cod: '15', oco: 'BAIXAS REJEITADAS (NOTA 20 - TABELA 4)' },
                    { cod: '16', oco: 'INSTRUÇÕES REJEITADAS (NOTA 20 - TABELA 3)' },
                    { cod: '17', oco: 'ALTERAÇÃO/EXCLUSÃO DE DADOS REJEITADOS (NOTA 20 - TABELA 2)' },
                    { cod: '18', oco: 'COBRANÇA CONTRATUAL - INSTRUÇÕES/ALTERAÇÕES REJEITADAS/PENDENTES (NOTA 20 - TABELA 5)' },
                    { cod: '19', oco: 'CONFIRMA RECEBIMENTO DE INSTRUÇÃO DE PROTESTO' },
                    { cod: '20', oco: 'CONFIRMA RECEBIMENTO DE INSTRUÇÃO DE SUSTAÇÃO DE PROTESTO /TARIFA' },
                    { cod: '21', oco: 'CONFIRMA RECEBIMENTO DE INSTRUÇÃO DE NÃO PROTESTAR' },
                    { cod: '23', oco: 'TÍTULO ENVIADO A CARTÓRIO/TARIFA' },
                    { cod: '24', oco: 'INSTRUÇÃO DE PROTESTO REJEITADA / SUSTADA / PENDENTE (NOTA 20 - TABELA 7)' },
                    { cod: '25', oco: 'ALEGAÇÕES DO PAGADOR (NOTA 20 - TABELA 6)' },
                    { cod: '26', oco: 'TARIFA DE AVISO DE COBRANÇA' },
                    { cod: '27', oco: 'TARIFA DE EXTRATO POSIÇÃO (B40X)' },
                    { cod: '28', oco: 'TARIFA DE RELAÇÃO DAS LIQUIDAÇÕES' },
                    { cod: '29', oco: 'TARIFA DE MANUTENÇÃO DE TÍTULOS VENCIDOS' },
                    { cod: '30', oco: 'DÉBITO MENSAL DE TARIFAS (PARA ENTRADAS E BAIXAS)' },
                    { cod: '32', oco: 'BAIXA POR TER SIDO PROTESTADO' },
                    { cod: '33', oco: 'CUSTAS DE PROTESTO' },
                    { cod: '34', oco: 'CUSTAS DE SUSTAÇÃO' },
                    { cod: '35', oco: 'CUSTAS DE CARTÓRIO DISTRIBUIDOR' },
                    { cod: '36', oco: 'CUSTAS DE EDITAL' },
                    { cod: '37', oco: 'TARIFA DE EMISSÃO DE BOLETO/TARIFA DE ENVIO DE DUPLICATA' },
                    { cod: '38', oco: 'TARIFA DE INSTRUÇÃO' },
                    { cod: '39', oco: 'TARIFA DE OCORRÊNCIAS' },
                    { cod: '40', oco: 'TARIFA MENSAL DE EMISSÃO DE BOLETO/TARIFA MENSAL DE ENVIO DE DUPLICATA' },
                    { cod: '41', oco: 'DÉBITO MENSAL DE TARIFAS - EXTRATO DE POSIÇÃO (B4EP/B4OX)' },
                    { cod: '42', oco: 'DÉBITO MENSAL DE TARIFAS - OUTRAS INSTRUÇÕES' },
                    { cod: '43', oco: 'DÉBITO MENSAL DE TARIFAS - MANUTENÇÃO DE TÍTULOS VENCIDOS' },
                    { cod: '44', oco: 'DÉBITO MENSAL DE TARIFAS - OUTRAS OCORRÊNCIAS' },
                    { cod: '45', oco: 'DÉBITO MENSAL DE TARIFAS - PROTESTO' },
                    { cod: '46', oco: 'DÉBITO MENSAL DE TARIFAS - SUSTAÇÃO DE PROTESTO' },
                    { cod: '47', oco: 'BAIXA COM TRANSFERÊNCIA PARA DESCONTO' },
                    { cod: '48', oco: 'CUSTAS DE SUSTAÇÃO JUDICIAL' },
                    { cod: '51', oco: 'TARIFA MENSAL REF A ENTRADAS BANCOS CORRESPONDENTES NA CARTEIRA' },
                    { cod: '52', oco: 'TARIFA MENSAL BAIXAS NA CARTEIRA' },
                    { cod: '53', oco: 'TARIFA MENSAL BAIXAS EM BANCOS CORRESPONDENTES NA CARTEIRA' },
                    { cod: '54', oco: 'TARIFA MENSAL DE LIQUIDAÇÕES NA CARTEIRA' },
                    { cod: '55', oco: 'TARIFA MENSAL DE LIQUIDAÇÕES EM BANCOS CORRESPONDENTES NA CARTEIRA' },
                    { cod: '56', oco: 'CUSTAS DE IRREGULARIDADE' },
                    { cod: '57', oco: 'INSTRUÇÃO CANCELADA (NOTA 20 - TABELA 8)' },
                    { cod: '59', oco: 'BAIXA POR CRÉDITO EM C/C ATRAVÉS DO SISPAG' },
                    { cod: '60', oco: 'ENTRADA REJEITADA CARNÊ (NOTA 20 - TABELA 1)' },
                    { cod: '61', oco: 'TARIFA EMISSÃO AVISO DE MOVIMENTAÇÃO DE TÍTULOS (2154)' },
                    { cod: '62', oco: 'DÉBITO MENSAL DE TARIFA - AVISO DE MOVIMENTAÇÃO DE TÍTULOS (2154)' },
                    { cod: '63', oco: 'TÍTULO SUSTADO JUDICIALMENTE' },
                    { cod: '64', oco: 'ENTRADA CONFIRMADA COM RATEIO DE CRÉDITO' },
                    { cod: '65', oco: 'PAGAMENTO COM CHEQUE - AGUARDANDO COMPENSAÇÃO' },
                    { cod: '69', oco: 'CHEQUE DEVOLVIDO (NOTA 20 - TABELA 9)' },
                    { cod: '71', oco: 'ENTRADA REGISTRADA, AGUARDANDO AVALIAÇÃO' },
                    { cod: '72', oco: 'BAIXA POR CRÉDITO EM C/C ATRAVÉS DO SISPAG SEM TÍTULO CORRESPONDENTE' },
                    { cod: '73', oco: 'CONFIRMAÇÃO DE ENTRADA NA COBRANÇA SIMPLES - ENTRADA NÃO ACEITA NA COBRANÇA CONTRATUAL' },
                    { cod: '74', oco: 'INSTRUÇÃO DE NEGATIVAÇÃO EXPRESSA REJEITADA (NOTA 20 - TABELA 11)' },
                    { cod: '75', oco: 'CONFIRMAÇÃO DE RECEBIMENTO DE INSTRUÇÃO DE ENTRADA EM NEGATIVAÇÃO EXPRESSA' },
                    { cod: '76', oco: 'CHEQUE COMPENSADO' },
                    { cod: '77', oco: 'CONFIRMAÇÃO DE RECEBIMENTO DE INSTRUÇÃO DE EXCLUSÃO DE ENTRADA EM NEGATIVAÇÃO EXPRESSA' },
                    { cod: '78', oco: 'CONFIRMAÇÃO DE RECEBIMENTO DE INSTRUÇÃO DE CANCELAMENTO DE NEGATIVAÇÃO EXPRESSA' },
                    { cod: '79', oco: 'NEGATIVAÇÃO EXPRESSA INFORMACIONAL (NOTA 20 - TABELA 12)' },
                    { cod: '80', oco: 'CONFIRMAÇÃO DE ENTRADA EM NEGATIVAÇÃO EXPRESSA - TARIFA' },
                    { cod: '82', oco: 'CONFIRMAÇÃO DO CANCELAMENTO DE NEGATIVAÇÃO EXPRESSA - TARIFA' },
                    { cod: '83', oco: 'CONFIRMAÇÃO DE EXCLUSÃO DE ENTRADA EM NEGATIVAÇÃO EXPRESSA POR LIQUIDAÇÃO - TARIFA' },
                    { cod: '85', oco: 'TARIFA POR BOLETO (ATÉ 03 ENVIOS) COBRANÇA ATIVA ELETRÔNICA' },
                    { cod: '86', oco: 'TARIFA EMAIL COBRANÇA ATIVA ELETRÔNICA' },
                    { cod: '87', oco: 'TARIFA SMS COBRANÇA ATIVA ELETRÔNICA' },
                    { cod: '88', oco: 'TARIFA MENSAL POR BOLETO (ATÉ 03 ENVIOS) COBRANÇA ATIVA ELETRÔNICA' },
                    { cod: '89', oco: 'TARIFA MENSAL EMAIL COBRANÇA ATIVA ELETRÔNICA' },
                    { cod: '90', oco: 'TARIFA MENSAL SMS COBRANÇA ATIVA ELETRÔNICA' },
                    { cod: '91', oco: 'TARIFA MENSAL DE EXCLUSÃO DE ENTRADA DE NEGATIVAÇÃO EXPRESSA' },
                    { cod: '92', oco: 'TARIFA MENSAL DE CANCELAMENTO DE NEGATIVAÇÃO EXPRESSA' },
                    { cod: '93', oco: 'TARIFA MENSAL DE EXCLUSÃO DE NEGATIVAÇÃO EXPRESSA POR LIQUIDAÇÃO ' }
                ]
            }]
        }]
    },
    18: {
        id: 18,
        description: 'Nº do documento',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "No arquivo remessa, sugerimos o preenchimento com o nº do documento que originou a cobrança (nº duplicata, Nota fiscal, etc.).",
                "No arquivo retorno, devolveremos o mesmo conteúdo enviado no arquivo remessa.",
                "Exemplo: considerando-se os seguintes dados",
                "* nº da agência : 0057",
                "* nº da conta corrente sem o DAC : 72192",
                "* nº da subcarteira : 198",
                "* nosso número : 98712345",
                "* seu número : 1108954",
                "1º - Cálculo do DAC do 'Nosso Número': conforme Nota 23 o DAC é 1.",
                "2º - Montagem do campo 'Seu Número' e multiplicação:",
                "1108954 * 2121212 = 21081858",
                "3º - Soma dos dígitos dos produtos (cada dígito é somado individualmente), como segue:",
                "2+1+0+8+1+8+5+8 = 33",
                "4º - Dividir o resultado da conta por 10:",
                "33 / 10 = 3 (resto = 3)",
                "10 (módulo) - 3 (resto da divisão) = 7",
                "Portanto:",
                "- a impressão do campo nosso número no boleto deve ser '198/98712345-1'",
                "- a impressão do campo seu número no boleto deve ser '1108954-7'"
            ]
        }]
    },
    19: {
        id: 19,
        description: 'Desconto / abatimento',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "Se o desconto ou abatimento é concedido na entrada do boleto estes campos são retornados zerados (apesar de corretamente registrados no Itaú). Se concedidos após a entrada, retornam com os valores do desconto ou abatimento.",
                "Na liquidação, desconto e abatimento retornam somados no campo desconto; opcionalmente, mediante cadastro prévio em nosso sistema, estes valores poderão retornar separados, conforme mostra o indicador 36.4 do Item 5 - Condições Personalizadas."
            ]
        }]
    },
    20: {
        id: 20,
        description: 'ERROS / CANCELAMENTO DE INSTRUÇÕES / ALEGAÇÕES DO PAGADOR / MOTIVO DE DEVOLUÇÃO DO CHEQUE',
        content: [
            {
                type: NoteContentType.TEXT,
                text: [
                    "Para as confirmações de entrada (código de ocorrência 02), em determinadas situações, pode-se ler nas posições 378 a 385, mensagem informativa referente ao título em questão, conforme tabela 10.",
                    "Para os registros rejeitados (códigos de ocorrência 03, 15, 16, 17 e 18) pode-se ler nas posições 378 a 385 até quatro códigos de erro que explicam o motivo da rejeição. O indicador 38.0 (vide capítulo 5 - Condições Personalizadas) define quais desses registros serão gerados pelo Itaú.",
                    "Para cancelamento de instruções (Ocorrência 57) é retornado na posição 302 a 305, o código da instrução cancelada, conforme tabela 8.",
                    "Para as alegações do pagador (Ocorrência 25) e para ordem de protesto sustada (ocorrência 24), são retornados os seguintes campos adicionais, conforme tabelas 6 e 7 respectivamente: ",
                    "- Posição 302 a 305: código complementar da ocorrência",
                    "- Posição 306 a 311: data complementar da ocorrência do pagador",
                    "- Posição 312 a 324: valor complementar da ocorrência do pagador"
                ]
            },
            {
                type: NoteContentType.TABLE,
                tableData: [
                    {
                        description: 'TABELA 1 - Entradas Rejeitadas (código da ocorrência = 03 na Posição 109 a 110)',
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'campoErro', label: 'CAMPO COM ERRO', width: '30%' },
                            { field: 'descErro', label: 'DESCRIÇÃO DO ERRO', width: '60%' }
                        ],
                        data: [
                            { cod: '03', campoErro: 'AG. COBRADORA', descErro: 'CEP SEM ATENDIMENTO DE PROTESTO NO MOMENTO' },
                            { cod: '04', campoErro: 'ESTADO', descErro: 'SIGLA DO ESTADO INVÁLIDA' },
                            { cod: '05', campoErro: 'DATA VENCIMENTO', descErro: 'PRAZO DA OPERAÇÃO MENOR QUE PRAZO MÍNIMO OU MAIOR QUE O MÁXIMO' },
                            { cod: '07', campoErro: 'VALOR DO TÍTULO', descErro: 'VALOR DO TÍTULO MAIOR QUE 10.000.000,00' },
                            { cod: '08', campoErro: 'NOME DO PAGADOR', descErro: 'NÃO INFORMADO OU DESLOCADO' },
                            { cod: '09', campoErro: 'AGENCIA/CONTA', descErro: 'AGÊNCIA ENCERRADA' },
                            { cod: '10', campoErro: 'LOGRADOURO', descErro: 'NÃO INFORMADO OU DESLOCADO' },
                            { cod: '11', campoErro: 'CEP', descErro: 'CEP NÃO NUMERICO OU CEP INVALIDO' },
                            { cod: '12', campoErro: 'SACADOR / AVALISTA', descErro: 'NOME NÃO INFORMADO OU DESLOCADO (BANCOS CORRESPONDENTES)' },
                            { cod: '13', campoErro: 'ESTADO/CEP', descErro: 'CEP INCOMPATÍVEL COM A SIGLA DO ESTADO' },
                            { cod: '14', campoErro: 'NOSSO NÚMERO', descErro: 'NOSSO NÚMERO JÁ REGISTRADO NO CADASTRO DO BANCO OU FORA DA FAIXA' },
                            { cod: '15', campoErro: 'NOSSO NÚMERO', descErro: 'NOSSO NÚMERO EM DUPLICIDADE NO MESMO MOVIMENTO' },
                            { cod: '18', campoErro: 'DATA DE ENTRADA', descErro: 'DATA DE ENTRADA INVÁLIDA PARA OPERAR COM ESTA CARTEIRA' },
                            { cod: '19', campoErro: 'OCORRÊNCIA', descErro: 'OCORRÊNCIA INVÁLIDA' },
                            { cod: '21', campoErro: 'AG. COBRADORA', descErro: 'CARTEIRA NÃO ACEITA DEPOSITÁRIA CORRESPONDENTE; ESTADO DA AGÊNCIA DIFERENTE DO ESTADO DO PAGADOR; AG. COBRADORA NÃO CONSTA NO CADASTRO OU ENCERRANDO' },
                            { cod: '22', campoErro: 'CARTEIRA', descErro: 'CARTEIRA NÃO PERMITIDA (NECESSÁRIO CADASTRAR FAIXA LIVRE)' },
                            { cod: '26', campoErro: 'AGÊNCIA/CONTA', descErro: 'AGÊNCIA/CONTA NÃO LIBERADA PARA OPERAR COM COBRANÇA' },
                            { cod: '27', campoErro: 'CNPJ INAPTO', descErro: 'CNPJ DO BENEFICIÁRIO INAPTO; DEVOLUÇÃO DE TÍTULO EM GARANTIA' },
                            { cod: '29', campoErro: 'CÓDIGO EMPRESA', descErro: 'CATEGORIA DA CONTA INVÁLIDA' },
                            { cod: '30', campoErro: 'ENTRADA BLOQUEADA', descErro: 'ENTRADAS BLOQUEADAS, CONTA SUSPENSA EM COBRANÇA' },
                            { cod: '31', campoErro: 'AGÊNCIA/CONTA', descErro: 'CONTA NÃO TEM PERMISSÃO PARA PROTESTAR (CONTATE SEU GERENTE)' },
                            { cod: '35', campoErro: 'VALOR DO IOF', descErro: 'IOF MAIOR QUE 5%' },
                            { cod: '36', campoErro: 'QTDADE DE MOEDA', descErro: 'QUANTIDADE DE MOEDA INCOMPATÍVEL COM VALOR DO TÍTULO' },
                            { cod: '37', campoErro: 'CNPJ/CPF DO PAGADOR', descErro: 'NÃO NUMÉRICO OU IGUAL A ZEROS'},
                            { cod: '42', campoErro: 'NOSSO NÚMERO', descErro: 'NOSSO NÚMERO FORA DE FAIXA'},
                            { cod: '52', campoErro: 'AG. COBRADORA', descErro: 'EMPRESA NÃO ACEITA BANCO CORRESPONDENTE'},
                            { cod: '53', campoErro: 'AG. COBRADORA', descErro: 'EMPRESA NÃO ACEITA BANCO CORRESPONDENTE - COBRANÇA MENSAGEM'},
                            { cod: '54', campoErro: 'DATA DE VENCTO', descErro: 'BANCO CORRESPONDENTE - TÍTULO COM VENCIMENTO INFERIOR A 15 DIAS'},
                            { cod: '55', campoErro: 'DEP/BCO CORRESP', descErro: 'CEP NÃO PERTENCE À DEPOSITÁRIA INFORMADA'},
                            { cod: '56', campoErro: 'DT VENCTO/BCO CORRESP', descErro: 'VENCTO SUPERIOR A 180 DIAS DA DATA DE ENTRADA'},
                            { cod: '57', campoErro: 'DATA DE VENCTO', descErro: 'CEP SÓ DEPOSITÁRIA BCO DO BRASIL COM VENCTO INFERIOR A 8 DIAS'},
                            { cod: '60', campoErro: 'ABATIMENTO', descErro: 'VALOR DO ABATIMENTO INVALIDO'},
                            { cod: '61', campoErro: 'JUROS DE MORA', descErro: 'JUROS DE MORA MAIOR QUE O PERMITIDO'},
                            { cod: '62', campoErro: 'DESCONTO', descErro: 'VALOR DO DESCONTO MAIOR QUE VALOR DO TÍTULO'},
                            { cod: '63', campoErro: 'DESCONTO DE ANTECIPAÇÃO', descErro: 'VALOR DA IMPORTÅNCIA POR DIA DE DESCONTO (IDD) NÃO PERMITIDO'},
                            { cod: '64', campoErro: 'DATA DE EMISSÃO', descErro: 'DATA DE EMISSAO DO TÍTULO INVALIDA'},
                            { cod: '65', campoErro: 'TAXA FINANCTO', descErro: 'TAXA INVALIDA (VENDOR)'},
                            { cod: '66', campoErro: 'DATA DE VENCTO', descErro: 'INVALIDA/FORA DE PRAZO DE OPERAÇÃO (MINIMO OU MÁXIMO)'},
                            { cod: '67', campoErro: 'VALOR/QTIDADE', descErro: 'VALOR DO TÍTULO/QUANTIDADE DE MOEDA INVÁLIDO'},
                            { cod: '68', campoErro: 'CARTEIRA', descErro: 'CARTEIRA INVÁLIDA OU NÃO CADASTRADA NO INTERCÂMBIO DA COBRANCA'},
                            { cod: '69', campoErro: 'CARTEIRA', descErro: 'CARTEIRA INVÁLIDA PARA TÍTULOS COM RATEIO DE CRÉDITO'},
                            { cod: '70', campoErro: 'AGÊNCIA/CONTA', descErro: 'BENEFICIÁRIO NÃO CADASTRADO PARA FAZER RATEIO DE CRÉDITO'},
                            { cod: '78', campoErro: 'AGÊNCIA/CONTA', descErro: 'DUPLICIDADE DE AGÊNCIA/CONTA BENEFICIÁRIA DO RATEIO DE CRÉDITO'},
                            { cod: '80', campoErro: 'AGÊNCIA/CONTA', descErro: 'QUANTIDADE DE CONTAS BENEFICIARIAS DO RATEIO MAIOR DO QUE O PERMITIDO (MAXIMO DE 30 CONTAS POR TITULO)'},
                            { cod: '81', campoErro: 'AGÊNCIA/CONTA', descErro: 'CONTA PARA RATEIO DE CRÉDITO INVÁLIDA / NÃO PERTENCE AO ITAÚ'},
                            { cod: '82', campoErro: 'DESCONTO/ABATI-MENTO', descErro: 'DESCONTO/ABATIMENTO NÃO PERMITIDO PARA TÍTULOS COM RATEIO DE CRÉDITO'},
                            { cod: '83', campoErro: 'VALOR DO TÍTULO', descErro: 'VALOR DO TÍTULO MENOR QUE A SOMA DOS VALORES ESTIPULADOS PARA RATEIO'},
                            { cod: '84', campoErro: 'AGÊNCIA/CONTA', descErro: 'AGÊNCIA/CONTA BENEFICIÁRIA DO RATEIO É A CENTRALIZADORA DE CRÉDITO DO BENEFICIÁRIO'},
                            { cod: '85', campoErro: 'AGÊNCIA/CONTA', descErro: 'AGÊNCIA/CONTA DO BENEFICIÁRIO É CONTRATUAL / RATEIO DE CRÉDITO NÃO PERMITIDO'},
                            { cod: '86', campoErro: 'TIPO DE VALOR', descErro: 'CÓDIGO DO TIPO DE VALOR INVÁLIDO / NÃO PREVISTO PARA TÍTULOS COM RATEIO DE CRÉDITO'},
                            { cod: '87', campoErro: 'AGÊNCIA/CONTA', descErro: 'REGISTRO TIPO 4 SEM INFORMAÇÃO DE AGÊNCIAS/CONTAS BENEFICIÁRIAS DO RATEIO'},
                            { cod: '90', campoErro: 'NRO DA LINHA', descErro: 'COBRANCA MENSAGEM - NUMERO DA LINHA DA MENSAGEM INVALIDO OU QUANTIDADE DE LINHAS EXCEDIDAS'},
                            { cod: '97', campoErro: 'SEM MENSAGEM', descErro: 'COBRANÇA MENSAGEM SEM MENSAGEM (SÓ DE CAMPOS FIXOS), PORÉM COM REGISTRO DO TIPO 7 OU 8'},
                            { cod: '98', campoErro: 'FLASH INVALIDO', descErro: 'REGISTRO MENSAGEM SEM FLASH CADASTRADO OU FLASH INFORMADO DIFERENTE DO CADASTRADO'},
                            { cod: '99', campoErro: 'FLASH INVÁLIDO', descErro: 'CONTA DE COBRANÇA COM FLASH CADASTRADO E SEM REGISTRO DE MENSAGEM CORRESPONDENTE'}
                        ]
                    },
                    {
                        description: 'TABELA 2 - Alteração de dados rejeitada (código da ocorrência = 17 na Posição 109 a 110)',
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%'},
                            { field: 'campoErro', label: 'CAMPO COM ERRO', width: '90%'}
                        ],
                        data: [
                            { cod: '02', campoErro: 'AGÊNCIA COBRADORA INVÁLIDA OU COM O MESMO CONTEÚDO' },
                            { cod: '04', campoErro: 'SIGLA DO ESTADO INVÁLIDA' },
                            { cod: '05', campoErro: 'DATA DE VENCIMENTO INVÁLIDA OU COM O MESMO CONTEÚDO' },
                            { cod: '06', campoErro: 'VALOR DO TÍTULO COM OUTRA ALTERAÇÃO SIMULTÂNEA' },
                            { cod: '08', campoErro: 'NOME DO PAGADOR COM O MESMO CONTEÚDO' },
                            { cod: '09', campoErro: 'AGÊNCIA/CONTA INCORRETA' },
                            { cod: '11', campoErro: 'CEP INVÁLIDO' },
                            { cod: '12', campoErro: 'NÚMERO INSCRIÇÃO INVÁLIDO DO SACADOR AVALISTA' },
                            { cod: '13', campoErro: 'SEU NÚMERO COM O MESMO CONTEÚDO' },
                            { cod: '16', campoErro: 'ABATIMENTO/ALTERAÇÃO DO VALOR DO TÍTULO OU SOLICITAÇÃO DE BAIXA BLOQUEADA' },
                            { cod: '20', campoErro: 'ESPÉCIE INVÁLIDA' },
                            { cod: '21', campoErro: 'AGÊNCIA COBRADORA NÃO CONSTA NO CADASTRO DE DEPOSITÁRIA OU EM ENCERRAMENTO' },
                            { cod: '23', campoErro: 'DATA DE EMISSÃO DO TÍTULO INVÁLIDA OU COM MESMO CONTEÚDO' },
                            { cod: '41', campoErro: 'CAMPO ACEITE INVÁLIDO OU COM MESMO CONTEÚDO' },
                            { cod: '42', campoErro: 'ALTERAÇÃO INVÁLIDA PARA TÍTULO VENCIDO' },
                            { cod: '43', campoErro: 'ALTERAÇÃO BLOQUEADA - VENCIMENTO JÁ ALTERADO' },
                            { cod: '53', campoErro: 'INSTRUÇÃO COM O MESMO CONTEÚDO' },
                            { cod: '54', campoErro: 'DATA VENCIMENTO PARA BANCOS CORRESPONDENTES INFERIOR AO ACEITO PELO BANCO' },
                            { cod: '55', campoErro: 'ALTERAÇÕES IGUAIS PARA O MESMO CONTROLE (AGÊNCIA/CONTA/CARTEIRA/NOSSO NÚMERO)' },
                            { cod: '56', campoErro: 'CNPJ/CPF INVÁLIDO NÃO NUMÉRICO OU ZERADO' },
                            { cod: '57', campoErro: 'PRAZO DE VENCIMENTO INFERIOR A 15 DIAS' },
                            { cod: '60', campoErro: 'VALOR DE IOF - ALTERAÇÃO NÃO PERMITIDA PARA CARTEIRAS DE N.S. - MOEDA VARIÁVEL' },
                            { cod: '61', campoErro: 'TÍTULO JÁ BAIXADO OU LIQUIDADO OU NÃO EXISTE TÍTULO CORRESPONDENTE NO SISTEMA' },
                            { cod: '66', campoErro: 'ALTERAÇÃO NÃO PERMITIDA PARA CARTEIRAS DE NOTAS DE SEGUROS - MOEDA VARIÁVEL' },
                            { cod: '67', campoErro: 'NOME INVÁLIDO DO SACADOR AVALISTA' },
                            { cod: '72', campoErro: 'ENDEREÇO INVÁLIDO - SACADOR AVALISTA' },
                            { cod: '73', campoErro: 'BAIRRO INVÁLIDO - SACADOR AVALISTA' },
                            { cod: '74', campoErro: 'CIDADE INVÁLIDA - SACADOR AVALISTA' },
                            { cod: '75', campoErro: 'SIGLA ESTADO INVÁLIDO - SACADOR AVALISTA' },
                            { cod: '76', campoErro: 'CEP INVÁLIDO - SACADOR AVALISTA' },
                            { cod: '81', campoErro: 'ALTERAÇÃO BLOQUEADA - TÍTULO COM NEGATIVAÇÃO EXPRESSA / PROTESTO' },
                            { cod: '87', campoErro: 'ALTERAÇÃO BLOQUEADA - TÍTULO COM RATEIO DE CRÉDITO' }
                        ]
                    },
                    {
                        description: 'TABELA 3 - Instruções rejeitadas (código da ocorrência = 16 na posição 109 a 110)',
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'campoErro', label: 'CAMPO COM ERRO', width: '90%' }
                        ],
                        data: [
                            { cod: '01', campoErro: 'INSTRUÇÃO/OCORRÊNCIA NÃO EXISTENTE' },
                            { cod: '03', campoErro: 'CONTA NÃO TEM PERMISSÃO PARA PROTESTAR (CONTATE SEU GERENTE)' },
                            { cod: '06', campoErro: 'NOSSO NÚMERO IGUAL A ZEROS' },
                            { cod: '09', campoErro: 'CNPJ/CPF DO SACADOR/AVALISTA INVÁLIDO' },
                            { cod: '10', campoErro: 'VALOR DO ABATIMENTO IGUAL OU MAIOR QUE O VALOR DO TÍTULO' },
                            { cod: '11', campoErro: 'SEGUNDA INSTRUÇÃO/OCORRÊNCIA NÃO EXISTENTE' },
                            { cod: '14', campoErro: 'REGISTRO EM DUPLICIDADE' },
                            { cod: '15', campoErro: 'CNPJ/CPF INFORMADO SEM NOME DO SACADOR/AVALISTA' },
                            { cod: '19', campoErro: 'VALOR DO ABATIMENTO MAIOR QUE 90% DO VALOR DO TÍTULO' },
                            { cod: '20', campoErro: 'EXISTE SUSTACAO DE PROTESTO PENDENTE PARA O TITULO' },
                            { cod: '21', campoErro: 'TÍTULO NÃO REGISTRADO NO SISTEMA' },
                            { cod: '22', campoErro: 'TÍTULO BAIXADO OU LIQUIDADO' },
                            { cod: '23', campoErro: 'INSTRUÇÃO NÃO ACEITA' },
                            { cod: '24', campoErro: 'INSTRUÇÃO INCOMPATÍVEL - EXISTE INSTRUÇÃO DE PROTESTO PARA O TÍTULO' },
                            { cod: '25', campoErro: 'INSTRUÇÃO INCOMPATÍVEL - NÃO EXISTE INSTRUÇÃO DE PROTESTO PARA O TÍTULO' },
                            { cod: '26', campoErro: 'INSTRUÇÃO NÃO ACEITA POR JÁ TER SIDO EMITIDA A ORDEM DE PROTESTO AO CARTÓRIO' },
                            { cod: '27', campoErro: 'INSTRUÇÃO NÃO ACEITA POR NÃO TER SIDO EMITIDA A ORDEM DE PROTESTO AO CARTÓRIO' },
                            { cod: '28', campoErro: 'JÁ EXISTE UMA MESMA INSTRUÇÃO CADASTRADA ANTERIORMENTE PARA O TÍTULO' },
                            { cod: '29', campoErro: 'VALOR LÍQUIDO + VALOR DO ABATIMENTO DIFERENTE DO VALOR DO TÍTULO REGISTRADO' },
                            { cod: '30', campoErro: 'EXISTE UMA INSTRUÇÃO DE NÃO PROTESTAR ATIVA PARA O TÍTULO' },
                            { cod: '31', campoErro: 'EXISTE UMA OCORRÊNCIA DO PAGADOR QUE BLOQUEIA A INSTRUÇÃO' },
                            { cod: '32', campoErro: 'DEPOSITÁRIA DO TÍTULO = 9999 OU CARTEIRA NÃO ACEITA PROTESTO' },
                            { cod: '33', campoErro: 'ALTERAÇÃO DE VENCIMENTO IGUAL À REGISTRADA NO SISTEMA OU QUE TORNA O TÍTULO VENCIDO' },
                            { cod: '34', campoErro: 'INSTRUÇÃO DE EMISSÃO DE AVISO DE COBRANÇA PARA TÍTULO VENCIDO ANTES DO VENCIMENTO' },
                            { cod: '35', campoErro: 'SOLICITAÇÃO DE CANCELAMENTO DE INSTRUÇÃO INEXISTENTE' },
                            { cod: '36', campoErro: 'TÍTULO SOFRENDO ALTERAÇÃO DE CONTROLE (AGÊNCIA/CONTA/CARTEIRA/NOSSO NÚMERO)' },
                            { cod: '37', campoErro: 'INSTRUÇÃO NÃO PERMITIDA PARA A CARTEIRA' },
                            { cod: '38', campoErro: 'INSTRUÇÃO NÃO PERMITIDA PARA TÍTULO COM RATEIO DE CRÉDITO' },
                            { cod: '40', campoErro: 'INSTRUÇÃO INCOMPATÍVEL - NÃO EXISTE INSTRUÇÃO DE NEGATIVAÇÃO EXPRESSA PARA O TÍTULO' },
                            { cod: '41', campoErro: 'INSTRUÇÃO NÃO PERMITIDA - TÍTULO COM ENTRADA EM NEGATIVAÇÃO EXPRESSA' },
                            { cod: '42', campoErro: 'INSTRUÇÃO NÃO PERMITIDA - TÍTULO COM NEGATIVAÇÃO EXPRESSA CONCLUÍDA' },
                            { cod: '43', campoErro: 'PRAZO INVÁLIDO PARA NEGATIVAÇÃO EXPRESSA - MÍNIMO: 02 DIAS CORRIDOS APÓS O VENCIMENTO' },
                            { cod: '45', campoErro: 'INSTRUÇÃO INCOMPATÍVEL PARA O MESMO TÍTULO NESTA DATA' },
                            { cod: '47', campoErro: 'INSTRUÇÃO NÃO PERMITIDA - ESPÉCIE INVÁLIDA' },
                            { cod: '48', campoErro: 'DADOS DO PAGADOR INVÁLIDOS ( CPF / CNPJ / NOME )' },
                            { cod: '49', campoErro: 'DADOS DO ENDEREÇO DO PAGADOR INVÁLIDOS' },
                            { cod: '50', campoErro: 'DATA DE EMISSÃO DO TÍTULO INVÁLIDA' },
                            { cod: '51', campoErro: 'INSTRUÇÃO NÃO PERMITIDA - TÍTULO COM NEGATIVAÇÃO EXPRESSA AGENDADA' }
                        ]
                    },
                    {
                        description: 'TABELA 4 - Baixas rejeitadas (código da ocorrência = 15 na Posição 109 a 110)',
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'campoErro', label: 'CAMPO COM ERRO', width: '90%' }
                        ],
                        data: [
                            { cod: '01', campoErro: 'CARTEIRA/Nº NÚMERO NÃO NUMÉRICO' },
                            { cod: '04', campoErro: 'NOSSO NÚMERO EM DUPLICIDADE NO MESMO MOVIMENTO' },
                            { cod: '05', campoErro: 'SOLICITAÇÃO DE BAIXA PARA TÍTULO JÁ BAIXADO OU LIQUIDADO' },
                            { cod: '06', campoErro: 'SOLICITAÇÃO DE BAIXA PARA TÍTULO NÃO REGISTRADO NO SISTEMA' },
                            { cod: '07', campoErro: 'COBRANÇA PRAZO CURTO - SOLICITAÇÃO DE BAIXA P/ TÍTULO NÃO REGISTRADO NO SISTEMA' },
                            { cod: '08', campoErro: 'SOLICITAÇÃO DE BAIXA PARA TÍTULO EM FLOATING' },
                            { cod: '10', campoErro: 'VALOR DO TITULO FAZ PARTE DE GARANTIA DE EMPRESTIMO' },
                            { cod: '11', campoErro: 'PAGO ATRAVÉS DO SISPAG POR CRÉDITO EM C/C E NÃO BAIXADO' }
                        ]
                    },
                    {
                        description: 'TABELA 5 - Alteração dados cobrança contratual rejeitada/pendente (código da ocorrência = 18 na Posição 109 a 110)',
                        columns: [
                            { field: 'obs', label: 'OBS', width: '10%' },
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'campoErro', label: 'CAMPO COM ERRO', width: '80%' }
                        ],
                        data: [
                            { obs: '', cod: '16', campoErro: 'ABATIMENTO/ALTERAÇÃO DO VALOR DO TÍTULO OU SOLICITAÇÃO DE BAIXA BLOQUEADOS' },
                            { obs: 'A', cod: '40', campoErro: 'NÃO APROVADA DEVIDO AO IMPACTO NA ELEGIBILIDADE DE GARANTIAS' },
                            { obs: 'A', cod: '41', campoErro: 'AUTOMATICAMENTE REJEITADA' },
                            { obs: 'A', cod: '42', campoErro: 'CONFIRMA RECEBIMENTO DE INSTRUÇÃO - PENDENTE DE ANÁLISE' }
                        ],
                        observation: '(0) Códigos opcionais, podem retornar desde que acordado sua utilização junto ao Banco.'
                    },
                    {
                        description: 'TABELA 6 - Alegações do PAGADOR (código ocorrência = 25 na Posição 109 a 110)',
                        columnGroup: [
                            { label: 'COMPLEMENTO', colspan: 3 },
                            { label: '', colspan: 1 },
                        ],
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'data', label: 'DATA', width: '10%' },
                            { field: 'vlr', label: 'VALOR', width: '10%' },
                            { field: 'campoErro', label: 'CAMPO COM ERRO', width: '70%'}
                        ],
                        data: [
                            { cod: '1313', data: 'DATA', vlr: '0', campoErro: 'SOLICITA A PRORROGAÇÃO DO VENCIMENTO PARA:' },
                            { cod: '1321', data: '0', vlr: '0', campoErro: 'SOLICITA A DISPENSA DOS JUROS DE MORA' },
                            { cod: '1339', data: '0', vlr: '0', campoErro: 'NÃO RECEBEU A MERCADORIA' },
                            { cod: '1347', data: '0', vlr: '0', campoErro: 'A MERCADORIA CHEGOU ATRASADA' },
                            { cod: '1354', data: '0', vlr: '0', campoErro: 'A MERCADORIA CHEGOU AVARIADA' },
                            { cod: '1362', data: '0', vlr: '0', campoErro: 'A MERCADORIA CHEGOU INCOMPLETA' },
                            { cod: '1370', data: '0', vlr: '0', campoErro: 'A MERCADORIA NÃO CONFERE COM O PEDIDO' },
                            { cod: '1388', data: '0', vlr: '0', campoErro: 'A MERCADORIA ESTÁ À DISPOSIÇÃO' },
                            { cod: '1396', data: '0', vlr: '0', campoErro: 'DEVOLVEU A MERCADORIA' },
                            { cod: '1404', data: '0', vlr: '0', campoErro: 'NÃO RECEBEU A FATURA' },
                            { cod: '1412', data: '0', vlr: '0', campoErro: 'A FATURA ESTÁ EM DESACORDO COM A NOTA FISCAL' },
                            { cod: '1420', data: '0', vlr: '0', campoErro: 'O PEDIDO DE COMPRA FOI CANCELADO' },
                            { cod: '1438', data: '0', vlr: '0', campoErro: 'A DUPLICATA FOI CANCELADA' },
                            { cod: '1446', data: '0', vlr: '0', campoErro: 'QUE NADA DEVE OU COMPROU' },
                            { cod: '1453', data: '0', vlr: '0', campoErro: 'QUE MANTÉM ENTENDIMENTOS COM O SACADOR' },
                            { cod: '1461', data: 'DATA', vlr: '0', campoErro: 'QUE PAGARÁ O TÍTULO EM:' },
                            { cod: '1479', data: 'DATA', vlr: '0', campoErro: 'QUE PAGOU O TÍTULO DIRETAMENTE AO BENEFICIÁRIO EM:' },
                            { cod: '1487', data: 'DATA', vlr: '0', campoErro: 'QUE PAGARÁ O TÍTULO DIRETAMENTE AO BENEFICIÁRIO EM:' },
                            { cod: '1495', data: 'DATA', vlr: '0', campoErro: 'QUE O VENCIMENTO CORRETO É:' },
                            { cod: '1503', data: '0', vlr: 'VALOR', campoErro: 'QUE TEM DESCONTO OU ABATIMENTO DE:' },
                            { cod: '1719', data: '0', vlr: '0', campoErro: 'PAGADOR NÃO FOI LOCALIZADO; CONFIRMAR ENDEREÇO' },
                            { cod: '1727', data: '0', vlr: '0', campoErro: 'PAGADOR ESTÁ EM REGIME DE CONCORDATA' },
                            { cod: '1735', data: '0', vlr: '0', campoErro: 'PAGADOR ESTÁ EM REGIME DE FALÊNCIA' },
                            { cod: '1750', data: '0', vlr: '0', campoErro: 'PAGADOR SE RECUSA A PAGAR JUROS BANCÁRIOS' },
                            { cod: '1768', data: '0', vlr: '0', campoErro: 'PAGADOR SE RECUSA A PAGAR COMISSÃO DE PERMANÊNCIA' },
                            { cod: '1776', data: '0', vlr: '0', campoErro: 'NÃO FOI POSSÍVEL A ENTREGA DO BOLETO AO PAGADOR' },
                            { cod: '1784', data: '0', vlr: '0', campoErro: 'BOLETO NÃO ENTREGUE, MUDOU-SE / DESCONHECIDO' },
                            { cod: '1792', data: '0', vlr: '0', campoErro: 'BOLETO NÃO ENTREGUE, CEP ERRADO / INCOMPLETO' },
                            { cod: '1800', data: '0', vlr: '0', campoErro: 'BOLETO NÃO ENTREGUE, NÚMERO NÃO EXISTE/ENDEREÇO INCOMPLETO' },
                            { cod: '1818', data: '0', vlr: '0', campoErro: 'BOLETO NÃO RETIRADO PELO PAGADOR. REENVIADO PELO CORREIO PARA CARTEIRAS COM EMISSÃO PELO BANCO' },
                            { cod: '1826', data: '0', vlr: '0', campoErro: 'ENDEREÇO DE E-MAIL INVÁLIDO/COBRANÇA MENSAGEM. BOLETO ENVIADO PELO CORREIO' },
                            { cod: '1834', data: '0', vlr: '0', campoErro: 'BOLETO DDA, DIVIDA RECONHECIDA PELO PAGADOR' },
                            { cod: '1842', data: '0', vlr: '0', campoErro: 'BOLETO DDA, DIVIDA NÃO RECONHECIDA PELO PAGADOR' }
                        ]
                    },
                    {
                        description: 'TABELA 7 - Ordem de protesto sustada, motivo (código de ocorrência = 24 na Posição 109 a 110)',
                        columnGroup: [
                            { label: 'COMPLEMENTO', colspan: 3 },
                            { label: '', colspan: 1 },
                        ],
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'data', label: 'DATA', width: '10%' },
                            { field: 'vlr', label: 'VALOR', width: '10%' },
                            { field: 'sig', label: 'SIGNIFICADO', width: '70%' }
                        ],
                        data: [
                            { cod: '1610', data: '0', vlr: '0', sig: 'DOCUMENTAÇÃO SOLICITADA AO BENEFICIÁRIO' },
                            { cod: '3103', data: '0', vlr: '0', sig: 'INSUFICIENCIA DE DADOS NO MODELO 4006' },
                            { cod: '3111', data: '0', vlr: '0', sig: 'SUSTAÇÃO SOLICITADA AG. BENEFICIÁRIO' },
                            { cod: '3129', data: '0', vlr: '0', sig: 'TITULO NAO ENVIADO A CARTORIO' },
                            { cod: '3137', data: '0', vlr: '0', sig: 'AGUARDAR UM DIA UTIL APOS O VENCTO PARA PROTESTAR' },
                            { cod: '3145', data: '0', vlr: '0', sig: 'DM/DMI SEM COMPROVANTE AUTENTICADO OU DECLARACAO' },
                            { cod: '3152', data: '0', vlr: '0', sig: 'FALTA CONTRATO DE SERV(AG.CED:ENVIAR)' },
                            { cod: '3160', data: '0', vlr: '0', sig: 'NOME DO PAGADOR INCOMPLETO/INCORRETO' },
                            { cod: '3178', data: '0', vlr: '0', sig: 'NOME DO BENEFICIÁRIO INCOMPLETO/INCORRETO' },
                            { cod: '3186', data: '0', vlr: '0', sig: 'NOME DO SACADOR INCOMPLETO/INCORRETO' },
                            { cod: '3194', data: '0', vlr: '0', sig: 'TIT ACEITO: IDENTIF ASSINANTE DO CHEQ' },
                            { cod: '3202', data: '0', vlr: '0', sig: 'TIT ACEITO: RASURADO OU RASGADO' },
                            { cod: '3210', data: '0', vlr: '0', sig: 'TIT ACEITO: FALTA TIT.(AG.CED:ENVIAR)' },
                            { cod: '3228', data: '0', vlr: '0', sig: 'ATOS DA CORREGEDORIA ESTADUAL' },
                            { cod: '3236', data: '0', vlr: '0', sig: 'NAO FOI POSSIVEL EFETUAR O PROTESTO' },
                            { cod: '3244', data: '0', vlr: '0', sig: 'PROTESTO SUSTADO / BENEFICIÁRIO NÃO ENTREGOU A DOCUMENTAÇÃO' },
                            { cod: '3251', data: '0', vlr: '0', sig: 'DOCUMENTACAO IRREGULAR' },
                            { cod: '3269', data: '0', vlr: '0', sig: 'DATA DE EMISSÃO DO TÍTULO INVÁLIDA / IRREGULAR' },
                            { cod: '3277', data: '0', vlr: '0', sig: 'ESPECIE INVALIDA PARA PROTESTO' },
                            { cod: '3285', data: '0', vlr: '0', sig: 'PRAÇA NÃO ATENDIDA PELA REDE BANCÁRIA' },
                            { cod: '3293', data: '0', vlr: '0', sig: 'CENTRALIZADORA DE PROTESTO NAO RECEBEU A DOCUMENTACAO' },
                            { cod: '3301', data: '0', vlr: '0', sig: 'CNPJ/CPF DO PAGADOR INVÁLIDO / INCORRETO' },
                            { cod: '3319', data: '0', vlr: '0', sig: 'SACADOR/AVALISTA E PESSOA FÍSICA' },
                            { cod: '3327', data: '0', vlr: '0', sig: 'CEP DO PAGADOR INCORRETO' },
                            { cod: '3335', data: '0', vlr: '0', sig: 'DEPOSITÁRIA INCOMPATÍVEL COM CEP DO PAGADOR' },
                            { cod: '3343', data: '0', vlr: '0', sig: 'CNPJ/CPF SACADOR INVALIDO / INCORRETO' },
                            { cod: '3350', data: '0', vlr: '0', sig: 'ENDEREÇO DO PAGADOR INSUFICIENTE' },
                            { cod: '3368', data: '0', vlr: '0', sig: 'PRAÇA PAGTO INCOMPATÍVEL COM ENDEREÇO' },
                            { cod: '3376', data: '0', vlr: '0', sig: 'FALTA NÚMERO/ESPÉCIE DO TÍTULO' },
                            { cod: '3384', data: '0', vlr: '0', sig: 'TÍTULO ACEITO S/ ASSINATURA DO SACADOR' },
                            { cod: '3392', data: '0', vlr: '0', sig: 'TÍTULO ACEITO S/ ENDOSSO BENEFICIÁRIO OU IRREGULAR' },
                            { cod: '3400', data: '0', vlr: '0', sig: 'TÍTULO SEM LOCAL OU DATA DE EMISSÃO' },
                            { cod: '3418', data: '0', vlr: '0', sig: 'TÍTULO ACEITO COM VALOR EXTENSO DIFERENTE DO NUMÉRICO' },
                            { cod: '3426', data: '0', vlr: '0', sig: 'TÍTULO ACEITO DEFINIR ESPÉCIE DA DUPLICATA' },
                            { cod: '3434', data: '0', vlr: '0', sig: 'DATA EMISSÃO POSTERIOR AO VENCIMENTO' },
                            { cod: '3442', data: '0', vlr: '0', sig: 'TÍTULO ACEITO DOCUMENTO NÃO PROTESTÁVEL' },
                            { cod: '3459', data: '0', vlr: '0', sig: 'TÍTULO ACEITO EXTENSO VENCIMENTO IRREGULAR' },
                            { cod: '3467', data: '0', vlr: '0', sig: 'TÍTULO ACEITO FALTA NOME FAVORECIDO' },
                            { cod: '3475', data: '0', vlr: '0', sig: 'TÍTULO ACEITO FALTA PRAÇA DE PAGAMENTO' },
                            { cod: '3483', data: '0', vlr: '0', sig: 'TÍTULO ACEITO FALTA CPF ASSINANTE CHEQUE' },
                            { cod: '3491', data: '0', vlr: '0', sig: 'FALTA NÚMERO DO TÍTULO (SEU NÚMERO)' },
                            { cod: '3509', data: '0', vlr: '0', sig: 'CARTÓRIO DA PRAÇA COM ATIVIDADE SUSPENSA' },
                            { cod: '3517', data: '0', vlr: '0', sig: 'DATA APRESENTACAO MENOR QUE A DATA VENCIMENTO' },
                            { cod: '3525', data: '0', vlr: '0', sig: 'FALTA COMPROVANTE DA PRESTACAO DE SERVICO' },
                            { cod: '3533', data: '0', vlr: '0', sig: 'CNPJ/CPF PAGADOR INCOMPATIVEL C/ TIPO DE DOCUMENTO' },
                            { cod: '3541', data: '0', vlr: '0', sig: 'CNPJ/CPF SACADOR INCOMPATIVEL C/ ESPECIE' },
                            { cod: '3558', data: '0', vlr: '0', sig: 'TIT ACEITO: S/ ASSINATURA DO PAGADOR' },
                            { cod: '3566', data: '0', vlr: '0', sig: 'FALTA DATA DE EMISSAO DO TITULO' },
                            { cod: '3574', data: '0', vlr: '0', sig: 'SALDO MAIOR QUE O VALOR DO TITULO' },
                            { cod: '3582', data: '0', vlr: '0', sig: 'TIPO DE ENDOSSO INVALIDO' },
                            { cod: '3590', data: '0', vlr: '0', sig: 'DEVOLVIDO POR ORDEM JUDICIAL' },
                            { cod: '3608', data: '0', vlr: '0', sig: 'DADOS DO TITULO NAO CONFEREM COM DISQUETE' },
                            { cod: '3616', data: '0', vlr: '0', sig: 'PAGADOR E SACADOR AVALISTA SÃO A MESMA PESSOA' },
                            { cod: '3624', data: '0', vlr: '0', sig: 'COMPROVANTE ILEGIVEL PARA CONFERENCIA E MICROFILMAGEM' },
                            { cod: '3632', data: '0', vlr: '0', sig: 'CONFIRMAR SE SAO DOIS EMITENTES' },
                            { cod: '3640', data: '0', vlr: '0', sig: 'ENDERECO DO PAGADOR IGUAL AO DO SACADOR OU DO PORTADOR' },
                            { cod: '3657', data: '0', vlr: '0', sig: 'ENDERECO DO BENEFICIÁRIO INCOMPLETO OU NAO INFORMADO' },
                            { cod: '3665', data: '0', vlr: '0', sig: 'ENDERECO DO EMITENTE NO CHEQUE IGUAL AO DO BANCO PAGADOR' },
                            { cod: '3673', data: '0', vlr: '0', sig: 'FALTA MOTIVO DA DEVOLUCAO NO CHEQUE OU ILEGIVEL' },
                            { cod: '3681', data: '0', vlr: '0', sig: 'TITULO COM DIREITO DE REGRESSO VENCIDO' },
                            { cod: '3699', data: '0', vlr: '0', sig: 'TITULO APRESENTADO EM DUPLICIDADE' },
                            { cod: '3707', data: '0', vlr: '0', sig: 'LC EMITIDA MANUALMENTE (TITULO DO BANCO/CA)' },
                            { cod: '3715', data: '0', vlr: '0', sig: 'NAO PROTESTAR LC (TITULO DO BANCO/CA)' },
                            { cod: '3723', data: '0', vlr: '0', sig: 'ELIMINAR O PROTESTO DA LC (TITULO DO BANCO/CA)' },
                            { cod: '3731', data: '0', vlr: '0', sig: 'TITULO JA PROTESTADO' },
                            { cod: '3749', data: '0', vlr: '0', sig: 'TITULO - FALTA TRADUCAO POR TRADUTOR PUBLICO' },
                            { cod: '3756', data: '0', vlr: '0', sig: 'FALTA DECLARACAO DE SALDO ASSINADA NO TITULO' },
                            { cod: '3764', data: '0', vlr: '0', sig: 'CONTRATO DE CAMBIO - FALTA CONTA GRAFICA' },
                            { cod: '3772', data: '0', vlr: '0', sig: 'PAGADOR FALECIDO' },
                            { cod: '3780', data: '0', vlr: '0', sig: 'ESPECIE DE TITULO QUE O BANCO NAO PROTESTA' },
                            { cod: '3798', data: '0', vlr: '0', sig: 'AUSENCIA DO DOCUMENTO FISICO' },
                            { cod: '3806', data: '0', vlr: '0', sig: 'ORDEM DE PROTESTO SUSTADA, MOTIVO' },
                            { cod: '3814', data: '0', vlr: '0', sig: 'PAGADOR APRESENTOU QUITAÇÃO DO TÍTULO' },
                            { cod: '3822', data: '0', vlr: '0', sig: 'PAGADOR IRÁ NEGOCIAR COM BENEFICIÁRIO' },
                            { cod: '3830', data: '0', vlr: '0', sig: 'CPF INCOMPATÍVEL COM A ESPÉCIE DO TÍTULO' },
                            { cod: '3848', data: '0', vlr: '0', sig: 'TÍTULO DE OUTRA JURISDIÇÃO TERRITORIAL' },
                            { cod: '3855', data: '0', vlr: '0', sig: 'TÍTULO COM EMISSÃO ANTERIOR A CONCORDATA DO PAGADOR' },
                            { cod: '3863', data: '0', vlr: '0', sig: 'PAGADOR CONSTA NA LISTA DE FALÊNCIA' },
                            { cod: '3871', data: '0', vlr: '0', sig: 'APRESENTANTE NÃO ACEITA PUBLICAÇÃO DE EDITAL' },
                            { cod: '3889', data: '0', vlr: '0', sig: 'CARTÓRIO COM PROBLEMAS OPERACIONAIS' },
                            { cod: '3897', data: '0', vlr: '0', sig: 'ENVIO DE TITULOS PARA PROTESTO TEMPORARIAMENTE PARALISADO' },
                            { cod: '3905', data: '0', vlr: '0', sig: 'BENEFICIÁRIO COM CONTA EM COBRANCA SUSPENSA' },
                            { cod: '3913', data: '0', vlr: '0', sig: 'CEP DO PAGADOR E UMA CAIXA POSTAL' },
                            { cod: '3921', data: '0', vlr: '0', sig: 'ESPÉCIE NÃO PROTESTÁVEL NO ESTADO' },
                            { cod: '3939', data: '0', vlr: '0', sig: 'FALTA ENDEREÇO OU DOCUMENTO DO SACADOR AVALISTA' },
                            { cod: '3947', data: '0', vlr: '0', sig: 'CORRIGIR A ESPECIE DO TITULO' },
                            { cod: '3954', data: '0', vlr: '0', sig: 'ERRO DE PREENCHIMENTO DO TITULO' },
                            { cod: '3962', data: '0', vlr: '0', sig: 'VALOR DIVERGENTE ENTRE TITULO E COMPROVANTE' },
                            { cod: '3970', data: '0', vlr: '0', sig: 'CONDOMINIO NAO PODE SER PROTESTADO P/ FINS FALIMENTARES' },
                            { cod: '3988', data: '0', vlr: '0', sig: 'VEDADA INTIMACAO POR EDITAL PARA PROTESTO FALIMENTAR ' }
                        ]
                    },
                    {
                        description: 'TABELA 8 - Instrução cancelada (código de ocorrência = 57 na Posição 109 a 110)',
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'oco', label: 'OCORRÊNCIAS', width: '90%' }
                        ],
                        data: [
                            { cod: '1156', oco: 'NÃO PROTESTAR' },
                            { cod: '2261', oco: 'DISPENSAR JUROS/COMISSÃO DE PERMANÊNCIA' }
                        ]
                    },
                    {
                        description: 'TABELA 9 - Motivo de devolução do cheque devolvido utilizado para pagamento do boleto (código de ocorrência = 69 na Posição 109 a 110)',
                        columns: [
                            { field: 'mot', label: 'MOT', width: '10%' },
                            { field: 'des', label: 'DESCRIÇÃO', width: '70%' },
                            { field: 'pdr', label: 'PASSÍVEL DE REAPRESENTAÇÃO', width: '20%' }
                        ],
                        data: [
                            { mot: '11', des: 'CHEQUE SEM FUNDOS - PRIMEIRA APRESENTAÇÃO.', pdr: 'SIM' },
                            { mot: '12', des: 'CHEQUE SEM FUNDOS - SEGUNDA APRESENTAÇÃO.', pdr: 'NÃO' },
                            { mot: '13', des: 'CONTA ENCERRADA.', pdr: 'NÃO' },
                            { mot: '14', des: 'PRÁTICA ESPÚRIA.', pdr: 'NÃO' },
                            { mot: '20', des: 'FOLHA DE CHEQUE CANCELADA POR SOLICITAÇÃO DO CORRENTISTA.', pdr: 'NÃO' },
                            { mot: '21', des: 'CONTRA-ORDEM (OU REVOGAÇÃO) OU OPOSIÇÃO (OU SUSTAÇÃO) AO PAGAMENTO PELO EMITENTE OU PELO PORTADOR.', pdr: 'SIM' },
                            { mot: '22', des: 'DIVERGÊNCIA OU INSUFICIÊNCIA DE ASSINATURA.', pdr: 'SIM' },
                            { mot: '23', des: 'CHEQUES EMITIDOS POR ENTIDADES E ÓRGÃOS DA ADMINISTRAÇÃO PÚBLICA FEDERAL DIRETA E INDIRETA, EM DESACORDO COM OS REQUISITOS CONSTANTES DO ARTIGO 74, § 2º, DO DECRETO-LEI Nº 200, DE 25.02.1967.', pdr: 'SIM' },
                            { mot: '24', des: 'BLOQUEIO JUDICIAL OU DETERMINAÇÃO DO BANCO CENTRAL DO BRASIL.', pdr: 'SIM' },
                            { mot: '25', des: 'CANCELAMENTO DE TALONÁRIO PELO BANCO PAGADOR.', pdr: 'NÃO' },
                            { mot: '28', des: 'CONTRA-ORDEM (OU REVOGAÇÃO) OU OPOSIÇÃO (OU SUSTAÇÃO) AO PAGAMENTO OCASIONADA POR FURTO OU ROUBO.', pdr: 'NÃO' },
                            { mot: '29', des: 'CHEQUE BLOQUEADO POR FALTA DE CONFIRMAÇÃO DO RECEBIMENTO DO TALONÁRIO PELO CORRENTISTA.', pdr: 'SIM' },
                            { mot: '30', des: 'FURTO OU ROUBO DE MALOTES.', pdr: 'NÃO' },
                            { mot: '31', des: 'ERRO FORMAL (SEM DATA DE EMISSÃO, COM O MÊS GRAFADO NUMERICAMENTE, AUSÊNCIA DE ASSINATURA, NÃO-REGISTRO DO VALOR POR EXTENSO).', pdr: 'SIM' },
                            { mot: '32', des: 'AUSÊNCIA OU IRREGULARIDADE NA APLICAÇÃO DO CARIMBO DE COMPENSAÇÃO.', pdr: 'SIM' },
                            { mot: '33', des: 'DIVERGÊNCIA DE ENDOSSO.', pdr: 'SIM' },
                            { mot: '34', des: 'CHEQUE APRESENTADO POR ESTABELECIMENTO BANCÁRIO QUE NÃO O INDICADO NO CRUZAMENTO EM PRETO, SEM O ENDOSSO-MANDATO.', pdr: 'SIM' },
                            { mot: '35', des: 'CHEQUE FRAUDADO, EMITIDO SEM PRÉVIO CONTROLE OU RESPONSABILIDADE DO ESTABELECIMENTO BANCÁRIO (“CHEQUE UNIVERSAL”), OU AINDA COM ADULTERAÇÃO DA PRAÇA SACADA.', pdr: 'NÃO' },
                            { mot: '36', des: 'CHEQUE EMITIDO COM MAIS DE UM ENDOSSO.', pdr: 'SIM' },
                            { mot: '40', des: 'MOEDA INVÁLIDA.', pdr: 'NÃO' },
                            { mot: '41', des: 'CHEQUE APRESENTADO A BANCO QUE NÃO O PAGADOR.', pdr: 'SIM' },
                            { mot: '42', des: 'CHEQUE NÃO-COMPENSÁVEL NA SESSÃO OU SISTEMA DE COMPENSAÇÃO EM QUE FOI APRESENTADO.', pdr: 'SIM' },
                            { mot: '43', des: 'CHEQUE, DEVOLVIDO ANTERIORMENTE PELOS MOTIVOS 21, 22, 23, 24, 31 OU 34, NÃO-PASSÍVEL DE REAPRESENTAÇÃO EM VIRTUDE DE PERSISTIR O MOTIVO DA DEVOLUÇÃO.', pdr: 'NÃO' },
                            { mot: '44', des: 'CHEQUE PRESCRITO.', pdr: 'NÃO' },
                            { mot: '45', des: 'CHEQUE EMITIDO POR ENTIDADE OBRIGADA A REALIZAR MOVIMENTAÇÃO E UTILIZAÇÃO DE RECURSOS FINANCEIROS DO TESOURO NACIONAL MEDIANTE ORDEM BANCÁRIA.', pdr: 'NÃO' },
                            { mot: '48', des: 'CHEQUE DE VALOR SUPERIOR AO ESTABELECIDO, EMITIDO SEM A IDENTIFICAÇÃO DO BENEFICIÁRIO, DEVENDO SER DEVOLVIDO A QUALQUER TEMPO.', pdr: 'SIM' },
                            { mot: '49', des: 'REMESSA NULA, CARACTERIZADA PELA REAPRESENTAÇÃO DE CHEQUE DEVOLVIDO PELOS MOTIVOS 12, 13, 14, 20, 25, 28, 30, 35, 43, 44 E 45, PODENDO A SUA DEVOLUÇÃO OCORRER A QUALQUER TEMPO.', pdr: 'NÃO' }                    
                        ],
                        observation: 'Eventualmente, por determinação do Banco Central do Brasil, os motivos de devolução de cheques podem sofrer atualizações. Caso seja apresentado motivo de devolução não listado nesta tabela, a respectiva descrição pode ser obtida junto ao gerente da sua conta.'
                    },
                    {
                        description: 'TABELA 10 - Mensagem Informativa (código de ocorrência = 02 na Posição 109 a 110)',
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'min', label: 'MENSAGEM INFORMATIVA', width: '90%' }
                        ],
                        data: [
                            { cod: '01', min: 'CEP SEM ATENDIMENTO DE PROTESTO NO MOMENTO' },
                            { cod: '02', min: 'ESTADO COM DETERMINAÇÃO LEGAL QU EIMPEDE A INSCRIÇÃO DE INADIMPLENTES NOS CADASTROS DE PROTEÇÃO AO CRÉDITO NO PRAZO SOLICITADO - PRAZO SUPERIOR AO SOLICITADO' },
                            { cod: '03', min: 'BOLETO NÃO LIQUIDADO NO DESCONTO DE DUPLICATAS E TRANSFERIDO PARA COBRANÇA SIMPLES' }
                        ]
                    },
                    {
                        description: 'TABELA 11 - Instrução de Negativação Expressa rejeitada (código de ocorrência = 74 na Posição 109 a 110)',
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'oco', label: 'OCORRÊNCIA', width: '90%' }
                        ],
                        data: [
                            { cod: '6007', oco: 'INCLUSÃO BLOQUEADA FACE A DETERMINAÇÃO JUDICIAL' },
                            { cod: '6015', oco: 'INCONSISTÊNCIAS NAS INFORMAÇÕES DE ENDEREÇO' },
                            { cod: '6023', oco: 'TÍTULO JÁ DECURSADO' },
                            { cod: '6031', oco: 'INCLUSÃO CONDICIONADA A APRESENTAÇÃO DE DOCUMENTO DE DÍVIDA' },
                            { cod: '6163', oco: 'EXCLUSÃO NÃO PERMITIDA, REGISTRO SUSPENSO' },
                            { cod: '6171', oco: 'EXCLUSÃO PARA REGISTRO INEXISTENTE' },
                            { cod: '6379', oco: 'REJEIÇÃO POR DADO(S) INCONSISTENTE(S)' }
                        ]
                    },
                    {
                        description: 'TABELA 12 - Negativação Expressa informacional (código de ocorrência = 79 na Posição 109 a 110)',
                        columns: [
                            { field: 'cod', label: 'CÓD.', width: '10%' },
                            { field: 'oco', label: 'OCORRÊNCIA', width: '90%' }
                        ],
                        data: [
                            { cod: '6049', oco: 'INFORMAÇÃO DOS CORREIOS - MUDOU-SE' },
                            { cod: '6056', oco: 'INFORMAÇÃO DOS CORREIOS - DEVOLVIDO POR INFORMAÇÃO PRESTADA PELO SINDICO OU PORTEIRO' },
                            { cod: '6064', oco: 'INFORMAÇÃO DOS CORREIOS - DEVOLVIDO POR INCONSISTÊNCIA NO ENDEREÇO' },
                            { cod: '6072', oco: 'INFORMAÇÃO DOS CORREIOS - DESCONHECIDO' },
                            { cod: '6080', oco: 'INFORMAÇÃO DOS CORREIOS - RECUSADO' },
                            { cod: '6098', oco: 'INFORMAÇÃO DOS CORREIOS - AUSENTE' },
                            { cod: '6106', oco: 'INFORMAÇÃO DOS CORREIOS - NÃO PROCURADO' },
                            { cod: '6114', oco: 'INFORMAÇÃO DOS CORREIOS - FALECIDO' },
                            { cod: '6122', oco: 'INFORMAÇÃO DOS CORREIOS - NÃO ESPECIFICADO' },
                            { cod: '6130', oco: 'INFORMAÇÃO DOS CORREIOS - CAIXA POSTAL INEXISTENTE' },
                            { cod: '6148', oco: 'INFORMAÇÃO DOS CORREIOS - DEVOLUÇÃO DO COMUNICADO DO CORREIO' },
                            { cod: '6155', oco: 'INFORMAÇÃO DOS CORREIOS - OUTROS MOTIVOS' },
                            { cod: '6478', oco: 'AR - ENTREGUE COM SUCESSO' },
                            { cod: '6486', oco: 'INCLUSAO PARA REGISTRO JA EXISTENTE/RECUSADO' },
                            { cod: '6494', oco: 'AR - CARTA EXTRAVIADA E NÃO ENTREGUE' },
                            { cod: '6502', oco: 'AR - CARTA ROUBADA E NÃO ENTREGUE' },
                            { cod: '6510', oco: 'AR - AUSENTE - ENCAMINHADO PARA ENTREGA INTERNA' },
                            { cod: '6528', oco: 'AR INUTILIZADO - NÃO RETIRADO NOS CORREIOS APÓS 3 TENTATIVAS' },
                            { cod: '6536', oco: 'AR - ENDERECO INCORRETO' },
                            { cod: '6544', oco: 'AR - NAO PROCURADO - DEVOLVIDO AO REMETENTE' },
                            { cod: '6551', oco: 'AR - NÃO ENTREGUE POR FALTA DE APRESENTAR DOCUMENTO COM FOTO' },
                            { cod: '6569', oco: 'AR - MUDOU-SE' },
                            { cod: '6577', oco: 'AR - DESCONHECIDO' },
                            { cod: '6585', oco: 'AR - RECUSADO' },
                            { cod: '6593', oco: 'AR - ENDERECO INSUFICIENTE' },
                            { cod: '6601', oco: 'AR - NAO EXISTE O NUMERO INDICADO' },
                            { cod: '6618', oco: 'AR - AUSENTE' },
                            { cod: '6627', oco: 'AR - CARTA NAO PROCURADA NA UNIDADE DOS CORREIOS' },
                            { cod: '6635', oco: 'AR - FALECIDO' },
                            { cod: '6643', oco: 'AR - DEVIDO A DEVOLUCAO DO COMUNICADO DO CORREIO ' }
                        ]
                    }
                ]
            }
        ]
    },
    21: {
        id: 21,
        description: 'Quantidade e valor total de boletos',
        content: [{
            type: NoteContentType.TEXT,
            text: ["Esses campos referem-se às quantidades e valores dos boletos à vencer registrados no Itaú, nas diversas modalidades de cobrança"]
        }]
    },
    22: {
        id: 22,
        description: 'Aviso bancário',
        content: [{
            type: NoteContentType.TEXT,
            text: ["Refere-se ao código do extrato de Movimentação de Títulos (MT) associado a esse movimento."]
        }]
    },
    23: {
        id: 23,
        description: 'Número do boleto / Uso do Itaú (Anexo 1)',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "Para efetuar corretamente o recebimento de um título, o Itaú necessita que o campo 'Nosso Número' do boleto de cobrança esteja preenchido com o número da carteira de cobrança, o número do boleto e seu DAC - Dígito de Auto Conferência (formato: CCC/NNNNNNNN-D).",
                "O próprio Banco se encarrega do cálculo do DAC e sua impressão, quando se tratar de cobrança com registro ou fornecer boletos parcialmente preenchidos.",
                "Para todas as carteiras de cobrança do Itaú o DAC do 'Nosso Número' é calculado a partir dos campos: Agência, Conta do BENEFICIÁRIO (sem DAC), Número da carteira e 'Nosso Número', exceto as carteiras escriturais e na modalidade direta as carteiras 126, 131, 145, 150 e 168, cujo DAC do 'Nosso Número' e composto apenas dos campos : Carteira e Nosso Número, mas todos calculados através do Módulo 10, cuja explicação vem a seguir.",
                "Multiplica-se cada algarismo do número formado pela composição dos campos acima pela sequência de multiplicadores 2, 1, 2, 1, 2, 1, 2 (posicionados da direita para a esquerda). A seguir, somam-se os JANEIRO 2017 Cobrança CNAB 400 35 algarismos dos produtos e o total obtido é dividido por 10. O DAC é a diferença entre o divisor (10) e o resto da divisão:",
                "10 - (RESTO DA DIVISÃO) = DAC. Se o resto da divisão for zero, o DAC será zero.",
                "Exemplo, considerando-se os seguintes dados: nº da agência: 0057; nº da conta corrente, sem o DAC: 72192; nº da subcarteira: 109; nosso número: 98712345",
                "1º - Montagem do campo e multiplicação:",
                "0 0 5 7 7 2 1 9 2 1 0 9 9 8 7 1 2 3 4 5 * 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 = 0 0 5 14 7 4 1 18 2 2 0 18 9 16 7 2 2 6 4 10",
                "2º - Soma dos dígitos dos produtos (cada dígito é somado individualmente), como segue:",
                "0 + 0 + 5 + 1 + 4 + 7 + 4 + 1 + 1 + 8 + 2 + 2 + 0 + 1 + 8 + 9 + 1 + 6 + 7 + 2 + 2 + 6 + 4 + 1 + 0 = 82",
                "3º - Divisão e resultado:",
                "82 / 10 = 8 (resto = 2)",
                "10 - 2 = 8 (DAC)",
                "Portanto a impressão do campo Nosso Número no boleto deve ser '109/98712345-8'"
            ]
        }]
    },
    24: {
        id: 24,
        description: 'Literal de moeda (Anexo 1)',
        content: [{
            type: NoteContentType.TEXT,
            text: ["Literal da moeda a ser impressa no boleto identificando a espécie da moeda. Se o valor vier expresso em Reais, a informação será ignorada e será impresso R$ no boleto."]
        }]
    },
    25: {
        id: 25,
        description: 'Local de pagamento / agência cobradora (Anexo 1)',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "O campo “agência cobradora” deve ser preenchido com brancos. O Itaú definirá o código desta agência mediante o CEP do PAGADOR.",
                "Na área do boleto reservada para indicar o LOCAL DE PAGAMENTO, colocar:",
                "- Para boletos COM REGISTRO (conforme item (5) da nota 4)",
                "ATÉ O VENCIMENTO, PAGUE EM QUALQUER BANCO OU CORRESPONDENTE NÃO BANCÁRIO. APÓS O VENCIMENTO, ACESSE ITAU.COM.BR/BOLETOS E PAGUE EM QUALQUER BANCO OU CORRESPONDENTE NÃO BANCÁRIO.",
                "- Para boletos SEM REGISTRO (conforme item (5) da nota 4)",
                "ATÉ O VENCIMENTO, PAGUE EM QUALQUER BANCO OU CORRESPONDENTE NÃO BANCÁRIO. APÓS O VENCIMENTO PAGUE NO ITAÚ"
            ]
        }]
    },
    26: {
        id: 26,
        description: 'Instruções (Anexo 1)',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "Área do boleto reservada para instruções, formada por nove linhas de 69 caracteres. Essa área será de livre utilização pela Empresa, que informará o conteúdo de cada linha a ser impressa através dos registros com códigos de layout '2 e 3'.",
                "Caso não haja nenhuma instrução, não são necessários os registros com códigos de layout '2 e 3'.",
                "Caso existam até cinco linhas de instruções, não é necessário o registro com código de layout '3'",
                'É proibido o repasse e mensagens de tarifa no boleto ao pagador.'
            ]
        }]
    },
    27: {
        id: 27,
        description: 'Instrução / Alegação cancelada',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "Deve ser preenchido na remessa somente quando utilizados, na posição 109-110, os códigos de ocorrência 35 - Cancelamento de Instrução e 38 - beneficiário não concorda com alegação do pagador. Para os demais códigos de ocorrência este campo deverá ser preenchido com zeros.",
                "Obs.: No arquivo retorno será informado o mesmo código da instrução cancelada, e para o cancelamento de alegação de pagador não há retorno da informação."
            ]
        }]
    },
    28: {
        id: 28,
        description: 'Código de liquidação',
        content: [
            {
                type: NoteContentType.TEXT,
                text: [
                    "Indica o canal utilizado pelo pagador para pagamento do boleto e, para clientes que possuem o crédito das liquidações separado em função do recurso utilizado no pagamento, indica se o crédito do valor correspondente estará “disponível” ou “a compensar” na data do lançamento em conta corrente.",
                ]
            },
            {
                type: NoteContentType.TABLE,
                tableData:[{
                    columns: [
                        { field: 'cod', label: 'CÓD.', width: '10%' },
                        { field: 'des', label: 'DESCRIÇÃO', width: '70%' },
                        { field: 'rec', label: 'RECURSO', width: '20%' }
                    ],
                    data: [
                        { cod: 'AA', des: 'CAIXA ELETRÔNICO ITAÚ', rec: 'DISPONÍVEL' },
                        { cod: 'AC', des: 'PAGAMENTO EM CARTÓRIO AUTOMATIZADO', rec: 'A COMPENSAR' },
                        { cod: 'AO', des: 'ACERTO ONLINE', rec: 'DISPONÍVEL' },
                        { cod: 'BC', des: 'BANCOS CORRESPONDENTES', rec: 'DISPONÍVEL' },
                        { cod: 'BF', des: 'ITAÚ BANKFONE', rec: 'DISPONÍVEL' },
                        { cod: 'BL', des: 'ITAÚ BANKLINE', rec: 'DISPONÍVEL' },
                        { cod: 'B0', des: 'OUTROS BANCOS - RECEBIMENTO OFF-LINE', rec: 'A COMPENSAR' },
                        { cod: 'B1', des: 'OUTROS BANCOS - PELO CÓDIGO DE BARRAS', rec: 'A COMPENSAR' },
                        { cod: 'B2', des: 'OUTROS BANCOS - PELA LINHA DIGITÁVEL', rec: 'A COMPENSAR' },
                        { cod: 'B3', des: 'OUTROS BANCOS - PELO AUTO ATENDIMENTO', rec: 'A COMPENSAR' },
                        { cod: 'B4', des: 'OUTROS BANCOS - RECEBIMENTO EM CASA LOTÉRICA', rec: 'A COMPENSAR' },
                        { cod: 'B5', des: 'OUTROS BANCOS - CORRESPONDENTE', rec: 'A COMPENSAR' },
                        { cod: 'B6', des: 'OUTROS BANCOS - TELEFONE', rec: 'A COMPENSAR' },
                        { cod: 'B7', des: 'OUTROS BANCOS - ARQUIVO ELETRÔNICO (Pagamento Efetuado por meio de troca de arquivos)', rec: 'A COMPENSAR' },
                        { cod: 'CC', des: 'AGÊNCIA ITAÚ - COM CHEQUE DE OUTRO BANCO ou (CHEQUE ITAÚ)*', rec: 'A COMPENSAR' },
                        { cod: 'CI', des: 'CORRESPONDENTE ITAÚ', rec: 'DISPONÍVEL' },
                        { cod: 'CK', des: 'SISPAG - SISTEMA DE CONTAS A PAGAR ITAÚ', rec: 'DISPONÍVEL' },
                        { cod: 'CP', des: 'AGÊNCIA ITAÚ - POR DÉBITO EM CONTA CORRENTE, CHEQUE ITAÚ* OU DINHEIRO', rec: 'DISPONÍVEL' },
                        { cod: 'DG', des: 'AGÊNCIA ITAÚ - CAPTURADO EM OFF-LINE', rec: 'DISPONÍVEL' },
                        { cod: 'LC', des: 'PAGAMENTO EM CARTÓRIO DE PROTESTO COM CHEQUE', rec: 'A COMPENSAR' },
                        { cod: 'EA', des: 'TERMINAL DE CAIXA', rec: 'DISPONÍVEL' },
                        { cod: 'Q0', des: 'AGENDAMENTO - PAGAMENTO AGENDADO VIA BANKLINE OU OUTRO CANAL ELETRÔNICO E LIQUIDADO NA DATA INDICADA', rec: 'DISPONÍVEL' },
                        { cod: 'RA', des: 'DIGITAÇÃO - REALIMENTAÇÃO AUTOMÁTICA', rec: 'DISPONÍVEL' },
                        { cod: 'ST', des: 'PAGAMENTO VIA SELTEC**', rec: 'DISPONÍVEL' },
                    ],
                    observation: '* Se utiliza BLOQUEIO DE CHEQUE o retorno de CHEQUE ITAÚ será devolvido como CC. ** Sistema Eletrônico de Liquidação de Títulos em Cartório'
                }]
            }
        ]

    },
    29: {
        id: 29,
        description: 'Endereço de email',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "Para as carteiras de cobrança escriturais, onde o Itaú mantém o registro da cobrança e se encarrega de imprimir e postar os boletos (carteiras identificadas na nota ‘5’), tendo sido acertado previamente entre o beneficiário e o pagador, o boleto poderá ser remetido ao pagador por e-mail, destinando-o ao endereço especificado neste campo. Se o endereço de e-mail informado for inválido, o boleto será impresso e enviado pelos meios tradicionais. Neste caso o beneficiário será informado no arquivo retorno pela ocorrência ‘25’ e motivo ‘1826’ (conforme nota ‘20’ e tabela ‘6’).",
                "Se o pagador não acessar o boleto até 5 dias úteis antes do vencimento, desde que já tenham se passado 2 dias úteis do envio do e-mail, o boleto será impresso e enviado pelos meios tradicionais. Neste caso, o beneficiário será informado no arquivo retorno pela ocorrência ‘25’ e motivo ‘1818’ (conforme nota ‘20’ e tabela ‘6’)."
            ]
        }]
    },
    30: {
        id: 30,
        description: 'Sacador / Avalista',
        content: [
            {
                type: NoteContentType.TEXT,
                text: ["Existindo a figura do Sacador/Avalista, é imprescindível informar corretamente todos os dados a ele relacionados, conforme lei federal 12.039, que exige os dados completos para facilitar o contato entre pagador e o emissor e, caso venha a ser solicitado o protesto da dívida, é facultado aos Cartórios de Protestos de Títulos exigirem tais dados com exatidão."],
            },
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columns: [
                        { field: 'cod', label: 'CÓD. DE INSCRIÇÃO', width: '20%' },
                        { field: 'nui', label: 'NÚMERO DE INSCRIÇÃO', width: '30%' },
                        { field: 'obs', label: 'OBSERVAÇÃO', width: '30%' }
                    ],
                    data: [
                        { cod: '00', nui: 'PREENCHER COM ZEROS', obs: 'NÃO HÁ SACADOR/AVALISTA.' },
                        { cod: '01', nui: 'NÚMERO DO CPF', obs: 'INFORMAR O CPF DO SACADOR/AVALISTA.' },
                        { cod: '02', nui: 'NÚMERO DO CNPJ', obs: 'INFORMAR O CNPJ DO SACADOR/AVALISTA.' }
                    ],
                    observation: 'Verificar o preenchimento do registro detalhe 02 nas posições 002-003 o preenchimento correspondente ao tipo de inscrição do Sacador Avalista.'
                }]
            }
        ]
    },
    31: {
        id: 31,
        description: 'Data de emissão (DDMMAA)',
        content: [{
            type: NoteContentType.TEXT,
            text: ["A data informada neste campo deve ser a mesma data de emissão do título de crédito (Duplicata de Serviço / Duplicata Mercantil / Nota Fiscal, etc), que deu origem a esta Cobrança. Existindo divergência, na existência de protesto, a documentação poderá não ser aceita pelo Cartório."]
        }]
    },
    32: {
        id: 32,
        description: 'Tipo de valor',
        content: [
            {
                type: NoteContentType.TEXT,
                text: [
                    "ARQUIVO RETORNO",
                    "Nas confirmações das entradas, os campos VALOR são informados com o mesmo formato (percentual ou valor) definido no arquivo remessa;",
                    "Na ocorrência de liquidação, os campos VALOR apresentam o valor efetivamente creditado na conta de crédito.",
                    "ARQUIVO REMESSA",
                    "O campo Tipo de Valor (posição 394 do registro Tipo 4) define se o rateio de crédito deve ser feito por percentual (%) ou em valor (R$):"
                ]
            },
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columns: [
                        { field: 'con', label: 'CONTEÚDO', width: '30%' },
                        { field: 'des', label: 'DESCRIÇÃO', width: '70%' }
                    ],
                    data: [
                        { con: '1', des: 'RATEIO DE CRÉDITO POR PERCENTUAL (%) - VALOR NOMINAL DO TÍTULO (*)' },
                        { con: '2', des: 'RATEIO DE CRÉDITO EM VALOR (R$) - VALOR NOMINAL DO TÍTULO (*)' },
                        { con: '3', des: 'RATEIO DE CRÉDITO POR PERCENTUAL (%) - VALOR LÍQUIDO RECEBIDO (**)' },
                        { con: '4', des: 'RATEIO DE CRÉDITO EM VALOR (R$) - VALOR LÍQUIDO RECEBIDO, RATEADO PROPORCIONALMENTE AOS VALORES DE RATEIO INFORMADOS NA REMESSA (**)' },
                    ],
                    observation: '(*) Para os Tipos de Valor “1” e “2”, o rateio é feito sobre o valor nominal do título e eventuais diferenças de pagamentos a maior (juros) ou a menor (desconto) são contabilizadas na conta de crédito do beneficiário; (**) Para os Tipos de Valor “3” e “4”, o rateio é feito sobre o valor liquido recebido em pagamento. O valor líquido recebido corresponde ao: Valor Nominal – Desconto + Juros.'
                }]
            },
            {
                type: NoteContentType.LIST,
                listData: [
                    "Portanto, os campos VALOR de cada conta de crédito devem obedecer aos seguintes formatos:",
                    "Rateio por PERCENTUAL: formato “9(10)V9(3)”;",
                    "Rateio por PERCENTUAL: formato “9(10)V9(3)”;"
                ]
            }
        ]
    },
    33: {
        id: 33,
        description: 'Agência conta do cheque',
        content: [{
            type: NoteContentType.TEXT,
            text: [
                "Este campo será preenchido da seguinte forma: AAAA00CCCCCD",
                "Onde:",
                "AAAA - Número da agência de débito do cheque;",
                "00 - Dois zeros;",
                "CCCCC - Número da conta de débito do cheque;",
                "D - Dac da agência/conta de débito do cheque."
            ]
        }]
    },
    34: {
        id: 34,
        description: 'Boleto do dia',
        content: [
            {
                type: NoteContentType.TEXT,
                text: ["Este serviço requer cadastramento prévio junto ao Banco. Para as ocorrência de confirmação de entrada (código de ocorrência “02”, nas posições 109 e 110 do registro de transação) o arquivo retorno de Cobrança passará a apresentar neste campo a indicação de Boleto DDA, conforme segue:"]
            },
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columns: [
                        { field: 'cod', label: 'CÓD.', width: '20%' },
                        { field: 'des', label: 'DESCRIÇÃO', width: '80%' },
                    ],
                    data: [
                        { cod: '0', des: 'NÃO É BOLETO DDA (PAGADOR NÃO ADERIU AO DDA ATÉ O MOMENTO)' },
                        { cod: '1', des: 'BOLETO DDA (PAGADOR ADERIU AO DDA EM AO MENOS UM BANCO DE RELACIONAMENTO)' }
                    ]
                }]
            }
        ]
    },
    35: {
        id: 36,
        description: 'Multa',
        content: [
            {
                type: NoteContentType.TEXT,
                text: ["O código da Multa irá determinar como o sistema irá atribuir o valor da multa."]
            },
            {
                type: NoteContentType.TABLE,
                tableData: [{
                    columns: [
                        { field: 'cod', label: 'CÓDIGO', width: '20%' },
                        { field: 'des', label: 'DESCRIÇÃO', width: '80%' }
                    ],
                    data: [
                        { cod: '0', des: 'NÃO REGISTRA A MULTA' },
                        { cod: '1', des: 'VALOR EM REAIS (FIXO)' },
                        { cod: '2', des: 'VALOR EM PERCENTUAL COM DUAS CASAS DECIMAIS CONFORME ESTRUTURA DO CAMPO' }
                    ]
                }]
            },
            {
                type: NoteContentType.LIST,
                listData: [
                    "Qualquer informação enviada diferente das opções informadas no domínio acima, o cliente receberá erro de registro inválido no tipo 1.",
                    "Caso seja informado o domínio '0', o cliente não irá enviar a multa, mas poderá utilizar alguma outra função que esteja disponível para o registro tipo 2 no futuro."
                ]
            },
            {
                type: NoteContentType.TEXT,
                title: 'DATA DA MULTA',
                text: [
                    "Data da Multa, data que passa incidir a cobrança da Multa.",
                    "Campo deve ser formatado como DDMMAAAA.",
                    "A data informada deve ser Maior ou igual a data de vencimento do título."
                ]
            },
            {
                type: NoteContentType.TEXT,
                title: 'MULTA',
                text: [
                    "O Campo Valor / Percentual define se a multa será informada em Valor nominal ou percentual *",
                    "O campo valor deve obedecer ao seguinte formato: ",
                    "- Percentual: Formato “9(11)V9(2)”",
                    "- Valor: Formato “9(11)V9(2)”"
                ]
            },
            {
                type: NoteContentType.LIST,
                listData: [
                    "* O percentual será aplicado sobre o Valor Nominal do título",
                    "Não poderá ser enviado valor da multa igual ou maior que o valor do próprio título , considerado o valor Nominal registrado",
                    "Não poderá ser enviado percentual da multa igual ou maior que 100%",
                    "Caso o cliente comande uma instrução de Alteração do valor nominal do título, se houver registro / instrução de Multa o sistema irá: "
                ]
            },
            {
                type: NoteContentType.TEXT,
                text: [
                    "- Recalcular o valor da multa se no registro o cliente informou % de Multa",
                    "- Manter o valor da Multa se no registro o cliente informou a Multa em Valor"
                ]
            }
        ]
    }
}

export const ITAU_400_4: Template[] = [
    {
        id: 0,
        description: 'Registro header de arquivo',
        optional: false,
        matchSegment: (content: string) => {
            return content.substring(0, 26) === '02RETORNO01COBRANCA       ';
        },
        positions: [
            {id: 11, init: 1, end: 1, name: 'Tipo de registro', description: 'Identificação do registro header', type: EnumPositionType.N, default: '0'},
            {id: 22, init: 2, end: 2, name: 'Código de retorno', description: 'Identificação do arquivo retorno', type: EnumPositionType.N, default: '2'},
            {id: 39, init: 3, end: 9, name: 'Literal de retorno', description: 'Identificação por extenso do tipo de movimento', type: EnumPositionType.A, default: 'RETORNO'},
            {id: 1011, init: 10, end: 11, name: 'Código do retorno', description: 'Identificação do tipo de serviço', type: EnumPositionType.N, default: '01'},
            {id: 1226, init: 12, end: 26, name: 'Literal de serviço', description: 'Identificação por extenso do tipo de serviço', type: EnumPositionType.A, default: 'COBRANCA       '},
            {id: 2730, init: 27, end: 30, name: 'Agência', description: 'Agência mantenedora da conta', type: EnumPositionType.N},
            {id: 3132, init: 31, end: 32, name: 'Zeros', description: 'Complemento de registro', type: EnumPositionType.N ,default: ZEROS},
            {id: 3337, init: 33, end: 37, name: 'Contas', description: 'Número da conta corrente da empresa', type: EnumPositionType.N},
            {id: 3838, init: 38, end: 38, name: 'DAC', description: 'Dígito de auto conferência ag/conta empresa', type: EnumPositionType.N},
            {id: 3946, init: 39, end: 46, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 4776, init: 47, end: 76, name: 'Nome da empresa', description: 'Nome por extenso da "Empresa mãe"', type: EnumPositionType.A},
            {id: 7779, init: 77, end: 79, name: 'Código do banco', description: 'Número do banco na câmara de compensação', type: EnumPositionType.N, default: '341'},
            {id: 8094, init: 80, end: 94, name: 'Nome do banco', description: 'Nome por extenso do banco cobrador', type: EnumPositionType.A, default: 'BANCO ITAU S.A.'},
            {id: 95100, init: 95, end: 100, name: 'Data de geração', description: 'Data de geração do arquivo', type: EnumPositionType.D},
            {id: 101105, init: 101, end: 105, name: 'Densidade', description: 'Unidade da densidade', type: EnumPositionType.N},
            {id: 106108, init: 106, end: 108, name: 'Unidade de densid.', description: 'Densidade de gravação do arquivo', type: EnumPositionType.A, default: 'BPI'},
            {id: 109113, init: 109, end: 113, name: 'Nº seq. arquivo ret.', description: 'Número seqüencial do arquivo retorno', type: EnumPositionType.N},
            {id: 114119, init: 114, end: 119, name: 'Data de crédito', description: 'Data de crédito dos lançamentos', type: EnumPositionType.D},
            {id: 120394, init: 120, end: 394, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 394400, init: 395, end: 400, name: 'Número seqüencial', description: 'Número seqüencial do registro no arquivo', type: EnumPositionType.N, default: '000001'}
        ]
    },
    {
        id: 1,
        description: 'Registro detalhe de arquivo',
        optional: false,
        matchSegment: (content: string) => {
            return (content.substring(0, 3) === '101' || content.substring(0, 3) === '102') && content.substring(70, 82) === '            ';
        },
        positions: [
            {id: 111, init: 1, end: 1, name: 'Tipo de registro', description: 'Identificação do registro transação', type: EnumPositionType.N, default: '1'},
            {id: 123, init: 2, end: 3, name: 'Código de inscrição', description: 'Identificação do tipo de inscrição/empresa', type: EnumPositionType.N, options: [{ id: 1, content: '01', description: 'CPF' }, { id: 2, content: '02', description: 'CNPJ' }]},
            {id: 1417, init: 4, end: 17, name: 'Número de inscrição', description: 'Número de inscrição da empresa (CPF/CNPJ)', type: EnumPositionType.N},
            {id: 11821, init: 18, end: 21, name: 'Agência', description: 'Agência mantenedora da conta', type: EnumPositionType.N},
            {id: 12223, init: 22, end: 23, name: 'Zeros', description: 'Complemento de registro', type: EnumPositionType.N, default: ZEROS},
            {id: 12428, init: 24, end: 28, name: 'Conta', description: 'Número da conta corrente da empresa', type: EnumPositionType.N},
            {id: 12929, init: 29, end: 29, name: 'DAC', description: 'Dígito de auto conferência ag/conta empresa', type: EnumPositionType.N},
            {id: 13037, init: 30, end: 37, name: 'Brancos', description: 'Complemento de registro', type: EnumPositionType.A, default: WHITES},
            {id: 13862, init: 38, end: 62, name: 'Uso da empresa', description: 'Identificação do título na empresa', type: EnumPositionType.A, note: notes['2']},
            {id: 16370, init: 63, end: 70, name: 'Nosso número', description: 'Identificação do título no banco', type: EnumPositionType.N},
            {id: 17182, init: 71, end: 82, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 18385, init: 83, end: 85, name: 'Carteira', description: 'Número da carteira', type: EnumPositionType.N, note: notes['5']},
            {id: 18693, init: 86, end: 93, name: 'Nosso número', description: 'Identificação do título no banco', type: EnumPositionType.N, note: notes['3']},
            {id: 19494, init: 94, end: 94, name: 'DAC nosso número', description: 'DAC do nosso número', type: EnumPositionType.N, note: notes['3']},
            {id: 195107, init: 95, end: 107, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 1108108, init: 108, end: 108, name: 'Carteira', description: 'Código da carteira', type: EnumPositionType.A, note: notes['5']},
            {id: 1109110, init: 109, end: 110, name: 'Cód. de ocorrência', description: 'Identificação da ocorrência', type: EnumPositionType.N, note: notes['17']},
            {id: 1111116, init: 111, end: 116, name: 'Data de ocorrência', description: 'Data de ocorrência no banco', type: EnumPositionType.D},
            {id: 1117126, init: 117, end: 126, name: 'Nº do documento', description: 'Nº do documento de cobrança (dupl, np e etc)', type: EnumPositionType.A, note: notes['18']},
            {id: 1127164, init: 127, end: 134, name: 'Nosso número', description: 'Confirmação do número do título no banco', type: EnumPositionType.N},
            {id: 1135146, init: 135, end: 146, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 1147152, init: 147, end: 152, name: 'Vencimento', description: 'Data de vencimento do título', type: EnumPositionType.D},
            {id: 1153165, init: 153, end: 165, name: 'Valor do título', description: 'Valor nominal do título', type: EnumPositionType.M},
            {id: 1166168, init: 166, end: 168, name: 'Código do banco', description: 'Número do banco na câmara de compensação', type: EnumPositionType.N},
            {id: 1169172, init: 169, end: 172, name: 'Agência cobradora', description: 'Ag. cobradora, ag. de liquidação ou baixa', type: EnumPositionType.N, note: notes['9']},
            {id: 1173173, init: 173, end: 173, name: 'DAC ag. cobradora', description: 'DAC da agência cobradora', type: EnumPositionType.N},
            {id: 1174175, init: 174, end: 175, name: 'Espécie', description: 'Espécie do título', type: EnumPositionType.N, note: notes['10']},
            {id: 1176188, init: 176, end: 188, name: 'Tarifa de cobrança', description: 'Valor da despesa de cobrança', type: EnumPositionType.M},
            {id: 1189214, init: 189, end: 214, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 1215227, init: 215, end: 227, name: 'Valor do IOF', description: 'Valor do IOF a ser recolhido (notas seguro)', type: EnumPositionType.M},
            {id: 1228240, init: 228, end: 240, name: 'Valor abatimento', description: 'Valor do abatimento concedido', type: EnumPositionType.M, note: notes['19']},
            {id: 1241253, init: 241, end: 253, name: 'Descontos', description: 'Valor do desconto concedido', type: EnumPositionType.M, note: notes['19']},
            {id: 1254266, init: 254, end: 266, name: 'Valor principal', description: 'Valor lançado em conta corrente', type: EnumPositionType.M},
            {id: 1267279, init: 267, end: 279, name: 'Juros de mora/multa', description: 'Valor de mora e multa', type: EnumPositionType.M},
            {id: 1280292, init: 280, end: 292, name: 'Outros créditos', description: 'Valor de outros créditos', type: EnumPositionType.M},
            {id: 1293293, init: 293, end: 293, name: 'Boleto DDA', description: 'Indicador de boleto DDA', type: EnumPositionType.A, note: notes['34']},
            {id: 1294295, init: 294, end: 295, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 1296301, init: 296, end: 301, name: 'Data crédito', description: 'Data de crédito desta liquidação', type: EnumPositionType.D},
            {id: 1302305, init: 302, end: 305, name: 'Instr. Cancelada', description: 'Código da instrução cancelada', type: EnumPositionType.N, note: notes['20']},
            {id: 1306311, init: 306, end: 311, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 1312324, init: 312, end: 324, name: 'Zeros', description: 'Complemento de registro', type: EnumPositionType.N, default: ZEROS},
            {id: 1325354, init: 325, end: 354, name: 'Nome do pagador', description: 'Nome do pagador', type: EnumPositionType.A},
            {id: 1355377, init: 355, end: 377, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 1378385, init: 378, end: 385, name: 'Erros/Mensagem informativa', description: 'Registros rejeitados ou alegação do pagador ou registro de mensagem informativa', type: EnumPositionType.A, note: notes['20']},
            {id: 1386392, init: 386, end: 392, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 1393394, init: 393, end: 394, name: 'Cód. de liquidação', description: 'Meio pelo qual o título foi liquidado', type: EnumPositionType.A, note: notes['28']},
            {id: 1395400, init: 395, end: 400, name: 'Número seqüencial', description: 'Número seqüencial do registro no arquivo', type: EnumPositionType.N}
        ]
    },
    {
        id: 2,
        description: 'Registro transação (cheque devolvido / compensado)',
        optional: true,
        matchSegment: (content: string) => {
            return (content.substring(0, 3) === '101' || content.substring(0, 3) === '102') && content.substring(70, 82) !== '            ';
        },
        positions: [
            {id: 211, init: 1, end: 1, name: 'Tipo de registro', description: 'Identificação do registro transação', type: EnumPositionType.N, default: '1'},
            {id: 223, init: 2, end: 3, name: 'Código de inscrição', description: 'Identificação do tipo de inscrição/empresa', type: EnumPositionType.N, options: [{ id: 1, content: '01', description: 'CPF' }, { id: 2, content: '02', description: 'CNPJ' }]},
            {id: 2417, init: 4, end: 17, name: 'Número de inscrição', description: 'Número de inscrição da empresa (CPF/CNPJ)', type: EnumPositionType.N},
            {id: 21821, init: 18, end: 21, name: 'Agência', description: 'Agência mantenedora da conta', type: EnumPositionType.N},
            {id: 22223, init: 22, end: 23, name: 'Zeros', description: 'Complemento de registro', type: EnumPositionType.N, default: ZEROS},
            {id: 22428, init: 24, end: 28, name: 'Conta', description: 'Número da conta corrente da empresa', type: EnumPositionType.N},
            {id: 22929, init: 29, end: 29, name: 'DAC', description: 'Dígito de auto conferência ag/conta empresa', type: EnumPositionType.N},
            {id: 23037, init: 30, end: 37, name: 'Brancos', description: 'Complemento de registro', type: EnumPositionType.A, default: WHITES},
            {id: 23862, init: 38, end: 62, name: 'Uso da empresa', description: 'Identificação do título na empresa', type: EnumPositionType.A, note: notes['2']},
            {id: 26370, init: 63, end: 70, name: 'Nosso número', description: 'Identificação do título no banco', type: EnumPositionType.N},
            {id: 27182, init: 71, end: 82, name: 'Agência conta do cheque', description: 'Agência conta e DAC de débito do cheque', type: EnumPositionType.A, note: notes['33']},
            {id: 28385, init: 83, end: 85, name: 'Carteira', description: 'Número da carteira', type: EnumPositionType.N, note: notes['5']},
            {id: 28693, init: 86, end: 93, name: 'Nosso número', description: 'Identificação do título no banco', type: EnumPositionType.N, note: notes['3']},
            {id: 29494, init: 94, end: 94, name: 'DAC nosso número', description: 'DAC do nosso número', type: EnumPositionType.N, note: notes['3']},
            {id: 295107, init: 95, end: 107, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 2108108, init: 108, end: 108, name: 'Carteira', description: 'Código da carteira', type: EnumPositionType.A, note: notes['5']},
            {id: 2109110, init: 109, end: 110, name: 'Cód. de ocorrência', description: 'Identificação da ocorrência', type: EnumPositionType.N, note: notes['17']},
            {id: 2111116, init: 111, end: 116, name: 'Data de ocorrência', description: 'Data de ocorrência no banco', type: EnumPositionType.D},
            {id: 2117126, init: 117, end: 126, name: 'Nº do documento', description: 'Nº do documento de cobrança (dupl, np e etc)', type: EnumPositionType.A, note: notes['18']},
            {id: 2127164, init: 127, end: 134, name: 'Nosso número', description: 'Confirmação do número do título no banco', type: EnumPositionType.N},
            {id: 2135146, init: 135, end: 146, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 2147152, init: 147, end: 152, name: 'Zeros', description: 'Complemento de registro', type: EnumPositionType.N, default: ZEROS},
            {id: 2153165, init: 153, end: 165, name: 'Valor do título', description: 'Valor nominal do título', type: EnumPositionType.M},
            {id: 2166168, init: 166, end: 168, name: 'Código do banco', description: 'Número do banco na câmara de compensação', type: EnumPositionType.N},
            {id: 2169172, init: 169, end: 172, name: 'Agência cobradora', description: 'Ag. cobradora, ag. de liquidação ou baixa', type: EnumPositionType.N, note: notes['9']},
            {id: 2173173, init: 173, end: 173, name: 'DAC ag. cobradora', description: 'DAC da agência cobradora', type: EnumPositionType.N},
            {id: 2174175, init: 174, end: 175, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 2176253, init: 176, end: 253, name: 'Zeros', description: 'Complemento de registro', type: EnumPositionType.N, default: ZEROS},
            {id: 2254266, init: 254, end: 266, name: 'Valor do cheque', description: 'Valor do cheque', type: EnumPositionType.M},
            {id: 2267292, init: 267, end: 292, name: 'Zeros', description: 'Complemento de registro', type: EnumPositionType.N, default: ZEROS},
            {id: 2293301, init: 293, end: 301, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 2302324, init: 302, end: 324, name: 'Zeros', description: 'Complemento de registro', type: EnumPositionType.N, default: ZEROS},
            {id: 2325354, init: 325, end: 354, name: 'Banda magnética', description: 'Banda magnética do cheque (CMC-7)', type: EnumPositionType.A},
            {id: 2355377, init: 355, end: 377, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 2378379, init: 378, end: 379, name: 'Motivo', description: 'Motivo de devolução do cheque', type: EnumPositionType.A, note: notes['20']},
            {id: 2380394, init: 380, end: 394, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 2395400, init: 395, end: 400, name: 'Número seqüencial', description: 'Número seqüencial do registro no arquivo', type: EnumPositionType.N}
        ]
    },
    {
        id: 4,
        description: 'Registro detalhe',
        optional: true,
        matchSegment: (content: string) => {
            return content.substring(0, 2) === '41' || content.substring(0, 2) === '42';
        },
        positions: [
            {id: 411, init: 1, end: 1, name: 'Tipo de registro', description: 'Identificação do registro transação', type: EnumPositionType.N, default: '4'},
            {id: 423, init: 2, end: 3, name: 'Código de inscrição', description: 'Tipo de inscrição da empresa', type: EnumPositionType.N, note: notes['1']},
            {id: 4417, init: 4, end: 17, name: 'Número de inscrição', description: 'Número de inscrição da empresa (CPF/CNPJ)', type: EnumPositionType.N, note: notes['1']},
            {id: 41821, init: 18, end: 21, name: 'Agência', description: 'Agência mantenedora da conta', type: EnumPositionType.N},
            {id: 42223, init: 22, end: 23, name: 'Zeros', description: 'Complemento de registro', type: EnumPositionType.N, default: ZEROS},
            {id: 42428, init: 24, end: 28, name: 'Conta', description: 'Número da conta corrente da empresa', type: EnumPositionType.N},
            {id: 42929, init: 29, end: 29, name: 'DAC', description: 'Dígito de auto conferência ag/conta empresa', type: EnumPositionType.N},
            {id: 43037, init: 30, end: 37, name: 'Brancos', description: 'Complemento de registro', type: EnumPositionType.A, default: WHITES},
            {id: 43862, init: 38, end: 62, name: 'Uso da empresa', description: 'Identificação do título na empresa', type: EnumPositionType.A, note: notes['2']},
            {id: 46370, init: 63, end: 70, name: 'Nosso número', description: 'Identificação do título no banco', type: EnumPositionType.N},
            {id: 47182, init: 71, end: 82, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 48385, init: 83, end: 85, name: 'Carteira', description: 'Número da carteira', type: EnumPositionType.N, note: notes['5']},
            {id: 48693, init: 86, end: 93, name: 'Nosso número', description: 'Identificação do título no banco', type: EnumPositionType.N, note: notes['3']},
            {id: 49494, init: 94, end: 94, name: 'DAC nosso número', description: 'DAC do nosso número', type: EnumPositionType.N, note: notes['3']},
            {id: 495107, init: 95, end: 107, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 4108108, init: 108, end: 108, name: 'Carteira', description: 'Código da carteira', type: EnumPositionType.A, note: notes['5']},
            {id: 4109110, init: 109, end: 110, name: 'Cód. de ocorrência', description: 'Identificação da ocorrência', type: EnumPositionType.N, note: notes['17']},
            {id: 4111112, init: 111, end: 112, name: 'Seqüencia', description: 'Número seqüencial dos registros tipo 4 do título', type: EnumPositionType.N},
            {id: 4113125, init: 113, end: 125, name: 'Valor do título', description: 'Valor total recebido líquido', type: EnumPositionType.M},
            {id: 4126129, init: 126, end: 129, name: 'Agência (01)', description: 'Número da agência da conta de crédito', type: EnumPositionType.N},
            {id: 4130136, init: 130, end: 136, name: 'Conta (01)', description: 'Número da conta de crédito', type: EnumPositionType.N},
            {id: 4137137, init: 137, end: 137, name: 'DAC (01)', description: 'DAC da agência/conta de crédito', type: EnumPositionType.N},
            {id: 4138150, init: 138, end: 150, name: 'Valor (01)', description: 'Valor de crédito', type: EnumPositionType.M, note: notes['32']},
            {id: 4151160, init: 151, end: 160, name: 'Valor encargos (01)', description: 'Valor encargos do rateado', type: EnumPositionType.M},
            {id: 4161164, init: 161, end: 164, name: 'Agencia (02)', description: 'Número da agência da conta de crédito', type: EnumPositionType.N},
            {id: 4165171, init: 165, end: 171, name: 'Conta (02)', description: 'Número da conta de crédito', type: EnumPositionType.N},
            {id: 4172172, init: 172, end: 172, name: 'DAC (02)', description: 'DAC da agência/conta de crédito', type: EnumPositionType.N},
            {id: 4173185, init: 173, end: 185, name: 'Valor (02)', description: 'Valor de crédito', type: EnumPositionType.M, note: notes['32']},
            {id: 4186195, init: 186, end: 195, name: 'Valor encargos (02)', description: 'Valor encargos do rateado', type: EnumPositionType.M},
            {id: 4196199, init: 196, end: 199, name: 'Agencia (03)', description: 'Número da agência da conta de crédito', type: EnumPositionType.N},
            {id: 4200206, init: 200, end: 206, name: 'Conta (03)', description: 'Número da conta de crédito', type: EnumPositionType.N},
            {id: 4207207, init: 207, end: 207, name: 'DAC (03)', description: 'DAC da agência/conta de crédito', type: EnumPositionType.N},
            {id: 4208220, init: 208, end: 220, name: 'Valor (03)', description: 'Valor de crédito', note: notes['32'], type: EnumPositionType.M},
            {id: 4221230, init: 221, end: 230, name: 'Valor encargos (03)', description: 'Valor encargos do rateado', type: EnumPositionType.M},
            {id: 4231234, init: 231, end: 234, name: 'Agencia (04)', description: 'Número da agência da conta de crédito', type: EnumPositionType.N},
            {id: 4235241, init: 235, end: 241, name: 'Conta (04)', description: 'Número da conta de crédito', type: EnumPositionType.N},
            {id: 4242242, init: 242, end: 242, name: 'DAC (04)', description: 'DAC da agência/conta de crédito', type: EnumPositionType.N},
            {id: 4243255, init: 243, end: 255, name: 'Valor (04)', description: 'Valor de crédito', type: EnumPositionType.M, note: notes['32']},
            {id: 4256265, init: 256, end: 265, name: 'Valor encargos (04)', description: 'Valor encargos do rateado', type: EnumPositionType.M},
            {id: 4266269, init: 266, end: 269, name: 'Agencia (05)', description: 'Número da agência da conta de crédito', type: EnumPositionType.N},
            {id: 4270276, init: 270, end: 276, name: 'Conta (05)', description: 'Número da conta de crédito', type: EnumPositionType.N},
            {id: 4277277, init: 277, end: 277, name: 'DAC (05)', description: 'DAC da agência/conta de crédito', type: EnumPositionType.N},
            {id: 4278290, init: 278, end: 290, name: 'Valor (05)', description: 'Valor de crédito', type: EnumPositionType.M, note: notes['32']},
            {id: 4291300, init: 291, end: 300, name: 'Valor encargos (05)', description: 'Valor encargos do rateado', type: EnumPositionType.M},
            {id: 4301304, init: 301, end: 304, name: 'Agencia (06)', description: 'Número da agência da conta de crédito', type: EnumPositionType.N},
            {id: 4305311, init: 305, end: 311, name: 'Conta (06)', description: 'Número da conta de crédito', type: EnumPositionType.N},
            {id: 4312312, init: 312, end: 312, name: 'DAC (06)', description: 'DAC da agência/conta de crédito', type: EnumPositionType.N},
            {id: 4313325, init: 313, end: 325, name: 'Valor (06)', description: 'Valor de crédito', type: EnumPositionType.M, note: notes['32']},
            {id: 4326335, init: 326, end: 335, name: 'Valor encargos (06)', description: 'Valor encargos do rateado', type: EnumPositionType.M},
            {id: 4336339, init: 336, end: 339, name: 'Agencia (07)', description: 'Número da agência da conta de crédito', type: EnumPositionType.N},
            {id: 4340346, init: 340, end: 346, name: 'Conta (07)', description: 'Número da conta de crédito', type: EnumPositionType.N},
            {id: 4347347, init: 347, end: 347, name: 'DAC (07)', description: 'DAC da agência/conta de crédito', type: EnumPositionType.N},
            {id: 4348360, init: 348, end: 360, name: 'Valor (07)', description: 'Valor de crédito', type: EnumPositionType.M, note: notes['32']},
            {id: 4361370, init: 361, end: 370, name: 'Valor encargos (07)', description: 'Valor encargos do rateado', type: EnumPositionType.M},
            {id: 4371393, init: 371, end: 393, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 4394394, init: 394, end: 394, name: 'Tipo de valor', description: 'Tipo de valor de rateio enviado', type: EnumPositionType.A, note: notes['32']},
            {id: 4395400, init: 395, end: 400, name: 'Número seqüencial', description: 'Número seqüencial do registro no arquivo', type: EnumPositionType.N}
        ]
    },
    {
        id: 9,
        description: 'Registro trailer',
        optional: false,
        matchSegment: (content: string) => {
            return content.substring(0, 7) === '9201341';
        },
        positions: [
            {id: 911, init: 1, end: 1, name: 'Tipo de registro', description: 'Identificação do registro trailer', type: EnumPositionType.N, default: '9'},
            {id: 922, init: 2, end: 2, name: 'Código de retorno', description: 'Identificação do arquivo retorno', type: EnumPositionType.N, default: '2'},
            {id: 934, init: 3, end: 4, name: 'Código de serviço', description: 'Identificação do tipo de serviço', type: EnumPositionType.N, default: '01'},
            {id: 957, init: 5, end: 7, name: 'Código do banco', description: 'Identificação do banco na compensação', type: EnumPositionType.N, default: '341'},
            {id: 9817, init: 8, end: 17, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 91825, init: 18, end: 25, name: 'Qtde. de títulos', description: 'Qtde. de títulos em cobr. simples', type: EnumPositionType.N, note: notes['21']},
            {id: 92639, init: 26, end: 39, name: 'Valor total', description: 'Vr total dos títulos em cobrança simples', type: EnumPositionType.M, note: notes['21']},
            {id: 94047, init: 40, end: 47, name: 'Aviso bancário', description: 'Referência do aviso bancário', type: EnumPositionType.A, note: notes['22']},
            {id: 94857, init: 48, end: 57, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 95865, init: 58, end: 65, name: 'Qtde. de títulos', description: 'Qtde. de títulos em cobrança/vinculada', type: EnumPositionType.N, note: notes['21']},
            {id: 96679, init: 66, end: 79, name: 'Valor total', description: 'Vr total dos títulos em cobrança/vinculada', type: EnumPositionType.M, note: notes['21']},
            {id: 98087, init: 80, end: 87, name: 'Aviso bancário', description: 'Referência do aviso bancário', type: EnumPositionType.A, note: notes['22']},
            {id: 988177, init: 88, end: 177, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 9178185, init: 178, end: 185, name: 'Qtde. de títulos', description: 'Qtde. de títulos em cobr. direta./escritural', type: EnumPositionType.N, note: notes['21']},
            {id: 9186199, init: 186, end: 199, name: 'Valor total', description: 'Vr total dos títulos em cobr. direta/escrit.', type: EnumPositionType.M, note: notes['21']},
            {id: 9200207, init: 200, end: 207, name: 'Aviso bancário', description: 'Referência do aviso bancário', type: EnumPositionType.A, note: notes['22']},
            {id: 9208212, init: 208, end: 212, name: 'Controle do arquivo', description: 'Número seqüencial do arquivo retorno', type: EnumPositionType.N},
            {id: 9213220, init: 213, end: 220, name: 'Qtde. de detalhes', description: 'Quantidade de registros de transação', type: EnumPositionType.N},
            {id: 9221234, init: 221, end: 234, name: 'Vlr total informado', description: 'Valor total dos títulos informados no arquivo', type: EnumPositionType.M},
            {id: 9235394, init: 235, end: 394, name: 'Brancos', description: 'Complemento do registro', type: EnumPositionType.A, default: WHITES},
            {id: 9395400, init: 395, end: 400, name: 'Número seqüencial', description: 'Número seqüencial do registro no arquivo', type: EnumPositionType.N},
        ]
    }
]