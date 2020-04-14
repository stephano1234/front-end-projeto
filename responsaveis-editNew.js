import { Pessoa, TIPO_ESTADO_CIVIL, TIPO_GRAU_INSTRUCAO, TIPO_SEXO } from './empresa-model.js'
import { empresa } from './empresas-editNew.js'
import { fillTable } from './responsaveis-listNew.js'

const responsavelEdit = window.document.getElementById('edit/responsaveis')

export function fillForm(responsavel, index) {
    limpaEditPage()
    
    const editCpfResponsavelDiv = window.document.createElement('div')
    const editCpfResponsavelLabel = window.document.createElement('label')
    editCpfResponsavelLabel.setAttribute('for', 'editCpfResponsavel')
    editCpfResponsavelLabel.innerHTML = '<strong>C.P.F.:</strong> '
    const editCpfResponsavel = window.document.createElement('input')
    editCpfResponsavel.setAttribute('id', 'editCpfResponsavel')
    editCpfResponsavel.setAttribute('type', 'text')
    editCpfResponsavel.style.marginBottom = '5px'
    editCpfResponsavelDiv.appendChild(editCpfResponsavelLabel)
    editCpfResponsavelDiv.appendChild(editCpfResponsavel)
    
    const editNomeResponsavelDiv = window.document.createElement('div')
    const editNomeResponsavelLabel = window.document.createElement('label')
    editNomeResponsavelLabel.setAttribute('for', 'editNomeResponsavel')
    editNomeResponsavelLabel.innerHTML = '<strong>Nome do Responsável:</strong> '
    const editNomeResponsavel = window.document.createElement('input')
    editNomeResponsavel.setAttribute('id', 'editNomeResponsavel')
    editNomeResponsavel.setAttribute('type', 'text')
    editNomeResponsavel.style.marginBottom = '5px'
    editNomeResponsavelDiv.appendChild(editNomeResponsavelLabel)
    editNomeResponsavelDiv.appendChild(editNomeResponsavel)
    
    const editDataNascimentoResponsavelDiv = window.document.createElement('div')
    const editDataNascimentoResponsavelLabel = window.document.createElement('label')
    editDataNascimentoResponsavelLabel.setAttribute('for', 'editDataNascimentoResponsavel')
    editDataNascimentoResponsavelLabel.innerHTML = '<strong>Data de Nascimento:</strong> '
    const editDataNascimentoResponsavel = window.document.createElement('input')
    editDataNascimentoResponsavel.setAttribute('id', 'editDataNascimentoResponsavel')
    editDataNascimentoResponsavel.setAttribute('type', 'date')
    editDataNascimentoResponsavel.style.marginBottom = '5px'
    editDataNascimentoResponsavelDiv.appendChild(editDataNascimentoResponsavelLabel)
    editDataNascimentoResponsavelDiv.appendChild(editDataNascimentoResponsavel)
    
    responsavelEdit.appendChild(editCpfResponsavelDiv)
    responsavelEdit.appendChild(editNomeResponsavelDiv)
    responsavelEdit.appendChild(editDataNascimentoResponsavelDiv)

    const editTipoGrauInstrucaoDiv = window.document.createElement('div')
    const editTipoGrauInstrucaoLabel = window.document.createElement('label')
    editTipoGrauInstrucaoLabel.setAttribute('for', 'editTipoGrauInstrucao')
    editTipoGrauInstrucaoLabel.innerHTML = '<strong>Grau de Instrução:</strong> '
    const editTipoGrauInstrucao = window.document.createElement('select')
    editTipoGrauInstrucao.setAttribute('id', 'editTipoGrauInstrucao')
    const optTipoGrauInstrucao = window.document.createElement('option')
    optTipoGrauInstrucao.innerText = 'Selecione o Grau de Instrução'
    editTipoGrauInstrucao.appendChild(optTipoGrauInstrucao)
    fillComboEnum(editTipoGrauInstrucao, TIPO_GRAU_INSTRUCAO)
    editTipoGrauInstrucao.addEventListener('change', matchEditSelect)
    editTipoGrauInstrucao.style.width = '330px'
    editTipoGrauInstrucao.style.marginBottom = '5px'
    editTipoGrauInstrucao.style.font = 'bold 10pt Arial'
    editTipoGrauInstrucaoDiv.appendChild(editTipoGrauInstrucaoLabel)
    editTipoGrauInstrucaoDiv.appendChild(editTipoGrauInstrucao)
    responsavelEdit.appendChild(editTipoGrauInstrucaoDiv)

    const editTipoEstadoCivilDiv = window.document.createElement('div')
    const editTipoEstadoCivilLabel = window.document.createElement('label')
    editTipoEstadoCivilLabel.setAttribute('for', 'editTipoEstadoCivil')
    editTipoEstadoCivilLabel.innerHTML = '<strong>Estado Civil:</strong> '
    const editTipoEstadoCivil = window.document.createElement('select')
    editTipoEstadoCivil.setAttribute('id', 'editTipoEstadoCivil')
    const optTipoEstadoCivil = window.document.createElement('option')
    optTipoEstadoCivil.innerText = 'Selecione o Estado Civil'
    editTipoEstadoCivil.appendChild(optTipoEstadoCivil)
    fillComboEnum(editTipoEstadoCivil, TIPO_ESTADO_CIVIL)
    editTipoEstadoCivil.addEventListener('change', matchEditSelect)
    editTipoEstadoCivil.style.width = '330px'
    editTipoEstadoCivil.style.marginBottom = '5px'
    editTipoEstadoCivil.style.font = 'bold 10pt Arial'
    editTipoEstadoCivilDiv.appendChild(editTipoEstadoCivilLabel)
    editTipoEstadoCivilDiv.appendChild(editTipoEstadoCivil)
    responsavelEdit.appendChild(editTipoEstadoCivilDiv)

    const editTipoSexoDiv = window.document.createElement('div')
    const editTipoSexoLabel = window.document.createElement('label')
    editTipoSexoLabel.setAttribute('for', 'editTipoSexo')
    editTipoSexoLabel.innerHTML = '<strong>Sexo:</strong> '
    const editTipoSexo = window.document.createElement('select')
    editTipoSexo.setAttribute('id', 'editTipoSexo')
    const optTipoSexo = window.document.createElement('option')
    optTipoSexo.innerText = 'Selecione o Sexo'
    editTipoSexo.appendChild(optTipoSexo)
    fillComboEnum(editTipoSexo, TIPO_SEXO)
    editTipoSexo.addEventListener('change', matchEditSelect)
    editTipoSexo.style.width = '330px'
    editTipoSexo.style.marginBottom = '5px'
    editTipoSexo.style.font = 'bold 10pt Arial'
    editTipoSexoDiv.appendChild(editTipoSexoLabel)
    editTipoSexoDiv.appendChild(editTipoSexo)
    responsavelEdit.appendChild(editTipoSexoDiv)

    if (responsavel && index >= 0) {
        editCpfResponsavel.value = responsavel.cpf
        editNomeResponsavel.value = responsavel.nome
        editDataNascimentoResponsavel.value = responsavel.dataNascimento
        editTipoGrauInstrucao.value = responsavel.tipoGrauInstrucao
        editTipoEstadoCivil.value = responsavel.tipoEstadoCivil
        editTipoSexo.value = responsavel.tipoSexo
        initEditButtons(index)            
    } else {
        initAddNewButtons()
    }
}

