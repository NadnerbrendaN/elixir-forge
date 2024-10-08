const canvas = document.getElementById("ManLand");
const ctx = canvas.getContext("2d");
const acc = 0.75;
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
const cauld = new Image();
cauld.src = "./assets/Cauldron-1.png.png";
const legs = new Image();
legs.src = "./assets/frogLegs-1.png.png";
const potion = new Image();
potion.src = "./assets/Potion-1.png.png";
const greenCap = new Image();
greenCap.src = "./assets/Green Cap-1.png.png";
const eastRoom = new Image();
eastRoom.src = "./assets/East Room-1.png.png";
const sword = new Image();
sword.src = "./assets/Sword-1.png.png";
const dSword = new Image();
dSword.src = "./assets/Dipped Sword-1.png.png"
const bowl = new Image();
bowl.src = "./assets/Bowl-1.png.png";
const fBowl = new Image();
fBowl.src = "./assets/Full Bowl-1.png.png";
const northRoom = new Image();
northRoom.src = "./assets/Library-1.png.png";
const scroll = new Image();
scroll.src = "./assets/Scroll-1.png.png";
const fireRoot = new Image();
fireRoot.src = "./assets/Firerooot-1.png.png";
const hammer = new Image();
hammer.src = "./assets/Hammer-1.png.png";
const playPic = new Image();
playPic.src = "./assets/Player-1.png.png";
const dHammer = new Image();
dHammer.src = "./assets/Hammer Dipped-1.png.png";

canvas.addEventListener("click", click);

var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.key] = false; }
window.onkeydown = function(e) { pressedKeys[e.key] = true; }

function start() {
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0,0, 512,512);
	ctx.font = "32px sans serif";
	ctx.fillStyle = "#000000";
	ctx.fillText("Level Select", 168,312);
	sBut.onload = function(){
		ctx.drawImage(sBut, 128,144, 256,128)
	}
	sBut.onload();
	for (i=0;i<8;i++) {
		if  (i == lev){
			ctx.fillStyle = "#50ABE6";
		} else if (i < 4) {
			ctx.fillStyle = "#106B86";
		} else {
			ctx.fillStyle = "#CC1313";
		}
		if (i<4){
			ctx.fillRect(104+i*(64+16),320, 64,64);
		} else {
			ctx.fillRect(104+i*(64+16)-320,400, 64,64);
		}
		ctx.fillStyle = "#000000";
		ctx.font = "64px sans serif";
		if (i<4){
			ctx.fillText(i, 106+i*(64+16)+12, 376);
		} else {
			ctx.fillText(i, 106+i*(64+16)+12-320, 456);
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
	inventory = [];
}

var player = new being(224,224);

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
	}
}

class item {
	constructor(name, properties, picture) {
		this.name = name;
		try {
			this.pic = picture;
		} catch {
			this.pic = false;
		}
		try {
			this.prop = properties;
		} catch {
			this.prop = "";
		}
	}
}

var items1 = [];
items1[0] = new item("frogLegs", "hoppy", legs);
var items2 = [];

