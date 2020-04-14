import { Conta, TIPO_CONTA, Agencia } from './empresa-model.js'
import { empresa } from './empresas-editNew.js'
import { fillTable } from './contas-listNew.js'

const contaEdit = window.document.getElementById('edit/contas')

export function fillForm(conta, index) {
    limpaEditPage()
    
    const editNumeroContaDiv = window.document.createElement('div')
    const editNumeroContaLabel = window.document.createElement('label')
    editNumeroContaLabel.setAttribute('for', 'editNumeroConta')
    editNumeroContaLabel.innerHTML = '<strong>Número da Conta:</strong> '
    const editNumeroConta = window.document.createElement('input')
    editNumeroConta.setAttribute('id', 'editNumeroConta')
    editNumeroConta.setAttribute('type', 'text')
    editNumeroConta.style.marginBottom = '5px'
    editNumeroContaDiv.appendChild(editNumeroContaLabel)
    editNumeroContaDiv.appendChild(editNumeroConta)
    
    const editNumeroAgenciaDiv = window.document.createElement('div')
    const editNumeroAgenciaLabel = window.document.createElement('label')
    editNumeroAgenciaLabel.setAttribute('for', 'editNumeroAgencia')
    editNumeroAgenciaLabel.innerHTML = '<strong>Número da Agência:</strong> '
    const editNumeroAgencia = window.document.createElement('input')
    editNumeroAgencia.setAttribute('id', 'editNumeroAgencia')
    editNumeroAgencia.setAttribute('type', 'text')
    editNumeroAgencia.style.marginBottom = '5px'
    editNumeroAgenciaDiv.appendChild(editNumeroAgenciaLabel)
    editNumeroAgenciaDiv.appendChild(editNumeroAgencia)
    
    const editCodigoBancoDiv = window.document.createElement('div')
    const editCodigoBancoLabel = window.document.createElement('label')
    editCodigoBancoLabel.setAttribute('for', 'editCodigoBanco')
    editCodigoBancoLabel.innerHTML = '<strong>Código do Banco:</strong> '
    const editCodigoBanco = window.document.createElement('input')
    editCodigoBanco.setAttribute('id', 'editCodigoBanco')
    editCodigoBanco.setAttribute('type', 'text')
    editCodigoBanco.style.marginBottom = '5px'
    editCodigoBancoDiv.appendChild(editCodigoBancoLabel)
    editCodigoBancoDiv.appendChild(editCodigoBanco)
    
    contaEdit.appendChild(editNumeroContaDiv)
    contaEdit.appendChild(editNumeroAgenciaDiv)
    contaEdit.appendChild(editCodigoBancoDiv)
    
    const editTipoContaDiv = window.document.createElement('div')
    const editTipoContaLabel = window.document.createElement('label')
    editTipoContaLabel.setAttribute('for', 'editTipoConta')
    editTipoContaLabel.innerHTML = '<strong>Tipo da Conta:</strong> '
    const editTipoConta = window.document.createElement('select')
    editTipoConta.setAttribute('id', 'editTipoConta')
    const optTipoEmpresa = window.document.createElement('option')
    optTipoEmpresa.innerText = 'Selecione o Tipo da Conta'
    editTipoConta.appendChild(optTipoEmpresa)
    fillComboEnum(editTipoConta, TIPO_CONTA)
    editTipoConta.addEventListener('change', matchEditSelect)
    editTipoConta.style.width = '330px'
    editTipoConta.style.marginBottom = '5px'
    editTipoContaDiv.appendChild(editTipoContaLabel)
    editTipoContaDiv.appendChild(editTipoConta)
    contaEdit.appendChild(editTipoContaDiv)
    
    if (conta && index >= 0) {
        editTipoConta.style.font = 'bold 10pt Arial'
        editNumeroConta.value = conta.numero
        editNumeroAgencia.value = conta.agencia.numero
        editCodigoBanco.value = conta.agencia.codigoBanco
        editTipoConta.value = conta.tipoConta
        initEditButtons(index)            
    } else {
        initAddNewButtons()
    }
}

