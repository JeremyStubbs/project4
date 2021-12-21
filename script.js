const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);



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
		this.walkingLeft = false;
		this.walkingRight = false;
		this.walkingUp = false;
		this.walkingDown = false;
		this.gameFrame = gameFrame;
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
	}
}

const player = new Character(
	'dwarf.png',
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
	1,
	100,
	8
);

player.initialize();

const enemy = new Character(
	'goblin.png',
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
			frames: 5,
		},
	],
	1,
	100,
	8
);

enemy.initialize();

console.log(enemy)

function characterAnimate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	let playerPosition =
		Math.floor(player.gameFrame / player.staggerFrames) %
		player.spriteAnimations[player.state].loc.length;
	let playerFrameX = player.spriteWidth * playerPosition;
	let playerFrameY = player.spriteAnimations[player.state].loc[playerPosition].y;

	let enemyPosition =
		Math.floor(enemy.gameFrame / enemy.staggerFrames) %
		enemy.spriteAnimations[enemy.state].loc.length;
	let enemyFrameX = enemy.spriteWidth * enemyPosition;
	let enemyFrameY =
		enemy.spriteAnimations[enemy.state].loc[enemyPosition].y;


	if (player.walkingUp == true) {
		player.positionY -= player.speed;
	}
	if (player.walkingDown == true) {
		player.positionY += player.speed;
	}
	if (player.walkingRight == true) {
		player.positionX += player.speed;
	}
	if (player.walkingLeft == true) {
		player.positionX -= player.speed;
	}

	if (player.walkingUp == true) {
		enemy.positionY -= enemy.speed;
	}
	if (player.walkingDown == true) {
		enemy.positionY += enemy.speed;
	}
	if (player.walkingRight == true) {
		enemy.positionX += enemy.speed;
	}
	if (player.walkingLeft == true) {
		enemy.positionX -= enemy.speed;
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
				player.state = 'attackleft';
			}
			if (player.vector == 'right') {
				player.state = 'attackright';
			}
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
	if (player.vector == 'left') {
		player.state = 'idleleft';
	}
	if (player.vector == 'right') {
		player.state = 'idleright';
	}
});
