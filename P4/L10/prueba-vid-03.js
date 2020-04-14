console.log("Ejecutando JS...");

//----- Obtener elemento de video y configurarlo
const video1 = document.getElementById("video1")
video1.width=400;  //-- Tamaño de la pantalla de video
video1.height=200;

const video2 = document.getElementById("video2")
video2.width=400;  //-- Tamaño de la pantalla de video
video2.height=200;

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
video1.poster="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/color-bars.png";
video2.poster="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/color-bars.png";

//-- Obtener los botones
const play1 = document.getElementById("play1")
const play2 = document.getElementById("play2")
const stop = document.getElementById("stop")

//-- Función de retrollamada del botón de ver
play1.onclick = () => {
  console.log("Click!");
  video1.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/dua.mp4"
  video1.play();
};

play2.onclick = () => {
  console.log("Click!");
  video2.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/dua2.mp4"
  video2.play();
};

//-- Funcion de retrollamada del boton de parar
stop.onclick = () => {
  video1.pause();
  video2.pause();

  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  video1.src=null;
  video2.src=null;
}
