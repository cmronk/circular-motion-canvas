
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#524948', '#57467B', '#7CB4B8', '#70F8BA', '#CAFE48'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// utility functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}
// Objects- changing to particles that we will be using
function Particles(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120);
    this.lastMouse = {x: x, y: y};


    this.update = () => {
        const lastPoint = { x: this.x, y: this.y }
        // move points over time
        this.radians += this.velocity;

        // drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        // this is what makes circular motion!
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

        this.draw(lastPoint);
    };
    this.draw = lastPoint => {
        c.beginPath()
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // c.fillStyle = this.color
        // c.fill()
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        // takes coordinates previous frame
        c.moveTo(lastPoint.x, lastPoint.y);
        // particles new frame location
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath()
    }

}

// Particles.prototype.update = function() {
//     this.draw()
// }


// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 50; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particles(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
    }
    // console.log(particles)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "rgba(255, 255, 255, 0.05)";
    // this clears screen, so it doesn't draw on top 
    // c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update();
    });
}

init()
animate()
