
// Vector class
class Vec {
	x; y;
	
	// The obvious constructor
	constructor(x, y) { this.set(x, y); }
	set(x, y) { this.x = x; this.y = y; }
	
	// Static create method
	static c(x, y) { return new Vec(x, y); }
	
	// Rotates the vector for idk, could remove later if unnecessary.
	rot(rad) { this.x *= cos(rad); this.y *= sin(rad); }
}

// 3D vector
//class Vec3 { x; y; z; }

// Color
class col {
	r; g; b; a;
	constructor(r, g, b, a) { [this.r, this.g, this.b, this.a] = b ? [r, g, b, a] : g ? [...color(r).levels.slice(0, 3), g] : color(r).levels; }
	get arr() { return [this.r, this.g, this.b, this.a]; }
	get rgb() { return [this.r, this.g, this.b]; }
	toString() { return "#" + hex(this.r) + hex(this.g) + hex(this.b); }
}

// Rectangle
class Rect {
	x; y; w; h; rad;
	
	// Instantiates the thing.
	constructor(x, y, w, h, rad) { this.x = x; this.y = y; this.w = w; this.h = h; this.rad = rad; }
	
	// Draws the thing.
	draw() { rect(this.x, this.y, this.w, this.h, this.rad); }
}

class Camera {
	
	// The x and y of the focus, with the destination values too(for animations), and finally scale val.
	x = width / 2; y = height / 2; dx = width / 2; dy = height / 2; s = 1;
	
	// Basically does the camera
	exec() {
		this.x += floor((this.dx - this.x) / delta); this.y += floor((this.dy - this.y) / delta);
		
		translate(-this.x + this.s * width / 2, -this.y + this.s * height / 2);
		scale(this.s, this.s);
	}
	
	// If you set the x position straight up, you need to set dx too(as that will still be the old value).
	mx(v) { this.x = v; this.dx = v; }
	my(v) { this.y = v; this.dy = v; }
}

class Button {
  
  
  // Needed to be defined when made
  txt; x; y; w; h; fun; tsiz;
  
  // Predefined stuff
  col1 = [30, 120] /* color when not hovering */;
  col2 = [30, 150] /* color when hovering */;
  tcol = 255;
  //r = 5 /* radius of the rectangle */;
  
  // If it's hovering or not
  hov = false;

  constructor(txt, x, y, w, h, fun, tsiz) {
    this.txt = txt; this.fun = fun; this.tsiz = tsiz;
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.r = h / 2;
  }
  
  // Draw the thing
  draw() {
    let { x, y, w, h, txt, tcol, tsiz, r, hov } = this;
    if (!bc && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) fill(this.col2), bc = this.hov = true; else fill(this.col1);
    rect(x, y, w, h, r);
    fill(tcol);
    textSize(tsiz);
    textAlign(CENTER, CENTER);
    text(txt, x + w / 2, y + h / 2);
    return this;
  }
  
  // Check for collision with mouse and return if true
  click() {
    if (this.hov) return this.fun?.(), true;
    return false;
  }
}

			// Math functions extracted to the base scope.
const { sin, cos, sqrt, PI, floor, round, ceil, max, min, abs } = Math,
			
			// Distance stuff
			//distv = (v1, v2) => sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2),
			//dist = (x, y, w, h) => sqrt((x - w) ** 2 + (y - h) ** 2),

			// Hex colors stuff, can only go up to 256.
			hexdec = "0123456789abcdef", hex = num => hexdec[floor(num / 16)] + hexdec[num % 16],
			unhex = (str = str[0] === "#" ? str.slice(1) : str) => [unhexdec(str.slice(0, 2)), unhexdec(str.slice(2, 4)), unhexdec(str.slice(4, 6))],
			unhexdec = str => hexdec.indexOf(str[0]) * 16 + hexdec.indexOf(str[1]),
      
      
      // Returns the text size corresponding to the width
      texth = (txt, w, mag = 1.2) => {
        if(txth.font === "monospace") {
          let size = 20;
          textSize(size); // this may seem dumb but it makes everything work so don't remove
          textSize(size = w / txt.length * (20 / textWidth("m") /* <— magic💨 */));
          return size;
        }
        let size = 400;
        do { txth.s = (size /= mag); } while (textWidth(txt) > w);
        return size;
      },
      
      fullscreen = () => { document.documentElement.requestFullscreen(); fullscreened = true },
      nofullscreen = () => { document.exitFullscreen(); fullscreened = false; },
			
			// Collision of two rects
			// colrec = (x, y, w, h, x2, y2, w2, h2) => x + w >= x2 && x <= x2 + w2 && y + h >= y2 && y <= y2 + h2,
			// colrect = ({ x, y, w, h }, { x: x2, y: y2, w: w2, h: h2 }) => x + w >= x2 && x <= x2 + w2 && y + h >= y2 && y <= y2 + h2;
      
      button = (txt, x, y, w, fun) => {
        let bh = textAscent() * (textWidth(txt) / (texth(txt, w) / 3p5) / txt.length);
        buttons.push(new Button(txt, x, y, w, bh, fun, texth(txt, w - bh)).draw());
      };