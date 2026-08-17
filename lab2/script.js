const contrasenia = document.getElementById("entrada")
const tamanio = document.getElementById("tamanio")
const mayus = document.getElementById("mayus")
const minus = document.getElementById("minus")
const num = document.getElementById("num")
const simbolos = document.getElementById("simbolo")
const botonGenerar = document.getElementById("botonGenerar")
const mensajeError = document.getElementById("mensajeError");

botonGenerar.addEventListener("click",generar)
function generar(){
let caracteres = ""
let resultado = ""
if(mayus.checked){
    caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}
if(minus.checked){
    caracteres += "abcdefghijklmnopqrstuvwxyz"
}
if(num.checked){
    caracteres += "0123456789"
}
if(simbolos.checked){
    caracteres += "!@#$%&*"
}
if(caracteres === ""){
    mensajeError.textContent = "selecciona una opcion"
    return
}
mensajeError.textContent = "";
for(let i = 0;i < (parseInt(tamanio.value));i++){
    const posicion = Math.floor(Math.random()*caracteres.length);
    resultado += caracteres[posicion]
}
contrasenia.value = resultado;
}

