const canvas = document.getElementById("ManLand");
const ctx = canvas.getContext("2d");
const acc = 0.5;
const frict = 0.075;
var started = false;
var map = 0;
var lev = 0;

const sBut = new Image();
sBut.src = "./assets/Start Button-1.png.png"
const R1 = new Image();
R1.src = "./assets/Room1.png.png"
const tim = new Image();
tim.src = "./assets/Tim.png";

canvas.addEventListener("click", click);

var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.key] = false; }
window.onkeydown = function(e) { pressedKeys[e.key] = true; }

function start() {
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0,0, 512,512);
	sBut.onload = function(){ctx.drawImage(sBut, 120,152, 256,128)}
	for (i=0;i<10;i++) {
		if  (i == lev){
			ctx.fillStyle = "#50ABE6";
		} else {
			ctx.fillStyle = "#106B86";
		}
		if (i<5){
			ctx.fillRect(56+i*(64+16),320, 64,64);
		} else {
			ctx.fillRect(56+i*(64+16)-400,400, 64,64);
		}
		ctx.fillStyle = "#000000";
		ctx.font = "64px sans";
		if (i<5){
			ctx.fillText(i, 56+i*(64+16)+12, 376);
		} else {
			ctx.fillText(i, 56+i*(64+16)+12-400, 456);
		}
	}
}

start();

class being {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	xs = 0;
	ys = 0;
}

var player = new being(224,384);

class order {
	constructor(message) {
		this.mess = message;
	}
	
	display() {
		ctx.drawImage(tim, 0,0);
		ctx.fillStyle = "#000000";
		ctx.font = "20px sans serif";
		ctx.fillText(mess, 64,148, 256);
	}
}

function click(event) {
	let x = event.clientX;
	let y = event.clientY;
	if (!started){
		if (x >= 128 && x <= 384 && y >= 160 && y <= 288){
			started = true;
			map = 0;
			inter = setInterval(tick, 16);
		}
	}
}

function collide(){
	if (player.x > 432){player.x = 432; player.xs = 0;}
	else if (player.x < 16){player.x = 16; player.xs = 0;}
	if (player.y > 432){player.y = 432; player.ys = 0;}
	else if (player.y <16){player.y = 16; player.ys = 0;}
	if (map == 1){
		if (player.x > 400 && player.y < 80){
			if (48-(512-(player.x+64)) <= 80-player.y){
				player.x = 400;
				player.xs = 0;
			} else {
				player.y = 80;
				player.ys = 0;
			}
		}
		if (player.x > 144 && player.x < 304 && player.y+64 > 448){
			if (player.x-208 <= 304-player.x){
				if (player.y-384 <= player.x-144){
					player.y = 384;
					player.ys = 0;
				} else{
					player.x = 144;
					player.xs = 0;
				}
			} else if (304-player.x <= player.y-384) {
				player.x = 304;
				player.xs = 0;
			} else {
				player.y = 384;
				player.ys = 0;
			}
		}
		if (player.x < 64 && player.y+64 > 144 && player.y < 352){
			if (64-player.x <= player.y-80){
				if (64-player.x <= 352-player.y){
					player.x = 64;
					player.xs = 0;
				} else{
					player.y = 352;
					player.ys = 0;
				}
			} else if (352-player.y <= player.y-80) {
				player.y = 352;
				player.ys = 0;
			} else {
				player.y = 80;
				player.ys = 0;
			}
		}
	}
}

tutorial = new order("Testing tutorial message");

function tick() {
	switch (map){
		case 0:
			switch (lev){
				case 0:
					tutorial.display();
					break;
			}
			break;
		case 1:
			ctx.drawImage(R1, 0,0);
			break;
	}
	if (map != 0){
		ctx.fillStyle = "#000000";
		ctx.fillRect(player.x,player.y, 64,64);
	
		if (pressedKeys['a'] || pressedKeys['ArrowLeft']){
			player.xs -= acc;
		}
		if (pressedKeys['d'] || pressedKeys['ArrowRight']){
			player.xs += acc;
		}
		if (pressedKeys['w'] || pressedKeys['ArrowUp']){
			player.ys -= acc;
		}
		if (pressedKeys['s'] || pressedKeys['ArrowDown']){
			player.ys += acc;
		}
	
		player.xs -= player.xs * frict;
		player.ys -= player.ys * frict;
		player.x += player.xs;
		player.y += player.ys;
		collide(player.x, player.y);
	}
}
