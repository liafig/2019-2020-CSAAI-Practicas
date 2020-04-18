console.log("Ejecutando JS...");

//----- Obtener elemento de video monitor y configurarlo
const monitor = document.getElementById("monitor")
monitor.width=600;
monitor.height=300;
monitor.poster="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/color-bars.png";

//----- Obtener elemento de video 1 y configurarlo
const video1 = document.getElementById("video1")
video1.width=300;
video1.height=150;
video1.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/dua3.mp4"

//----- Obtener elemento de video 2 y configurarlo
const video2 = document.getElementById("video2")
video2.width=300;
video2.height=150;
video2.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/dua2.mp4"

//----- Obtener elemento de video 3 y configurarlo
const video3 = document.getElementById("video3")
video3.width=300;
video3.height=150;
video3.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/dua.mp4"

const prueba = document.getElementById("prueba")
prueba.width=200;
prueba.height=125;
prueba.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/emision_pruebas.png"

//-- Obtener los botones
const play1 = document.getElementById("play1")
const play2 = document.getElementById("play2")
const play3 = document.getElementById("play3")
const test = document.getElementById("test")
const stop = document.getElementById("stop")

init.onclick = () => {
  console.log("Start!");
  video1.play();
  video2.play();
  video3.play();
};

play1.onclick = () => {
  console.log("Video 1");
  monitor.src=video1.src;
  monitor.currentTime = video1.currentTime+0.35;
  monitor.play();
  video1.style.border = "2px solid #ec60e3";
  video2.style.border = "0px";
  video3.style.border = "0px";
  prueba.style.border = "0px";
};

play2.onclick = () => {
  console.log("Video 2");
  monitor.src=video2.src;
  monitor.currentTime = video2.currentTime+0.35;
  monitor.play();
  video1.style.border = "0px";
  video2.style.border = "2px solid #ec60e3";
  video3.style.border = "0px";
  prueba.style.border = "0px";
};

play3.onclick = () => {
  console.log("Video 3");
  monitor.src=video3.src;
  monitor.currentTime = video3.currentTime+0.35;
  monitor.play();
  video1.style.border = "0px";
  video2.style.border = "0px";
  video3.style.border = "2px solid #ec60e3";
  prueba.style.border = "0px";
};

test.onclick = () => {
  console.log("Prueba");
  monitor.src=null;
  monitor.poster = prueba.src;
  monitor.play();
  video1.style.border = "0px";
  video2.style.border = "0px";
  video3.style.border = "0px";
  prueba.style.border = "2px solid #ec60e3";
}

auto.onclick = () => {
  console.log("Automático");
  document.getElementById("play1").disabled=true;
  document.getElementById("play2").disabled=true;
  document.getElementById("play3").disabled=true;
  document.getElementById("test").disabled=true;
  play1.onclick();
  setTimeout(play2.onclick, 3000);
  setTimeout(play3.onclick, 6000);
  var repeat = setInterval(change, 9000);
  var two;
  var three;
  function change() {
    play1.onclick();
    two = setTimeout(play2.onclick, 3000);
    three = setTimeout(play3.onclick, 6000);
  }
  manual.onclick = () => {
    console.log("Manual");
    clearTimeout(two);
    clearTimeout(three);
    clearInterval(repeat);
    document.getElementById("play1").disabled=false;
    document.getElementById("play2").disabled=false;
    document.getElementById("play3").disabled=false;
    document.getElementById("test").disabled=false;
  }
}

bucle.onclick = () => {
  console.log("Bucle");
  inicio = monitor.currentTime;
  var loop = setInterval(restart, 2000);
  function restart() {
    monitor.currentTime = inicio;
  }
  manual.onclick = () => {
    console.log("Manual");
    clearInterval(loop);
    if(monitor.src==video1.src){
      monitor.currentTime = video1.currentTime+0.35;
    }else if(monitor.src==video2.src){
      monitor.currentTime = video2.currentTime+0.35;
    }else{
      monitor.currentTime = video3.currentTime+0.35;
    }
  }
}

stop.onclick = () => {
  monitor.pause();
  monitor.src="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/color-bars.png";
  monitor.poster="https://github.com/liafig/2019-2020-CSAAI-Videos/raw/master/color-bars.png";
}
