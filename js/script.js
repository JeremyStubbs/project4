const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

class Map {
	constructor(imgSRC, positionX, positionY) {
		this.image = new Image();
		this.image.src = imgSRC;
		this.positionX = positionX;
		this.positionY = positionY;
	}
}

map = new Map('img/map.png', 242, 116);

function animateGame() {
	//Check if attacking and decrease hit points appropriately
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
	//clear canvas
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	//set animations
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

	//enemy dies when hit points below 0
	if (enemy.hitPoints <= 0) {
		enemy.state = 'dead';
	}

	//speed corrections for diagonal and when map moves
	let temp_speed = player.speed;
	if (
		(player.walkingUp == true || player.walkingDown == true) &&
		(player.walkingRight == true || player.walkingLeft == true)
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
	if (player.walkingUp == true && player.positionY > 89) {
		player.positionY -= temp_speed;
	}
	if (player.walkingDown == true && player.positionY < 451) {
		player.positionY += temp_speed;
	}
	if (player.walkingRight == true && player.positionX < 461) {
		player.positionX += temp_speed;
	}
	if (player.walkingLeft == true && player.positionX > 89) {
		player.positionX -= temp_speed;
	}

	//find distance between player and enemy
	deltaX = player.positionX - enemy.positionX;
	deltaY = player.positionY - enemy.positionY;
	distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

	//set enemy speed
	let enemy_temp_speed = temp_speed * enemy.speed;
	//check if not already dead
	if (enemy.state != 'dead') {
		//will pursue player when distance less than 200 px
		if (distance < 200) {
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

	//map movement
	if (player.positionX < 90 && player.walkingLeft && map.positionX > -50) {
		map.positionX -= temp_speed;
	}
	if (player.positionX > 460 && player.walkingRight && map.positionX < 292) {
		map.positionX += temp_speed;
	}
	if (player.positionY < 90 && player.walkingUp && map.positionY > -54) {
		map.positionY -= temp_speed;
	}

	if (player.positionY > 450 && player.walkingDown && map.positionY < 156) {
		map.positionY += temp_speed;
	}
	// console.log(player.positionX, player.positionY, map.positionX, map.positionY);

	//render map
	ctx.drawImage(
		map.image,
		map.positionX,
		map.positionY,
		map.image.width,
		map.image.height,
		0,
		0,
		map.image.width * 2,
		map.image.height * 2
	);

	//render player and enemy
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

	//increase gameFrames (used for sprite animations)
	player.gameFrame++;
	enemy.gameFrame++;

	//recursively call animations
	requestAnimationFrame(animateGame);
}

//call animations
animateGame();

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

//set map coordinates
// map.positionX = player.positionX;
// if (player.positionX > 242) {
// 	map.positionX = 242;
// } else if (player.positionX < 0) {
// 	map.positionX = 0;
// }

// map.positionY = player.positionY;
// if (player.positionY > 116) {
// 	map.positionY = 116;
// } else if (player.positionY < 0) {
// 	map.positionY = 0;
// }

//545x416
//550x540
//90,460, 90,450
// console.log(player.positionX, player.positionY, map.positionX, map.positionY);

//render map
// ctx.drawImage(
// 	map.image,
// 	map.positionX,
// 	map.positionY,
// 	map.image.width,
// 	map.image.height,
// 	0,
// 	0,
// 	map.image.width * 2,
// 	map.image.height * 2
// );

// if (
// 	(player.positionY < 116 && (player.walkingDown || player.walkingUp)) ||
// 	(player.positionX < 242 && (player.walkingLeft || player.walkingRight))
// ) {
// 	temp_speed = temp_speed / 2;
// }