function matchEditSelect() {
    if (this.value != 'Selecione o Grau de Instrução' && this.value != 'Selecione o Estado Civil' && this.value != 'Selecione o Sexo') {
        this.style.font = 'bold 10pt Arial'
    } else {
        this.style.font = 'normal 10pt Arial'
    }
}

function fillComboEnum(comboBox, enumCombo) {
    if (comboBox.children.length <= 1) {
        for (let field in enumCombo) {
            const opt = window.document.createElement('option')
            opt.value = field
            opt.innerText = enumCombo[field]
            opt.style.font = 'bold 10pt Arial'
            comboBox.appendChild(opt)
        }
    }
}

function limpaEditPage() {
    let qtdElementos = responsavelEdit.childElementCount
    for (let index = 0; index < qtdElementos; index++) {
        responsavelEdit.children.item(0).remove()
    }
}

function initEditButtons(index) {
    const botoesEdit = window.document.createElement('div')
    const updateButton = window.document.createElement('input')
    updateButton.setAttribute('id', 'btnAtualizar')
    updateButton.setAttribute('type', 'button')
    updateButton.value = 'Atualizar Dados'
    updateButton.addEventListener('click', () => { atualizar(index) })
    updateButton.style.marginRight = '5px'
    const backToListButton = window.document.createElement('input')
    backToListButton.setAttribute('id', 'btnVoltar')
    backToListButton.setAttribute('type', 'button')
    backToListButton.value = 'Voltar para Listagem'
    backToListButton.addEventListener('click', backToList)
    backToListButton.style.marginRight = '5px'
    botoesEdit.appendChild(updateButton)
    botoesEdit.appendChild(backToListButton)
    responsavelEdit.appendChild(botoesEdit)
}

function atualizar(index) {
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editCpfResponsavel = window.document.querySelector('input#editCpfResponsavel')
    const editNomeResponsavel = window.document.querySelector('input#editNomeResponsavel')
    const editDataNascimentoResponsavel = window.document.querySelector('input#editDataNascimentoResponsavel')
    const editTipoGrauInstrucao = window.document.querySelector('select#editTipoGrauInstrucao')
    const editTipoEstadoCivil = window.document.querySelector('select#editTipoEstadoCivil')
    const editTipoSexo = window.document.querySelector('select#editTipoSexo')
    insertableEmpresa.responsaveis[index].cpf = editCpfResponsavel.value
    insertableEmpresa.responsaveis[index].nome = editNomeResponsavel.value
    insertableEmpresa.responsaveis[index].dataNascimento = editDataNascimentoResponsavel.value
    insertableEmpresa.responsaveis[index].tipoGrauInstrucao = editTipoGrauInstrucao.value
    insertableEmpresa.responsaveis[index].tipoEstadoCivil = editTipoEstadoCivil.value
    insertableEmpresa.responsaveis[index].tipoSexo = editTipoSexo.value
    updateResponsavel(insertableEmpresa, insertableEmpresa.responsaveis[index])
}