var props = "";
function click(event) {
	let x = event.clientX - 8;
	let y = event.clientY - 8;
	console.log(x+", "+y);
	if (!started){
		if (x >= 128 && x <= 384 && y >= 144 && y <= 272){
			started = true;
			map = 0;
			inter = setInterval(tick, 16);
		} if (x >= 104 && y >= 320 && x <= 404 && y <= 464){
			if (x >= 104 && y >= 320 && x <= 168 && y <= 384){
				lev = 0;
			} else if (x >= 184 && y >= 320 && x <= 248 && y <= 384){
				lev = 1;
			} else if (x >= 264 && y >= 320 && x <= 328 && y <= 384){
				lev = 2;
			} else if (x >= 344 && y >= 320 && x <= 408 && y <= 384){
				lev = 3;
			}
			start();
		}
	} else if (map == -1){
		if (x >= 48 && x <= 168 && y >= 48 && y <= 168){
			if (items1[0]){
				player.inventory.push(items1[0]);
				items1.splice(0, 1);
			}
		} else if (x >= 196 && x <= 316 && y >= 48 && y <= 168){
			if (items1[1]){
				player.inventory.push(items1[1]);
				items1.splice(1, 1);
			}
		} else if (x >= 344 && x <= 464 && y >= 48 && y <= 168){
			if (items1[2]){
				player.inventory.push(items1[2]);
				items1.splice(2, 1);
			}
		}
	} else if (map == -2){
		if (x <= 128 && y >= 16 && y <= 144 && player.inventory[0]){
			if (player.inventory[0].prop){
				let cauldItem = player.inventory[0];
				player.inventory[0] = new item(`potion-${cauldItem.prop}`, false, potion);
			}
		} else if (x >= 128 && x <= 256 && y >= 16 && y <= 144 && player.inventory[1]){
			if (player.inventory[1].prop){
				let cauldItem = player.inventory[1];
				player.inventory[1] = new item(`potion-${cauldItem.prop}`, false, potion);
			}
		} else if (x >= 256 && x <= 384 && y >= 16 && y <= 144 && player.inventory[2]){
			if (player.inventory[2].prop){
				let cauldItem = player.inventory[2];
				player.inventory[2] = new item(`potion-${cauldItem.prop}`, false, potion);
			}
		} else if (x >= 384 && x <= 512 && y >= 16 && y <= 144 && player.inventory[3]){
			if (player.inventory[3].prop){
				let cauldItem = player.inventory[3];
				player.inventory[3] = new item(`potion-${cauldItem.prop}`, false, potion);
			}
		} else if (x >= 0 && x <= 128 && y >= 144 && y <= 272 && player.inventory[4]){
			if (player.inventory[4].prop){
				let cauldItem = player.inventory[4];
				player.inventory[4] = new item(`potion-${cauldItem.prop}`, false, potion);
			}
		} else if (x >= 128 && x <= 256 && y >= 144 && y <= 272 && player.inventory[4]){
			if (player.inventory[5].prop){
				let cauldItem = player.inventory[5];
				player.inventory[5] = new item(`potion-${cauldItem.prop}`, false, potion);
			}
		}
	} else if (map == -3){
		if (x >= 48 && x <= 168 && y >= 48 && y <= 168){
			if (items2[0]){
				player.inventory.push(items2[0]);
				items2.splice(0, 1);
			}
		} else if (x >= 196 && x <= 316 && y >= 48 && y <= 168){
			if (items2[1]){
				player.inventory.push(items2[1]);
				items2.splice(1,1);
			}
			if (items2[2]){
				player.inventory.push(items2[2]);
				items2.splice(2, 1);
			}
		}
	} else if (map == -4){
		if (x <= 128 && y <= 128){
			if (player.inventory[0].name.includes("potion") && !player.inventory[0].name.includes("sword") && !player.inventory[0].name.includes("hammer")){
				props += "-"+player.inventory[0].name;
				bowlFull = true;
				player.inventory.splice(0,1);
			} else if (player.inventory[0].name.includes("sword") && bowlFull){
				player.inventory[0].name += props;
				player.inventory[0].pic = dSword;
				props = "";
				bowlFull = false;
			} else if (player.inventory[0].name.includes("hammer") && bowlFull){
				player.inventory[0].name += props;
				player.inventory[0].pic = dHammer;
				props = "";
				bowlFull = false;
			}
		} else if (x <= 256 && x > 128 && y <= 128){
			if (player.inventory[1].name.includes("potion") && !player.inventory[1].name.includes("sword") && !player.inventory[1].name.includes("hammer")){
				props += "-"+player.inventory[1].name;
				bowlFull = true;
				player.inventory.splice(1,1);
			} else if (player.inventory[1].name.includes("sword") && bowlFull){
				player.inventory[1].name += props;
				player.inventory[1].pic = dSword;
				props = "";
				bowlFull = false;
			} else if (player.inventory[1].name.includes("hammer") && bowlFull){
				player.inventory[1].name += props;
				player.inventory[1].pic = dHammer;
				props = "";
				bowlFull = false;
			}
		} else if (x > 256 && x <= 384 && y <= 128){
			if (player.inventory[2].name.includes("potion") && !player.inventory[2].name.includes("sword") && !player.inventory[2].name.includes("hammer")){
				props += "-"+player.inventory[2].name;
				bowlFull = true;
				player.inventory.splice(2,1);
			} else if (player.inventory[2].name.includes("sword") && bowlFull){
				player.inventory[2].name += props;
				player.inventory[2].pic = dSword;
				props = "";
				bowlFull = false;
			} else if (player.inventory[2].name.includes("hammer") && bowlFull){
				player.inventory[2].name += props;
				player.inventory[2].pic = dHammer;
				props = "";
				bowlFull = false;
			}
		}
	} else if (map == -5){
		if (x >= 460 && y >= 460 && curs < 2){
			curs++;
		}
	}
}

