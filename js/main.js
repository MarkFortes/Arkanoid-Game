var FPS = 60;
var canvas;
var ctx;
var dx = 4;
var dy = 4;
var bola = {x:300, y:200, radio:10};
var paletaArriba = {x:260, y:50, anchura:80, altura:10}
var paletaAbajo = {x:260, y:350, anchura:80, altura:10};
var partida = {muerto:false};
var teclaIzqPulsada = false;
var teclaDerPulsada = false;
var teclaAPulsada = false;
var teclaDPulsada = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
  if(e.keyCode == 37){
    teclaIzqPulsada = true;
  }else if (e.keyCode == 39) {
    teclaDerPulsada = true;
  }
  if(e.keyCode == 65){ //tecla A
    teclaAPulsada = true;
  }else if (e.keyCode == 68) { //tecla B
    teclaDPulsada = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode == 37){
    teclaIzqPulsada = false;
  }else if (e.keyCode == 39) {
    teclaDerPulsada = false;
  }
  if(e.keyCode == 65){ //tecla A
    teclaAPulsada = false;
  }else if (e.keyCode == 68) { //tecla B
    teclaDPulsada = false;
  }
}

setInterval(loop, 1000/FPS);

function loop(){
  if (partida.muerto == false) {
    dibujar();
    logicaPaletaAbajo();
    logicaPaletaArriba();
  }else if (partida.muerto == true) {
    alert("Fin de la partida");
    reiniciar();
  }
}

function init(){
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}

function dibujar(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarBola();
  dibujarPaletas();

  //Rebote arriba y abajo
  if (bola.y - bola.radio < 0) { //rebote en techo
    partida.muerto = true;;
  }else if (bola.y + bola.radio > canvas.height) { //si la bolla llega al suelo == pierde
    partida.muerto = true;
  }
  //Rebote izquierda y derecha
  if (bola.x + bola.radio > canvas.width || bola.x - bola.radio < 0) {
    dx = -dx;
  }
  //Rebote en la paleta de abajo
  if (bola.y + bola.radio >= paletaAbajo.y && (bola.x >= paletaAbajo.x && bola.x <= (paletaAbajo.x + paletaAbajo.anchura))) {
    dy = -dy;
  }
  //Rebote en la paleta de arriba
  if (bola.y - bola.radio <= paletaArriba.y && (bola.x >= paletaArriba.x && bola.x <= (paletaArriba.x + paletaArriba.anchura))) {
    dy = -dy;
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

function dibujarPaletas(){
  ctx.beginPath();
  ctx.rect(paletaArriba.x, paletaArriba.y, paletaArriba.anchura, paletaArriba.altura);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(paletaAbajo.x, paletaAbajo.y, paletaAbajo.anchura, paletaAbajo.altura);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function logicaPaletaAbajo(){
  if (teclaIzqPulsada == true) {
    paletaAbajo.x -= 5;
  }else if (teclaDerPulsada == true) {
    paletaAbajo.x += 5;
  }
}

function logicaPaletaArriba(){
  if (teclaAPulsada == true) {
    paletaArriba.x -= 5;
  }else if (teclaDPulsada == true) {
    paletaArriba.x += 5;
  }
}

function reiniciar(){
  partida.muerto = false;
  bola.x = 300;
  bola.y = 200;
  paletaAbajo.x = 260;
  paletaAbajo.y = 350;
  paletaArriba.x = 260;
  paletaArriba.y = 50;
  teclaIzqPulsada = false;
  teclaDerPulsada = false;
  teclaAPulsada = false;
  teclaDPulsada = false;
}
