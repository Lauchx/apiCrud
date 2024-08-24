const url = "https://apimocha.com/celus/tech"
//const url = "https://api.restful-api.dev/objects"
function getApi() {
    return new Promise((resolve, reject) => {
        fetch(url).then(api => {
            if (!api.ok) {
                throw new Error('Error en la red');
            }
            return api.json();
        }).then(api => {
            resolve(api)
        }).catch(error => {
           reject(error)
        })
    })
}
function hh(){
getApi()
    .then(apiCellphone => {
        document.getElementById('name').focus()
        let tbodyGroups = document.getElementsByTagName("tbody")[0]
        tbodyGroups.innerHTML = ""
        apiCellphone.forEach(apiCellphone => {
            let newRow = tbodyGroups.insertRow()
            let celID = newRow.insertCell()
            let cellName = newRow.insertCell()
            let cellDeleteButton = newRow.insertCell()
            cellDeleteButton.innerHTML = `<button onclick='deleteCellphone(${apiCellphone.id})'>Eliminar</button>`;
            celID.innerHTML = apiCellphone.id
            cellName.innerHTML = apiCellphone.name

            if (apiCellphone.data !== null) {
                for (let key in apiCellphone.data) {
                    let cellData = newRow.insertCell()
                    cellData.innerHTML = `${key}: ${apiCellphone.data[key]}`
                }
            } else {
                let cellData = newRow.insertCell()
                cellData.innerHTML = 'No hay datos'
            }
        })
    })
}
    let data = {}
function dataAttribute() {
    const dataName = document.getElementById('DataName').value;
    const datahtml = document.getElementById('Data').value;

    data[dataName] = datahtml;

    const attributeHTML = `<p>${dataName}: ${datahtml}</p>`;
    document.getElementById('dataAttributes').innerHTML += attributeHTML;

    document.getElementById('DataName').value = "";
    document.getElementById('Data').value = "";

    console.log(data)
    return data

}
function postPhone(cellphone) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject(Error(xhr.status + "||" + xhr.statusText))
            }
        }
        console.log(cellphone)
        xhr.send(cellphone)
        data = {}
        document.getElementById('dataAttributes').innerHTML = ""
    })
}



function addCellphone() {
    let id = parseInt((Math.random() * 999) + 20)
    console.log(id)
    let data = dataAttribute()
    let cellphone = JSON.stringify({
        'id': id,
        'name': document.getElementById('name').value,
        'data': data,
    })
    console.log(cellphone.id)
    postPhone(cellphone).then(cellphone => {
            let tbody = document.getElementsByTagName('tbody')[0]
            let newRow = tbody.insertRow()
            let cellID = newRow.insertCell()
            let cellName = newRow.insertCell()
            let cellDeleteButton = newRow.insertCell()

            cellID.innerHTML = id
            cellName.innerHTML = document.getElementById('name').value
            console.log("here")
            console.log(cellphone.id)
            console.log(id)
            cellDeleteButton.innerHTML = `<button onclick='deleteCellphone(${id})'>Eliminar</button>`
            console.log(data)
            if (data !== null) {
                for (let key in data) {
                    let cellData = newRow.insertCell()
                    cellData.innerHTML = `${key}: ${data[key]}`
                }
            } else {
                let cellData = newRow.insertCell()
                cellData.innerHTML = 'No hay datos'
            }
    })


}


function deleteCellphone(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${url}/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(`Delete Cellphone`);
        } else {
            console.error(`Error: ${xhr.status} ${xhr.statusText}`);
        }
    };

    xhr.send();
}