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
		attackDamage,
		attackSpeed,
		attackDistance,
		experience,
		endX,
		endY
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
		this.attackDamage = attackDamage;
		this.experience = experience;
		this.walkingLeft = false;
		this.walkingRight = false;
		this.walkingUp = false;
		this.walkingDown = false;
		this.gameFrame = 0;
		this.beenAttacking = false;
		this.attackCounter = 0;
		this.attackSpeed = attackSpeed;
		this.attackDistance = attackDistance;
		this.render = true;
		this.dead_counter = 0;
		this.endX = endX;
		this.endY = endY;
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

// create and initialize player
const player = new Character(
	'img/dwarf.png',
	64,
	64,
	0,
	0,
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
			name: 'deadright',
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
			name: 'deadleft',
			frames: 7,
		},
	],
	2,
	100,
	30,
	40,
	40,
	0,
	384,
	256
);

player.initialize();

// create and initialize enemy
const enemy = new Character(
	'img/goblin.png',
	64,
	64,
	0,
	0,
	'right',
	'attackback',
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
			frames: 1,
		},
		{
			name: 'walkleft',
			frames: 11,
		},
		{
			name: 'dead',
			frames: 5,
		},
	],
	0.5,
	100,
	20,
	50,
	50,
	20,
	256,
	256
);

enemy.initialize();
