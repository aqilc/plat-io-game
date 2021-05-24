
const blocks = {
	/*
	example: {
		// Color stuff
		col: "#000",
		col() { return sin(frameCount) * 0xfff; }
		
		type: "solid", // The type of the block, automatically collides and adds physics if provided
		
		init() {}, // called when the level is first drawn, and only then(to literally initiate stuff).
		draw() {}, // called on draw, optional as a rect with the col property can also work.
		touch() {}, // when a player is **touching** this block
		top() {}, // when a player is directly on top of this block.
		inside() {}, // when a player is directly inside the block.
	},
	*/
	
	0: {
		col: "#ccc", // #cccccc
		type: "solid"
	},
	
	a: {
		col: (x, y) =>  "#" + hexdec[Math.round(sin((x + y) / 10 + frameCount / 100) * 2) + 10] + "33",
	},
  
  1: {
    col: "#294"
  },
	
	// Sets player starting position
	p: { init(x, y) { this.lvl.pstart.set(x, y); } }
};

/**
 * The Level class, specifying how a level works and sets up everything for it.
 *
 * Going to have individual blocks, and then "regions", which can be custom drawn.
 * Somehow need a system for setting up animations and state.
 */
class Level {
	id = 0; y = 0;
	blocks = [];
	
	// Level width
	width = 0;
	
	// Player start position
	pstart = new Vec();
	
	// Sets the y coord for the floor
	floor = height - 50;
	
	// Whether the current player has started the level or not
	started = false;
	
	// Whether we initialized or not.
	init = false;
	
	// Draw the level
	draw() {
		
		// If we didn't execute the initialize procedure of every block, do so.
		if(!this.init) return this.drawf();
		
		// Gets the level and stores it and it's length
		let lvl = levels[this.id], l = lvl.length, f = this.floor;
		
		// Loops through each block
		for(let i = 0; i < l; i ++) {
			let b = max(0, floor((cam.x - width / 2) / size - 1)), len = min(lvl[i].length, ceil((cam.x + width / 2) / size));
			if (b >= len) continue;
			for(let block = blocks[lvl[i][0]]; b < len; block = blocks[lvl[i][++ b]]) {
				if(!block) continue;
				
				// We only want drawing related things rn
				let { col, draw: d } = block;
				
				// Actually draw the thing
				if(d) d.call({ lvl: this }, b * size, f - size * (l - i));
				else if (col) {
					let x = b * size, y = f - size * (l - i);
					fill(typeof col === "function" ? col(x, y) : col);
					rect(x, y, size, size);
				}
			}
		}
		fill("#ccc");
		rect(0, f, max(this.width * size, width), height - f);
	}
	
	// Draw the level the first time(gotta initialize) :DDD
	drawf() {
		
		let lvl = levels[this.id], l = lvl.length, mlen = 0;
    let floor = this.floor;
		this.y = this.floor - levels[this.id].length * size;
		
		for(let i = 0; i < l; i ++) {
			let len = lvl[i].length;
			if(mlen < len) mlen = len;
			for(let b = 0, block = blocks[lvl[i][0]]; b < len; block = blocks[lvl[i][++ b]]) {
				if(!block) continue;
				
				// We only want drawing related things rn
				let { col, draw, init } = block;
				
				// init
				if(init) init.call({ lvl: this, block }, b * size, floor - size * (l - i));
				
				// Actually draw the thing
				if(draw) draw.call({ lvl: this, block }, b * size, floor - size * (l - i));
				else if(col) {
					let x = b * size, y = floor - size * (l - i);
					noStroke();
					fill(typeof col === "function" ? col(x, y) : col);
					rect(x, y, size, size);
				}
			}
		}
		this.width = mlen;
		this.init = true;
	}
	
	/**
	 * Normalize player position to 1-4 blocks, set up checks for the player for
	 * every block around that block.
   * 
   * ((player.y + size) / size, (player.x + size) / size)
	 */
	collide() {
		if(!this.started) you.x = this.pstart.x, you.y = this.pstart.y, this.started = true;
		
		// If the player is touching the level at all
    if(you.y + size > this.y) {
			
			// Figure out the block coords in the level.
			const bx = floor(you.x / size), by = floor((you.y - this.y) / size), lvl = levels[this.id];
			//console.log(bx + " " + by + " " + lvl[by]?.[bx]);
			
			// Loop through the blocks around it and do collision function stuff
			for(let i = 9; i >= 0; i --) {
				const y = floor(i / 3), x = i % 3, b = blocks[lvl[by + y]?.[bx + x]];
				if(!b) continue;
				const { type } = b;
				
				if(type)
					btypes[type]?.(size * (bx + x), this.y + size * (by + y), x, y);
			}
    }
		
    // Don't let the player go off the screen
		if(you.y + size > this.floor)
			you.y = this.floor - size, you.vy = 0, you.grounded = true;
		if(you.x < 0) you.x = 0; else if (you.x > this.width * size - size) you.x = this.width * size - size;
  }
}

// Array of defined levels for the game, may add some sort of database later
const levels = [
	[
		"    0",
		"                 0000000000",
		"                0000000000aa                      0000000",
		"     p         00000000000000                    aa00000aaa",
		"              00000000000000aa                  000000000000aaaa",
		"             000000000000000000   -   -   -    aa0000000000000000",
		"            0000000000000000000aaaa0aaa0aaa0aaa000000000000000000000                          0",
	],
];

const btypes = {
	solid: (x, y, j, i) => {
		if(x < you.x + size && x + size > you.x &&
			 y < you.y + size && y + size > you.y) {
			const { px, py, x: ux, y: uy } = you;
			
			if(px + size < ux)
				return you.x = x - size, you.vx = 0;
			else if(px > ux)
				return you.x = x + size, you.vx = 0;
			
			if(py + size < y)
				return you.y = y - size;
			else if(py > y)
				return you.y = y + size;
			// const { x: px, y: py } = you, dx = px - x, dy = floor(py - y + size),
			// 			vx = abs(you.vx), vy = abs(you.vy);
			// if(vy > vx || dy < 2) {
			// 	you.grounded = true;
			// 	you.y = floor(y - size); you.vy = 0;
			// 	if(you.vy * delta > 10) you.health.damage(0.05 + (you.vy * delta - 10) / 2);
			// }	else if(vx > vy) you.x = floor(x - size * sign(you.vx)), you.vx = 0;
			// else if (dy > size - 2) you.y = y + size, you.vy = 0;
		}
	}
}