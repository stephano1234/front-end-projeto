export function getData(findParams) {
    return new Promise(function (resolve, reject) {
        let totalData
        const request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.getResponseHeader('X-Count-Query')) {
                    totalData = this.getResponseHeader('X-Count-Query')
                }
                findParams.toCount = true
                resolve({ 'dataContent': JSON.parse(this.responseText), 'dataCount': totalData })
            }
            if (this.readyState == 4 && this.status == 422) {
                reject({ 'statusCode': this.status, 'serverMsg': JSON.parse(this.getResponseHeader('X-Server-Msg')) })
            }
        }
        request.open('GET', 'http://localhost:8080/empresa-api/empresas', true)
        request.setRequestHeader('X-Find-Params', JSON.stringify(findParams))
        request.send()    
    })
}

export function updateData(empresa) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.getResponseHeader('X-Server-Msg'))
            }
            if (this.readyState == 4 && this.status == 422) {
                reject({ 'statusCode': this.status, 'serverMsg': JSON.parse(this.getResponseHeader('X-Server-Msg')) })
            }
        }
        request.open('PUT', 'http://localhost:8080/empresa-api/empresas', true)
        request.send(JSON.stringify(empresa))
    })
}

export function deleteData(empresa) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.getResponseHeader('X-Server-Msg'))
            }
            if (this.readyState == 4 && this.status == 422) {
                reject({ 'statusCode': this.status, 'serverMsg': JSON.parse(this.getResponseHeader('X-Server-Msg')) })
            }
        }
        request.open('DELETE', 'http://localhost:8080/empresa-api/empresas', true)
        request.send(JSON.stringify(empresa))
    })
}

export function saveData(empresa) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.getResponseHeader('X-Server-Msg'))
            }
            if (this.readyState == 4 && this.status == 422) {
                reject({ 'statusCode': this.status, 'serverMsg': JSON.parse(this.getResponseHeader('X-Server-Msg')) })
            }
        }
        request.open('POST', 'http://localhost:8080/empresa-api/empresas', true)
        request.send(JSON.stringify(empresa))
    })
}
