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

const enemy = new Character(
	'img/goblin.png',
	64,
	64,
	-50,
	-50,
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
			name: 'dead',
			frames: 1,
		},
	],
	0.5,
	100,
	0,
	8
);

enemy.initialize();
