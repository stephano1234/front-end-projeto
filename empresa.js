import * as EmpresaList from './empresas-list.js'

const app = {
    init: function () {
        EmpresaList.onInitList()
        window.addEventListener('popstate', app.popping)
    },
    popping: function () {
        const hash = window.document.location.hash
        switch (hash.split('/')[0]) {
            case '#list':
                break;
            case '#edit':
                break;
            default:
                break;
        }
        const currentPage = window.document.querySelector(`div${hash.split('/')[0]}`)
        if (!currentPage.className.match('.*active.*')) {
            window.document.querySelectorAll('.active').forEach((div) => { div.classList.remove('active') })
            currentPage.classList.add('active')
        }
    }
}

window.document.addEventListener('DOMContentLoaded', app.init)