function collide(){
	mapChange = false;
	if (map == 1){
		if (player.x > 432 && (player.y < 208 || player.y > 240)){player.x = 432; player.xs = 0;}
		else if (player.x > 464 && player.y >= 208 && player.y <= 240){map = 2; mapChange = true; player.x = 0;}
		else if (player.x < 16){player.x = 16; player.xs = 0;}
		if (player.y > 432){player.y = 432; player.ys = 0;}
		else if (player.y < 16 && (player.x < 208 || player.x > 240)){player.y = 16; player.ys = 0;}
		else if (player.y < 0 && player.x > 208 && player.x < 240){map = 3; mapChange = true; player.y = 496}
		if (!mapChange){
			if (player.x > 304 && player.y < 208){
				if (player.x-304 <= 208-player.y){
					player.x = 304;
					player.xs = 0;
				} else {
					player.y = 208;
					player.ys = 0;
				}
			}
			else if (player.x > 80 && player.x < 336 && player.y > 368){
				if (player.x-80 <= 336-player.x){
					if (player.y-368 <= player.x-80){
						player.y = 368;
						player.ys = 0;
					} else{
						player.x = 80;
						player.xs = 0;
					}
				} else if (336-player.x <= player.y-368) {
					player.x = 336;
					player.xs = 0;
				} else {
					player.y = 368;
					player.ys = 0;
				}
			}
			else if (player.x < 80 && player.y > 80 && player.y < 368){
				if (80-player.x <= player.y-80){
					if (80-player.x <= 368-player.y){
						player.x = 80;
						player.xs = 0;
					} else{
						player.y = 368;
						player.ys = 0;
					}
				} else if (368-player.y <= player.y-80) {
					player.y = 368;
					player.ys = 0;
				} else {
					player.y = 80;
					player.ys = 0;
				}
			}
		}
	} else if (map == 2){
		if (player.x > 432){player.x = 432; player.xs = 0;}
		else if (player.x < 16 && player.y > 264){player.x = 16; player.xs = 0;}
		else if (player.x < 0 && player.y < 264){map = 1; player.x = 464;}
		if (player.y < 228){player.y = 228; player.ys = 0;}
		else if (player.y > 432){player.y = 432; player.ys = 0;}
		if (player.x >= 92 && player.x <= 360 && player.y >= 304){
			if (player.x - 92 <= 360 - player.x){
				if (player.x - 92 <= player.y - 304){
					player.x = 92;
					player.xs = 0;
				} else {
					player.y = 304;
					player.ys = 0;
				}
			} else {
				if (360 - player.x <= player.y - 304){
					player.x = 360;
					player.xs = 0;
				} else {
					player.y = 304;
					player.ys = 0;
				}
			}
		}
	} else if (map == 3){
		if (player.x > 348){player.x = 348; player.xs = 0;}
		else if (player.x < 84){player.x = 84; player.xs = 0;}
		if (player.y < 106){player.y = 106; player.ys = 0;}
		else if (player.y > 432 && (player.x <= 208 || player.x >= 256)){player.y = 432; player.ys = 0;}
		else if (player.y > 496 && player.x > 208 && player.x < 256){map = 1; mapChange = true; player.y = 8}
		if (!mapChange){
			if (player.x >= 128 && player.x <= 304 && player.y >= 168 && player.y <= 368){
				if (player.x-128 <= 304-player.x){
					if (player.y-168 <= 368-player.y){
						if (player.x-128 <= player.y-168){
							player.x = 128;
							player.xs = 0;
						} else {
							player.y = 168;
							player.ys = 0;
						}
					} else {
						if (player.x-128 <= 368-player.y){
							player.x = 128;
							player.xs = 0;
						} else {
							player.y = 368;
							player.ys = 0;
						}
					}
				} else {
					if (player.y-168 <= 368-player.y){
						if (304-player.x <= player.y-168){
							player.x = 304;
							player.xs = 0;
						} else {
							player.y = 168;
							player.ys = 0;
						}
					} else {
						if (304-player.x <= 368-player.y){
							player.x = 304;
							player.xs = 0;
						} else {
							player.y = 368;
							player.ys = 0;
						}
					}
				}
			}
		}
	}

}

