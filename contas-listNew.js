import { Conta, Agencia, TIPO_CONTA } from './empresa-model.js'
import { fillForm } from './contas-editNew.js'
import { empresa } from './empresas-editNew.js'

const contasList = window.document.getElementById('list/contas')

export function fillTable(empresa) {
    limpaTabela()
    limpaAddNewButton()
    limpaBackToEditButton()
    initAddNewButton()
    const contasTable = window.document.createElement('table')
    contasTable.setAttribute('id', 'contasTable')
    contasList.appendChild(contasTable)
    if (empresa.contas?.length) {
        createTableHeaders(contasTable)        
        let index = 0
        for (const conta of empresa.contas) {
            fillTableLine(conta, contasTable, index)
            index++
        }    
    } else {
        emptyTableMsg(contasTable)
    }
    initBackToEditButton()
}

function fillTableLine(conta, contasTable, index) {
    const tr = window.document.createElement('tr')
    tr.setAttribute('id', index)
    const tdNumeroConta = window.document.createElement('td')
    tdNumeroConta.innerText = conta.numero
    tdNumeroConta.style.textAlign = 'center'
    tdNumeroConta.style.border = '1px solid black'
    tdNumeroConta.style.width = '150px'
    tdNumeroConta.style.height = '20px'
    tr.appendChild(tdNumeroConta)
    const tdNumeroAgencia = window.document.createElement('td')
    tdNumeroAgencia.innerText = conta.agencia.numero
    tdNumeroAgencia.style.textAlign = 'center'
    tdNumeroAgencia.style.border = '1px solid black'
    tdNumeroAgencia.style.width = '150px'
    tdNumeroAgencia.style.height = '20px'
    tr.appendChild(tdNumeroAgencia)
    const tdCodigoBanco = window.document.createElement('td')
    tdCodigoBanco.innerText = conta.agencia.codigoBanco
    tdCodigoBanco.style.textAlign = 'center'
    tdCodigoBanco.style.border = '1px solid black'
    tdCodigoBanco.style.width = '150px'
    tdCodigoBanco.style.height = '20px'
    tr.appendChild(tdCodigoBanco)
    const tdTipoConta = window.document.createElement('td')
    tdTipoConta.value = conta.tipoConta
    tdTipoConta.innerText = TIPO_CONTA[conta.tipoConta]
    tdTipoConta.style.textAlign = 'center'
    tdTipoConta.style.border = '1px solid black'
    tdTipoConta.style.width = '150px'
    tdTipoConta.style.height = '20px'
    tr.appendChild(tdTipoConta)
    const tdEditar = window.document.createElement('td')
    const editarButton = window.document.createElement('input')
    editarButton.setAttribute('type', 'button')
    editarButton.setAttribute('value', 'Editar')
    editarButton.addEventListener('click', () => { goToEditPage(tr) })
    tdEditar.appendChild(editarButton)
    tr.appendChild(tdEditar)
    const tdApagar = window.document.createElement('td')
    const apagarButton = window.document.createElement('input')
    apagarButton.setAttribute('type', 'button')
    apagarButton.setAttribute('value', 'Apagar')
    apagarButton.addEventListener('click', () => { apagar(tr) })
    tdApagar.appendChild(apagarButton)
    tr.appendChild(tdApagar)   
    contasTable.appendChild(tr)
}

function createTableHeaders(contasTable) {
    const tr = window.document.createElement('tr')
    const tdNumeroConta = window.document.createElement('td')
    tdNumeroConta.innerText = 'Número da Conta'
    tdNumeroConta.style.font = 'bold 10pt Arial'
    tdNumeroConta.style.textAlign = 'center'
    tdNumeroConta.style.border = '1px solid black'
    tr.appendChild(tdNumeroConta)
    const tdNumeroAgencia = window.document.createElement('td')
    tdNumeroAgencia.innerText = 'Número da Agência'
    tdNumeroAgencia.style.font = 'bold 10pt Arial'
    tdNumeroAgencia.style.textAlign = 'center'
    tdNumeroAgencia.style.border = '1px solid black'
    tr.appendChild(tdNumeroAgencia)
    const tdCodigoBanco = window.document.createElement('td')
    tdCodigoBanco.innerText = 'Código do Banco'
    tdCodigoBanco.style.font = 'bold 10pt Arial'
    tdCodigoBanco.style.textAlign = 'center'
    tdCodigoBanco.style.border = '1px solid black'
    tr.appendChild(tdCodigoBanco)
    const tdTipoConta = window.document.createElement('td')
    tdTipoConta.innerText = 'Tipo da Conta'
    tdTipoConta.style.font = 'bold 10pt Arial'
    tdTipoConta.style.textAlign = 'center'
    tdTipoConta.style.border = '1px solid black'
    tr.appendChild(tdTipoConta)
    contasTable.appendChild(tr)
}

