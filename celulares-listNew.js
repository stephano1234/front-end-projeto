import { Celular } from './empresa-model.js'
import { fillForm } from './celulares-editNew.js'
import { empresa } from './empresas-editNew.js'

const celularesList = window.document.getElementById('list/celulares')

export function fillTable(empresa) {
    limpaTabela()
    limpaAddNewButton()
    limpaBackToEditButton()
    initAddNewButton()
    const celularesTable = window.document.createElement('table')
    celularesTable.setAttribute('id', 'celularesTable')
    celularesList.appendChild(celularesTable)
    if (empresa.celulares?.length) {
        createTableHeaders(celularesTable)
        let index = 0
        for (const celular of empresa.celulares) {
            fillTableLine(celular, celularesTable, index)
            index++
        }
    } else {
        emptyTableMsg(celularesTable)
    }
    initBackToEditButton()
}

function fillTableLine(celular, celularesTable, index) {
    const tr = window.document.createElement('tr')
    tr.setAttribute('id', index)
    const tdNumeroCelular = window.document.createElement('td')
    tdNumeroCelular.innerText = celular.numero
    tdNumeroCelular.style.textAlign = 'center'
    tdNumeroCelular.style.border = '1px solid black'
    tdNumeroCelular.style.width = '150px'
    tdNumeroCelular.style.height = '20px'
    tr.appendChild(tdNumeroCelular)
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
    celularesTable.appendChild(tr)
}

function createTableHeaders(celularesTable) {
    const tr = window.document.createElement('tr')
    const tdNumeroCelular = window.document.createElement('td')
    tdNumeroCelular.innerText = 'Número do Celular'
    tdNumeroCelular.style.font = 'bold 10pt Arial'
    tdNumeroCelular.style.textAlign = 'center'
    tdNumeroCelular.style.border = '1px solid black'
    tr.appendChild(tdNumeroCelular)
    celularesTable.appendChild(tr)
}

function goToEditPage(tr) {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/celulares').classList.add('active')
    window.history.pushState(setSelectedCelular(tr), '', '#editNew/celulares')
    fillForm(setSelectedCelular(tr))
}

function setSelectedCelular(tr) {
    //Tanto no telefoneFixo-list.js como neste .js este método está diferente, usando o Object.assign,
    //sem fazer a atribuição item a item. Podemos fazer isso aqui pois as propriedades do objeto
    //celular não possuem outros objetos dentro, caso contrário eles ficariam com a mesma re-
    //ferência dos objetos que são propriedades do objeto clonado.
    const i = getIndexCelular(tr)
    const celular = new Celular()
    Object.assign(celular, empresa.celulares[i])
    return { obj: celular, index: i }
}

function getIndexCelular(tr) {
    return Number(tr.getAttribute('id'))
}

function apagar(tr) {
    const i = getIndexCelular(tr)
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    insertableEmpresa.celulares.splice(i, 1)
    deleteCelular(insertableEmpresa)
}

function deleteCelular(insertableEmpresa) {
    Object.assign(empresa, insertableEmpresa)
    fillTable(empresa)
    window.alert('Celular apagado da lista com sucesso.')
}

function initAddNewButton() {
    const addNewDiv = window.document.createElement('div')
    addNewDiv.style.textAlign = 'left'
    addNewDiv.setAttribute('id', 'addNewDiv')
    const addNewButton = window.document.createElement('input')
    addNewButton.setAttribute('type', 'button')
    addNewButton.setAttribute('value', 'Adicionar um Celular')
    addNewButton.addEventListener('click', addNew)
    addNewDiv.appendChild(addNewButton)
    celularesList.appendChild(addNewDiv)
}

function addNew() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/celulares').classList.add('active')
    window.history.pushState(empresa, '', '#editNew/celulares')
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
    celularesList.appendChild(backToEditDiv)
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
    const celularesTable = window.document.querySelector('table#celularesTable')
    if (celularesTable) {
        celularesTable.remove()
    }
}

function emptyTableMsg(celularesTable) {
    const tr = window.document.createElement('tr')
    const td = window.document.createElement('td')
    const pEmptyTable = window.document.createElement('p')
    pEmptyTable.innerText = 'Não há celulares cadastrados para essa empresa.'
    pEmptyTable.style.font = 'bold 10pt Arial'
    pEmptyTable.style.textAlign = 'center'
    td.appendChild(pEmptyTable)
    tr.appendChild(td)
    celularesTable.appendChild(tr)
}
