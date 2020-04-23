console.log('Ejecutando JS...');

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('original')
const ctx = canvas.getContext('2d');

//-- Acceso a los deslizadores
const des_r = document.getElementById('red');
const des_g = document.getElementById('green')
const des_b = document.getElementById('blue')

//-- Valor de los deslizadores
const value_r = document.getElementById('value_r');
const value_g = document.getElementById('value_g');
const value_b = document.getElementById('value_b');

//-- Botón grises
const gray = document.getElementById('gray')

//-- Botón RGB
const colour = document.getElementById('colour')

//-- Selección de imágenes
image1.onclick = () => {
  console.log("Imagen 1");
  img.src="image1.png"
}
image2.onclick = () => {
  console.log("Imagen 2");
  img.src="image2.jpg"
}
image3.onclick = () => {
  console.log("Imagen 3");
  img.src="image3.jpg"
}

//-- Función de retrollamada de imagen cargada
img.onload = function(){
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);

  console.log("Imagen lista...");
};

function RGB() {
  //-- Mostrar el nuevo valor del deslizador
  value_r.innerHTML = des_r.value;
  value_g.innerHTML = des_g.value;
  value_b.innerHTML = des_b.value;
  //-- Situar la imagen original en el canvas
  ctx.drawImage(img, 0, 0);
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  let data = imgData.data
  //-- Obtener el umbral del deslizador
  umbral_r = des_r.value
  umbral_g = des_g.value
  umbral_b = des_b.value
  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_r)
      data[i] = umbral_r;
    if (data[i+1] > umbral_g)
      data[i+1] = umbral_g;
    if (data[i+2] > umbral_b)
      data[i+2] = umbral_b;
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Función de retrollamada al botón colores
colour.onclick = () => {
  des_r.oninput = () => {
    RGB();
  }
  des_g.oninput = () => {
    RGB();
  }
  des_b.oninput = () => {
    RGB();
  }
}

//-- Función de retrollamada al botón grises
gray.onclick = () => {
  var brightness = 0;
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  for (var i = 0; i < data.length; i+=4) {
    brightness = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
    data[i] = brightness;
    data[i+1] = brightness;
    data[i+2] = brightness;
  }
  ctx.putImageData(imgData, 0, 0);
}

//-- Función de retrollamada al botón boca abajo
mirror.onclick = () => {
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  ctx.translate(img.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(img, 0, 0, img.width, img.height);
  ctx.putImageData(img, 0, 0);
}

//-- Función de retrollamada al botón boca abajo
down.onclick = () => {
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  ctx.translate(img.width-1, img.height-1);
  ctx.rotate(Math.PI);
  ctx.drawImage(img, 0, 0, img.width, img.height);
  ctx.putImageData(img, 0, 0);
}

//-- Función de retrollamada al botón ruido
noise.onclick = () => {
  var noise = 0;
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  for (var i = 0; i < data.length; i+=4) {
    noise = Math.floor(Math.random() * (70 + 70 + 1) - 70)
    data[i] += noise;
    data[i+1] += noise;
    data[i+2] += noise;
  }
  ctx.putImageData(imgData, 0, 0);
}