function goToEditPage(tr) {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/contas').classList.add('active')
    window.history.pushState(setSelectedConta(tr), '', '#editNew/contas')
    fillForm(setSelectedConta(tr), getIndexConta(tr))
}

function setSelectedConta(tr) {
    const conta = new Conta()
    conta.numero = tr.children.item(0).innerText
    conta.agencia = new Agencia()
    conta.agencia.numero = tr.children.item(1).innerText
    conta.agencia.codigoBanco = tr.children.item(2).innerText
    conta.tipoConta = tr.children.item(3).value
    return conta
}

function getIndexConta(tr) {
    return Number(tr.getAttribute('id'))
}

function apagar(tr) {
    const i = getIndexConta(tr)
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    insertableEmpresa.contas.splice(i, 1)
    deleteConta(insertableEmpresa)   
}

function deleteConta(insertableEmpresa) {
    Object.assign(empresa, insertableEmpresa)
    fillTable(empresa)
    window.alert('Conta Bancária apagada da lista com sucesso.')
}

function initAddNewButton() {
    const addNewDiv = window.document.createElement('div')
    addNewDiv.style.textAlign = 'left'
    addNewDiv.setAttribute('id', 'addNewDiv')
    const addNewButton = window.document.createElement('input')
    addNewButton.setAttribute('type', 'button')
    addNewButton.setAttribute('value', 'Adicionar uma Conta Bancária')
    addNewButton.addEventListener('click', addNew)
    addNewDiv.appendChild(addNewButton)
    contasList.appendChild(addNewDiv)
}

function addNew() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/contas').classList.add('active')
    window.history.pushState(empresa, '', '#editNew/contas')
    fillForm()
}

function limpaAddNewButton() {
    const addNewDiv = window.document.querySelector('div#addNewDiv')
    if (addNewDiv) {
        addNewDiv.remove()
    }
}

function initBackToEditButton() {
    const backToEditDiv = window.document.createElement('div')
    backToEditDiv.style.textAlign = 'left'
    backToEditDiv.setAttribute('id', 'backToEditDiv')
    const backToEditButton = window.document.createElement('input')
    backToEditButton.setAttribute('type', 'button')
    backToEditButton.setAttribute('value', 'Voltar')
    backToEditButton.addEventListener('click', backToEdit)
    backToEditDiv.appendChild(backToEditButton)
    contasList.appendChild(backToEditDiv)
}

function backToEdit() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/empresas').classList.add('active')
    window.document.getElementById('edit/side').classList.add('active')
    window.history.pushState(empresa, '', '#editNew/empresas')
}

function limpaBackToEditButton() {
    const backToEditDiv = window.document.querySelector('div#backToEditDiv')
    if (backToEditDiv) {
        backToEditDiv.remove()
    }
}

function limpaTabela() {
    const contasTable = window.document.querySelector('table#contasTable')
    if (contasTable) {
        contasTable.remove()
    }
}

function emptyTableMsg(contasTable) {
    const tr = window.document.createElement('tr')
    const td = window.document.createElement('td')
    const pEmptyTable = window.document.createElement('p')
    pEmptyTable.innerText = 'Não há contas bancárias cadastradas para essa empresa.'
    pEmptyTable.style.font = 'bold 10pt Arial'
    pEmptyTable.style.textAlign = 'center'
    td.appendChild(pEmptyTable)
    tr.appendChild(td)
    contasTable.appendChild(tr)
}
