import { Endereco, Logradouro, Bairro, Cidade, TIPO_UF } from './empresa-model.js'
import { fillForm } from './enderecos-editNew.js'
import { empresa } from './empresas-editNew.js'

const enderecosList = window.document.getElementById('list/enderecos')

export function fillTable(empresa) {
    limpaTabela()
    limpaAddNewButton()
    limpaBackToEditButton()
    initAddNewButton()
    const enderecosTable = window.document.createElement('table')
    enderecosTable.setAttribute('id', 'enderecosTable')
    enderecosList.appendChild(enderecosTable)
    if (empresa.enderecos?.length) {
        createTableHeaders(enderecosTable)        
        let index = 0
        for (const endereco of empresa.enderecos) {
            fillTableLine(endereco, enderecosTable, index)
            index++
        }       
    } else {
        emptyTableMsg(enderecosTable)
    }
    initBackToEditButton()
}

function fillTableLine(endereco, enderecosTable, index) {
    const tr = window.document.createElement('tr')
    tr.setAttribute('id', index)
    const tdCepEndereco = window.document.createElement('td')
    tdCepEndereco.innerText = endereco.cep
    tdCepEndereco.style.textAlign = 'center'
    tdCepEndereco.style.border = '1px solid black'
    tdCepEndereco.style.width = '100px'
    tdCepEndereco.style.height = '20px'
    tr.appendChild(tdCepEndereco)
    const tdNumeroEndereco = window.document.createElement('td')
    tdNumeroEndereco.innerText = endereco.numero ? endereco.numero : ''
    tdNumeroEndereco.style.textAlign = 'center'
    tdNumeroEndereco.style.border = '1px solid black'
    tdNumeroEndereco.style.width = '100px'
    tdNumeroEndereco.style.height = '20px'
    tr.appendChild(tdNumeroEndereco)
    const tdComplementoEndereco = window.document.createElement('td')
    tdComplementoEndereco.innerText = endereco.complemento ? endereco.complemento : ''
    tdComplementoEndereco.style.textAlign = 'center'
    tdComplementoEndereco.style.border = '1px solid black'
    tdComplementoEndereco.style.width = '100px'
    tdComplementoEndereco.style.height = '20px'
    tr.appendChild(tdComplementoEndereco)
    const tdNomeLogradouro = window.document.createElement('td')
    tdNomeLogradouro.innerText = endereco.logradouro.nome
    tdNomeLogradouro.style.textAlign = 'center'
    tdNomeLogradouro.style.border = '1px solid black'
    tdNomeLogradouro.style.width = '100px'
    tdNomeLogradouro.style.height = '20px'
    tr.appendChild(tdNomeLogradouro)
    const tdNomeBairro = window.document.createElement('td')
    tdNomeBairro.innerText = endereco.logradouro.bairro.nome
    tdNomeBairro.style.textAlign = 'center'
    tdNomeBairro.style.border = '1px solid black'
    tdNomeBairro.style.width = '100px'
    tdNomeBairro.style.height = '20px'
    tr.appendChild(tdNomeBairro)
    const tdNomeCidade = window.document.createElement('td')
    tdNomeCidade.innerText = endereco.logradouro.bairro.cidade.nome
    tdNomeCidade.style.textAlign = 'center'
    tdNomeCidade.style.border = '1px solid black'
    tdNomeCidade.style.width = '100px'
    tdNomeCidade.style.height = '20px'
    tr.appendChild(tdNomeCidade)
    const tdTipoUf = window.document.createElement('td')
    tdTipoUf.value = endereco.logradouro.bairro.cidade.tipoUf
    tdTipoUf.innerText = TIPO_UF[endereco.logradouro.bairro.cidade.tipoUf]
    tdTipoUf.style.font = 'bold 10pt Arial'
    tdTipoUf.style.textAlign = 'center'
    tdTipoUf.style.border = '1px solid black'
    tdTipoUf.style.width = '100px'
    tdTipoUf.style.height = '20px'
    tr.appendChild(tdTipoUf)
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
    enderecosTable.appendChild(tr)
}

