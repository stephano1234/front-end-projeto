import { Pessoa, TIPO_ESTADO_CIVIL, TIPO_GRAU_INSTRUCAO, TIPO_SEXO } from './empresa-model.js'
import { fillForm } from './responsaveis-editNew.js'
import { empresa } from './empresas-editNew.js'

const responsaveisList = window.document.getElementById('list/responsaveis')

export function fillTable(empresa) {
    limpaTabela()
    limpaAddNewButton()
    limpaBackToEditButton()
    initAddNewButton()
    const responsaveisTable = window.document.createElement('table')
    responsaveisTable.setAttribute('id', 'responsaveisTable')
    responsaveisList.appendChild(responsaveisTable)
    if (empresa.responsaveis?.length) {
        createTableHeaders(responsaveisTable)        
        let index = 0
        for (const responsavel of empresa.responsaveis) {
            fillTableLine(responsavel, responsaveisTable, index)
            index++
        }        
    } else {
        emptyTableMsg(responsaveisTable)
    }
    initBackToEditButton()
}

function fillTableLine(responsavel, responsaveisTable, index) {
    const tr = window.document.createElement('tr')
    tr.setAttribute('id', index)
    const tdCpfResponsavel = window.document.createElement('td')
    tdCpfResponsavel.innerText = responsavel.cpf
    tdCpfResponsavel.style.textAlign = 'center'
    tdCpfResponsavel.style.border = '1px solid black'
    tdCpfResponsavel.style.width = '150px'
    tdCpfResponsavel.style.height = '20px'
    tr.appendChild(tdCpfResponsavel)
    const tdNomeResponsavel = window.document.createElement('td')
    tdNomeResponsavel.innerText = responsavel.nome
    tdNomeResponsavel.style.textAlign = 'center'
    tdNomeResponsavel.style.border = '1px solid black'
    tdNomeResponsavel.style.width = '150px'
    tdNomeResponsavel.style.height = '20px'
    tr.appendChild(tdNomeResponsavel)
    const tdDataNascimentoResponsavel = window.document.createElement('td')
    tdDataNascimentoResponsavel.innerText = responsavel.dataNascimento
    tdDataNascimentoResponsavel.style.textAlign = 'center'
    tdDataNascimentoResponsavel.style.border = '1px solid black'
    tdDataNascimentoResponsavel.style.width = '150px'
    tdDataNascimentoResponsavel.style.height = '20px'
    tr.appendChild(tdDataNascimentoResponsavel)
    const tdTipoGrauInstrucao = window.document.createElement('td')
    tdTipoGrauInstrucao.value = responsavel.tipoGrauInstrucao
    tdTipoGrauInstrucao.innerText = TIPO_GRAU_INSTRUCAO[responsavel.tipoGrauInstrucao]
    tdTipoGrauInstrucao.style.textAlign = 'center'
    tdTipoGrauInstrucao.style.border = '1px solid black'
    tdTipoGrauInstrucao.style.width = '150px'
    tdTipoGrauInstrucao.style.height = '20px'
    tr.appendChild(tdTipoGrauInstrucao)
    const tdTipoEstadoCivil = window.document.createElement('td')
    tdTipoEstadoCivil.value = responsavel.tipoEstadoCivil
    tdTipoEstadoCivil.innerText = TIPO_ESTADO_CIVIL[responsavel.tipoEstadoCivil]
    tdTipoEstadoCivil.style.textAlign = 'center'
    tdTipoEstadoCivil.style.border = '1px solid black'
    tdTipoEstadoCivil.style.width = '150px'
    tdTipoEstadoCivil.style.height = '20px'
    tr.appendChild(tdTipoEstadoCivil)
    const tdTipoSexo = window.document.createElement('td')
    tdTipoSexo.value = responsavel.tipoSexo
    tdTipoSexo.innerText = TIPO_SEXO[responsavel.tipoSexo]
    tdTipoSexo.style.textAlign = 'center'
    tdTipoSexo.style.border = '1px solid black'
    tdTipoSexo.style.width = '150px'
    tdTipoSexo.style.height = '20px'
    tr.appendChild(tdTipoSexo)
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
    responsaveisTable.appendChild(tr)
}

