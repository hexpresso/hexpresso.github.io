$(document).ready(function () {
	var cubes   = [];
	var moved   = false;
	var alive   = true;
	var mouse   = {};
	var interval;
 
	function Logo(dom, cfg){
		var self = this;
 
 		cfg = cfg != undefined ? cfg : {
 			mouseEffect: "default",
 			wave: true
 		};

 		for(var c in cfg){
 			this[c] = cfg[c];
 		}

		this.dom	= dom;
		this.tick	= 0;
		this.fps    = 33;
		this.text   = $(this.dom).data('title');

		this.padding    = {
			x: $(this.dom).width()/2-330,
			y: 45
		};

		this.cubeSize   = {
			x: 12,
			y: 12
		};

		this.repulsive	= [];
		this.repulsiveLife	= 6000;

		this.cubeSpacing    = 2;
		this.cubeOpacity    = 1;
		this.waveX			= -100;
		this.waveAlive		= false;
		this.waveSpeed		= 8;
 
		this.refresh = function() {
			if(this.waveAlive){
				if(this.waveX > $(this.dom).width()+100){
					this.waveAlive = false;
					this.waveX = -100;
				}
				this.waveX += this.waveSpeed;
			}
 
			if(alive || this.waveAlive){
				this.tick++;
				this.clearScreen();
				this.moveMouse();
				this.drawMap();
 
				if(!moved && !this.repulsive.length){
					alive = false;
				}
			}
		}
 
		this.clearScreen = function() {
			$(this.dom).clearCanvas();
			$(this.dom).removeLayers();
		}
 
		this.genCubes = function() {
			for (var y = 0; y < this.map.length; y++) {
				for (var x = 0; x < this.map[y].length; x++) {
					if(this.map[y][x]){
						this.addCube({
							x: x, y: y,
							opacity: 0
						});
					}
				};
			};
		}
 
		this.genMapFromText = function(text) {
			this.map = [];

			for (var l = 0; l < text.length; l++) {
				var letter = [];

				for (var i = 0; i < letters[text[l]].length; i++) {
					var line = [];

					for (var j = 0; j < letters[text[l]][i].length; j++) {
						if(this.map[i] === undefined){
							this.map.push([]);
						}
						this.map[i].push(letters[text[l]][i][j]);
					};
				};
			};
		}
 
		this.addCube = function(pos) {
			cubes.push({
				x: pos.x, y: pos.y,
				opacity: pos.opacity,
				slope: 0
			});
		}

		this.distanceBetween = function(posA, posB) {
			return Math.sqrt(Math.pow(posB.x-posA.x+this.padding.x, 2)+Math.pow(posB.y-posA.y+this.padding.y, 2))
		}
 
		this.drawCubeSides = function(pos) {
			x = pos.x*(this.cubeSize.x+this.cubeSpacing)+this.cubeSpacing+this.padding.x,
			y = pos.y*(this.cubeSize.y+this.cubeSpacing)+this.cubeSpacing+this.padding.y,
			pX = this.cubeSize.x+this.cubeSpacing;
			pY = this.cubeSize.y+this.cubeSpacing;
			mouseDistance = this.distanceBetween({x: x, y: y}, mouse);
			waveDistance = this.distanceBetween({x: x, y: y}, {x: this.waveX, y: y});

			m = 0;

			if(this.repulsive.length){
				var r = this.repulsive[0];

				if(typeof(r.life) != 'number'){
					this.repulsive[0].life = this.repulsiveLife;
				}

				this.repulsive[0].life -= 1;
				m = Math.sin(this.distanceBetween({x: x, y: y}, r))*Math.sin(this.tick/5);
				m = this.distanceBetween({x: x, y: y}, r) < (this.repulsiveLife-this.repulsive[0].life)/10 && 
				this.distanceBetween({x: x, y: y}, r) > (this.repulsiveLife-this.repulsive[0].life)/15 ? Math.abs(m*8) : 0;
				moved = true;

				if(this.repulsive[0].life <= -this.repulsiveLife){
					this.repulsive.shift();
				}
			}else{
				if(this.wave){
					m = waveDistance < 40 ? 5-(waveDistance/8) : 0;
				}
			}

			if(this.mouseEffect == "magnify" && m == 0){
				m = mouseDistance < 40 ? 5-(mouseDistance/8) : 0;
			}

			m *= 1.8;
			opacity = pos.opacity === undefined ? this.cubeOpacity : pos.opacity;

			$(this.dom).drawPath({
				closed: true,
				fillStyle: 'rgba(200,200,170, '+(m/3+0.3)+')',
				opacity: opacity,

				p1: {
					type: 'line',
					x1: x+m, y1: y+m,
					x2: x, y2: y+pY,
					x3: x+pX-m, y3: y+pX-m,
					x4: x+pX, y4: y
				}
			});
		}
 
		this.drawMap = function() {
			moved = false;
			for (var c = cubes.length - 1; c >= 0; c--) {

				if(cubes[c].go){
					moved = true;
					if(cubes[c].goY === undefined){
						cubes[c].goY = cubes[c].y;
					}
 
					if(cubes[c].goY < -30){
						cubes[c].opacity = 0;
						cubes[c].go = false;
						cubes[c].goY = cubes[c].y;
					}else{
						cubes[c].goY--;
					}
 
					this.drawCubeSides({x: cubes[c].x, y: cubes[c].goY, opacity: cubes[c].opacity});
				}else{
					if(cubes[c].opacity < this.cubeOpacity){
						moved = true;
						cubes[c].opacity =  Math.round((cubes[c].opacity+0.05) * 1000) / 1000;
					}
 
					this.drawCubeSides(cubes[c]);
				}
			}
		}

		this.checkCollision = function(pos) {
			for (var c = cubes.length - 1; c >= 0; c--) {
				if(cubes[c].x == pos.x && cubes[c].y == pos.y){
					cubes[c].go = true;
					return true;
				}
			}
 
			return false;
		}
 
		this.moveMouse = function() {
			var x = ( mouse.x - ( mouse.x % ( this.cubeSize.x + this.cubeSpacing ) ) ) / ( this.cubeSize.x + this.cubeSpacing );
			var y = ( mouse.y - ( mouse.y % ( this.cubeSize.y + this.cubeSpacing ) ) ) / ( this.cubeSize.y + this.cubeSpacing );
 
			if (this.mouseEffect == "default") this.checkCollision({x: x, y: y});
		}
 
		this.throwWave = function() {
			this.waveAlive = true;
		}

		this.addRepulsive = function(pos) {
			if(self.repulsive.length < 5){
				if(pos != undefined){
					this.repulsive.push({
						x: pos.x,
						y: pos.y
					});
				}else{
					this.repulsive.push({
						x: Math.round(Math.random()*($(this.dom).width()-200)),
						y: Math.round(Math.random()*($(this.dom).height()-200))
					});
				}
			}
		}
 
		// Events
		$(this.dom).on('mousemove', {self: self}, function(e) {
			mouse.x = e.offsetX - self.padding.x;
			mouse.y = e.offsetY - self.padding.y;
			alive = true;
		});

		$(this.dom).on('click', {self: self}, function(e) {
			mouse.x = e.offsetX - self.padding.x;
			mouse.y = e.offsetY - self.padding.y;
			self.addRepulsive(mouse);
			alive = true;
			moved = true;
		});

		this.genMapFromText(this.text);
		this.genCubes();
		interval = window.setInterval(function(){ self.refresh() }, this.fps);
 
		$(window).blur(function() {
			alive = false;
			moved = false;
		});

		$(window).focus(function() {
			alive = true;
			moved = true;
		});
	}
 
	var logo = new Logo("canvas#logo", {mouseEffect: "magnify"});
 
	setInterval(function() {
		if(Math.round(Math.random()) == 1){
			logo.addRepulsive();
		}
	}, 5000);
});