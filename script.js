const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = 'dwarf.png';
const playerSpriteWidth = 32;
const playerSpriteHeight = 32;
let playerX = 220;
let playerY = 220;
let playerGameFrame = 8;
let playerState = 'idleleft';
let previousPlayerState = 'idleleft';
const playerStaggerFrames = 8;
const playerSpriteAnimations = [];
const playerAnimationStates = [
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
];
playerAnimationStates.forEach((state, index) => {
	let frames = {
		loc: [],
	};
	for (let j = 0; j < state.frames; j++) {
		let positionX = j * playerSpriteWidth;
		let positionY = index * playerSpriteHeight;
		frames.loc.push({ x: positionX, y: positionY });
	}
	playerSpriteAnimations[state.name] = frames;
});

// console.log(playerSpriteAnimations);
function playeranimate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	let position =
		Math.floor(playerGameFrame / playerStaggerFrames) %
		playerSpriteAnimations[playerState].loc.length;
	// console.log(playerGameFrame)
	let playerFrameX = playerSpriteWidth * position;
	let playerFrameY = playerSpriteAnimations[playerState].loc[position].y;

	ctx.drawImage(
		playerImage,
		playerFrameX,
		playerFrameY,
		playerSpriteWidth,
		playerSpriteHeight,
		playerX,
		playerY,
		playerSpriteWidth,
		playerSpriteHeight
	);

	playerGameFrame++;
	requestAnimationFrame(playeranimate);
}
playeranimate();

window.addEventListener(
	'keydown',
	function (event) {
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}
		switch (event.key) {
			case 's':
				playerY += 10;
				if (playerState == 'walkleft' || playerState == 'idleleft') {
					playerState = 'idleleft';
				}
				if (playerState == 'walkright' || playerState == 'idleright') {
					playerState = 'walkright';
				}
				break;

			case 'S':
				playerY += 10;
				if (playerState == 'walkleft' || playerState == 'idleleft') {
					playerState = 'idleleft';
				}
				if (playerState == 'walkright' || playerState == 'idleright') {
					playerState = 'walkright';
				}
				break;

			case 'w':
				playerY += -10;
				if (playerState == 'walkleft' || playerState == 'idleleft') {
					playerState = 'idleleft';
				}
				if (playerState == 'walkright' || playerState == 'idleright') {
					playerState = 'walkright';
				}
				break;

			case 'W':
				playerY += -10;
				if (playerState == 'walkleft' || playerState == 'idleleft') {
					playerState = 'idleleft';
				}
				if (playerState == 'walkright' || playerState == 'idleright') {
					playerState = 'walkright';
				}
				break;

			case 'a':
				playerX += -10;
				playerState == 'walkleft';
				break;

			case 'A':
				playerX += -10;
				playerState == 'walkleft';
				break;

			case 'd':
				playerX += 10;
				playerState == 'walkright';
				break;

			case 'D':
				playerX += 10;
				playerState == 'walkright';
				break;

			case 'Enter':
				if (playerState == 'walkleft' || playerState == 'idleleft') {
					playerState = 'attackleft';
				}
				if (playerState == 'walkright' || playerState == 'idleright') {
					playerState = 'attackright';
				}
				break;
			// case 'Esc': // IE/Edge specific value
			// case 'Escape':
			// 	stopDancing();
			// 	break;
			default:
				playerState = 'idleright';
				return; // Quit when this doesn't handle the key event.
		}

		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	},
	true
);
