import { Empresa, TIPO_EMPRESA, TIPO_PORTE_EMPRESA } from './empresa-model.js'
import { saveData } from './empresa-service.js'
import { getEmpresas, findParamsList } from './empresas-list.js'

export let empresa

const empresaEdit = window.document.getElementById('edit/empresas')

const sideEdit = window.document.getElementById('edit/side')

export function onInitNew() {
    limpaEditPage()
    initCampos()
    initComboBox()
    initAddNewButtons()
    initSideEdit()
    empresa = new Empresa()
    window.history.pushState(empresa, '', '#edit/empresas')
}

function limpaEditPage() {
    let qtdElementos = empresaEdit.childElementCount
    for (let index = 0; index < qtdElementos; index++) {
        empresaEdit.children.item(0).remove()
    }
}

function backToList() {
    window.history.pushState(findParamsList, '', '#list')
    findParamsList.toCount = false
    getEmpresas(findParamsList)
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#list').classList.add('active')
    window.document.getElementById('list/empresas').classList.add('active')
    window.document.getElementById('list/pages').classList.add('active')
    window.document.getElementById('list/side').classList.add('active')
}

function matchEditSelect() {
    if (this.value != 'Selecione a Categoria da Empresa' && this.value != 'Selecione o Porte da Empresa') {
        this.style.font = 'bold 10pt Arial'
    } else {
        this.style.font = 'normal 10pt Arial'
    }
}

function initCampos() {
    const editCnpjDiv = window.document.createElement('div')
    const editCnpjLabel = window.document.createElement('label')
    editCnpjLabel.setAttribute('for', 'editCnpj')
    editCnpjLabel.innerHTML = '<strong>C.N.P.J.:</strong> '
    const editCnpj = window.document.createElement('input')
    editCnpj.setAttribute('id', 'editCnpj')
    editCnpj.setAttribute('type', 'text')
    editCnpj.style.marginBottom = '5px'
    editCnpjDiv.appendChild(editCnpjLabel)
    editCnpjDiv.appendChild(editCnpj)
    empresaEdit.appendChild(editCnpjDiv)

    const editRazaoSocialDiv = window.document.createElement('div')
    const editRazaoSocialLabel = window.document.createElement('label')
    editRazaoSocialLabel.setAttribute('for', 'editRazaoSocial')
    editRazaoSocialLabel.innerHTML = '<strong>Razão Social:</strong> '
    const editRazaoSocial = window.document.createElement('input')
    editRazaoSocial.setAttribute('id', 'editRazaoSocial')
    editRazaoSocial.setAttribute('type', 'text')
    editRazaoSocial.style.marginBottom = '5px'
    editRazaoSocial.style.width = '100%'
    editRazaoSocialDiv.appendChild(editRazaoSocialLabel)
    editRazaoSocialDiv.appendChild(editRazaoSocial)

    const editDataAberturaDiv = window.document.createElement('div')
    const editDataAberturaLabel = window.document.createElement('label')
    editDataAberturaLabel.setAttribute('for', 'editDataAbertura')
    editDataAberturaLabel.innerHTML = '<strong>Data de Abertura:</strong> '
    const editDataAbertura = window.document.createElement('input')
    editDataAbertura.setAttribute('id', 'editDataAbertura')
    editDataAbertura.setAttribute('type', 'date')
    editDataAbertura.style.marginBottom = '5px'
    editDataAberturaDiv.appendChild(editDataAberturaLabel)
    editDataAberturaDiv.appendChild(editDataAbertura)

    empresaEdit.appendChild(editRazaoSocialDiv)
    empresaEdit.appendChild(editDataAberturaDiv)
}

