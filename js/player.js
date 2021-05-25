
class Player {
	
	// Player Data
	x = 0; y = 0; w = size; h = size;
	name = "";
	exp = 0;
	
	// Health things
	health = new Health();
	
	// Player color
	color = "#" + hexdec[~~ random(16)] + hexdec[~~ random(16)] + hexdec[~~ random(16)];
	
	// Actually draws the graphics and stuff.
	draw() {
		fill(this.color);
		rect(this.x, this.y, size, size);
		this.health.draw(this.x, this.y - this.h / 2, this.w, this.h / 4);
	}
}

class You extends Player {
	
	// Damage function
	damage = this.health.damage;
	
	// Whether the user is grounded, governed by level()
	grounded = false;
	
	// Speed
	spd = { jump: 1, mov: .07 };
	vx = 0; vy = 0; // Velocity vector components.
	
	// Previous values(determines the direction you are moving in)
	px = 0; py = 0;
	
	// Moves you.
	move(x, y) {
		if(x) this.x = x;
		if(y) this.y = y;
		return this;
	}
	
	// Makes you jump
	jump() { this.grounded = false; this.vy -= this.spd.jump; }
	
	// Draws you
	draw() {
    
    let { x, y, vx, vy } = this, nx = vx * delta, ny = vy * delta;
    
    text(JSON.stringify(level.get(x, y + ny)), 300, 300);
    // Player collision
    if (level.get(x, y + ny)?.type === "solid")
      this.vy = 0;
    
    
    text("pog", 300, 300);
    
    // Don't let the player go off the screen
		if(y + size > level.floor)
			this.y = level.floor - size, this.vy = 0, this.grounded = true;
		if(x < 0) this.x = 0; else if (x > level.width * size - size) this.x = level.width * size - size;
    
    // Draws the player
		super.draw();
    
    // Moves the player for the next frame, slows down the x velocity, and adds gravity.
    this.x += nx;
    this.y += ny;
    this.vy += grav * delta; // a = m/s^2, so have to multiply by time(delta) again to get proper gravity
    this.vx = Math.abs(vx) > 0.05 ? vx / 1.1 : 0;
	}
}


class Health {
	
	// The actual values
	cur = 1;
	lives = 10;
	
	// The last time you were damaged / last time health was decremented, in Date.now();
	lastdec = 0;
	
	// Health drawing stuff
	r /* red tint value */ = 0; a /* opacity */ = 1;
	col /* foreground color */ = "#666666"; bcol /* background color */ = "#111111";
	
	/* shake stuff, for when you die or something idk */
	shake = 0; shx = 0;
	
	// Damages health by amount.
	damage(amt) {
		this.cur -= amt;
		if(this.cur < 0) {
			this.die(); this.r = 1; this.a = 1; this.shake = 5; this.cur = 1;
		} else this.r = amt / 5 + 0.3, this.a = 1, this.lastdec = Date.now();
	}
	
	// Draws the health bar at the specific point
	draw(x, y, w, h) {
		
		// We don't need to draw if there's barely anything to draw.
		if(this.a <= 0.05) return;
		
		this.a -= 0.01
		
		if(!(this.col instanceof col)) this.col = new col(this.col);
		if(!(this.bcol instanceof col)) this.bcol = new col(this.bcol);
		
		fill([...this.bcol.rgb, this.a * 255]);
		rect(x, y, w, h, 2);
		fill([...this.col.rgb, this.a * 255]);
		rect(x + 1, y + 1, (w - 2) * this.cur, h - 2, 2);
	}
	
	// Function executed when you die.
	die = () => {};
}