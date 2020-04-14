import { Empresa, FindParams, TIPO_EMPRESA, TIPO_PORTE_EMPRESA, EmpresaFindParams } from './empresa-model.js'
import { onInitEdit } from './empresas-edit.js'
import { onInitNew } from './empresas-editNew.js'
import { getData, deleteData } from './empresa-service.js'

export const findParamsList = new FindParams()

let totalPages

const empresasList = window.document.getElementById('list/empresas')

const pagesList = window.document.getElementById('list/pages')

const sideList = window.document.getElementById('list/side')

const numPags = window.document.createElement('div')

function initFindParamsList(findParamsList) {
    findParamsList.filter = new EmpresaFindParams()
    findParamsList.projection = new EmpresaFindParams()
    findParamsList.projection._id = 1
    findParamsList.projection.razaoSocial = 1
    findParamsList.projection.dataAbertura = 1
    findParamsList.sort = new EmpresaFindParams()
    findParamsList.sort.razaoSocial = 1
    findParamsList.pageOffset = 0
    findParamsList.pageSize = 10
}

export function getEmpresas(findParamsList) {
    getData(findParamsList).then((data) => {
        fillTable(data.dataContent)
        if (data.dataCount) {
            totalPages = data.dataCount
        }
        updateNumPags(findParamsList)
    })
}

export function onInitList() {
    initFindParamsList(findParamsList)
    initSideList()
    initPageButtons()
    pagesList.appendChild(numPags)
    window.history.pushState(findParamsList, '', '#list/empresas')
    initAddNewButton()
    getEmpresas(findParamsList)
}

function updateNumPags(findParamsList) {
    const pageOffset = findParamsList.pageOffset + findParamsList.pageSize > totalPages ? totalPages : findParamsList.pageOffset + findParamsList.pageSize
    numPags.innerText = `${findParamsList.pageOffset}-${pageOffset}/${totalPages}`
}