function updateResponsavel(insertableEmpresa, responsavel) {
    const msgErro = isValid(responsavel)
    if (msgErro == '') {
        Object.assign(empresa, insertableEmpresa)
        window.alert('O Responsável Legal foi atualizado com sucesso.')            
    } else {
        window.alert('O Responsável Legal não foi atualizado porque:\n\n' + msgErro)        
    }
}

function initAddNewButtons() {
    const botoesAddNew = window.document.createElement('div')
    const addNewButton = window.document.createElement('input')
    addNewButton.setAttribute('id', 'btnAdicionar')
    addNewButton.setAttribute('type', 'button')
    addNewButton.value = 'Adicionar'
    addNewButton.addEventListener('click', adicionar)
    addNewButton.style.marginRight = '5px'
    const backToListButton = window.document.createElement('input')
    backToListButton.setAttribute('id', 'btnVoltar')
    backToListButton.setAttribute('type', 'button')
    backToListButton.value = 'Voltar para Listagem'
    backToListButton.addEventListener('click', backToList)
    backToListButton.style.marginRight = '5px'
    botoesAddNew.appendChild(addNewButton)
    botoesAddNew.appendChild(backToListButton)
    responsavelEdit.appendChild(botoesAddNew)
}

function adicionar() {
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editCpfResponsavel = window.document.querySelector('input#editCpfResponsavel')
    const editNomeResponsavel = window.document.querySelector('input#editNomeResponsavel')
    const editDataNascimentoResponsavel = window.document.querySelector('input#editDataNascimentoResponsavel')
    const editTipoGrauInstrucao = window.document.querySelector('select#editTipoGrauInstrucao')
    const editTipoEstadoCivil = window.document.querySelector('select#editTipoEstadoCivil')
    const editTipoSexo = window.document.querySelector('select#editTipoSexo')
    const responsavel = new Pessoa()
    responsavel.cpf = editCpfResponsavel.value
    responsavel.nome = editNomeResponsavel.value
    responsavel.dataNascimento = editDataNascimentoResponsavel.value
    responsavel.tipoGrauInstrucao = editTipoGrauInstrucao.value
    responsavel.tipoEstadoCivil = editTipoEstadoCivil.value
    responsavel.tipoSexo = editTipoSexo.value
    if (!insertableEmpresa.responsaveis) {
        insertableEmpresa.responsaveis = []
    }
    insertableEmpresa.responsaveis.push(responsavel)
    addResponsavel(insertableEmpresa, responsavel)
}

function addResponsavel(insertableEmpresa, responsavel) {
    const msgErro = isValid(responsavel)
    if (msgErro == '') {
        Object.assign(empresa, insertableEmpresa)
        window.alert('O Responsável Legal foi adicionado com sucesso.')            
    } else {
        window.alert('O Responsável Legal não foi adicionado porque:\n\n' + msgErro)        
    }
}

function isValid(responsavel) {
    let msgErro = ''
    if (!responsavel.cpf || !(/[0-9]{11}/.test(responsavel.cpf))) {
        msgErro += 'C.P.F. do responsável legal inválido.\n'
    }
    if (!responsavel.nome || !(/[A-ZÁÉÍÓÚÃÕÀÂÊÔÇ &\\-ªº\\.']{1,100}/.test(responsavel.nome))) {
        msgErro += 'Nome do responsável legal inválido.\n'    
    }
    if (!responsavel.dataNascimento) {
        msgErro += 'Data de nascimento do responsável legal inválida.\n'    
    }
    if (responsavel.tipoGrauInstrucao == 'Selecione o Grau de Instrução') {
        msgErro += 'Grau de instrução do responsável legal inválido.\n'    
    }
    if (responsavel.tipoEstadoCivil == 'Selecione o Estado Civil') {
        msgErro += 'Estado civil do responsável legal inválido.\n'    
    }
    if (responsavel.tipoSexo == 'Selecione o Sexo') {
        msgErro += 'Sexo do responsável legal inválido.\n'    
    }
    return msgErro
}

function isValidCpf(params) {
    
}

function isValidDataNascimento(params) {
    
}

function backToList() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#list').classList.add('active')
    window.document.getElementById('list/responsaveis').classList.add('active')
    window.history.pushState(empresa, '', '#listNew/responsaveis')
    fillTable(empresa)
}
