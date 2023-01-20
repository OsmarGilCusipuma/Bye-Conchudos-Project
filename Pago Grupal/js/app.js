const form = document.querySelector(".form")
const formInfo = document.querySelector(".form-info")
const inputNa = document.querySelector(".inputName")
const inputPa = document.querySelector(".inputPayment")
const listDivs = document.querySelector(".listDivs")
const members = document.querySelector("#send")
const nmembers = document.querySelector(".nmembers")
const deudas = document.querySelector(".deudas-listar")

const miembroObj = {
    nombre: "",
    pago: 0,
    debe: 0
}
let arrMiembros = []

loadEventListeners()

function loadEventListeners(){
    members.addEventListener("click",showMembersInfo)
}
const divObj = {
    id: 0
}
function showMembersInfo(e){
    cleanHTML(listDivs)
    const divcito = document.querySelector(".divBoton")
    if(divcito){
        form.removeChild(divcito)
    }
    e.preventDefault()
    const numMembers = Number(nmembers.value)
    if( numMembers== ""){
        const isAlert = document.getElementsByClassName("alert")
        const alert = document.createElement("p")
        alert.classList.add("alert")
        alert.textContent="Ingrese un numero"
        if(isAlert.length == 0){
            form.insertBefore(alert,listDivs)
            setTimeout(()=>{
                form.removeChild(alert)
            },2000)
        }
    } else{
        for(let i = 0; i < numMembers; i++){
            const divInfo = document.createElement("div")
            divInfo.classList.add("form-info")
            //divInfo.setAttribute("id",Date.now())
            divInfo.innerHTML = `
            
            <div class="divM">
            <label>Miembro</label>
            <input type="text" class="inputName">
            </div>
            <div class="divP">
            <label>Pago</label>
            <input type="text" class="inputPayment">
            </div>
            `
            listDivs.appendChild(divInfo)
        }
        const divButtons = document.createElement("div")
        divButtons.classList.add("divBoton")
        divButtons.innerHTML=`        
        <button type="submit" id="enviar" class="button">CALCULAR</button>
        <button id="anadir" class="button">AÑADIR MIEMBRO</button>
        `
        form.appendChild(divButtons)
    
        const send = document.querySelector("#enviar")
        const add = document.querySelector("#anadir")
        add.addEventListener("click",addSendInfo)
        send.addEventListener("click",calculateInfo)
    }
}
function addSendInfo(e){
    e.preventDefault();
    //divObj.id = Date.now()
    const divInfo = document.createElement("div")
    divInfo.classList.add("form-info")
    //divInfo.setAttribute("id",Date.now())
    divInfo.innerHTML = `
    <div class="divM">
    <label>Miembro</label>
    <input type="text" class="inputName">
    </div>
    <div class="divP">
    <label>Pago</label>
    <input type="text" class="inputPayment">
    </div>
    `
    
    listDivs.appendChild(divInfo)
}
let arrDeudas = []
function calculateInfo(e){
    e.preventDefault();
    arrDeudas=[]
    let arregloDefinitivo = []
    arrMiembros = []
    let arreglo = Array.from(document.getElementsByClassName("inputPayment"))
    let suma = 0
    arreglo.forEach(pago=>{
        let num = Number(pago.value)
        suma +=num
    })
    arregloDefinitivo = Array.from(document.getElementsByClassName("form-info"))
    
    arregloDefinitivo.forEach(cosa=>{
        if(cosa.children[0].children[1].value == "" || cosa.children[1].children[1].value == ""){
            let emptyMember = arregloDefinitivo.indexOf(cosa)
            arregloDefinitivo.splice(emptyMember, 1)
        }
        //console.log(cosa.children[0].children)

    })

    let promedio = suma/arregloDefinitivo.length

    arregloDefinitivo.forEach(cosa =>{
        miembroObj.nombre = cosa.children[0].children[1].value
        miembroObj.pago = cosa.children[1].children[1].value
        miembroObj.debe = promedio - miembroObj.pago
        arrMiembros.push({...miembroObj})
    })
    let arrDeben = []
    let arrSobra = []
    arrMiembros.forEach(miembro =>{
        if(miembro.debe > 0){
            arrDeben.push(miembro)
        } else{
            arrSobra.push(miembro)
        }
    })
    for(let i=0;i<arrSobra.length;i++){
        for(let j=0;j<arrDeben.length;j++){
            if(arrSobra[i].debe != 0 && arrDeben[j].debe != 0){
                let temp = arrSobra[i].debe
                arrSobra[i].debe = arrSobra[i].debe + arrDeben[j].debe

                if(arrSobra[i].debe<=0){
                    const message1 = `${arrDeben[j].nombre} le debe ${Math.round(arrDeben[j].debe*100)/100} a ${arrSobra[i].nombre}`
                    arrDeudas.push(message1)

                    arrDeben[j].debe = 0
                } else{
                    arrDeben[j].debe = arrDeben[j].debe + temp
                    const message2 = `${arrDeben[j].nombre} le debe ${Math.round(Math.abs(temp)*100)/100} a ${arrSobra[i].nombre}`
                    arrDeudas.push(message2)

                    arrSobra[i].debe=0
                }
                // if(arrSobra[i].debe<=0){
                //     console.log(`${arrDeben[j].nombre} le da ${arrDeben[j].debe} a ${arrSobra[i].nombre}`)
                //     arrDeben[j].debe = 0
                // }
                // if(arrSobra[i].debe>0){
                //     arrDeben[j].debe = arrDeben[j].debe + temp
                //     console.log(`${arrDeben[j].nombre} le da ${Math.abs(temp)} a ${arrSobra[i].nombre}`)
                //     arrSobra[i].debe=0
                // }
            }
        }
    }
    showDebts()
    // console.log(arrDeben)
    // console.log(arrSobra)
    // console.log(promedio)
}

function showDebts(){
    cleanHTML(deudas)
    arrDeudas.forEach(p=>{
        const pa = document.createElement("li")
        pa.classList.add("debt-pa")
        pa.textContent = p
        deudas.appendChild(pa)
    })
}

function cleanHTML(block){
    while(block.firstChild){
        block.removeChild(block.firstChild)
    }
}

/*
A mejorar:

Probablemente agregar en local storage a un arreglo cada vez que se aprete el boton de ADD e imprimir en base a lo guardado

*/