const tutorial = new order("Hello! Welcome to the lab! To get you acquainted with the new working environment, I have a simple task for you: brew and bring me a potion that makes the person who drinks it jump higher. To interact with things, press E near them, and press escape to close menus.", 20);
var tutDone = false;
const tutorialEnd = new order("You've made your first potion! Close this call and I'll give you another task.", 25);
const order1 = new order("Next, please give me a sword that poisons anyone who touches the blade. For this, you will have to use the eastern room. If you need help, feel free to consult the library in the northern room.", 24);
var done1 = 0;
const order1End1 = new order("Great job on figuring out the dipping station! I just got another order that I think will be good for you.", 25);
const order1End2 = new order("Great job on figuring out the dipping station! I think that mixture had some frog leg in it, but otherwise it was perfect! I just got another order that I think will be good for you.", 25);
const order2 = new order("This customer requested a hammer that burns anything it hits and then bounces off of it. This one takes more creativity.", 25);
var done2 = 0;
const order2End1 = new order("Perfect! Ready for another?", 25);
const order2End2 = new order("Almost perfect! It had some poisonous effects, but still great job! Ready for another?", 25);
const order3 = new order("They want your most powerful weapon. They didnt specify anything else, so go out and do your best!", 25);
var done3 = 0;
const order3End = new order("They accepted your weapon! Good job dealing with that obscure request! That's all I have for you today. See you later!", 25);

