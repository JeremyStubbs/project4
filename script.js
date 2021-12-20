const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

let playerGameFrame = 8;

class Character {
	constructor(
		imgSRC,
		playerSpriteWidth,
		playerSpriteHeight,
		playerX,
		playerY,
		playerVector,
		playerState,
		playerStaggerFrames,
		playerSpriteAnimations,
		playerAnimationStates
	) {
		this.playerImage = new Image();
		this.playerImage.src = imgSRC;
		this.playerSpriteWidth = playerSpriteWidth;
		this.playerSpriteHeight = playerSpriteHeight;
		this.playerX = playerX;
		this.playerY = playerY;
		this.playerVector = playerVector;
		this.playerState = playerState;
		this.playerStaggerFrames = playerStaggerFrames;
		this.playerSpriteAnimations = playerSpriteAnimations;
		this.playerAnimationStates = playerAnimationStates;
	}
	initialize() {
		this.playerAnimationStates.forEach((state, index) => {
			let frames = {
				loc: [],
			};
			for (let j = 0; j < state.frames; j++) {
				let positionX = j * this.playerSpriteWidth;
				let positionY = index * this.playerSpriteHeight;
				frames.loc.push({ x: positionX, y: positionY });
			}
			this.playerSpriteAnimations[state.name] = frames;
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
	]
);

player.initialize();

function characterAnimate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	let position =
		Math.floor(playerGameFrame / player.playerStaggerFrames) %
		player.playerSpriteAnimations[player.playerState].loc.length;
	let playerFrameX = player.playerSpriteWidth * position;
	let playerFrameY =
		player.playerSpriteAnimations[player.playerState].loc[position].y;

	ctx.drawImage(
		player.playerImage,
		playerFrameX,
		playerFrameY,
		player.playerSpriteWidth,
		player.playerSpriteHeight,
		player.playerX,
		player.playerY,
		player.playerSpriteWidth,
		player.playerSpriteHeight
	);

	playerGameFrame++;
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
			player.playerY -= 10;
			if (player.playerVector == 'left') {
				player.playerState = 'walkleft';
			}
			if (player.playerVector == 'right') {
				player.playerState = 'walkright';
			}
		}
		if (event.key == 's') {
			player.playerY += 10;
			if (player.playerVector == 'left') {
				player.playerState = 'walkleft';
			}
			if (player.playerVector == 'right') {
				player.playerState = 'walkright';
			}
		}
		if (event.key == 'a') {
			player.playerX -= 10;
			player.playerState = 'walkleft';
			player.playerVector = 'left';
		}
		if (event.key == 'd') {
			player.playerX += 10;
			player.playerState = 'walkright';
			player.playerVector = 'right';
		}
		if (event.key == 'W') {
			player.playerY -= 10;
			if (player.playerVector == 'left') {
				player.playerState = 'walkleft';
			}
			if (player.playerVector == 'right') {
				player.playerState = 'walkright';
			}
		}
		if (event.key == 'S') {
			player.playerY += 10;
			if (player.playerVector == 'left') {
				player.playerState = 'walkleft';
			}
			if (player.playerVector == 'right') {
				player.playerState = 'walkright';
			}
		}
		if (event.key == 'A') {
			player.playerX -= 10;
			player.playerState = 'walkleft';
			player.playerVector = 'left';
		}
		if (event.key == 'D') {
			player.playerX += 10;
			player.playerState = 'walkright';
			player.playerVector = 'left';
		}
		if (event.key == 'Enter') {
			if (player.playerVector == 'left') {
				player.playerState = 'attackleft';
			}
			if (player.playerVector == 'right') {
				player.playerState = 'attackright';
			}
		}
		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	},
	true
);

window.addEventListener('keyup', function (event) {
	if (player.playerVector == 'left') {
		player.playerState = 'idleleft';
	}
	if (player.playerVector == 'right') {
		player.playerState = 'idleright';
	}
});
