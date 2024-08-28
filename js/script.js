const url = "https://api.restful-api.dev/objects"

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
            cellDeleteButton.innerHTML = `<button onclick='deleteCellphone("${apiCellphone.id}", this)'>Delete</button>`;
            cellUpgradeButton.innerHTML = `<button onclick='openDivUpgrade("${apiCellphone.id}", this)' >Upgrade</button>`
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
    if(document.getElementById('DataName').value !== '' && document.getElementById('Data').value !== ''){
    const dataName = document.getElementById('DataName').value;
    const datahtml = document.getElementById('Data').value;

    data[dataName] = datahtml;

    const attributeHTML = `<p>${dataName}: ${datahtml}</p>`;
    document.getElementById('dataAttributes').innerHTML += attributeHTML;

    document.getElementById('DataName').value = "";
    document.getElementById('Data').value = "";

    console.log(data)
    return data
}else{
    console.log(data + 'esto es la data')
    return data
}
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
        let cellUpgradeButton =  newRow.insertCell()
        let cellDeleteButton = newRow.insertCell()
        cellName.innerHTML = document.getElementById('name').value
        cellUpgradeButton.innerHTML = `<button onclick='openDivUpgrade("${response.id}", this)'>Upgrade</button>` 
        cellDeleteButton.innerHTML = `<button onclick = 'deleteCellphone("${response.id}", this)'>Delete</button>`
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
    buttonDelete.parentNode.parentNode.remove()
}

function deleteCellphone(id, buttonDelete) {
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

function putCellphone(cellphone, id) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('PUT', `${url}/${id}`)
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
        document.getElementById("upgrade").value = ""
        xhr.send(cellphone)
        data = {}

    })

}
function upgradeCellphone(id, buttonUpgrade) {
    let data = newDataAtribute()
    let newname =  document.getElementById('newName').value
    let cellphone = JSON.stringify({
        'id': id,
        'name': document.getElementById('newName').value,
        'data': data,
    })
    document.getElementById("upgrade").innerHTML = " "
    putCellphone(cellphone, id).then(response => {
        deleteCellphoneHTML(buttonUpgrade)
        console.log(response.id)
        let tbody = document.getElementsByTagName('tbody')[0]
        let newRow = tbody.insertRow()
        let cellID = newRow.insertCell()
        cellID.innerHTML = response.id
        let cellName = newRow.insertCell()
        let cellUpgradeButton = newRow.insertCell()
        let cellDeleteButton = newRow.insertCell()
        cellName.innerHTML = newname
        cellDeleteButton.innerHTML = `<button onclick = 'deleteCellphone("${response.id}", this)'>Delete</button>`
        cellUpgradeButton.innerHTML = `<button onclick='openDivUpgrade("${response.id}", this)'>Upgrade</button>` 
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
function newDataAtribute(){
    if(document.getElementById('newDataName').value !== '' & document.getElementById('newData').value !== ''){
    const dataName = document.getElementById('newDataName').value;
    const datahtml = document.getElementById('newData').value;

    data[dataName] = datahtml;

    const attributeHTML = `<p>${dataName}: ${datahtml}</p>`;
    document.getElementById('newdataAttributes').innerHTML += attributeHTML

    document.getElementById('newDataName').value = ""
    document.getElementById('newData').value = ""

    console.log(data)
    return data
}else{
    return data
}
}
function openDivUpgrade(id, buttonUpgrade) {
let divUp = document.getElementById("upgrade");
    console.log(buttonUpgrade);
    divUp.innerHTML = "";

    let h5 =  document.createElement("h5");
    h5.innerText = "Modificar Datos"
    divUp.appendChild(h5);

    let newNameInput = document.createElement("input");
    newNameInput.type = "text";
    newNameInput.id = "newName";
    newNameInput.placeholder = "Name";
    divUp.appendChild(newNameInput);

    let newDataNameInput = document.createElement("input");
    newDataNameInput.type = "text";
    newDataNameInput.id = "newDataName";
    newDataNameInput.placeholder = "DataName";
    divUp.appendChild(newDataNameInput);

    let newDataInput = document.createElement("input");
    newDataInput.id = "newData";
    newDataInput.placeholder = "Data";
    divUp.appendChild(newDataInput);

    let newdataAttributesDiv = document.createElement("div");
    newdataAttributesDiv.id = "newdataAttributes";
    divUp.appendChild(newdataAttributesDiv);

    let addAttributeBtn = document.createElement("button");
    addAttributeBtn.id = "NewaddAttribute";
    addAttributeBtn.onclick = newDataAtribute;
    addAttributeBtn.innerHTML = "Agregar atributo";
    divUp.appendChild(addAttributeBtn);

    let upgradeBtn = document.createElement("button");
    upgradeBtn.type = "submit";
    upgradeBtn.onclick = function() {
        upgradeCellphone(id, buttonUpgrade);
    };
    upgradeBtn.innerHTML = "Upgrade Cellphone";
    divUp.appendChild(upgradeBtn);
}