var bowlFull = false;
var curs = 0;
var scrolls = [];
scrolls[0] = "If ye wish to jump to the sky, use legs of a creature that jumps quite high.";
scrolls[1] = "To fight the enemies you hate so, use the shrooms with a green glow.";
scrolls[2] = "To dip an object in an elixir is to imbue it with effects of that mixture.";
//var oldT = 0;
function tick() {
	//var seconds = new Date() / 1000;
	//console.log(seconds-oldT);
	//oldT = seconds;
	switch (map){
		case -5:
			ctx.drawImage(scroll, 0,0);
			ctx.font = "64px sans serif";
			ctx.fillStyle = "#000000";
			lines = getLines(ctx, scrolls[curs], 480);
			for (i=0;i<lines.length;i++){
				ctx.fillText(lines[i], 16, 80+i*80);
			}
			if (pressedKeys['Escape']){
				map = 3
			}
			break;
		case -4:
			if (!bowlFull){
				ctx.drawImage(bowl, 0,0);
			} else {
				ctx.drawImage(fBowl, 0,0);
			}
			count = 0;
			for (i=0;i<player.inventory.length;i++){
				ctx.drawImage(player.inventory[i].pic, 0+count*128,0, 128,128)
				count++;
			}
			if (pressedKeys['Escape']){
				map = 2;
			}
			break;
		case -3:
			ctx.fillStyle = "#292012";
			ctx.fillRect(0,0, 512,512);
			ctx.fillStyle = "#393022";
			ctx.fillRect(16,16, 480,480);
			ctx.fillStyle = "#292012";
			ctx.fillRect(16,168, 480,16);
			ctx.fillRect(16,336, 480,16);
			for (i=0;i<items2.length;i++){
				if (i <= 3){
					ctx.drawImage(items2[i].pic, 48+i*(120+28),48, 120,120);
				}
			}
			if (pressedKeys['Escape']){
				map = 2;
			}
			break;
		case -2:
			ctx.fillStyle = "#727272"
			ctx.fillRect(0,0, 256,512);
			ctx.drawImage(cauld, 256,0);
			for (i=0;i<player.inventory.length;i++){
				if (i <= 3){
					ctx.drawImage(player.inventory[i].pic, i*128,16, 128,128);
				} else if (i <= 5){
					ctx.drawImage(player.inventory[i].pic, (i-4)*128,144, 128,128);
				}
			}
			if (pressedKeys['Escape']){
				map = 1;
			}
			break;
		case -1:
			ctx.fillStyle = "#292012";
			ctx.fillRect(0,0, 512,512);
			ctx.fillStyle = "#393022";
			ctx.fillRect(16,16, 480,480);
			ctx.fillStyle = "#292012";
			ctx.fillRect(16,168, 480,16);
			ctx.fillRect(16,336, 480,16);
			for (i=0;i<items1.length;i++){
				if (i <= 3){
					ctx.drawImage(items1[i].pic, 48+i*(120+28),48, 120,120);
				}
			}
			if (pressedKeys['Escape']){
				map = 1;
			}
			break;
		case 0:
			switch (lev){
				case 0:
					for (i=0;i<player.inventory.length;i++){
						if (player.inventory[i].name == "potion-hoppy"){
							tutDone = true;
						}
						if (tutDone){
							player.inventory.splice(i, 1);
						}
					}
					if (!tutDone){
						tutorial.display();
						if (pressedKeys['Escape']){
							map = 1;
						}
					} else {
						tutorialEnd.display();
						if (pressedKeys['Escape']){
							lev = 1;
							pressedKeys['Escape'] = false;
						}
					}
					break;
				case 1:
					for (i=0;i<player.inventory.length;i++){
						if (player.inventory[i].name == "sword-potion-poison"){
							done1 = 1;
						}
						if (player.inventory[i].name == "sword-potion-poison-potion-hoppy" || player.inventory[i].name == "sword-potion-hoppy-potion-poison"){
							done1 = 2;
						}
						if (done1){
							player.inventory.splice(i, 1);
						}
					}
					if (!done1){
						order1.display();
						if (pressedKeys['Escape']){
							map = 1;
						}
					} else if (done1 == 1){
						order1End1.display();
						if (pressedKeys['Escape']){
							lev = 2;
							pressedKeys['Escape'] = false;
						}
					} else if (done1 == 2){
						order1End2.display();
						if (pressedKeys['Escape']){
							lev = 2;
							pressedKeys['Escape'] = false;
						}
					}
					items1[0] = new item("frogLegs", "hoppy", legs);
					items1[1] = new item("greenCap", "poison", greenCap);
					items2[0] = new item("sword", "", sword);
					break;
				case 2:
					for (i=0;i<player.inventory.length;i++){
						if (player.inventory[i].name.includes("hammer") && player.inventory[i].name.includes("hoppy") && player.inventory[i].name.includes("burny")){
							done2 = 1;
						}
						if (player.inventory[i].name.includes("poison")){
							done2 = 2;
						}
						if (done2){
							player.inventory.splice(i,1);
						}
					}
					if (!done2){
						order2.display();
						if (pressedKeys['Escape']){
							map = 1;
						}
					} else if (done2 == 1){
						order2End1.display();
						if (pressedKeys['Escape']){
							lev = 3;
							pressedKeys['Escape'] = false;
						}
					} else if (done2 == 2){
						order2End2.display();
						if (pressedKeys['Escape']){
							lev = 3;
							pressedKeys['Escape'] = false;
						}
					}
					items1[0] = new item("frogLegs", "hoppy", legs);
					items1[1] = new item("greenCap", "poison", greenCap);
					items1[2] = new item("fireRoot", "burny", fireRoot);
					items2[0] = new item("sword", "", sword);
					items2[1] = new item("hammer", "", hammer);
					break;
				case 3:
					count = 0;
					if (!done3){
						loop1:
						for (i=0;i<player.inventory.length;i++){
							for (k=0;k<player.inventory[i].name.length;k++){
								if (player.inventory[i].name[k] == "-"){
									count++;
								}
							}
							if (count > 4){
								done3++;
								break loop1;
							}
						}
						order3.display();
						if (pressedKeys['Escape']){
							map = 1;
						}
					} else if (done3 == 1){
						order3End.display();
						for (i=0;i<player.inventory.length;i++){
							player.inventory.splice(i,1);
						}
						if (pressedKeys['Escape']){
							console.log("Poking around in the console, eh? If you're interested in programming and this game, you could help me develop it at https://www.github.com/nadnerbrendan/elixir-forge");
							started = false;
							tutDone = false;
							done1 = false;
							done2 = false;
							done3 = false;
							clearInterval(inter);
							start();
						}
					}
					items1[0] = new item("frogLegs", "hoppy", legs);
					items1[1] = new item("greenCap", "poison", greenCap);
					items1[2] = new item("fireRoot", "burny", fireRoot);
					items2[0] = new item("sword", "", sword);
					items2[1] = new item("hammer", "", hammer);
					break;
			}
			break;
		case 1:
			ctx.drawImage(R1, 0,0);
			break;
		case 2:
			ctx.drawImage(eastRoom, 0,0);
			break;
		case 3:
			ctx.drawImage(northRoom, 0,0);
			break;
	}
	if (map == 1 || map == 2 || map == 3){
		ctx.drawImage(playPic, player.x,player.y, 64,64);
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
			if (map == 1){
				if (player.x >= 80 && player.x <= 336 && player.y >= 368){
					map = 0;
				}
				if (player.x >= 272 && player.y + 32 <= 240){
					map = -1;
				}
				if (player.x <= 120 && player.y >= 80 && player.y <= 384){
					map = -2;
				}
			}
			if (map == 2){
				if (player.y <= 256){
					map = -3;
				}
				if (player.y >= 296 && player.x >= 80 && player.x <= 376){
					map = -4;
				}
			}
			if (map == 3){
				map = -5
			}
		}
	
		player.xs -= player.xs * frict;
		player.ys -= player.ys * frict;
		player.x += player.xs;
		player.y += player.ys;
		collide(player.x, player.y);
	}
}
