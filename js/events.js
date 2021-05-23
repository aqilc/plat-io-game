
function mouseClicked() {
  buttons.find(b => b.click());
}

// Main keybinds, not including any arrows
const keybinds = {
		"ctrl+=": () => size += 2,
	},
	
	// Keybind functions
	arrows = {
		rarr: () => you.vx += you.spd.mov,
		larr: () => you.vx -= you.spd.mov,
		uarr: () => you.grounded && you.jump(),
	},
	
	keycodes = {
		rarr: 39,
		larr: 37,
		uarr: 38,
		darr: 40,
		space: 32,
		shift: 16,
		enter: 13,
		ctrl: 17,
		backspace: 8
	},
		
	// IIFE to map out the keycodes to their keys :D
	codekeys = (() => {
		let pog = {};
		for(let i in keycodes)
			pog[keycodes[i]] = i;
		return pog;
	})(),
	
	// Splits the keybind names up and separates the key names and stuff
	keybarr = Object.keys(keybinds).map(k => k.split("+")),

	// What keys you're pressing
	pressing = new Set();

// Handles keybinds
function keyPressed(e) {
	e.preventDefault();
	if(codekeys[keyCode]) pressing.add(codekeys[keyCode]);
	else pressing.add(e.key);
	//for(let i of pressing.values()) console.log(i);
}
function keyReleased(e) {
	e.preventDefault();
	if(codekeys[keyCode]) pressing.delete(codekeys[keyCode]);
	else pressing.delete(key);
}

function mouseWheel(event) {
  //move the square according to the vertical scroll amount
  //cam.dx += event.delta * delta / 10;
  return false;
}