function matchEditSelect() {
    if (this.value != 'Selecione a Categoria da Empresa' && this.value != 'Selecione o Porte da Empresa') {
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
    let qtdElementos = contaEdit.childElementCount
    for (let index = 0; index < qtdElementos; index++) {
        contaEdit.children.item(0).remove()
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
    contaEdit.appendChild(botoesEdit)
}

function atualizar(index) {
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editNumeroConta = window.document.querySelector('input#editNumeroConta')
    const editNumeroAgencia = window.document.querySelector('input#editNumeroAgencia')
    const editCodigoBanco = window.document.querySelector('input#editCodigoBanco')
    const editTipoConta = window.document.querySelector('select#editTipoConta')
    insertableEmpresa.contas[index].numero = editNumeroConta.value
    insertableEmpresa.contas[index].agencia.numero = editNumeroAgencia.value
    insertableEmpresa.contas[index].agencia.codigoBanco = editCodigoBanco.value
    insertableEmpresa.contas[index].tipoConta = editTipoConta.value
    updateConta(insertableEmpresa, insertableEmpresa.contas[index])
}

function updateConta(insertableEmpresa, conta) {
    const msgErro = isValid(conta)
    if (msgErro == '') {
        Object.assign(empresa, insertableEmpresa)
        window.alert('A Conta Bancária foi atualizada com sucesso.')            
    } else {
        window.alert('A Conta Bancária não foi atualizada porque:\n\n' + msgErro)        
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
    contaEdit.appendChild(botoesAddNew)
}

function adicionar() {
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editNumeroConta = window.document.querySelector('input#editNumeroConta')
    const editNumeroAgencia = window.document.querySelector('input#editNumeroAgencia')
    const editCodigoBanco = window.document.querySelector('input#editCodigoBanco')
    const editTipoConta = window.document.querySelector('select#editTipoConta')
    const conta = new Conta()
    const agencia = new Agencia()
    conta.agencia = agencia
    conta.numero = editNumeroConta.value
    conta.agencia.numero = editNumeroAgencia.value
    conta.agencia.codigoBanco = editCodigoBanco.value
    conta.tipoConta = editTipoConta.value
    if (!insertableEmpresa.contas) {
        insertableEmpresa.contas = []
    }
    insertableEmpresa.contas.push(conta)
    addConta(insertableEmpresa, conta)
}

function addConta(insertableEmpresa, conta) {
    const msgErro = isValid(conta)
    if (msgErro == '') {
        Object.assign(empresa, insertableEmpresa)
        window.alert('A Conta Bancária foi adicionada com sucesso.')            
    } else {
        window.alert('A Conta Bancária não foi adicionada porque:\n\n' + msgErro)        
    }
}

function isValid(conta) {
    let msgErro = ''
    if (!conta.numero || !(/[A-Za-z0-9]{1,12}/.test(conta.numero))) {
        msgErro += 'Número da conta bancária inválido.\n'    
    }
    if (!conta.agencia.numero || !(/[A-Za-z0-9]{1,5}/.test(conta.agencia.numero))) {
        msgErro += 'Número da agência da conta bancária inválido.\n'    
    }
    if (!conta.agencia.codigoBanco || !(/[A-Za-z0-9]{1,4}/.test(conta.agencia.codigoBanco))) {
        msgErro += 'Código do banco da agência da conta bancária inválido.\n'    
    }
    if (conta.tipoConta == 'Selecione o Tipo da Conta') {
        msgErro += 'Tipo da conta bancária inválido.\n'    
    }
    return msgErro
}

function backToList() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#list').classList.add('active')
    window.document.getElementById('list/contas').classList.add('active')
    window.history.pushState(empresa, '', '#listNew/contas')
    fillTable(empresa)
}
