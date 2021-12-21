const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
let WIDTH = 600;
let HEIGHT = 600;
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
const TILE_SIZE = 32;
class Character {
	constructor(
		imgSRC,
		spriteWidth,
		spriteHeight,
		positionX,
		positionY,
		vector,
		state,
		staggerFrames,
		spriteAnimations,
		animationStates,
		speed,
		hitPoints,
		experience,
		gameFrame
	) {
		this.characterImage = new Image();
		this.characterImage.src = imgSRC;
		this.spriteWidth = spriteWidth;
		this.spriteHeight = spriteHeight;
		this.positionX = positionX;
		this.positionY = positionY;
		this.vector = vector;
		this.state = state;
		this.staggerFrames = staggerFrames;
		this.spriteAnimations = spriteAnimations;
		this.animationStates = animationStates;
		this.speed = speed;
		this.hitPoints = hitPoints;
		this.experience = experience;
		this.walkingLeft = false;
		this.walkingRight = false;
		this.walkingUp = false;
		this.walkingDown = false;
		this.gameFrame = gameFrame;
		this.beenAttacking = false;
		this.attackCounter = 0;
	}
	initialize() {
		this.animationStates.forEach((state, index) => {
			let frames = {
				loc: [],
			};
			for (let j = 0; j < state.frames; j++) {
				let positionX = j * this.spriteWidth;
				let positionY = index * this.spriteHeight;
				frames.loc.push({ x: positionX, y: positionY });
			}
			this.spriteAnimations[state.name] = frames;
		});
		console.log(player.state);
	}
}

const player = new Character(
	'img/dwarf.png',
	64,
	64,
	220,
	220,
	'right',
	'idleleft',
	8,
	[],
	[
		{
			name: 'idleright',
			frames: 1,
		},
		{
			name: 'walkright',
			frames: 8,
		},
		{
			name: 'attackright',
			frames: 7,
		},
		{
			name: 'useless',
			frames: 1,
		},
		{
			name: 'dieright',
			frames: 7,
		},
		{
			name: 'idleleft',
			frames: 1,
		},
		{
			name: 'walkleft',
			frames: 8,
		},
		{
			name: 'attackleft',
			frames: 7,
		},
		{
			name: 'useless',
			frames: 1,
		},
		{
			name: 'dieleft',
			frames: 7,
		},
	],
	2,
	100,
	0,
	8
);

player.initialize();
console.log(player.state);

const enemy = new Character(
	'img/goblin.png',
	64,
	64,
	100,
	100,
	'right',
	'walkright',
	8,
	[],
	[
		{
			name: 'attackfront',
			frames: 11,
		},
		{
			name: 'walkright',
			frames: 11,
		},
		{
			name: 'attackback',
			frames: 11,
		},
		{
			name: 'walkleft',
			frames: 11,
		},
		{
			name: 'die',
			frames: 1,
		},
	],
	1,
	100,
	0,
	8
);

enemy.initialize();

image = new Image();
image.src = 'img/map.png';

