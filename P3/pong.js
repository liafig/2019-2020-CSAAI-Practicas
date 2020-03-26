console.log("Ejecutando JS...")

const canvas = document.getElementById("display");
console.log("canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}");
const ctx = canvas.getContext("2d");

// Bola
const bola = {

  // Tamaño
  size : 8,

  // Posicion inicial
  x_ini : 100,
  y_ini : 200,

  // Posicion generica
  x : 0,
  y : 0,

  // Velocidad inicial
  vx_ini : 6,
  vy_ini : 3,

  // Velocidad genérica
  vx : 0,
  vy : 0,
}

// Raqueta
const raqI = {
  // Posicion inicial
  x_ini : 50,
  y_ini : 100,

  // Posicion generica
  x : 0,
  y : 0,

  // Velocidad (const)
  v_ini : 3,

  //-- Velocidad (variable)
  v : 0,
}

function draw() {

  // Raquetas
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.rect(raqI.x, raqI.y, 10, 40);
  ctx.rect(540 ,300, 10, 40);
  ctx.fill();

  // Bola
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.rect(bola.x, bola.y, bola.size, bola.size);
  ctx.fill();

  // Red
  ctx.beginPath();
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  // Puntuación
  ctx.font = "100px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("0", 200, 80);
  ctx.fillText("1", 340, 80);
}

function animacion() {

  // Actualizar la raqueta con la velocidad actual
  raqI.y += raqI.v;

  // Comprobar si la bola ha alcanzado el límite derecho
  // Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.x >= canvas.width) {
    // Hay colisión. Cambiar el signo de la bola
    bola.vx = bola.vx * -1;
  }

  // Comprobar si hay colisión con la raqueta izquierda
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
      bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
    bola.vx = bola.vx * -1;
  }

  // Actualizar coordenada x de la bola, en funcion de su velocidad
  bola.x += bola.vx;

  // Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  // Dibujar el nuevo frame
  draw();
}

// Inicializar la bola
bola.x = bola.x_ini;
bola.y = bola.y_ini;

// Inicializar la raqueta
raqI.x = raqI.x_ini;
raqI.y = raqI.y_ini;

// Arrancar la animación
setInterval(()=>{
  animacion();
},16);

// Retrollamada de las teclas
window.onkeydown = (e) => {

  switch (e.key) {
    case " ":
      bola.x = bola.x_ini;
      bola.vx = bola.vx_ini;
      break;
    case "a":
      raqI.v = raqI.v_ini;
      break;
    case "q":
      raqI.v = raqI.v_ini * -1;
      break;
    case "ArrowUp":
      raqI.v = raqI.v_ini;
      break;
    case "ArrowDown":
      raqI.v = raqI.v_ini * -1;
    default:
  }
}

// Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if (e.key == "a" || e.key == "q"){
    // Quitar velocidad de la raqueta
    raqI.v = 0;
  }
}
