import { empresa } from './empresas-editNew.js'
import { fillTable } from './emails-listNew.js'
import { Email } from './empresa-model.js'

const emailEdit = window.document.getElementById('edit/emails')

export function fillForm(selectedEmail) {
    limpaEditPage()

    const editEnderecoEmailDiv = window.document.createElement('div')
    const editEnderecoEmailLabel = window.document.createElement('label')
    editEnderecoEmailLabel.setAttribute('for', 'editEnderecoEmail')
    editEnderecoEmailLabel.innerHTML = '<strong>Endereço do Email:</strong> '
    const editEnderecoEmail = window.document.createElement('input')
    editEnderecoEmail.setAttribute('id', 'editEnderecoEmail')
    editEnderecoEmail.setAttribute('type', 'text')
    editEnderecoEmail.style.marginBottom = '5px'
    editEnderecoEmailDiv.appendChild(editEnderecoEmailLabel)
    editEnderecoEmailDiv.appendChild(editEnderecoEmail)

    emailEdit.appendChild(editEnderecoEmailDiv)

    if (selectedEmail) {
        editEnderecoEmail.value = selectedEmail.obj.endereco
        initEditButtons(selectedEmail.index)        
    } else {
        initAddNewButtons()
    }
}

function limpaEditPage() {
    let qtdElementos = emailEdit.childElementCount
    for (let index = 0; index < qtdElementos; index++) {
        emailEdit.children.item(0).remove()
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
    emailEdit.appendChild(botoesEdit)
}

function atualizar(index) {
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editEnderecoEmail = window.document.querySelector('input#editEnderecoEmail')
    insertableEmpresa.emails[index].endereco = editEnderecoEmail.value
    updateEmail(insertableEmpresa, insertableEmpresa.emails[index])
}

function updateEmail(insertableEmpresa, email) {
    const msgErro = isValid(email)
    if (!msgErro) {
        Object.assign(empresa, insertableEmpresa)
        window.alert('O E-mail foi atualizado com sucesso.')            
    } else {
        window.alert('O E-mail não foi atualizado porque:\n\n' + msgErro)        
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
    emailEdit.appendChild(botoesAddNew)
}

function adicionar() {
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editEnderecoEmail = window.document.querySelector('input#editEnderecoEmail')
    const email = new Email()
    email.endereco = editEnderecoEmail.value
    if (!insertableEmpresa.emails) {
        insertableEmpresa.emails = []
    }
    insertableEmpresa.emails.push(email)
    addEmail(insertableEmpresa, email)
}

function addEmail(insertableEmpresa, email) {
    const msgErro = isValid(email)
    if (!msgErro) {
        Object.assign(empresa, insertableEmpresa)
        window.alert('O E-mail foi adicionado com sucesso.')            
    } else {
        window.alert('O E-mail não foi adicionado porque:\n\n' + msgErro)        
    }
}

function isValid(email) {
    let msgErro
    if (!email.endereco) {
        return msgErro = 'Endereço de e-mail inválido.'    
    }
    if (!(/^[a-z0-9][a-z0-9._-]{0,29}(?<![._-])@[a-z0-9][a-z0-9.-]{0,19}(?<![.-])\\.[a-z]{2,6}$/.test(email.endereco))) {
        return msgErro = 'Endereço de e-mail inválido.'    
    }
    return msgErro
}

function backToList() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#list').classList.add('active')
    window.document.getElementById('list/emails').classList.add('active')
    window.history.pushState(empresa, '', '#listNew/emails')
    fillTable(empresa)
}
