console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

//-- Obtener Sonidos
const sonido_raqueta = new Audio("patada.mp3");
const sonido_rebote = new Audio("pitido.mp3");
const sonido_tanto = new Audio("gol.mp3");

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  SAQUE: 1,
  JUGANDO: 2,
  SAQUEDE: 3,
}

//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;

//-- Pintar todos los objetos en el canvas
function draw() {
  //----- Dibujar la Bola
  //-- Solo en el estado de jugando
  if(estado == ESTADO.JUGANDO) {
    bola.draw();
  }

  //-- Dibujar las raquetas
  raqI.draw();
  raqD.draw();

  //--------- Dibujar la red
  ctx.beginPath();

  //-- Linea de medio campo
  ctx.lineTo(200, 200);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;

  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(canvas.width/2, 0);

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  //-- Círculo de medio campo

  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 50, 0, 2 * Math.PI);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.stroke();

  //-- Porterías
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/4);
  ctx.lineTo(40, canvas.height/4);
  ctx.lineTo(40, 3*canvas.height/4);
  ctx.lineTo(0, 3*canvas.height/4);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width, canvas.height/4);
  ctx.lineTo(canvas.width-40, canvas.height/4);
  ctx.lineTo(canvas.width-40, 3*canvas.height/4);
  ctx.lineTo(canvas.width, 3*canvas.height/4);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.stroke();

  //-- Área penalti
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/6);
  ctx.lineTo(120, canvas.height/6);
  ctx.lineTo(120, 5*canvas.height/6);
  ctx.lineTo(0, 5*canvas.height/6);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(120, canvas.height/2, 50, -1.5, -1.5 * Math.PI);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width, canvas.height/6);
  ctx.lineTo(canvas.width-120, canvas.height/6);
  ctx.lineTo(canvas.width-120, 5*canvas.height/6);
  ctx.lineTo(canvas.width, 5*canvas.height/6);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(canvas.width-120, canvas.height/2, 50, 1.5, 1.5 * Math.PI);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.stroke();

  //-- Detalles marcador
  ctx.beginPath();
  ctx.moveTo(250, 40);
  ctx.lineTo(250, 42);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 10;
  ctx.stroke();

  //-- Dibujar el texto de sacar
  if(estado == ESTADO.SAQUE || estado == ESTADO.SAQUEDE) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Saca!", 30, 390);
  }

  //-- Dibujar el texto de comenzar
  if(estado == ESTADO.INIT) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Pulsa Start!", 30, 390);
  }
}

//-- Dibujar el tanteo
var cont1 = 0;
var cont2 = 0;
function drawScore(){
  ctx.beginPath();
  ctx.fillRect(210, 20, 180, 40);
  ctx.stroke();
  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(cont1, 220, 54);
  ctx.fillText(cont2, 258, 54);
}

//-- Cronómetro
var min = 0;
var sec = 0;
function cron(){
  if(estado == ESTADO.JUGANDO) {
    sec ++
    if(sec < 10) {
      sec = "0" + sec;
    }
    if(sec > 59) {
      sec = "00"
      min ++
      if(min < 10) {
        min = "0" + min
      }
    }
    ctx.font = "30px Arial";
    ctx.fillText(`${min}:${sec}`, 310, 50);
  }else{
    ctx.font = "30px Arial";
    ctx.fillText(`00:00`, 310, 50);
    if(estado == ESTADO.SAQUE || estado == ESTADO.SAQUEDE) {
      sec = 0;
      min = 0;
    }
  }
}