function initComboBox() {
    const editTipoEmpresaDiv = window.document.createElement('div')
    const editTipoPorteEmpresaDiv = window.document.createElement('div')
    const editTipoEmpresaLabel = window.document.createElement('label')
    editTipoEmpresaLabel.setAttribute('for', 'editTipoEmpresa')
    editTipoEmpresaLabel.innerHTML = '<strong>Tipo da Empresa:</strong> '
    const editTipoEmpresa = window.document.createElement('select')
    editTipoEmpresa.setAttribute('id', 'editTipoEmpresa')
    const optTipoEmpresa = window.document.createElement('option')
    optTipoEmpresa.innerText = 'Selecione a Categoria da Empresa'
    editTipoEmpresa.appendChild(optTipoEmpresa)
    fillComboEnum(editTipoEmpresa, TIPO_EMPRESA)
    editTipoEmpresa.addEventListener('change', matchEditSelect)
    editTipoEmpresa.style.width = '330px'
    editTipoEmpresa.style.marginBottom = '5px'
    editTipoEmpresaDiv.appendChild(editTipoEmpresaLabel)
    editTipoEmpresaDiv.appendChild(editTipoEmpresa)
    const editTipoPorteEmpresaLabel = window.document.createElement('label')
    editTipoPorteEmpresaLabel.setAttribute('for', 'editTipoPorteEmpresa')
    editTipoPorteEmpresaLabel.innerHTML = '<strong>Porte da Empresa:</strong> '
    const editTipoPorteEmpresa = window.document.createElement('select')
    editTipoPorteEmpresa.setAttribute('id', 'editTipoPorteEmpresa')
    const optTipoPorteEmpresa = window.document.createElement('option')
    optTipoPorteEmpresa.innerText = 'Selecione o Porte da Empresa'
    editTipoPorteEmpresa.appendChild(optTipoPorteEmpresa)
    fillComboEnum(editTipoPorteEmpresa, TIPO_PORTE_EMPRESA)
    editTipoPorteEmpresa.addEventListener('change', matchEditSelect)
    editTipoPorteEmpresa.style.width = '324px'
    editTipoPorteEmpresa.style.marginBottom = '5px'
    editTipoPorteEmpresaDiv.appendChild(editTipoPorteEmpresaLabel)
    editTipoPorteEmpresaDiv.appendChild(editTipoPorteEmpresa)
    empresaEdit.appendChild(editTipoEmpresaDiv)
    empresaEdit.appendChild(editTipoPorteEmpresaDiv)
}

function initAddNewButtons() {
    const botoesAddNew = window.document.createElement('div')
    const addNewButton = window.document.createElement('input')
    addNewButton.setAttribute('id', 'btnAtualizar')
    addNewButton.setAttribute('type', 'button')
    addNewButton.value = 'Salvar Empresa'
    addNewButton.addEventListener('click', addNew)
    addNewButton.style.marginRight = '5px'
    const backToListButton = window.document.createElement('input')
    backToListButton.setAttribute('id', 'btnVoltar')
    backToListButton.setAttribute('type', 'button')
    backToListButton.value = 'Voltar para Listagem'
    backToListButton.addEventListener('click', backToList)
    backToListButton.style.marginRight = '5px'
    botoesAddNew.appendChild(addNewButton)
    botoesAddNew.appendChild(backToListButton)
    empresaEdit.appendChild(botoesAddNew)
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

function addNew() {
    const insertableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editCnpj = window.document.querySelector('input#editCnpj')
    const editRazaoSocial = window.document.querySelector('input#editRazaoSocial')
    const editDataAbertura = window.document.querySelector('input#editDataAbertura')
    const editTipoEmpresa = window.document.querySelector('select#editTipoEmpresa')
    const editTipoPorteEmpresa = window.document.querySelector('select#editTipoPorteEmpresa')
    insertableEmpresa.cnpj = editCnpj.value
    insertableEmpresa.razaoSocial = editRazaoSocial.value
    insertableEmpresa.dataAbertura = editDataAbertura.value
    insertableEmpresa.tipoEmpresa = editTipoEmpresa.value
    insertableEmpresa.tipoPorteEmpresa = editTipoPorteEmpresa.value
    if (!insertableEmpresa.responsaveis) {
        insertableEmpresa.responsaveis = []
    }
    if (!insertableEmpresa.enderecos) {
        insertableEmpresa.enderecos = []
    }
    if (!insertableEmpresa.telefonesFixo) {
        insertableEmpresa.telefonesFixo = []
    }
    if (!insertableEmpresa.emails) {
        insertableEmpresa.emails = []
    }
    if (!insertableEmpresa.celulares) {
        insertableEmpresa.celulares = []
    }
    if (!insertableEmpresa.contas) {
        insertableEmpresa.contas = []
    }
    insertEmpresa(insertableEmpresa)
}

function insertEmpresa(insertableEmpresa) {
    saveData(insertableEmpresa).then(
        (sucesso) => {
            Object.assign(empresa, insertableEmpresa)
            window.alert(sucesso)
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'A empresa não foi salva porque:\n\n'
                for (const msgErro of erro.serverMsg) {
                    mensagens += msgErro + '\n'
                }
                window.alert(mensagens)
            }
        }
    )
}

