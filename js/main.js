var FPS = 60;
var canvas;
var ctx;
var dx = 4;
var dy = 4;
var bola = {x:300, y:350, radio:10};
var paleta = {x:260, y:350, anchura:80, altura:10};

setInterval(loop, 1000/FPS);

function loop(){
  console.log("hola");
  dibujar();
}

function init(){
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

function dibujar(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarBola();
  dibujarPaleta();

  //Rebote arriba y abajo
  if (bola.y + bola.radio > canvas.height || bola.y - bola.radio < 0) {
    dy = -dy;
  }
  if (bola.x + bola.radio > canvas.width || bola.x - bola.radio < 0) {
    dx = -dx;
  }

  bola.x += dx;
  bola.y += dy;
}

function dibujarBola(){
  ctx.beginPath();
  ctx.arc(bola.x, bola.y, bola.radio, 0, Math.PI*2, false);
  ctx.fillStyle = "0095DD";
  ctx.fill();
  ctx.closePath();
}

function dibujarPaleta(){
  ctx.beginPath();
  ctx.rect(paleta.x, paleta.y, paleta.anchura, paleta.altura);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}
