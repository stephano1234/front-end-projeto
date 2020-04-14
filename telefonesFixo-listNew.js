import { TelefoneFixo } from './empresa-model.js'
import { fillForm } from './telefonesFixo-editNew.js'
import { empresa } from './empresas-editNew.js'

const telefonesFixoList = window.document.getElementById('list/telefonesFixo')

export function fillTable(empresa) {
    limpaTabela()
    limpaAddNewButton()
    limpaBackToEditButton()
    initAddNewButton()
    const telefonesFixoTable = window.document.createElement('table')
    telefonesFixoTable.setAttribute('id', 'telefonesFixoTable')
    telefonesFixoList.appendChild(telefonesFixoTable)
    if (empresa.telefonesFixo?.length) {
        createTableHeaders(telefonesFixoTable)        
        let index = 0
        for (const telefoneFixo of empresa.telefonesFixo) {
            fillTableLine(telefoneFixo, telefonesFixoTable, index)
            index++
        }        
    } else {
        emptyTableMsg(telefonesFixoTable)
    }
    initBackToEditButton()
}

function fillTableLine(telefoneFixo, telefonesFixoTable, index) {
    const tr = window.document.createElement('tr')
    tr.setAttribute('id', index)
    const tdNumeroTelefoneFixo = window.document.createElement('td')
    tdNumeroTelefoneFixo.innerText = telefoneFixo.numero
    tdNumeroTelefoneFixo.style.textAlign = 'center'
    tdNumeroTelefoneFixo.style.border = '1px solid black'
    tdNumeroTelefoneFixo.style.width = '150px'
    tdNumeroTelefoneFixo.style.height = '20px'
    tr.appendChild(tdNumeroTelefoneFixo)
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
    telefonesFixoTable.appendChild(tr)
}

function createTableHeaders(telefonesFixoTable) {
    const tr = window.document.createElement('tr')
    const tdNumeroTelefoneFixo = window.document.createElement('td')
    tdNumeroTelefoneFixo.innerText = 'Número do Telefone Fixo'
    tdNumeroTelefoneFixo.style.font = 'bold 10pt Arial'
    tdNumeroTelefoneFixo.style.textAlign = 'center'
    tdNumeroTelefoneFixo.style.border = '1px solid black'
    tr.appendChild(tdNumeroTelefoneFixo)
    telefonesFixoTable.appendChild(tr)
}

function goToEditPage(tr) {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/telefonesFixo').classList.add('active')
    window.history.pushState(setSelectedTelefoneFixo(tr), '', '#editNew/telefonesFixo')
    fillForm(setSelectedTelefoneFixo(tr))
}

function setSelectedTelefoneFixo(tr) {
    //Tanto no celular-list.js como neste .js este método está diferente, usando o Object.assign,
    //sem fazer a atribuição item a item. Podemos fazer isso aqui pois as propriedades do objeto
    //telefoneFixo não possuem outros objetos dentro, caso contrário eles ficariam com a mesma re-
    //ferência dos objetos que são propriedades do objeto clonado.
    const i = getIndexTelefoneFixo(tr)
    const telefoneFixo = new TelefoneFixo()
    Object.assign(telefoneFixo, empresa.telefonesFixo[i])
    return { obj: telefoneFixo, index: i }
}

function getIndexTelefoneFixo(tr) {
    return Number(tr.getAttribute('id'))
}

function apagar(tr) {
    const i = getIndexTelefoneFixo(tr)
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    insertableEmpresa.telefonesFixo.splice(i, 1)
    deleteTelefoneFixo(insertableEmpresa)   
}

function deleteTelefoneFixo(insertableEmpresa) {
    Object.assign(empresa, insertableEmpresa)
    fillTable(empresa)
    window.alert('TelefoneFixo apagado da lista com sucesso.')
}

function initAddNewButton() {
    const addNewDiv = window.document.createElement('div')
    addNewDiv.style.textAlign = 'left'
    addNewDiv.setAttribute('id', 'addNewDiv')
    const addNewButton = window.document.createElement('input')
    addNewButton.setAttribute('type', 'button')
    addNewButton.setAttribute('value', 'Adicionar um Telefone Fixo')
    addNewButton.addEventListener('click', addNew)
    addNewDiv.appendChild(addNewButton)
    telefonesFixoList.appendChild(addNewDiv)
}

function addNew() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/telefonesFixo').classList.add('active')
    window.history.pushState(empresa, '', '#editNew/telefonesFixo')
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
    telefonesFixoList.appendChild(backToEditDiv)
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
    const telefonesFixoTable = window.document.querySelector('table#telefonesFixoTable')
    if (telefonesFixoTable) {
        telefonesFixoTable.remove()
    }
}

function emptyTableMsg(telefonesFixoTable) {
    const tr = window.document.createElement('tr')
    const td = window.document.createElement('td')
    const pEmptyTable = window.document.createElement('p')
    pEmptyTable.innerText = 'Não há telefones fixos cadastrados para essa empresa.'
    pEmptyTable.style.font = 'bold 10pt Arial'
    pEmptyTable.style.textAlign = 'center'
    td.appendChild(pEmptyTable)
    tr.appendChild(td)
    telefonesFixoTable.appendChild(tr)
}