function initComboBox() {
    const enumsComboBoxesDiv = window.document.createElement('div')
    const filterTipoEmpresa = window.document.createElement('select')
    filterTipoEmpresa.setAttribute('id', 'filterTipoEmpresa')
    const optTipoEmpresa = window.document.createElement('option')
    optTipoEmpresa.innerText = 'Selecione a Categoria da Empresa'
    filterTipoEmpresa.appendChild(optTipoEmpresa)
    fillComboEnum(filterTipoEmpresa, TIPO_EMPRESA)
    filterTipoEmpresa.addEventListener('change', matchFilterSelect)
    filterTipoEmpresa.style.width = '320px'
    enumsComboBoxesDiv.appendChild(filterTipoEmpresa)
    const filterTipoPorteEmpresa = window.document.createElement('select')
    filterTipoPorteEmpresa.setAttribute('id', 'filterTipoPorteEmpresa')
    const optTipoPorteEmpresa = window.document.createElement('option')
    optTipoPorteEmpresa.innerText = 'Selecione o Porte da Empresa'
    filterTipoPorteEmpresa.appendChild(optTipoPorteEmpresa)
    fillComboEnum(filterTipoPorteEmpresa, TIPO_PORTE_EMPRESA)
    filterTipoPorteEmpresa.addEventListener('change', matchFilterSelect)
    filterTipoPorteEmpresa.style.width = '320px'
    enumsComboBoxesDiv.appendChild(filterTipoPorteEmpresa)
    sideList.appendChild(enumsComboBoxesDiv)
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

function matchFilterSelect() {
    if (this.value != 'Selecione a Categoria da Empresa' && this.value != 'Selecione o Porte da Empresa') {
        this.style.font = 'bold 10pt Arial'
    } else {
        this.style.font = 'normal 10pt Arial'
    }
}

function initPageButtons() {
    const firstPageButton = window.document.createElement('input')
    firstPageButton.setAttribute('type', 'button')
    firstPageButton.value = 'Primeira Página'
    firstPageButton.addEventListener('click', goToFirstPage)
    pagesList.appendChild(firstPageButton)
    const beforePageButton = window.document.createElement('input')
    beforePageButton.setAttribute('type', 'button')
    beforePageButton.value = 'Página Anterior'
    beforePageButton.addEventListener('click', goToBeforePage)
    pagesList.appendChild(beforePageButton)
    const nextPageButton = window.document.createElement('input')
    nextPageButton.setAttribute('type', 'button')
    nextPageButton.value = 'Próxima Página'
    nextPageButton.addEventListener('click', goToNextPage)
    pagesList.appendChild(nextPageButton)
    const lastPageButton = window.document.createElement('input')
    lastPageButton.setAttribute('type', 'button')
    lastPageButton.value = 'Última Página'
    lastPageButton.addEventListener('click', goToLastPage)
    pagesList.appendChild(lastPageButton)
}

function goToFirstPage() {
    changePageOffset(-totalPages)
}

function goToBeforePage() {
    changePageOffset(-1)
}

function goToNextPage() {
    changePageOffset(1)
}

function goToLastPage() {
    changePageOffset(totalPages)
}

function fillTable(empresas) {
    limpaTabela()
    const empresasTable = window.document.createElement('table')
    empresasTable.setAttribute('id', 'empresasTable')
    empresasList.appendChild(empresasTable)
    if (empresas.length) {
        createTableHeaders(empresasTable)
        for (const empresa of empresas) {
            fillTableLine(empresa, empresasTable)
        }            
    } else {
        emptyTableMsg(empresasTable)
    }
}

function emptyTableMsg(empresasTable) {
    const tr = window.document.createElement('tr')
    const td = window.document.createElement('td')
    const pEmptyTable = window.document.createElement('p')
    pEmptyTable.innerText = 'Não há empresas cadastradas.'
    pEmptyTable.style.font = 'bold 10pt Arial'
    pEmptyTable.style.textAlign = 'center'
    td.appendChild(pEmptyTable)
    tr.appendChild(td)
    empresasTable.appendChild(tr)
}

function fillTableLine(empresa, empresasTable) {
    const tr = window.document.createElement('tr')
    tr.setAttribute('id', empresa.cnpj)
    const tdCnpj = window.document.createElement('td')
    tdCnpj.innerText = empresa.cnpj
    tdCnpj.style.textAlign = 'center'
    tdCnpj.style.border = '1px solid black'
    tdCnpj.style.width = '130px'
    tdCnpj.style.height = '60px'
    tr.appendChild(tdCnpj)
    const tdRazaoSocial = window.document.createElement('td')
    tdRazaoSocial.innerText = empresa.razaoSocial
    tdRazaoSocial.style.textAlign = 'center'
    tdRazaoSocial.style.border = '1px solid black'
    tdRazaoSocial.style.width = '800px'
    tdRazaoSocial.style.height = '60px'
    tr.appendChild(tdRazaoSocial)
    const tdDataAbertura = window.document.createElement('td')
    tdDataAbertura.innerText = empresa.dataAbertura
    tdDataAbertura.style.textAlign = 'center'
    tdDataAbertura.style.border = '1px solid black'
    tdDataAbertura.style.width = '150px'
    tdDataAbertura.style.height = '60px'
    tr.appendChild(tdDataAbertura)
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
    empresasTable.appendChild(tr)
}

function createTableHeaders(empresasTable) {
    const tr = window.document.createElement('tr')
    const tdNumeroConta = window.document.createElement('td')
    tdNumeroConta.innerText = 'C.N.P.J.'
    tdNumeroConta.style.font = 'bold 10pt Arial'
    tdNumeroConta.style.textAlign = 'center'
    tdNumeroConta.style.border = '1px solid black'
    tr.appendChild(tdNumeroConta)
    const tdNumeroAgencia = window.document.createElement('td')
    tdNumeroAgencia.innerText = 'Razão Social'
    tdNumeroAgencia.style.font = 'bold 10pt Arial'
    tdNumeroAgencia.style.textAlign = 'center'
    tdNumeroAgencia.style.border = '1px solid black'
    tr.appendChild(tdNumeroAgencia)
    const tdCodigoBanco = window.document.createElement('td')
    tdCodigoBanco.innerText = 'Data de Abertura'
    tdCodigoBanco.style.font = 'bold 10pt Arial'
    tdCodigoBanco.style.textAlign = 'center'
    tdCodigoBanco.style.border = '1px solid black'
    tr.appendChild(tdCodigoBanco)
    empresasTable.appendChild(tr)
}

function initAddNewButton() {
    const addNewButtonDiv = window.document.createElement('div')
    addNewButtonDiv.style.textAlign = 'left'
    addNewButtonDiv.style.marginBottom = '5px'
    const addNewButton = window.document.createElement('input')
    addNewButton.setAttribute('type', 'button')
    addNewButton.value = 'Adicionar nova Empresa'
    addNewButton.addEventListener('click', goToAddNewPage)
    addNewButtonDiv.appendChild(addNewButton)
    empresasList.appendChild(addNewButtonDiv)
}

function goToAddNewPage() {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/empresas').classList.add('active')
    window.document.getElementById('edit/side').classList.add('active')
    onInitNew()
}

function goToEditPage(tr) {
    window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
    window.document.querySelector('div#edit').classList.add('active')
    window.document.getElementById('edit/empresas').classList.add('active')
    window.document.getElementById('edit/side').classList.add('active')
    onInitEdit(getCnpj(tr))
}

function getCnpj(tr) {
    return tr.getAttribute('id')
}

function apagar(tr) {
    const deletableEmpresa = new Empresa()
    deletableEmpresa.cnpj = getCnpj(tr)
    deleteEmpresa(deletableEmpresa)
}

function deleteEmpresa(deletableEmpresa) {
    deleteData(deletableEmpresa).then(
        (sucesso) => {
            getEmpresas(findParamsList)
            window.alert(sucesso)
        },
        (erro) => {
            if (erro.statusCode == 422) {
                let mensagens = 'A empresa não foi apagada porque:\n\n'
                for (const msgErro of erro.serverMsg) {
                    mensagens += msgErro + '\n'
                }
                window.alert(mensagens)
            }
        }
    )
}

function limpaTabela() {
    const empresasTable = window.document.querySelector('table#empresasTable')
    if (empresasTable) {
        empresasTable.remove()
    }
}

function changePageOffset(changeDirection) {
    findParamsList.toCount = false
    if (findParamsList.pageOffset == 0 && changeDirection <= 0) {
        return
    }
    if (findParamsList.pageOffset >= totalPages - findParamsList.pageSize && changeDirection >= 0) {
        return
    }
    findParamsList.pageOffset += changeDirection * findParamsList.pageSize
    if (findParamsList.pageOffset < 0) {
        findParamsList.pageOffset = 0
        window.history.pushState(findParamsList, '', getActualListPage())
        getEmpresas(findParamsList)
        return
    }
    if (findParamsList.pageOffset >= totalPages) {
        const pageOffset = Number.parseInt(totalPages / findParamsList.pageSize) * findParamsList.pageSize
        findParamsList.pageOffset = pageOffset == totalPages ? pageOffset - findParamsList.pageSize : pageOffset
        window.history.pushState(findParamsList, '', getActualListPage())
        getEmpresas(findParamsList)
        return
    }
    window.history.pushState(findParamsList, '', getActualListPage())
    getEmpresas(findParamsList)
}

function getActualListPage() {
    return window.document.location.hash
}

function query() {
    findParamsList.pageOffset = 0
    setFilter(findParamsList)
    window.history.pushState(findParamsList, '', getActualListPage())
    getEmpresas(findParamsList)
}

function initSideList() {

    initComboBox()
    initQueryButton()

    initSortInterface()
}

function initQueryButton() {
    const queryButton = window.document.createElement('input')
    queryButton.setAttribute('type', 'button')
    queryButton.value = 'Aplicar'
    queryButton.addEventListener('click', query)
    sideList.appendChild(queryButton)
}

function initSortInterface() {
    const sortDiv = window.document.createElement('div')
    const sortTitleDiv = window.document.createElement('div')
    const sortRazaoSocialDiv = window.document.createElement('div')
    const sortDataAberturaDiv = window.document.createElement('div')
    const sortButtonDiv = window.document.createElement('div')
    
    const sortTitle = window.document.createElement('h4')
    sortTitle.innerText = 'Ordenar lista de empresas por:'

    const sortRazaoSocialLabel = window.document.createElement('label')
    sortRazaoSocialLabel.setAttribute('for', 'sortCrescenteRazaoSocial')
    sortRazaoSocialLabel.innerText = 'Razão Social (ordem alfabética)'

    const sortDataAberturaLabel = window.document.createElement('label')
    sortDataAberturaLabel.setAttribute('for', 'sortDecrescenteDataAbertura')
    sortDataAberturaLabel.innerText = 'Data de Abertura (ordem decrescente)'

    const sortCrescenteRazaoSocial = window.document.createElement('input')
    sortCrescenteRazaoSocial.setAttribute('id', 'sortCrescenteRazaoSocial')
    sortCrescenteRazaoSocial.setAttribute('name', 'sort')
    sortCrescenteRazaoSocial.setAttribute('type', 'radio')
    
    const sortDecrescenteDataAbertura = window.document.createElement('input')
    sortDecrescenteDataAbertura.setAttribute('id', 'sortDecrescenteDataAbertura')
    sortDecrescenteDataAbertura.setAttribute('name', 'sort')
    sortDecrescenteDataAbertura.setAttribute('type', 'radio')
        
    const sortButton = window.document.createElement('input')
    sortButton.setAttribute('type', 'button')
    sortButton.setAttribute('value', 'Ordenar')
    sortButton.addEventListener('click', sort)

    sortTitleDiv.appendChild(sortTitle)
    sortRazaoSocialDiv.appendChild(sortRazaoSocialLabel)
    sortRazaoSocialDiv.appendChild(sortCrescenteRazaoSocial)
    sortDataAberturaDiv.appendChild(sortDataAberturaLabel)
    sortDataAberturaDiv.appendChild(sortDecrescenteDataAbertura)
    sortButtonDiv.appendChild(sortButton)

    sortDiv.appendChild(sortTitleDiv)
    sortDiv.appendChild(sortRazaoSocialDiv)
    sortDiv.appendChild(sortDataAberturaDiv)
    sortDiv.appendChild(window.document.createElement('br'))
    sortDiv.appendChild(sortButtonDiv)
    sideList.appendChild(sortDiv)
}

function sort() {
    findParamsList.pageOffset = 0
    setSort(findParamsList)
    window.history.pushState(findParamsList, '', getActualListPage())
    getEmpresas(findParamsList)
}

function setSort(findParamsList) {
    const sort = new EmpresaFindParams()
    findParamsList.sort = sort
    const sortCrescenteRazaoSocial = window.document.querySelector('input#sortCrescenteRazaoSocial')
    const sortDecrescenteDataAbertura = window.document.querySelector('input#sortDecrescenteDataAbertura')
    if (sortCrescenteRazaoSocial.checked) {
        sort.razaoSocial = 1
    }
    if (sortDecrescenteDataAbertura.checked) {
        sort.dataAbertura = -1
    }
}

function setFilter(findParamsList) {
    const filter = new EmpresaFindParams()
    findParamsList.filter = filter
    const filterTipoEmpresa = window.document.querySelector('select#filterTipoEmpresa')
    const filterTipoPorteEmpresa = window.document.querySelector('select#filterTipoPorteEmpresa')
    if (filterTipoEmpresa.value != 'Selecione a Categoria da Empresa') {
        filter.tipoEmpresa = filterTipoEmpresa.value
    }
    if (filterTipoPorteEmpresa.value != 'Selecione o Porte da Empresa') {
        filter.tipoPorteEmpresa = filterTipoPorteEmpresa.value
    }
}
