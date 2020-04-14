import { empresa } from './empresas-edit.js'
import { fillTable } from './emails-list.js'
import { Email } from './empresa-model.js'
import { updateData } from './empresa-service.js'

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
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editEnderecoEmail = window.document.querySelector('input#editEnderecoEmail')
    updatableEmpresa.emails[index].endereco = editEnderecoEmail.value
    updateEmail(updatableEmpresa)
}

function updateEmail(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        () => {
            Object.assign(empresa, updatableEmpresa)
            window.alert('O E-mail foi atualizado com sucesso.')
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'O E-mail não foi atualizado porque:\n\n'
                for (const msgErro of erro.serverMsg) {
                    mensagens += msgErro + '\n'
                }
                window.alert(mensagens)
            }
        }
    )    
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
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editEnderecoEmail = window.document.querySelector('input#editEnderecoEmail')
    const email = new Email()
    email.endereco = editEnderecoEmail.value
    updatableEmpresa.emails.push(email)
    addEmail(updatableEmpresa)
}

function addEmail(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        () => {
            Object.assign(empresa, updatableEmpresa)
            window.alert('O E-mail foi adicionado com sucesso.')
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'O E-mail não foi adicionado porque:\n\n'
                for (const msgErro of erro.serverMsg) {
                    mensagens += msgErro + '\n'
                }
                window.alert(mensagens)
            }
        }
    )    
}

function backToList() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#list').classList.add('active')
    window.document.getElementById('list/emails').classList.add('active')
    window.history.pushState(empresa, '', '#list/emails')
    fillTable(empresa)
}
