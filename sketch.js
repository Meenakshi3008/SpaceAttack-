var PLAY = 0;
var END = 1;

var ufo, ufoImg;
var bullet, bulletImg;

var virus, virusImg, virusGroup;
var deadVirus, deadVirusImg, deadVirusGroup;

var kills = 0;
//var gameover,gun;
var gameState = PLAY;
var skull1, skull2;
var skull1I, skull2I;

var bg, bgI;
function preload() {

	ufoImg = loadImage("Spaceship.png");
	bulletImg = loadImage("bullet.png");

	virusImg = loadImage("good.png");
	deadVirusImg = loadImage("bad.png");
	skull1I=loadImage("Skull1.png");
	skull2I=loadImage("Skull2.png");

	//gameover = loadSound("Game over.wav")
	//gun=loadSound("gun.wav");

	bg = loadImage("bg.jpg");
}

function setup() {
	createCanvas(1350, 700);

	ufo = createSprite(150, height/2, 256, 256);
	ufo.addImage(ufoImg);
	ufo.scale = 0.4;
	

	skull1 = createSprite(1250, 60,10,10);
	skull1.addImage(skull1I);
	skull1.scale = 0.02;

	skull2 = createSprite(1050, 60,10,10);
	skull2.addImage(skull2I);
	skull2.scale = 0.02;

	kills = 0;

	bulletGroup = createGroup();
	virusGroup = createGroup();
	deadVirusGroup = createGroup();
}


function draw() {
	rectMode(CENTER);
	background(bg);

	textFont("Times New Roman");
	textSize(20);
	textAlign(CENTER);
	fill("white");
	text("Press space to release bullets ", width - 1200, 60);
	text("Kill only the green aliens", width - 900, 60);
	text("Do not touch any of the aliens ", width - 600, 60);

	
	



	textFont("Times New Roman");
	textSize(20);
	textAlign(CENTER);
	fill("white");
	text("Dead aliens: " + kills, width - 200, 60);
  
	bullet = createSprite(ufo.x, ufo.y - 50, 50, 50);
	bullet.addImage(bulletImg);
	bullet.scale = 0.01;
	bullet.lifetime = width;
	bullet.visible = false;
	bulletGroup.add(bullet);
	
	virus = createSprite(width + 50, random(20, height - 20), 95, 95);
	virus.addImage(virusImg);
	virus.scale = 0.17;
	virus.velocityX = -(5 + 3 * kills/2);
	virus.lifetime = -50;
	virusGroup.add(virus);
	
	
	deadVirus = createSprite(width + 50, random(20, height - 20), 95, 95);
	deadVirus.addImage(deadVirusImg);
	deadVirus.scale = 0.046 ;
	deadVirus.velocityX = -(5 + 3 * kills/2);
	deadVirus.lifetime = -50;
	deadVirusGroup.add(deadVirus);
	
	if(frameCount % 80 !== 0) {
	  virus.destroy();
	}
  
	if(frameCount % 100 !== 0) {
	  deadVirus.destroy();
	}
  
	if(keyDown(38) || keyDown(87)) {
	  ufo.y = ufo.y - (10 + 5 * kills/10);
	  bullet.y = bullet.y - 10;
  
	  bulletGroup.destroyEach();
	}
  
	if(keyDown(40) || keyDown(83)) {
	  ufo.y = ufo.y + (10 + 5 * kills/10);
	  bullet.y = bullet.y + 10;
	  
	  bulletGroup.destroyEach();
	}

	if(keyDown("RIGHT_ARROW")){
		ufo.x = ufo.x + 5;
	}

	if(keyDown("LEFT_ARROW")){
		ufo.x = ufo.x - 5;
	}
  
	if(keyDown(32)) {
	  bullet.visible = true;
	  bullet.velocityX = 30;
	  //gun.play();
	}
  
	if(bulletGroup.collide(virusGroup)) {
	  virusGroup.destroyEach();
	  bulletGroup.destroyEach();
	  
	  kills = kills + 1;
	}


	if(ufo.collide(virusGroup)) {
	  gameState = END;
	}
  
	if(ufo.collide(deadVirusGroup)) {
		gameState = END;
	}
  
	if(bulletGroup.collide(deadVirusGroup)) {
		gameState = END;
	}

	
	if(gameState === END) {
		virusGroup.destroyEach();
		deadVirusGroup.destroyEach();
		bulletGroup.destroyEach();
		ufo.destroy();

		//gameover.play();
		
		textFont("Arial");
		textSize(60);
		textAlign(CENTER);
		fill("Red");
		text("T.T Finished T.T", width/2, height/2);
	
		kills = 0;
	}
  
	drawSprites();
}