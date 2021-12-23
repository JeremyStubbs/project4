const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

//make a map class
class Map {
	constructor(
		imgSRC,
		positionX,
		positionY,
		boundaryX,
		boundaryY,
		endPositionX,
		endPositionY,
		playerStartPositionX,
		playerStartPositionY,
		enemyStartPositionX,
		enemyStartPositionY,
		mapScale
	) {
		this.image = new Image();
		this.image.src = imgSRC;
		this.positionX = positionX;
		this.positionY = positionY;
		this.mapMoving = false;
		this.boundaryX = boundaryX;
		this.boundaryY = boundaryY;
		this.endPositionX = endPositionX;
		this.endPositionY = endPositionY;
		this.playerStartPositionX = playerStartPositionX;
		this.playerStartPositionY = playerStartPositionY;
		this.enemyStartPositionX = enemyStartPositionX;
		this.enemyStartPositionY = enemyStartPositionY;
		this.mapScale = mapScale;
	}
}

//make a map
// map = new Map(
// 	'img/map.png',
// 	242,
// 	116,
// 	242,
// 	116,
// 	[0],
// 	Array.from(new Array(23), (x, i) => i + 86),
// 	155,
// 458,
// 	-50,
// 	0,
// 2
// );

map = new Map(
	'img/beach.png',
	242,
	116,
	242,
	116,
	[0],
	Array.from(new Array(23), (x, i) => i + 420),
	450,
	450,
	200,
	580,
	2
);

player.positionX = map.playerStartPositionX;
player.positionY = map.playerStartPositionY;
enemy.positionX = map.enemyStartPositionX;
enemy.positionY = map.enemyStartPositionY;

// let startedLevel = false;
let endOfLevel = false;

let startScreen = new Image();
let endScreen = new Image();

endScreen.src = 'img/gameover.png';
startScreen.src = 'img/start.png';

function startLoad() {
	ctx.drawImage(startScreen, 0, 0, 852, 480, 0, 0, 600, 600);
}

requestAnimationFrame(startLoad);

function startGame() {
	document.getElementById('restart').style.display = 'block';
	document.getElementById('health').style.display = 'block';
	document.getElementById('experience').style.display = 'block';
	document.getElementById('start').style.display = 'none';
}

