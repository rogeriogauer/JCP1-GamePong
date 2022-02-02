//Variáveis da bola.
let xBola = 250;
let yBola = 180;
let diametroBola = 20;
let raioBola = diametroBola / 2;

//Variáveis da velocidade da bola.
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//Variáveis da raquete.
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;
let colidir = false;

//Variáveis da raquete do rival.
let xRaqueteRival = 485;
let yRaqueteRival = 150;
let velocidadeYRival = 0;
let chanceDeErrar = 0;

//Variáveis do placar do jogo.
let meusPontos = 0;
let rivalPontos = 0;

//Variáveis dos sons do jogo.
let ponto;
let raquetada;
let trilha;

function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup(){
  createCanvas(500,360);
  trilha.loop();
}

//Função principal que chama as demais.
function draw(){
  background(0);
  mostrarBola();
  movimentarBola(); 
  verificarColisaoBordas();
  mostrarRaquete(xRaquete, yRaquete); 
  movimentarRaquete();
  //verificarColisaoRaquete();
  verificarColisaoRaqueteBiblioteca(xRaquete, yRaquete);  
  mostrarRaquete(xRaqueteRival, yRaqueteRival);
  movimentarRaqueteRival();
  verificarColisaoRaqueteBiblioteca(xRaqueteRival, yRaqueteRival);
  mostrarPlacar();
  marcarPonto();
}


function mostrarBola(){
  circle(xBola, yBola, diametroBola);
}

function movimentarBola(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function verificarColisaoBordas(){
  if ((xBola + raioBola) > width || (xBola - raioBola) < 0){
     velocidadeXBola *= -1;
  }
  
  if ((yBola + raioBola) > height || (yBola - raioBola) < 0){
     velocidadeYBola *= -1;
  }
}

function mostrarRaquete(x, y){
    rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentarRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentarRaqueteRival(){
  velocidadeYRival = yBola - yRaqueteRival - alturaRaquete / 2 - 30;
  yRaqueteRival += velocidadeYRival + chanceDeErrar;
  calcularChanceDeErrar();
}

function calcularChanceDeErrar(){
  if (rivalPontos >= meusPontos){
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40;
    } 
  }
  else {
    chanceDeErrar -= 1;   
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35;
    }
  }
}

function verificarColisaoRaquete(){
  if ((xBola - raioBola) < (xRaquete + larguraRaquete) && (yBola - raioBola) < (yRaquete + alturaRaquete) && (yBola + raioBola) > yRaquete)
    velocidadeXBola *= -1;
}

function verificarColisaoRaqueteBiblioteca(x, y){
  colidir = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBola, yBola, raioBola);
  if (colidir){
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function mostrarPlacar(){
  textAlign(CENTER);
  textSize(15);
  fill(color(0, 100 , 0));
  rect(205, 7, 40, 20);
  fill(255);
  text(meusPontos, 225, 23);
  fill(color(0, 100, 0));
  rect(255, 7 ,40 ,20);
  fill(255);
  text(rivalPontos, 275, 23);
} 
 
function marcarPonto(){
  if (xBola > 490){
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 10){
    rivalPontos += 1;
    ponto.play();
  }
  
}