function createTableHeaders(enderecosTable) {
    const tr = window.document.createElement('tr')
    const tdCepEndereco = window.document.createElement('td')
    tdCepEndereco.innerText = 'C.E.P.'
    tdCepEndereco.style.font = 'bold 10pt Arial'
    tdCepEndereco.style.textAlign = 'center'
    tdCepEndereco.style.border = '1px solid black'
    tdCepEndereco.style.width = '100px'
    tdCepEndereco.style.height = '20px'
    tr.appendChild(tdCepEndereco)
    const tdNumeroEndereco = window.document.createElement('td')
    tdNumeroEndereco.innerText = 'Número do Endereço'
    tdNumeroEndereco.style.font = 'bold 10pt Arial'
    tdNumeroEndereco.style.textAlign = 'center'
    tdNumeroEndereco.style.border = '1px solid black'
    tdNumeroEndereco.style.width = '100px'
    tdNumeroEndereco.style.height = '20px'
    tr.appendChild(tdNumeroEndereco)
    const tdComplementoEndereco = window.document.createElement('td')
    tdComplementoEndereco.innerText = 'Complemento do Endereço'
    tdComplementoEndereco.style.font = 'bold 10pt Arial'
    tdComplementoEndereco.style.textAlign = 'center'
    tdComplementoEndereco.style.border = '1px solid black'
    tdComplementoEndereco.style.width = '100px'
    tdComplementoEndereco.style.height = '20px'
    tr.appendChild(tdComplementoEndereco)
    const tdNomeLogradouro = window.document.createElement('td')
    tdNomeLogradouro.innerText = 'Logradouro'
    tdNomeLogradouro.style.font = 'bold 10pt Arial'
    tdNomeLogradouro.style.textAlign = 'center'
    tdNomeLogradouro.style.border = '1px solid black'
    tdNomeLogradouro.style.width = '100px'
    tdNomeLogradouro.style.height = '20px'
    tr.appendChild(tdNomeLogradouro)
    const tdNomeBairro = window.document.createElement('td')
    tdNomeBairro.innerText = 'Bairro'
    tdNomeBairro.style.font = 'bold 10pt Arial'
    tdNomeBairro.style.textAlign = 'center'
    tdNomeBairro.style.border = '1px solid black'
    tdNomeBairro.style.width = '100px'
    tdNomeBairro.style.height = '20px'
    tr.appendChild(tdNomeBairro)
    const tdNomeCidade = window.document.createElement('td')
    tdNomeCidade.innerText = 'Cidade'
    tdNomeCidade.style.font = 'bold 10pt Arial'
    tdNomeCidade.style.textAlign = 'center'
    tdNomeCidade.style.border = '1px solid black'
    tdNomeCidade.style.width = '100px'
    tdNomeCidade.style.height = '20px'
    tr.appendChild(tdNomeCidade)
    const tdTipoUf = window.document.createElement('td')
    tdTipoUf.innerText = 'U.F.'
    tdTipoUf.style.font = 'bold 10pt Arial'
    tdTipoUf.style.textAlign = 'center'
    tdTipoUf.style.border = '1px solid black'
    tdTipoUf.style.width = '100px'
    tdTipoUf.style.height = '20px'
    tr.appendChild(tdTipoUf)
    enderecosTable.appendChild(tr)
}

function goToEditPage(tr) {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/enderecos').classList.add('active')
    window.history.pushState(setSelectedEndereco(tr), '', '#editNew/enderecos')
    fillForm(setSelectedEndereco(tr), getIndexEndereco(tr))
}

function setSelectedEndereco(tr) {
    const endereco = new Endereco()
    endereco.cep = tr.children.item(0).innerText
    endereco.numero = tr.children.item(1).innerText
    endereco.complemento = tr.children.item(2).innerText
    endereco.logradouro = new Logradouro()
    endereco.logradouro.nome = tr.children.item(3).innerText
    endereco.logradouro.bairro = new Bairro()
    endereco.logradouro.bairro.nome = tr.children.item(4).innerText
    endereco.logradouro.bairro.cidade = new Cidade()
    endereco.logradouro.bairro.cidade.nome = tr.children.item(5).innerText
    endereco.logradouro.bairro.cidade.tipoUf = tr.children.item(6).value
    return endereco
}

function getIndexEndereco(tr) {
    return Number(tr.getAttribute('id'))
}

function apagar(tr) {
    const i = getIndexEndereco(tr)
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    insertableEmpresa.enderecos.splice(i, 1)
    deleteEndereco(insertableEmpresa)   
}

function deleteEndereco(insertableEmpresa) {
    Object.assign(empresa, insertableEmpresa)
    fillTable(empresa)
    window.alert('Endereço apagado da lista com sucesso.')
}

function initAddNewButton() {
    const addNewDiv = window.document.createElement('div')
    addNewDiv.style.textAlign = 'left'
    addNewDiv.setAttribute('id', 'addNewDiv')
    const addNewButton = window.document.createElement('input')
    addNewButton.setAttribute('type', 'button')
    addNewButton.setAttribute('value', 'Adicionar um Endereço')
    addNewButton.addEventListener('click', addNew)
    addNewDiv.appendChild(addNewButton)
    enderecosList.appendChild(addNewDiv)
}

function addNew() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/enderecos').classList.add('active')
    window.history.pushState(empresa, '', '#editNew/enderecos')
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
    enderecosList.appendChild(backToEditDiv)
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
    const enderecosTable = window.document.querySelector('table#enderecosTable')
    if (enderecosTable) {
        enderecosTable.remove()
    }
}

function emptyTableMsg(enderecosTable) {
    const tr = window.document.createElement('tr')
    const td = window.document.createElement('td')
    const pEmptyTable = window.document.createElement('p')
    pEmptyTable.innerText = 'Não há endereços cadastrados para essa empresa.'
    pEmptyTable.style.font = 'bold 10pt Arial'
    pEmptyTable.style.textAlign = 'center'
    td.appendChild(pEmptyTable)
    tr.appendChild(td)
    enderecosTable.appendChild(tr)
}
