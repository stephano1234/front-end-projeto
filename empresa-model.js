export class Empresa {
    cnpj
    razaoSocial
    dataAbertura
    responsaveis
    enderecos
    telefonesFixo
    emails
    celulares
    contas
    tipoEmpresa
    tipoPorteEmpresa
}

export class Agencia {
    numero
    codigoBanco
}

export class Conta {
    numero
    agencia
    tipoConta
}

export class Celular {
    numero
}

export class TelefoneFixo {
    numero
}

export class Email {
    endereco
}

export class Cidade {
    nome
    tipoUf
}

export class Bairro {
    nome
    cidade
}

export class Logradouro {
    nome
    bairro
}

export class Endereco {
    cep
    numero
    complemento
    logradouro
}

export class Pessoa {
    cpf
    nome
    dataNascimento
    tipoGrauInstrucao
    tipoEstadoCivil
    tipoSexo
}

export const NAME_FIELDS = {
    cnpj: 'C.N.P.J.',
    cpf: 'C.P.F.',
    razaoSocial: 'Razão Social',
    nome: 'Nome',
    dataAbertura: 'Data de Abertura',
    responsaveis: 'Responsáveis Legais',
    contratosTrabalho: 'Contratos de Trabalho',
    enderecos: 'Endereços',
    telefonesFixo: 'Telefones Fixos',
    emails: 'E-mails',
    celulares: 'Celulares',
    contas: 'Contas Bancárias'
}
Object.freeze(NAME_FIELDS)

export const TIPO_CONTA = {
    CONTA_CORRENTE: 'Conta corrente',
    CONTA_POUPANCA: 'Conta poupança',
}
Object.freeze(TIPO_CONTA)

export const TIPO_UF = {
    AC: 'AC',
    AL: 'AL',
    AP: 'AP',
    AM: 'AM',
    BA: 'BA',
    CE: 'CE',
    DF: 'DF',
    ES: 'ES',
    GO: 'GO',
    MA: 'MA',
    MT: 'MT',
    MS: 'MS',
    MG: 'MG',
    PA: 'PA',
    PB: 'PB',
    PR: 'PR',
    PE: 'PE',
    PI: 'PI',
    RJ: 'RJ',
    RN: 'RN',
    RS: 'RS',
    RO: 'RO',
    RR: 'RR',
    SC: 'SC',
    SP: 'SP',
    SE: 'SE',
    TO: 'TO'
}
Object.freeze(TIPO_UF)

export const TIPO_ESTADO_CIVIL = {
    SOLTEIRO: 'Solteiro(a)',
    CASADO: 'Casado(a)',
    DIVORCIADO: 'Divorciado(a)',
    VIUVO: 'Viuvo(a)',
    OUTROS: 'Outros',
}
Object.freeze(TIPO_ESTADO_CIVIL)

export const TIPO_GRAU_INSTRUCAO = {
    ANALFABETO: 'Analfabeto',
    ATE_5_ANO_INCOMPLETO_ENSINO_FUNDAMENTAL: 'Até o 5º ano incompleto do Ensino Fundamental',
    O_5_ANO_COMPLETO_ENSINO_FUNDAMENTAL: '5º ano completo do Ensino Fundamental',
    DO_6_AO_9_ANO_ENSINO_FUNDAMENTAL_INCOMPLETO: 'Do 6º ao 9º ano do Ensino Fundamental incompleto',
    ENSINO_FUNDAMENTAL_COMPLETO: 'Ensino Fundamental completo',
    ENSINO_MEDIO_INCOMPLETO: 'Ensino Médio incompleto',
    ENSINO_MEDIO_COMPLETO: 'Ensino Médio completo',
    SUPERIOR_INCOMPLETO: 'Superior incompleto',
    SUPERIOR_COMPLETO: 'Superior completo',
    POS_GRADUACAO_ESPECIALIZACAO: 'Pós-Graduação / Especialização',
    MESTRADO: 'Mestrado',
    DOUTORADO: 'Doutorado',
    POS_DOUTORADO: 'Pós-Doutorado',
}
Object.freeze(TIPO_GRAU_INSTRUCAO)

export const TIPO_SEXO = {
    MASCULINO: 'Masculino',
    FEMININO: 'Feminino',
}
Object.freeze(TIPO_SEXO)

export const TIPO_EMPRESA = {
    INDIVIDUAL: 'Empresário Individual',
    MEI: 'Microempreendedor Individual',
    EIRELI: 'Empresa Individual de Responsabilidade Limitada',
    SOCIEDADE: 'Sociedade Empresária',
    SOCIEDADE_SIMPLES: 'Sociedade Simples'
}
Object.freeze(TIPO_EMPRESA)

export const TIPO_PORTE_EMPRESA = {
    ME: 'Microempresa',
    EPP: 'Empresa de pequeno porte',
    MEDIO: 'Empresa de médio porte',
    GRANDE: 'Empresa de grande porte'
}
Object.freeze(TIPO_PORTE_EMPRESA)

export class FindParams {
    filter
    projection
    sort
    pageOffset
    pageSize
    toCount = true
}

export class EmpresaFindParams {
    _id
    razaoSocial
    dataAbertura
    responsaveis
    enderecos
    telefonesFixo
    emails
    celulares
    contas
    tipoEmpresa
    tipoPorteEmpresa
}
