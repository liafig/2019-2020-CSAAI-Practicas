console.log('Ejecutando JS...');

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc')
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

//-- Funcion de retrollamada de la imagen cargada
//-- la imagen no se carga instantaneamete, sino que lleva tiempo.
//-- Solo podemos acceder a ella una vez que este cargada totalmente.
img.onload = function(){

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas.
  //-- No se han hecho manipulaciones aun.
  ctx.drawImage(img, 0, 0);

  console.log("Imagen lista...");
};

//-- Funcion de retrollamada al botón RGB
colour.onclick = () => {
  //-- Funcion de retrollamada del deslizador
  des_r.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    value_r.innerHTML = des_r.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0, 0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral de R del deslizador
    umbral_r = des_r.value

    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbral_r)
        data[i] = umbral_r;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
  des_g.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    value_g.innerHTML = des_g.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0, 0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral de R del deslizador
    umbral_g = des_g.value

    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i+1] > umbral_g)
        data[i+1] = umbral_g;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
  des_b.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    value_b.innerHTML = des_b.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0, 0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral de R del deslizador
    umbral_b = des_b.value

    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i+2] > umbral_b)
        data[i+2] = umbral_b;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
}

//-- Función de retrollamada al botón grises
gray.onclick = () => {
  var brightness = 0;
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los pixeles
  let data = imgData.data;

  for (var i = 0; i < data.length; i+=4) {
    brightness = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
    data[i] = brightness;
    data[i+1] = brightness;
    data[i+2] = brightness;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}
