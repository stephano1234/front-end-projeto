import { Endereco, Logradouro, Bairro, Cidade, TIPO_UF } from './empresa-model.js'
import { empresa } from './empresas-edit.js'
import { fillTable } from './enderecos-list.js'
import { updateData } from './empresa-service.js'

const enderecoEdit = window.document.getElementById('edit/enderecos')

export function fillForm(endereco, index) {
    limpaEditPage()
    
    const editCepEnderecoDiv = window.document.createElement('div')
    const editCepEnderecoLabel = window.document.createElement('label')
    editCepEnderecoLabel.setAttribute('for', 'editCepEndereco')
    editCepEnderecoLabel.innerHTML = '<strong>C.E.P.:</strong> '
    const editCepEndereco = window.document.createElement('input')
    editCepEndereco.setAttribute('id', 'editCepEndereco')
    editCepEndereco.setAttribute('type', 'text')
    editCepEndereco.style.marginBottom = '5px'
    editCepEnderecoDiv.appendChild(editCepEnderecoLabel)
    editCepEnderecoDiv.appendChild(editCepEndereco)
    
    const editNumeroEnderecoDiv = window.document.createElement('div')
    const editNumeroEnderecoLabel = window.document.createElement('label')
    editNumeroEnderecoLabel.setAttribute('for', 'editNumeroEndereco')
    editNumeroEnderecoLabel.innerHTML = '<strong>Número do Endereço:</strong> '
    const editNumeroEndereco = window.document.createElement('input')
    editNumeroEndereco.setAttribute('id', 'editNumeroEndereco')
    editNumeroEndereco.setAttribute('type', 'text')
    editNumeroEndereco.style.marginBottom = '5px'
    editNumeroEnderecoDiv.appendChild(editNumeroEnderecoLabel)
    editNumeroEnderecoDiv.appendChild(editNumeroEndereco)
    
    const editComplementoEnderecoDiv = window.document.createElement('div')
    const editComplementoEnderecoLabel = window.document.createElement('label')
    editComplementoEnderecoLabel.setAttribute('for', 'editComplementoEndereco')
    editComplementoEnderecoLabel.innerHTML = '<strong>Complemento do Endereço:</strong> '
    const editComplementoEndereco = window.document.createElement('input')
    editComplementoEndereco.setAttribute('id', 'editComplementoEndereco')
    editComplementoEndereco.setAttribute('type', 'text')
    editComplementoEndereco.style.marginBottom = '5px'
    editComplementoEnderecoDiv.appendChild(editComplementoEnderecoLabel)
    editComplementoEnderecoDiv.appendChild(editComplementoEndereco)
    
    const editNomeLogradouroDiv = window.document.createElement('div')
    const editNomeLogradouroLabel = window.document.createElement('label')
    editNomeLogradouroLabel.setAttribute('for', 'editNomeLogradouro')
    editNomeLogradouroLabel.innerHTML = '<strong>Logradouro:</strong> '
    const editNomeLogradouro = window.document.createElement('input')
    editNomeLogradouro.setAttribute('id', 'editNomeLogradouro')
    editNomeLogradouro.setAttribute('type', 'text')
    editNomeLogradouro.style.marginBottom = '5px'
    editNomeLogradouroDiv.appendChild(editNomeLogradouroLabel)
    editNomeLogradouroDiv.appendChild(editNomeLogradouro)
    
    const editNomeBairroDiv = window.document.createElement('div')
    const editNomeBairroLabel = window.document.createElement('label')
    editNomeBairroLabel.setAttribute('for', 'editNomeBairro')
    editNomeBairroLabel.innerHTML = '<strong>Bairro:</strong> '
    const editNomeBairro = window.document.createElement('input')
    editNomeBairro.setAttribute('id', 'editNomeBairro')
    editNomeBairro.setAttribute('type', 'text')
    editNomeBairro.style.marginBottom = '5px'
    editNomeBairroDiv.appendChild(editNomeBairroLabel)
    editNomeBairroDiv.appendChild(editNomeBairro)
    
    const editNomeCidadeDiv = window.document.createElement('div')
    const editNomeCidadeLabel = window.document.createElement('label')
    editNomeCidadeLabel.setAttribute('for', 'editNomeCidade')
    editNomeCidadeLabel.innerHTML = '<strong>Cidade:</strong> '
    const editNomeCidade = window.document.createElement('input')
    editNomeCidade.setAttribute('id', 'editNomeCidade')
    editNomeCidade.setAttribute('type', 'text')
    editNomeCidade.style.marginBottom = '5px'
    editNomeCidadeDiv.appendChild(editNomeCidadeLabel)
    editNomeCidadeDiv.appendChild(editNomeCidade)
    
    enderecoEdit.appendChild(editCepEnderecoDiv)
    enderecoEdit.appendChild(editNumeroEnderecoDiv)
    enderecoEdit.appendChild(editComplementoEnderecoDiv)
    enderecoEdit.appendChild(editNomeLogradouroDiv)
    enderecoEdit.appendChild(editNomeBairroDiv)
    enderecoEdit.appendChild(editNomeCidadeDiv)

    const editTipoUfDiv = window.document.createElement('div')
    const editTipoUfLabel = window.document.createElement('label')
    editTipoUfLabel.setAttribute('for', 'editTipoUf')
    editTipoUfLabel.innerHTML = '<strong>U.F.:</strong> '
    const editTipoUf = window.document.createElement('select')
    editTipoUf.setAttribute('id', 'editTipoUf')
    const optTipoUf = window.document.createElement('option')
    optTipoUf.innerText = 'Selecione a U.F.'
    editTipoUf.appendChild(optTipoUf)
    fillComboEnum(editTipoUf, TIPO_UF)
    editTipoUf.addEventListener('change', matchEditSelect)
    editTipoUf.style.width = '330px'
    editTipoUf.style.marginBottom = '5px'
    editTipoUf.style.font = 'bold 10pt Arial'
    editTipoUfDiv.appendChild(editTipoUfLabel)
    editTipoUfDiv.appendChild(editTipoUf)
    enderecoEdit.appendChild(editTipoUfDiv)

    if (endereco && index >= 0) {
        editCepEndereco.value = endereco.cep
        editNumeroEndereco.value = endereco.numero ? endereco.numero : ''
        editComplementoEndereco.value = endereco.complemento ? endereco.complemento : ''
        editNomeLogradouro.value = endereco.logradouro.nome
        editNomeBairro.value = endereco.logradouro.bairro.nome
        editNomeCidade.value = endereco.logradouro.bairro.cidade.nome
        editTipoUf.value = endereco.logradouro.bairro.cidade.tipoUf    
        initEditButtons(index)       
    } else {
        initAddNewButtons()
    }
}

