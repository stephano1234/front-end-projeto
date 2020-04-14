import { Email } from './empresa-model.js'
import { fillForm } from './emails-edit.js'
import { empresa } from './empresas-edit.js'
import { updateData } from './empresa-service.js'

const emailsList = window.document.getElementById('list/emails')

export function fillTable(empresa) {
    limpaTabela()
    limpaAddNewButton()
    limpaBackToEditButton()
    initAddNewButton()
    const emailsTable = window.document.createElement('table')
    emailsTable.setAttribute('id', 'emailsTable')
    emailsList.appendChild(emailsTable)
    if (empresa.emails?.length) {
        createTableHeaders(emailsTable)        
        let index = 0
        for (const email of empresa.emails) {
            fillTableLine(email, emailsTable, index)
            index++
        }    
    } else {
        emptyTableMsg(emailsTable)
    }
    initBackToEditButton()
}

function fillTableLine(email, emailsTable, index) {
    const tr = window.document.createElement('tr')
    tr.setAttribute('id', index)
    const tdEnderecoEmail = window.document.createElement('td')
    tdEnderecoEmail.innerText = email.endereco
    tdEnderecoEmail.style.textAlign = 'center'
    tdEnderecoEmail.style.border = '1px solid black'
    tdEnderecoEmail.style.width = '150px'
    tdEnderecoEmail.style.height = '20px'
    tr.appendChild(tdEnderecoEmail)
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
    emailsTable.appendChild(tr)
}

function createTableHeaders(emailsTable) {
    const tr = window.document.createElement('tr')
    const tdEnderecoEmail = window.document.createElement('td')
    tdEnderecoEmail.innerText = 'Endereço do E-mail'
    tdEnderecoEmail.style.font = 'bold 10pt Arial'
    tdEnderecoEmail.style.textAlign = 'center'
    tdEnderecoEmail.style.border = '1px solid black'
    tr.appendChild(tdEnderecoEmail)
    emailsTable.appendChild(tr)
}

function goToEditPage(tr) {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/emails').classList.add('active')
    window.history.pushState(setSelectedEmail(tr), '', '#edit/emails')
    fillForm(setSelectedEmail(tr))
}

function setSelectedEmail(tr) {
    //Assim como o telefonesFixo-list e o celulares-list, usamos Object.assign para clonar
    //os objetos.
    const i = getIndexEmail(tr)
    const email = new Email()
    Object.assign(email, empresa.emails[i])
    return { obj: email, index: i }
}

function getIndexEmail(tr) {
    return Number(tr.getAttribute('id'))
}

function apagar(tr) {
    const i = getIndexEmail(tr)
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    updatableEmpresa.emails.splice(i, 1)
    deleteEmail(updatableEmpresa)   
}

function deleteEmail(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        () => {
            Object.assign(empresa, updatableEmpresa)
            fillTable(empresa)
            window.alert('E-mail apagado da lista com sucesso.')
        }
    )    
}

function initAddNewButton() {
    const addNewDiv = window.document.createElement('div')
    addNewDiv.style.textAlign = 'left'
    addNewDiv.setAttribute('id', 'addNewDiv')
    const addNewButton = window.document.createElement('input')
    addNewButton.setAttribute('type', 'button')
    addNewButton.setAttribute('value', 'Adicionar um E-mail')
    addNewButton.addEventListener('click', addNew)
    addNewDiv.appendChild(addNewButton)
    emailsList.appendChild(addNewDiv)
}

function addNew() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/emails').classList.add('active')
    window.history.pushState(empresa, '', '#edit/emails')
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
    emailsList.appendChild(backToEditDiv)
}

function backToEdit() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/empresas').classList.add('active')
    window.document.getElementById('edit/side').classList.add('active')
    window.history.pushState(empresa, '', '#edit/empresas')
}

function limpaBackToEditButton() {
    const backToEditDiv = window.document.querySelector('div#backToEditDiv')
    if (backToEditDiv) {
        backToEditDiv.remove()
    }
}

function limpaTabela() {
    const emailsTable = window.document.querySelector('table#emailsTable')
    if (emailsTable) {
        emailsTable.remove()
    }
}

function emptyTableMsg(emailsTable) {
    const tr = window.document.createElement('tr')
    const td = window.document.createElement('td')
    const pEmptyTable = window.document.createElement('p')
    pEmptyTable.innerText = 'Não há e-mails cadastrados para essa empresa.'
    pEmptyTable.style.font = 'bold 10pt Arial'
    pEmptyTable.style.textAlign = 'center'
    td.appendChild(pEmptyTable)
    tr.appendChild(td)
    emailsTable.appendChild(tr)
}