//Animation function
function animateGame() {
	//check if game over
	if (
		map.endPositionX.includes(player.positionX) &&
		map.endPositionY.includes(player.positionY)
	) {
		endOfLevel = true;
	}
	if (endOfLevel) {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		ctx.drawImage(endScreen, 0, 0, 480, 360, 0, 0, 600, 600);
		return;
	}

	//set sprite images
	let playerSpritePosition =
		Math.floor(player.gameFrame / player.staggerFrames) %
		player.spriteAnimations[player.state].loc.length;
	let playerFrameX = player.spriteWidth * playerSpritePosition;
	let playerFrameY =
		player.spriteAnimations[player.state].loc[playerSpritePosition].y;

	let enemySpritePosition =
		Math.floor(enemy.gameFrame / enemy.staggerFrames) %
		enemy.spriteAnimations[enemy.state].loc.length;
	let enemyFrameX = enemy.spriteWidth * enemySpritePosition;
	let enemyFrameY =
		enemy.spriteAnimations[enemy.state].loc[enemySpritePosition].y;

	//find distance between player and enemy
	deltaX = player.positionX - enemy.positionX;
	deltaY = player.positionY - enemy.positionY;
	distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

	//Check if attacking and decrease hit points appropriately
	if (player.beenAttacking) {
		player.attackCounter++;
		if (player.attackCounter > player.attackSpeed) {
			player.attackCounter = 0;
			if (
				player.state == 'attackright' &&
				player.positionY - enemy.positionY < 5 &&
				player.positionY - enemy.positionY > -5 &&
				player.positionX - enemy.positionX > -player.attackDistance &&
				player.positionX - enemy.positionX < 0
			) {
				enemy.hitPoints -= player.attackDamage;
			}
			if (
				player.state == 'attackleft' &&
				player.positionY - enemy.positionY < 5 &&
				player.positionY - enemy.positionY > -5 &&
				player.positionX - enemy.positionX < player.attackDistance &&
				player.positionX - enemy.positionX > 0
			) {
				enemy.hitPoints -= player.attackDamage;
			}
		}
	}
	if (enemy.state != 'dead') {
		if (enemy.attackCounter <= enemy.attackSpeed) {
			enemy.attackCounter++;
		}

		if (enemy.attackCounter > enemy.attackSpeed) {
			enemy.attackCounter = 0;
			if (distance < enemy.attackDistance) {
				player.hitPoints -= enemy.attackDamage;
			}
		}
	}

	//enemy or player dies when hit points below 0. After number of frames in animation, stop animation. After another set of frames, character disappears.
	if (enemy.hitPoints <= 0 && enemy.dead_counter < 5) {
		enemy.dead_counter++;
		enemy.state = 'dead';
		player.experience += enemy.experience;
	}
	if (enemy.hitPoints <= 0 && enemy.dead_counter >= 5) {
		enemyFrameX = enemy.endX;
		enemyFrameX = enemy.endY;
		enemy.dead_counter++;
	}
	if (enemy.hitPoints <= 0 && enemy.dead_counter > 20) {
		enemy.render = false;
	}

	if (player.hitPoints <= 0 && player.dead_counter < 7) {
		player.state = 'deadright';
		player.dead_counter++;
	}

	if (player.hitPoints <= 0 && player.dead_counter >= 7) {
		playerFrameX = player.endX;
		playerFrameY = player.endY;
		player.dead_counter++;
	}

	if (player.dead_counter > 100) {
		endOfLevel = true;
	}

	//speed corrections for diagonal and when map moves
	let temp_speed = player.speed;
	if (
		(player.walkingUp || player.walkingDown) &&
		(player.walkingRight || player.walkingLeft)
	) {
		temp_speed = temp_speed / 1.41;
	}

	//player can't go out of bounds
	if (player.positionX < 0) {
		player.positionX = 0;
	}
	if (player.positionX > 550) {
		player.positionX = 550;
	}
	if (player.positionY < 0) {
		player.positionY = 0;
	}
	if (player.positionY > 540) {
		player.positionY = 540;
	}

	//player movements
	if (player.walkingUp && player.positionY > 90) {
		player.positionY -= temp_speed;
	}
	if (player.walkingUp && player.positionY <= 90 && map.positionY <= 0) {
		player.positionY -= temp_speed;
	}
	if (player.walkingDown && player.positionY < 450) {
		player.positionY += temp_speed;
	}
	if (
		player.walkingDown &&
		player.positionY >= 450 &&
		map.positionY >= map.boundaryY
	) {
		player.positionY += temp_speed;
	}
	if (player.walkingRight && player.positionX < 460) {
		player.positionX += temp_speed;
	}
	if (
		player.walkingRight &&
		player.positionX >= 460 &&
		map.positionX >= map.boundaryX
	) {
		player.positionX += temp_speed;
	}
	if (player.walkingLeft && player.positionX > 90) {
		player.positionX -= temp_speed;
	}
	if (player.walkingLeft && player.positionX <= 90 && map.positionX <= 0) {
		player.positionX -= temp_speed;
	}

	//enemy movements
	//set enemy speed
	let enemy_temp_speed = temp_speed * enemy.speed;

	//check if not already dead then
	if (enemy.state != 'dead') {
		//will pursue player when distance less than 200 px
		if (distance < 200) {
			//reverse speed if map is moving. works because player speed is twice as large as enemy speed. any other difference would require some math.
			if (map.mapMoving) {
				enemy_temp_speed = -enemy_temp_speed;
			}

			if (deltaY > 2) {
				enemy.positionY += enemy_temp_speed;
			}
			if (deltaY < -2) {
				enemy.positionY -= enemy_temp_speed;
			}

			if (deltaX > 20) {
				enemy.positionX += enemy_temp_speed;
			}
			if (deltaX < -20) {
				enemy.positionX -= enemy_temp_speed;
			}
		}
	}

	//map movement
	map.mapMoving = false;
	if (player.positionX <= 90 && player.walkingLeft && map.positionX > 0) {
		map.mapMoving = true;
		map.positionX -= temp_speed;
	}
	if (
		player.positionX >= 460 &&
		player.walkingRight &&
		map.positionX < map.boundaryX
	) {
		map.mapMoving = true;
		map.positionX += temp_speed;
	}
	if (player.positionY <= 90 && player.walkingUp && map.positionY > 0) {
		map.mapMoving = true;
		map.positionY -= temp_speed;
	}

	if (
		player.positionY >= 450 &&
		player.walkingDown &&
		map.positionY < map.boundaryY
	) {
		map.mapMoving = true;
		map.positionY += temp_speed;
	}

	//adjust health and experience
	let health = document.getElementById('health');
	health.innerText = `Health: ${player.hitPoints}`;

	let experience = document.getElementById('experience');
	experience.innerText = `Experience: ${player.experience}`;

	//clear canvas
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	//render map
	ctx.drawImage(
		map.image,
		map.positionX,
		map.positionY,
		map.image.width,
		map.image.height,
		0,
		0,
		map.image.width * map.mapScale,
		map.image.height * map.mapScale
	);

	//render player and enemy
	if (player.render) {
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
	}

	if (enemy.render) {
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
	}
	//increase gameFrames (used for sprite animations)
	player.gameFrame++;
	enemy.gameFrame++;

	//recursively call animations
	requestAnimationFrame(animateGame);
}

//keydown inputs for player movement and attacks
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
			// console.log(enemy.hitPoints);
		}
		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	},
	true
);

//keyup inputs to reset
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

// console.log
// player.positionX,
// player.positionY
// enemy.positionX,
// enemy.positionY,
// distance,
// player.hitPoints
// map.positionX,
// map.positionY,
// map.mapMoving
// temp_speed,
// enemy_temp_speed,
// player.hitPoints
// player.dead_counter,
// enemy
// ();
