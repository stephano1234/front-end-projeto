import { empresa } from './empresas-editNew.js'
import { fillTable } from './celulares-listNew.js'
import { Celular } from './empresa-model.js'

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
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editNumeroCelular = window.document.querySelector('input#editNumeroCelular')
    insertableEmpresa.celulares[index].numero = editNumeroCelular.value
    updateCelular(insertableEmpresa, insertableEmpresa.celulares[index])
}

function updateCelular(insertableEmpresa, celular) {
    const msgErro = isValid(celular)
    if (!msgErro) {
        Object.assign(empresa, insertableEmpresa)
        window.alert('O Celular foi atualizado com sucesso.')            
    } else {
        window.alert('O Celular não foi atualizado porque:\n\n' + msgErro)        
    }
}

function adicionar() {
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editNumeroCelular = window.document.querySelector('input#editNumeroCelular')
    const celular = new Celular()
    celular.numero = editNumeroCelular.value
    if (!insertableEmpresa.celulares) {
        insertableEmpresa.celulares = []
    }
    insertableEmpresa.celulares.push(celular)
    addCelular(insertableEmpresa, celular)
}

function addCelular(insertableEmpresa, celular) {
    const msgErro = isValid(celular)
    if (!msgErro) {
        Object.assign(empresa, insertableEmpresa)
        window.alert('O Celular foi adicionado com sucesso.')            
    } else {
        window.alert('O Celular não foi adicionado porque:\n\n' + msgErro)        
    }
}

function isValid(celular) {
    let msgErro
    if (!celular.numero) {
        return msgErro = 'Número de celular inválido.'    
    }
    if (!(/[0-9]{9}/.test(celular.numero))) {
        return msgErro = 'Número de celular inválido.'    
    }
    return msgErro
}

function backToList() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#list').classList.add('active')
    window.document.getElementById('list/celulares').classList.add('active')
    window.history.pushState(empresa, '', '#listNew/celulares')
    fillTable(empresa)
}
