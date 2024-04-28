//variáveis da Bolinha 
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da Bolinha 
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da Raquete 
let xRaquete = 5;
let yRaquete = 150;

let colidiu = false;

//variáveis do oponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
erro=0

//placar do jogo 
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo 
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();

}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  calculaErro();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width ||
    xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
    yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  stroke(225, 140, 0);
  rect(x, y, raqueteComprimento,
    raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu =
    collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function calculaErro() {
  if (pontosDoOponente >= meusPontos) {
   erro += 1;
    if (erro >= 39) {
      erro = 40;
    }
  } else {
    erro -= 1;
    if (erro <= 35) {
      erro = 35;
    }
  }
}

function movimentaRaqueteOponente() {
  if (xBolinha > 300) {
    velocidadeYOponente = yBolinha- yRaqueteOponente - raqueteComprimento / 2 - 30
    probabilidade = Math.random() * (150 - 10) + 10;
    yRaqueteOponente += velocidadeYOponente + erro

  }

}


function incluiPlacar() {
  stroke(255);
  textAlign(CENTER)
  textSize(16);
  fill(95, 158, 160);
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(95, 158, 160);
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}



