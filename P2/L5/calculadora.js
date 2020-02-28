console.log("Ejecutando JS...");

display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
clearlast = document.getElementById("clearlast")

let digitos=document.getElementsByClassName("cdigito")

for(i = 0; i < digitos.length; i++){
  digitos[i].onclick = (ev) =>{
    digito(ev.target);
  }
}

let operadores=document.getElementsByClassName("operador")

for(i = 0; i < operadores.length; i++){
  operadores[i].onclick = (ev) =>{
    display.innerHTML += ev.target.value;
  }
}

function digito(boton)
{
  if(display.innerHTML == "0"){
    display.innerHTML = boton.value;
  }else{
  display.innerHTML += boton.value;
  }
}

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Borrar último dígito
clearlast.onclick = () => {
  if(display.innerHTML == "0"){
    display.innerHTML = "0";
  }else{
    display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
  }
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}