//---- Bucle principal de la animación
function animacion()
{

  //-- Actualizar las posiciones de los objetos móviles

  //-- Actualizar la raqueta con la velocidad actual
  raqI.update();
  raqD.update();

  //-- Comprobar si la bola ha alcanzado el límite derecho
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if(bola.x >= canvas.width) {
    //-- Hay colisión. Cambiar el signo de la bola
    estado = ESTADO.SAQUEDE;
    bola.initde();
    cont1 ++
    console.log(cont1);
    sonido_tanto.currentTime = 0;
    sonido_tanto.play();

  }else if(bola.x <= 0.0){
    estado = ESTADO.SAQUE;
    bola.init()
    cont2 ++
    console.log(cont2);
    sonido_tanto.currentTime = 0;
    sonido_tanto.play();
  }else if(bola.y >= canvas.height) {
    bola.vy = bola.vy * -1;
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }else if(bola.y <= 0.0) {
    bola.vy = bola.vy * -1;
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }

  //-- Comprobar si hay colisión con la raqueta izquierda
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
      bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
      bola.vx = bola.vx * -1;

    //-- Reproducir sonido
    sonido_raqueta.currentTime = 0;
    sonido_raqueta.play();
  }

  //-- Comprobar si hay colisión con la raqueta derecha
  if (bola.x >= raqD.x && bola.x <=(raqD.x + raqD.width) &&
      bola.y >= raqD.y && bola.y <=(raqD.y + raqD.height)) {
      bola.vx = bola.vx * -1;

    //-- Reproducir sonido
    sonido_raqueta.currentTime = 0;
    sonido_raqueta.play();
  }

  //-- Bordes del canvas para la raqueta izquierda
   if (raqI.y <= 0 || raqI.y >= (canvas.height - raqI.height)){
     raqI.y = raqI.y * -1;
   }
   //-- Bordes del canvas para la raqueta derecha
   if (raqD.y <= 0 || raqD.y >= (canvas.height - raqD.height)){
     raqD.y = raqD.y * -1;
   }

  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola.update()

  //-- Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame y el marcador
  drawScore();
  cron();
  draw();

  window.requestAnimationFrame(animacion);
}

//-- Inicializa la bola: Llevarla a su posicion inicial
const bola = new Bola(ctx);

//-- Crear las raquetas
const raqI = new Raqueta(ctx);
const raqD = new Raqueta(ctx);

raqI.init();

//-- Cambiar las coordenadas de la raqueta derecha
raqD.x_ini = 520;
raqD.y_ini = 180;
raqD.init();

//-- Arrancar la animación
animacion();

//-- Retrollamada de las teclas
window.onkeydown = (e) => {

  //-- En el estado inicial no se
  //-- hace caso de las teclas
  if (estado == ESTADO.INIT)
    return;

  switch (e.key) {
    case "a":
      raqI.v = raqI.v_ini;
      break;
    case "q":
      raqI.v = raqI.v_ini * -1;
      break;
    case "p":
      raqD.v = raqD.v_ini * -1;
      break;
    case "l":
      raqD.v = raqD.v_ini;
      break;
    case "s":
      //-- El saque solo funciona en el estado de SAQUE
      if (estado == ESTADO.SAQUE) {
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();

        //-- Llevar bola a su posicion incicial
        bola.init();

        //-- Darle velocidad
        bola.vx = bola.vx_ini;
        bola.vy = bola.vy_ini;
        //-- Cambiar al estado de jugando!
        estado = ESTADO.JUGANDO;

        return false;
      }
      if (estado == ESTADO.SAQUEDE) {
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();

        //-- Llevar bola a su posicion incicial
        bola.initde();

        //-- Darle velocidad
        bola.vx = bola.vx_inide;
        bola.vy = bola.vy_inide;
        //-- Cambiar al estado de jugando!
        estado = ESTADO.JUGANDO;

        return false;
      }
    default:
  }
}

//-- Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if (e.key == "a" || e.key == "q"){
    //-- Quitar velocidad de la raqueta
    raqI.v = 0;
  }

  if (e.key == "p" || e.key == "l") {
    raqD.v = 0;
  }
}

//-- Botón de arranque
const start = document.getElementById("start");

start.onclick = () => {
  estado = ESTADO.SAQUE;
  console.log("SAQUE!");
  canvas.focus();
}

//-- Boton de stop
const stop = document.getElementById("stop");

stop.onclick = () => {
  //-- Volver al estado inicial
  estado = ESTADO.INIT;
  cont1 = 0;
  cont2 = 0;
  bola.init();
  start.disabled = false;
}
