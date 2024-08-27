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

getApi()
    .then(apiCellphone => {
        document.getElementById('name').focus()
        let tbodyGroups = document.getElementsByTagName("tbody")[0]
        tbodyGroups.innerHTML = ""
        apiCellphone.forEach(apiCellphone => {
            let newRow = tbodyGroups.insertRow()
            let cellID = newRow.insertCell()
            let cellName = newRow.insertCell()
            let cellUpgradeButton = newRow.insertCell()
            let cellDeleteButton = newRow.insertCell()
            cellDeleteButton.innerHTML = `<button onclick='deleteCellphone("${apiCellphone.id}", this)'>Eliminar</button>`;
            cellUpgradeButton.innerHTML = `<button onclick='openDivUpgrade()' >Actualizar</button>`
            cellID.innerHTML = apiCellphone.id
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
                console.log("Respuesta de la API:" + xhr.responseText + "!");
                try {
                    let responseJson = JSON.parse(xhr.responseText);
                    console.log(responseJson)
                    resolve(responseJson);
                } catch (e) {
                    reject(Error("Invalid JSON: " + xhr.responseText));
                }
            } else {
                reject(Error(xhr.status + " || " + xhr.statusText))
            }
        }
        console.log(cellphone)
        xhr.send(cellphone)
        data = {}
        document.getElementById('dataAttributes').innerHTML = ""
    })
}



function addCellphone() {
    let data = dataAttribute()
    let cellphone = JSON.stringify({
        'name': document.getElementById('name').value,
        'data': data,
    })
    postPhone(cellphone).then(response => {
        console.log(response.id)
        let tbody = document.getElementsByTagName('tbody')[0]
        let newRow = tbody.insertRow()
        let cellID = newRow.insertCell()
        cellID.innerHTML = response.id
        let cellName = newRow.insertCell()
        let cellDeleteButton = newRow.insertCell()
        cellName.innerHTML = document.getElementById('name').value
        cellDeleteButton.innerHTML = `<button onclick = 'deleteCellphone("${response.id}", this)'>Eliminar</button>`
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
function deleteCellphoneHTML(buttonDelete) {
    console.log(buttonDelete.parentNode.parentNode)
    buttonDelete.parentNode.parentNode.remove()
}

function deleteCellphone(id, buttonDelete ) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${url}/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(`Delete Cellphone`);
            deleteCellphoneHTML(buttonDelete)
        } else {
            console.error(`Error: ${xhr.status} ${xhr.statusText} ${id}`);
        }
    };
    xhr.send(id);
}

function putCellphone(){
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('PUT', url)
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log("Respuesta de la API:" + xhr.responseText + "!");
                try {
                    let responseJson = JSON.parse(xhr.responseText);
                    console.log(responseJson)
                    resolve(responseJson);
                } catch (e) {
                    reject(Error("Invalid JSON: " + xhr.responseText));
                }
            } else {
                reject(Error(xhr.status + " || " + xhr.statusText))
            }
        }
        document.getElementById('dataAttributes').innerHTML = ""
        console.log(cellphone)
        xhr.send(cellphone)
        data = {}
    })

}
function upgradeCellphone(){

putCellphone().then(()=>{

})

}
function openDivUpgrade(){
    let divUp = document.getElementById("upgrade")
    divUp.innerHTML = '<h5>Modificar Celular</h5> <input type="text" id="name" placeholder="Name"> <input type="text" id="DataName" placeholder="DataName"> <input type="text" id="Data" placeholder="Data"> <div id="dataAttributes"></div><button id="add-attribute-btn" onclick="dataAttribute()">Agregar atributo</button><button type="submit" onclick="addCellphone()">Add Cellphone</button>'
}