function createTableHeaders(responsaveisTable) {
    const tr = window.document.createElement('tr')
    const tdCpfResponsavel = window.document.createElement('td')
    tdCpfResponsavel.innerText = 'C.P.F.'
    tdCpfResponsavel.style.font = 'bold 10pt Arial'
    tdCpfResponsavel.style.textAlign = 'center'
    tdCpfResponsavel.style.border = '1px solid black'
    tdCpfResponsavel.style.width = '150px'
    tdCpfResponsavel.style.height = '20px'
    tr.appendChild(tdCpfResponsavel)
    const tdNomeResponsavel = window.document.createElement('td')
    tdNomeResponsavel.innerText = 'Nome do Responsável'
    tdNomeResponsavel.style.font = 'bold 10pt Arial'
    tdNomeResponsavel.style.textAlign = 'center'
    tdNomeResponsavel.style.border = '1px solid black'
    tdNomeResponsavel.style.width = '150px'
    tdNomeResponsavel.style.height = '20px'
    tr.appendChild(tdNomeResponsavel)
    const tdDataNascimentoResponsavel = window.document.createElement('td')
    tdDataNascimentoResponsavel.innerText = 'Data de Nascimento'
    tdDataNascimentoResponsavel.style.font = 'bold 10pt Arial'
    tdDataNascimentoResponsavel.style.textAlign = 'center'
    tdDataNascimentoResponsavel.style.border = '1px solid black'
    tdDataNascimentoResponsavel.style.width = '150px'
    tdDataNascimentoResponsavel.style.height = '20px'
    tr.appendChild(tdDataNascimentoResponsavel)
    const tdTipoGrauInstrucao = window.document.createElement('td')
    tdTipoGrauInstrucao.innerText = 'Grau de Instrução'
    tdTipoGrauInstrucao.style.font = 'bold 10pt Arial'
    tdTipoGrauInstrucao.style.textAlign = 'center'
    tdTipoGrauInstrucao.style.border = '1px solid black'
    tdTipoGrauInstrucao.style.width = '150px'
    tdTipoGrauInstrucao.style.height = '20px'
    tr.appendChild(tdTipoGrauInstrucao)
    const tdTipoEstadoCivil = window.document.createElement('td')
    tdTipoEstadoCivil.innerText = 'Estado Civil'
    tdTipoEstadoCivil.style.font = 'bold 10pt Arial'
    tdTipoEstadoCivil.style.textAlign = 'center'
    tdTipoEstadoCivil.style.border = '1px solid black'
    tdTipoEstadoCivil.style.width = '150px'
    tdTipoEstadoCivil.style.height = '20px'
    tr.appendChild(tdTipoEstadoCivil)
    const tdTipoSexo = window.document.createElement('td')
    tdTipoSexo.innerText = 'Sexo'
    tdTipoSexo.style.font = 'bold 10pt Arial'
    tdTipoSexo.style.textAlign = 'center'
    tdTipoSexo.style.border = '1px solid black'
    tdTipoSexo.style.width = '150px'
    tdTipoSexo.style.height = '20px'
    tr.appendChild(tdTipoSexo)
    responsaveisTable.appendChild(tr)
}

function goToEditPage(tr) {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/responsaveis').classList.add('active')
    window.history.pushState(setSelectedResponsavel(tr), '', '#editNew/responsaveis')
    fillForm(setSelectedResponsavel(tr), getIndexResponsavel(tr))
}

function setSelectedResponsavel(tr) {
    const responsavel = new Pessoa()
    responsavel.cpf = tr.children.item(0).innerText
    responsavel.nome = tr.children.item(1).innerText
    responsavel.dataNascimento = tr.children.item(2).innerText
    responsavel.tipoGrauInstrucao = tr.children.item(3).value
    responsavel.tipoEstadoCivil = tr.children.item(4).value
    responsavel.tipoSexo = tr.children.item(5).value
    return responsavel
}

function getIndexResponsavel(tr) {
    return Number(tr.getAttribute('id'))
}

function apagar(tr) {
    const i = getIndexResponsavel(tr)
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    insertableEmpresa.responsaveis.splice(i, 1)
    deleteResponsavel(insertableEmpresa)
}

function deleteResponsavel(insertableEmpresa) {
    Object.assign(empresa, insertableEmpresa)
    fillTable(empresa)
    window.alert('Responsável Legal apagado da lista com sucesso.')
}

function initAddNewButton() {
    const addNewDiv = window.document.createElement('div')
    addNewDiv.style.textAlign = 'left'
    addNewDiv.setAttribute('id', 'addNewDiv')
    const addNewButton = window.document.createElement('input')
    addNewButton.setAttribute('type', 'button')
    addNewButton.setAttribute('value', 'Adicionar um Responsável Legal')
    addNewButton.addEventListener('click', addNew)
    addNewDiv.appendChild(addNewButton)
    responsaveisList.appendChild(addNewDiv)
}

function addNew() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/responsaveis').classList.add('active')
    window.history.pushState(empresa, '', '#editNew/responsaveis')
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
    responsaveisList.appendChild(backToEditDiv)
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
    const responsaveisTable = window.document.querySelector('table#responsaveisTable')
    if (responsaveisTable) {
        responsaveisTable.remove()
    }
}

function emptyTableMsg(responsaveisTable) {
    const tr = window.document.createElement('tr')
    const td = window.document.createElement('td')
    const pEmptyTable = window.document.createElement('p')
    pEmptyTable.innerText = 'Não há responsáveis legais cadastrados para essa empresa.'
    pEmptyTable.style.font = 'bold 10pt Arial'
    pEmptyTable.style.textAlign = 'center'
    td.appendChild(pEmptyTable)
    tr.appendChild(td)
    responsaveisTable.appendChild(tr)
}
