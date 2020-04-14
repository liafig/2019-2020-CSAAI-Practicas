console.log("Ejecutando JS...");

//----- Obtener elemento de video monitor y configurarlo
const monitor = document.getElementById("monitor")
monitor.width=800;  //-- Tamaño de la pantalla de video
monitor.height=400;
monitor.poster="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/color-bars.png";

//----- Obtener elemento de video 1 y configurarlo
const video1 = document.getElementById("video1")
video1.width=400;  //-- Tamaño de la pantalla de video
video1.height=200;
video1.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/dua.mp4"

//----- Obtener elemento de video 2 y configurarlo
const video2 = document.getElementById("video2")
video2.width=400;  //-- Tamaño de la pantalla de video
video2.height=200;
video2.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/dua2.mp4"

//----- Obtener elemento de video 3 y configurarlo
const video3 = document.getElementById("video3")
video3.width=400;  //-- Tamaño de la pantalla de video
video3.height=200;
video3.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/dua3.mp4"

//-- Obtener los botones
const play1 = document.getElementById("play1")
const play2 = document.getElementById("play2")
const play3 = document.getElementById("play3")
const stop = document.getElementById("stop")

init.onclick = () => {
  console.log("Click!");
  video1.play();
  video2.play();
  video3.play();
};

//-- Función de retrollamada del botón de ver
play1.onclick = () => {
  console.log("Click!");
  monitor.src=video1.src;
  monitor.play();
};

play2.onclick = () => {
  console.log("Click!");
  monitor.src=video2.src;
  monitor.play();
};

play3.onclick = () => {
  console.log("Click!");
  monitor.src=video3.src;
  monitor.play();
};

//-- Funcion de retrollamada del boton de parar
stop.onclick = () => {
  monitor.pause();

  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  monitor.src=null;
}
