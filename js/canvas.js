
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// resizing for mobile 
function resize() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        c = canvas.getContext("2d");

        window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);
        resizeCanvas();
    }
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

canvas.width = innerWidth;
canvas.height = maxheight = 500;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#403F4C', '#E84855', '#F9DC5C', '#3185FC', '#EFBCD5'];
// const colors = ['#5386E4', '#4C4B63', '#949396', '#ABA8B2', '#C3C3C3'];


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
    this.distanceFromCenter = randomIntFromRange(50, 200);
    this.lastMouse = { x: x, y: y };


    this.update = () => {
        const lastPoint = { x: this.x, y: this.y }
        // move points over time
        this.radians += this.velocity;

        // drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1;

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



// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 250; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particles(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "rgba(255, 255, 255, 0.05)";
    // c.fillStyle = "rgba(rgba(34, 30, 34, 0.05)";
    // this clears screen, so it doesn't draw on top 
    // c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update();
    });
}

init()
animate()
