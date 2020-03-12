function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById("display")
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  //----- Dibujar la Bola
  ctx.beginPath();
  ctx.fillStyle = 'white';

  //-- x,y, anchura, altura
  ctx.rect(100, 200, 10, 10);
  ctx.fill();

  //-- Raquetas
  ctx.fillStyle = 'white';
  ctx.fillRect(50,100, 10, 40);
}
