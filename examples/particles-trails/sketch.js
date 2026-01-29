const numParticles = 100
const TRAIL_MAX_LENGTH = 100
let particles
let btn // Button
let mnu // Menu function

function particles_reset() {
	particles = []
	for (let i = 0; i < numParticles; i++) {
		particles.push(new Particle())
	}
}

function setup() {
	createCanvas(innerWidth, innerHeight - 1)
	colorMode(HSB, 360, 100, 100)
	particles_reset()
	btn = new Button(10, 10, particles_reset, "Reset")
	mnu = new Menu(10, height - 40, 1)
	mnu.add(btn)
}

function mouseClicked() {
	mnu.click()
}

function draw() {
	background(18)
	for (let particle of particles) {
		particle.update()
		particle.display()
	}
	for (let particle of particles) {
		if (particle.pos.y > height) {
			particle.gravity *= -0.1
			particle.vel.y = -particle.vel.y
		}
		if (particle.pos.y < 0) {
			particle.gravity *= -0.1
			particle.vel.y = -particle.vel.y
		}
		if (particle.pos.x >= width || particle.pos.x <= 0) {
			particle.vel.x = -particle.vel.x
		}
	}
	mnu.render()
}
class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height))
		this.vel = p5.Vector.random2D().mult(random(1, 3))
		this.acc = createVector()
		this.color = color(random(360), 100, 100)
		this.trailLength = random(5, TRAIL_MAX_LENGTH)
		this.trail = []
		this.gravity = 0.1
	}
	update() {
		// Apply gravity
		this.acc.add(createVector(0, this.gravity)) // Add wind and turbulence effects
		let angle = map(mouseX, 0, width, 0, TWO_PI)
		this.acc.add(p5.Vector.fromAngle(angle).mult(random(-0.1, 0.1))) // Update velocity and position
		this.vel.add(this.acc)
		this.pos.add(this.vel) // Update the trail
		this.trail.push(this.pos.copy())
		if (this.trail.length > this.trailLength) {
			this.trail.shift()
		} // Reset acceleration
		this.acc.mult(0)
	}
	display() {
		noStroke() // Draw the main particle
		fill(this.color)
		//ellipse(this.pos.x, this.pos.y, 10); // Draw the trail
		stroke(this.color, map(this.trail.length, 0, this.trailLength, 100, 0))
		for (let i = 0; i < this.trail.length - 1; i++) {
			strokeWeight(map(this.trailLength, 5, TRAIL_MAX_LENGTH, 5, 1))
			line(
				this.trail[i].x,
				this.trail[i].y,
				this.trail[i + 1].x,
				this.trail[i + 1].y,
			)
		}
	}
}
