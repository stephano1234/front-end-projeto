import { empresa } from './empresas-edit.js'
import { fillTable } from './telefonesFixo-list.js'
import { TelefoneFixo } from './empresa-model.js'
import { updateData } from './empresa-service.js'

const telefoneFixoEdit = window.document.getElementById('edit/telefonesFixo')

export function fillForm(selectedTelefoneFixo) {
    limpaEditPage()

    const editNumeroTelefoneFixoDiv = window.document.createElement('div')
    const editNumeroTelefoneFixoLabel = window.document.createElement('label')
    editNumeroTelefoneFixoLabel.setAttribute('for', 'editNumeroTelefoneFixo')
    editNumeroTelefoneFixoLabel.innerHTML = '<strong>Número do Telefone Fixo:</strong> '
    const editNumeroTelefoneFixo = window.document.createElement('input')
    editNumeroTelefoneFixo.setAttribute('id', 'editNumeroTelefoneFixo')
    editNumeroTelefoneFixo.setAttribute('type', 'text')
    editNumeroTelefoneFixo.style.marginBottom = '5px'
    editNumeroTelefoneFixoDiv.appendChild(editNumeroTelefoneFixoLabel)
    editNumeroTelefoneFixoDiv.appendChild(editNumeroTelefoneFixo)

    telefoneFixoEdit.appendChild(editNumeroTelefoneFixoDiv)

    if (selectedTelefoneFixo) {
        editNumeroTelefoneFixo.value = selectedTelefoneFixo.obj.numero
        initEditButtons(selectedTelefoneFixo.index)       
    } else {
        initAddNewButtons()
    }
}

function limpaEditPage() {
    let qtdElementos = telefoneFixoEdit.childElementCount
    for (let index = 0; index < qtdElementos; index++) {
        telefoneFixoEdit.children.item(0).remove()
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
    telefoneFixoEdit.appendChild(botoesEdit)
}

function atualizar(index) {
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editNumeroTelefoneFixo = window.document.querySelector('input#editNumeroTelefoneFixo')
    updatableEmpresa.telefonesFixo[index].numero = editNumeroTelefoneFixo.value
    updateTelefoneFixo(updatableEmpresa)
}

function updateTelefoneFixo(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        () => {
            Object.assign(empresa, updatableEmpresa)
            window.alert('O Telefone Fixo foi atualizado com sucesso.')
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'O Telefone Fixo não foi atualizado porque:\n\n'
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
    telefoneFixoEdit.appendChild(botoesAddNew)
}

function adicionar() {
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editNumeroTelefoneFixo = window.document.querySelector('input#editNumeroTelefoneFixo')
    const telefoneFixo = new TelefoneFixo()
    telefoneFixo.numero = editNumeroTelefoneFixo.value
    updatableEmpresa.telefonesFixo.push(telefoneFixo)
    addTelefoneFixo(updatableEmpresa)
}

function addTelefoneFixo(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        () => {
            Object.assign(empresa, updatableEmpresa)
            window.alert('O Telefone Fixo foi adicionado com sucesso.')
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'O Telefone Fixo não foi adicionado porque:\n\n'
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
    window.document.getElementById('list/telefonesFixo').classList.add('active')
    window.history.pushState(empresa, '', '#list/telefonesFixo')
    fillTable(empresa)
}
