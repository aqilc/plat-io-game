
// Constants
const /* socket = io.connect(":30000?sketch=558471"), */
		players = [], grav = .003, tdt = /* Target FPS */ 200,
    
    // Button holder
    buttons = [];

// Variables
let size = 20, level, you, cam, last, delta;

// If the project is offline, it will throw an error
function unreachable() {
	throw new Error("Unreachable"); }

// Sets the variables and program up for a perfect run
function setup() {
	noStroke();
	smooth();
	frameRate(tdt);
	
	// Creates the canvas
	createCanvas(windowWidth, windowHeight);
	
	// Pushes you onto the players stack
	players.push(you = new You());
	
	// Creates a new level
	level = new Level();
	
	// Camera
	cam = new Camera();
	
	// Sets the first timestamp for delta
	last = performance.now();
	
	// Draws and operates everything
	setInterval(() => {
    
    buttons.length = 0;
		
		push();
		delta = performance.now() - last;
		last = performance.now();
		background(256);
		
    
		// Arrows and general keybinds
		if(pressing.size) {
			let ap = false;
			for(let i in arrows) if(pressing.has(i)) { arrows[i](); ap = true; }
			if(!ap)
				(keybinds[keybarr.find(k => k.every(p => pressing.has(p)))] || (() => {}))();
		}
		
		cam.dx = max(width / 2, min(you.x, (level.width * size) - (width / 2)));
		cam.exec();
		
		level.draw();
		level.collide();
		players.forEach(p => p.draw());
		pop();
		
    textFont("Roboto mono");
    
    button("Fullscreen?", 20, 20, 100);
    
		// FPS
    textAlign(LEFT, TOP);
		fill(100);
		text(((1/delta) * 1000).toFixed(1) + "FPS\nActual frametime: " + (performance.now() - last).toFixed(1) + " ms\n" + you.x + ", " + you.y + "\n" + delta + "\n" + buttons[0], 100, 120);
	}, 1000 / tdt);
}