function initSideEdit() {
    limpaOpcoes()
    const titulo = window.document.createElement('h3')
    titulo.setAttribute('id', 'tituloSideEdit')
    titulo.innerText = 'Adicionar lista de:'
    sideEdit.appendChild(titulo)
    const opcoes = window.document.createElement('table')
    opcoes.setAttribute('id', 'opcoes')
    const trResponsaveis = window.document.createElement('tr')
    const tdResponsaveis = window.document.createElement('td')
    tdResponsaveis.innerText = 'Responsáveis Legais'
    createGoToListPageEvent(tdResponsaveis, 'responsaveis')
    trResponsaveis.appendChild(tdResponsaveis)
    opcoes.appendChild(trResponsaveis)
    const trEnderecos = window.document.createElement('tr')
    const tdEnderecos = window.document.createElement('td')
    tdEnderecos.innerText = 'Endereços'
    createGoToListPageEvent(tdEnderecos, 'enderecos')
    trEnderecos.appendChild(tdEnderecos)
    opcoes.appendChild(trEnderecos)
    const trTelefonesFixo = window.document.createElement('tr')
    const tdTelefonesFixo = window.document.createElement('td')
    tdTelefonesFixo.innerText = 'Telefones Fixos'
    createGoToListPageEvent(tdTelefonesFixo, 'telefonesFixo')
    trTelefonesFixo.appendChild(tdTelefonesFixo)
    opcoes.appendChild(trTelefonesFixo)
    const trEmails = window.document.createElement('tr')
    const tdEmails = window.document.createElement('td')
    tdEmails.innerText = 'E-mails'
    createGoToListPageEvent(tdEmails, 'emails')
    trEmails.appendChild(tdEmails)
    opcoes.appendChild(trEmails)
    const trCelulares = window.document.createElement('tr')
    const tdCelulares = window.document.createElement('td')
    tdCelulares.innerText = 'Celulares'
    createGoToListPageEvent(tdCelulares, 'celulares')
    trCelulares.appendChild(tdCelulares)
    opcoes.appendChild(trCelulares)
    const trContas = window.document.createElement('tr')
    const tdContas = window.document.createElement('td')
    tdContas.innerText = 'Contas Bancárias'
    createGoToListPageEvent(tdContas, 'contas')
    trContas.appendChild(tdContas)
    opcoes.appendChild(trContas)
    sideEdit.appendChild(opcoes)
}

function createGoToListPageEvent(td, field) {
    td.setAttribute('id', field)
    td.addEventListener('mouseenter', () => { td.style.color = 'blue', td.style.textDecoration = 'underline' })
    td.addEventListener('mouseout', () => { td.style.color = 'black', td.style.textDecoration = 'none' })
    td.addEventListener('click', () => { goToListPage(td.getAttribute('id')) })
}

function goToListPage(field) {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector(`div#list`).classList.add('active')
    window.document.getElementById(`list/${field}`).classList.add('active')
    window.history.pushState(empresa, '', `#listNew/${field}`)
    import(`./${field}-listNew.js`).then((module) => {
        module.fillTable(empresa)
    })
}

function limpaOpcoes() {
    const titulo = window.document.querySelector('h3#tituloSideEdit')
    if (titulo) {
        titulo.remove()
    }
    const opcoes = window.document.querySelector('table#opcoes')
    if (opcoes) {
        opcoes.remove()
    }
}