function characterAnimate() {
	if (player.beenAttacking == true) {
		player.attackCounter++;
		if (player.attackCounter > 40) {
			player.attackCounter = 0;
			if (
				player.state == 'attackright' &&
				player.positionY - enemy.positionY < 5 &&
				player.positionY - enemy.positionY > -5 &&
				player.positionX - enemy.positionX > -40 &&
				player.positionX - enemy.positionX < 0
			) {
				enemy.hitPoints -= 30;
			}
			if (
				player.state == 'attackleft' &&
				player.positionY - enemy.positionY < 5 &&
				player.positionY - enemy.positionY > -5 &&
				player.positionX - enemy.positionX < 30 &&
				player.positionX - enemy.positionX > 0
			) {
				enemy.hitPoints -= 30;
			}
		}
	}

	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	let y = player.positionY;
	if (player.positionY > 116) {
		y = 116;
	} 
	else if(player.positionY <0){
		y =  0;
	}
	//545x416
	let x= player.positionX;
	if (player.positionX > 242) {
		x = 242;
	} 
	else if (player.positionX <0) {
		x = 0 ;
	} 

	// console.log(player.positionX, player.positionY, x, y);

	ctx.drawImage(
		image,
		x,
		y,
		image.width,
		image.height,
		0,
		0,
		image.width * 2,
		image.height * 2
	);
	let playerPosition =
		Math.floor(player.gameFrame / player.staggerFrames) %
		player.spriteAnimations[player.state].loc.length;
	let playerFrameX = player.spriteWidth * playerPosition;
	let playerFrameY =
		player.spriteAnimations[player.state].loc[playerPosition].y;

	let enemyPosition =
		Math.floor(enemy.gameFrame / enemy.staggerFrames) %
		enemy.spriteAnimations[enemy.state].loc.length;
	let enemyFrameX = enemy.spriteWidth * enemyPosition;
	let enemyFrameY = enemy.spriteAnimations[enemy.state].loc[enemyPosition].y;

	let temp_speed = player.speed;
	if (
		(player.walkingUp == true || player.walkingDown == true) &&
		(player.walkingRight == true || player.walkingLeft == true)
	) {
		temp_speed = player.speed / 1.41;
	}
	if (player.walkingUp == true) {
		player.positionY -= temp_speed;
	}
	if (player.walkingDown == true) {
		player.positionY += temp_speed;
	}
	if (player.walkingRight == true) {
		player.positionX += temp_speed;
	}
	if (player.walkingLeft == true) {
		player.positionX -= temp_speed;
	}

	deltaX = player.positionX - enemy.positionX;
	deltaY = player.positionY - enemy.positionY;

	if (enemy.hitPoints <= 0) {
		enemy.state = 'die';
	}
	let enemy_temp_speed = enemy.speed;

	if (enemy.state != 'die') {
		if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < 100) {
			if (
				(player.walkingUp == true || player.walkingDown == true) &&
				(player.walkingRight == true || player.walkingLeft == true)
			) {
				enemy_temp_speed = enemy.speed / 1.41;
			}
			if (deltaY > -2) {
				enemy.positionY += enemy_temp_speed;
			}
			if (deltaY < -2) {
				enemy.positionY -= enemy_temp_speed;
			}
			if (deltaX > 20) {
				enemy.positionX += enemy_temp_speed;
			}
			if (deltaX < -30) {
				enemy.positionX -= enemy_temp_speed;
			}
		}
	}

	ctx.drawImage(
		player.characterImage,
		playerFrameX,
		playerFrameY,
		player.spriteWidth,
		player.spriteHeight,
		player.positionX,
		player.positionY,
		player.spriteWidth,
		player.spriteHeight
	);

	ctx.drawImage(
		enemy.characterImage,
		enemyFrameX,
		enemyFrameY,
		enemy.spriteWidth,
		enemy.spriteHeight,
		enemy.positionX,
		enemy.positionY,
		enemy.spriteWidth,
		enemy.spriteHeight
	);

	player.gameFrame++;
	enemy.gameFrame++;
	requestAnimationFrame(characterAnimate);
}

characterAnimate();

console.log(player.state);

// console.log(player.state);

window.addEventListener(
	'keydown',
	function (event) {
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}
		if (event.key == 'w') {
			player.walkingUp = true;
			if (player.vector == 'left') {
				player.state = 'walkleft';
			}
			if (player.vector == 'right') {
				player.state = 'walkright';
			}
		}
		if (event.key == 's') {
			player.walkingDown = true;
			if (player.vector == 'left') {
				player.state = 'walkleft';
			}
			if (player.vector == 'right') {
				player.state = 'walkright';
			}
		}
		if (event.key == 'a') {
			player.walkingLeft = true;
			player.state = 'walkleft';
			player.vector = 'left';
		}
		if (event.key == 'd') {
			player.walkingRight = true;
			player.state = 'walkright';
			player.vector = 'right';
		}
		if (event.key == 'W') {
			player.walkingUp = true;
			if (player.vector == 'left') {
				player.state = 'walkleft';
			}
			if (player.vector == 'right') {
				player.state = 'walkright';
			}
		}
		if (event.key == 'S') {
			player.walkingDown = true;
			if (player.vector == 'left') {
				player.state = 'walkleft';
			}
			if (player.vector == 'right') {
				player.state = 'walkright';
			}
		}
		if (event.key == 'A') {
			player.walkingLeft = true;
			player.state = 'walkleft';
			player.vector = 'left';
		}
		if (event.key == 'D') {
			player.walkingRight = true;
			player.state = 'walkright';
			player.vector = 'left';
		}
		if (event.key == 'Enter') {
			if (player.vector == 'left') {
				player.beenAttacking = true;
				player.state = 'attackleft';
			}
			if (player.vector == 'right') {
				player.beenAttacking = true;
				player.state = 'attackright';
			}
			console.log(enemy.hitPoints);
		}
		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	},
	true
);

window.addEventListener('keyup', function (event) {
	player.walkingUp = false;
	player.walkingDown = false;
	player.walkingRight = false;
	player.walkingLeft = false;
	player.attackCounter = 0;
	if (player.vector == 'left') {
		player.state = 'idleleft';
	}
	if (player.vector == 'right') {
		player.state = 'idleright';
	}
});
