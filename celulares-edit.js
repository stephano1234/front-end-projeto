import { empresa } from './empresas-edit.js'
import { fillTable } from './celulares-list.js'
import { Celular } from './empresa-model.js'
import { updateData } from './empresa-service.js'

const celularEdit = window.document.getElementById('edit/celulares')

export function fillForm(selectedCelular) {
    limpaEditPage()

    const editNumeroCelularDiv = window.document.createElement('div')
    const editNumeroCelularLabel = window.document.createElement('label')
    editNumeroCelularLabel.setAttribute('for', 'editNumeroCelular')
    editNumeroCelularLabel.innerHTML = '<strong>Número do Celular:</strong> '
    const editNumeroCelular = window.document.createElement('input')
    editNumeroCelular.setAttribute('id', 'editNumeroCelular')
    editNumeroCelular.setAttribute('type', 'text')
    editNumeroCelular.style.marginBottom = '5px'
    editNumeroCelularDiv.appendChild(editNumeroCelularLabel)
    editNumeroCelularDiv.appendChild(editNumeroCelular)

    celularEdit.appendChild(editNumeroCelularDiv)

    if (selectedCelular) {
        editNumeroCelular.value = selectedCelular.obj.numero        
        initEditButtons(selectedCelular.index)
    } else {
        initAddNewButtons()
    }
}

function limpaEditPage() {
    let qtdElementos = celularEdit.childElementCount
    for (let index = 0; index < qtdElementos; index++) {
        celularEdit.children.item(0).remove()
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
    celularEdit.appendChild(botoesEdit)
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
    celularEdit.appendChild(botoesAddNew)
}

function atualizar(index) {
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editNumeroCelular = window.document.querySelector('input#editNumeroCelular')
    updatableEmpresa.celulares[index].numero = editNumeroCelular.value
    updateCelular(updatableEmpresa)
}

function updateCelular(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        () => {
            Object.assign(empresa, updatableEmpresa)
            window.alert('O Celular foi atualizado com sucesso.')
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'O Celular não foi atualizado porque:\n\n'
                for (const msgErro of erro.serverMsg) {
                    mensagens += msgErro + '\n'
                }
                window.alert(mensagens)
            }
        }
    )    
}

function adicionar() {
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editNumeroCelular = window.document.querySelector('input#editNumeroCelular')
    const celular = new Celular()
    celular.numero = editNumeroCelular.value
    updatableEmpresa.celulares.push(celular)
    addCelular(updatableEmpresa)
}

function addCelular(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        () => {
            Object.assign(empresa, updatableEmpresa)
            window.alert('O Celular foi adicionado com sucesso.')
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'O Celular não foi adicionado porque:\n\n'
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
    window.document.getElementById('list/celulares').classList.add('active')
    window.history.pushState(empresa, '', '#list/celulares')
    fillTable(empresa)
}
