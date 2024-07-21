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
	sBut.onload = function(){ctx.drawImage(sBut, 128,144, 256,128)}
	for (i=0;i<8;i++) {
		if  (i == lev){
			ctx.fillStyle = "#50ABE6";
		} else {
			ctx.fillStyle = "#106B86";
		}
		if (i<4){
			ctx.fillRect(104+i*(64+16),320, 64,64);
		} else {
			ctx.fillRect(104+i*(64+16)-320,400, 64,64);
		}
		ctx.fillStyle = "#000000";
		ctx.font = "64px sans";
		if (i<4){
			ctx.fillText(i, 104+i*(64+16)+12, 376);
		} else {
			ctx.fillText(i, 104+i*(64+16)+12-320, 456);
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

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

class order {
	constructor(message, size) {
		this.mess = message;
		this.size = size;
	}
	
	display() {
		ctx.drawImage(tim, 0,0);
		ctx.fillStyle = "#000000";
		ctx.font = `${this.size}px sans serif`;
		let lines = getLines(ctx, this.mess, 216);
		for (i=0;i<lines.length;i++){
			ctx.fillText(lines[i], 40,112+(this.size*(i+1)));
		}
		ctx.fillStyle = "FF0000";
		ctx.font = "32px sans serif";
		ctx.fillText("x", 480,64);
		ctx.strokeRect(478,45, 20,20);
	}
}

class item {
	constructor(x,y, name, picture, display) {
		this.x = x;
		this.y = y;
		this.name = name;
		this.pic = picture;
		this.disp = display;
	}
}

function click(event) {
	let x = event.clientX - 8;
	let y = event.clientY - 8;
	console.log(x+", "+y)
	if (!started){
		if (x >= 128 && x <= 384 && y >= 144 && y <= 272){
			started = true;
			map = 0;
			inter = setInterval(tick, 16);
		}
	} else if (map == 0){
		if (x >= 478 && x <= 498 && y >= 45 && y <= 65){
			map = 1;
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

tutorial = new order("Hello! Welcome to the lab! To get you acquainted with the new working environment, I have a simple task for you: brew a potion that makes the person who drinks it jump higher. To interact with things, press E near them.", 22);
var tutDone = false;

function tick() {
	switch (map){
		case 0:
			switch (lev){
				case 0:
					if (!tutDone){
						tutorial.display();
					} else {
						alert("Tutorial closing message or something");
					}
					break;
			}
			break;
		case 1:
			ctx.drawImage(R1, 0,0);
			break;
	}
	if (map == 1 || map == 2 || map == 3){
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
		if (pressedKeys['e']){
			if (player.x + 32 >= 192 && player.x + 32 <= 320 && player.y + 32 >= 400){
				map = 0;
			}
			if (player.x + 32 >= 400 && player.y + 32 <= 128){
				map = -1;
			}
		}
	
		player.xs -= player.xs * frict;
		player.ys -= player.ys * frict;
		player.x += player.xs;
		player.y += player.ys;
		collide(player.x, player.y);
	}
}