function matchEditSelect() {
    if (this.value != 'Selecione o Tipo do Endereço' && this.value != 'Selecione a U.F.') {
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
    let qtdElementos = enderecoEdit.childElementCount
    for (let index = 0; index < qtdElementos; index++) {
        enderecoEdit.children.item(0).remove()
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
    enderecoEdit.appendChild(botoesEdit)
}

function atualizar(index) {
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editCepEndereco = window.document.querySelector('input#editCepEndereco')
    const editNumeroEndereco = window.document.querySelector('input#editNumeroEndereco')
    const editComplementoEndereco = window.document.querySelector('input#editComplementoEndereco')
    const editNomeLogradouro = window.document.querySelector('input#editNomeLogradouro')
    const editNomeBairro = window.document.querySelector('input#editNomeBairro')
    const editNomeCidade = window.document.querySelector('input#editNomeCidade')
    const editTipoUf = window.document.querySelector('select#editTipoUf')
    updatableEmpresa.enderecos[index].cep = editCepEndereco.value
    updatableEmpresa.enderecos[index].numero = editNumeroEndereco.value != '' ? editNumeroEndereco.value : undefined
    updatableEmpresa.enderecos[index].complemento = editComplementoEndereco.value != '' ? editComplementoEndereco.value : undefined
    updatableEmpresa.enderecos[index].logradouro.nome = editNomeLogradouro.value
    updatableEmpresa.enderecos[index].logradouro.bairro.nome = editNomeBairro.value
    updatableEmpresa.enderecos[index].logradouro.bairro.cidade.nome = editNomeCidade.value
    updatableEmpresa.enderecos[index].logradouro.bairro.cidade.tipoUf = editTipoUf.value
    updateEndereco(updatableEmpresa)
}

function updateEndereco(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        () => {
            Object.assign(empresa, updatableEmpresa)
            window.alert('O Endereço foi atualizado com sucesso.')
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'O Endereço não foi atualizado porque:\n\n'
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
    enderecoEdit.appendChild(botoesAddNew)
}

function adicionar() {
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editCepEndereco = window.document.querySelector('input#editCepEndereco')
    const editNumeroEndereco = window.document.querySelector('input#editNumeroEndereco')
    const editComplementoEndereco = window.document.querySelector('input#editComplementoEndereco')
    const editNomeLogradouro = window.document.querySelector('input#editNomeLogradouro')
    const editNomeBairro = window.document.querySelector('input#editNomeBairro')
    const editNomeCidade = window.document.querySelector('input#editNomeCidade')
    const editTipoUf = window.document.querySelector('select#editTipoUf')
    const endereco = new Endereco()
    const logradouro = new Logradouro()
    const bairro = new Bairro()
    const cidade = new Cidade()
    endereco.logradouro = logradouro
    endereco.logradouro.bairro = bairro
    endereco.logradouro.bairro.cidade = cidade
    endereco.cep = editCepEndereco.value
    endereco.numero = editNumeroEndereco.value != '' ? editNumeroEndereco.value : undefined
    endereco.complemento = editComplementoEndereco.value != '' ? editComplementoEndereco.value : undefined
    endereco.logradouro.nome = editNomeLogradouro.value
    endereco.logradouro.bairro.nome = editNomeBairro.value
    endereco.logradouro.bairro.cidade.nome = editNomeCidade.value
    endereco.logradouro.bairro.cidade.tipoUf = editTipoUf.value
    updatableEmpresa.enderecos.push(endereco)
    addEndereco(updatableEmpresa)
}

function addEndereco(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        () => {
            Object.assign(empresa, updatableEmpresa)
            window.alert('O Endereço foi adicionado com sucesso.')
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'O Endereço não foi adicionado porque:\n\n'
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
    window.document.getElementById('list/enderecos').classList.add('active')
    window.history.pushState(empresa, '', '#list/enderecos')
    fillTable(empresa)
}
