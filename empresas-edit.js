import { TIPO_EMPRESA, TIPO_PORTE_EMPRESA, FindParams, EmpresaFindParams } from './empresa-model.js'
import { getData, updateData } from './empresa-service.js'
import { getEmpresas, findParamsList } from './empresas-list.js'

export let findParamsEdit

export let empresa

const empresaEdit = window.document.getElementById('edit/empresas')

const sideEdit = window.document.getElementById('edit/side')

function initEditFindParamsEdit(cnpj) {
    findParamsEdit = new FindParams()
    findParamsEdit.filter = new EmpresaFindParams()
    findParamsEdit.filter._id = cnpj
    findParamsEdit.projection = new EmpresaFindParams()
    findParamsEdit.projection._id = 1
    findParamsEdit.projection.razaoSocial = 1
    findParamsEdit.projection.dataAbertura = 1
    findParamsEdit.projection.responsaveis = 1
    findParamsEdit.projection.enderecos = 1
    findParamsEdit.projection.telefonesFixo = 1
    findParamsEdit.projection.emails = 1
    findParamsEdit.projection.celulares = 1
    findParamsEdit.projection.contas = 1
    findParamsEdit.projection.tipoEmpresa = 1
    findParamsEdit.projection.tipoPorteEmpresa = 1
    findParamsEdit.sort = new EmpresaFindParams()
    findParamsEdit.pageOffset = 0
    findParamsEdit.pageSize = 1
    findParamsEdit.toCount = false
}

export function onInitEdit(cnpj) {
    limpaEditPage()
    initEditFindParamsEdit(cnpj)
    initCampos(cnpj)
    initComboBox()
    initEditButtons()
    getEmpresa(findParamsEdit)
}

function limpaEditPage() {
    let qtdElementos = empresaEdit.childElementCount
    for (let index = 0; index < qtdElementos; index++) {
        empresaEdit.children.item(0).remove()
    }
}

function getEmpresa(findParamsEdit) {
    getData(findParamsEdit).then(
        (data) => {
            empresa = data.dataContent[0]
            fillForm(empresa)
            initSideEdit(empresa)
            window.history.pushState(empresa, '', '#edit/empresas')
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'A empresa não foi encontrada porque:\n\n'
                for (const msgErro of erro.serverMsg) {
                    mensagens += msgErro + '\n'
                }
                window.alert(mensagens)
            }
        }
    )
}

function fillForm(empresa) {
    const showCnpj = window.document.querySelector('p#showCnpj')
    const editRazaoSocial = window.document.querySelector('input#editRazaoSocial')
    const editDataAbertura = window.document.querySelector('input#editDataAbertura')
    const editTipoEmpresa = window.document.querySelector('select#editTipoEmpresa')
    editTipoEmpresa.style.font = 'bold 10pt Arial'
    const editTipoPorteEmpresa = window.document.querySelector('select#editTipoPorteEmpresa')
    editTipoPorteEmpresa.style.font = 'bold 10pt Arial'
    showCnpj.innerHTML = `<strong>C.N.P.J.:</strong> ${empresa.cnpj}`
    editRazaoSocial.value = empresa.razaoSocial
    editDataAbertura.value = empresa.dataAbertura
    editTipoEmpresa.value = empresa.tipoEmpresa
    editTipoPorteEmpresa.value = empresa.tipoPorteEmpresa
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
    const showCnpjDiv = window.document.createElement('div')
    const showCnpj = window.document.createElement('p')
    showCnpj.setAttribute('id', 'showCnpj')
    showCnpjDiv.appendChild(showCnpj)
    empresaEdit.appendChild(showCnpjDiv)

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

function initEditButtons() {
    const botoesEdit = window.document.createElement('div')
    const updateButton = window.document.createElement('input')
    updateButton.setAttribute('id', 'btnAtualizar')
    updateButton.setAttribute('type', 'button')
    updateButton.value = 'Atualizar Dados'
    updateButton.addEventListener('click', atualizar)
    updateButton.style.marginRight = '5px'
    const backToListButton = window.document.createElement('input')
    backToListButton.setAttribute('id', 'btnVoltar')
    backToListButton.setAttribute('type', 'button')
    backToListButton.value = 'Voltar para Listagem'
    backToListButton.addEventListener('click', backToList)
    backToListButton.style.marginRight = '5px'
    botoesEdit.appendChild(updateButton)
    botoesEdit.appendChild(backToListButton)
    empresaEdit.appendChild(botoesEdit)
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

function atualizar() {
    const updatableEmpresa = JSON.parse(JSON.stringify(empresa))
    const editDataAbertura = window.document.querySelector('input#editDataAbertura')
    const editRazaoSocial = window.document.querySelector('input#editRazaoSocial')
    const editTipoEmpresa = window.document.querySelector('select#editTipoEmpresa')
    const editTipoPorteEmpresa = window.document.querySelector('select#editTipoPorteEmpresa')
    updatableEmpresa.dataAbertura = editDataAbertura.value
    updatableEmpresa.razaoSocial = editRazaoSocial.value
    updatableEmpresa.tipoEmpresa = editTipoEmpresa.value
    updatableEmpresa.tipoPorteEmpresa = editTipoPorteEmpresa.value
    updateEmpresa(updatableEmpresa)
}

function updateEmpresa(updatableEmpresa) {
    updateData(updatableEmpresa).then(
        (sucesso) => {
            Object.assign(empresa, updatableEmpresa)
            window.alert(sucesso)
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'A empresa não foi atualizada porque:\n\n'
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
    titulo.innerText = 'Editar lista de:'
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
    window.history.pushState(empresa, '', `#list/${field}`)
    import(`./${field}-list.js`).then((module) => {
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
