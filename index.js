// Select elements
const canvas = document.getElementById("gameBoard");
const context = canvas.getContext("2d"); // Canvas context for drawing
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let animationFrameId;
let gameStarted = false; // Flag to check if the game is already started

// Define 8 balls as objects in an array with the same properties (except for color)
let balls = [
    { x: 100, y: 100, radius: 20 * 0.75, dx: Math.random() * 6 - 3, dy: Math.random() * 6 - 3, color: "red" },
    { x: 200, y: 200, radius: 20 * 0.75, dx: Math.random() * 6 - 3, dy: Math.random() * 6 - 3, color: "blue" },
    { x: 300, y: 150, radius: 20 * 0.75, dx: Math.random() * 6 - 3, dy: Math.random() * 6 - 3, color: "green" },
    { x: 400, y: 250, radius: 20 * 0.75, dx: Math.random() * 6 - 3, dy: Math.random() * 6 - 3, color: "yellow" },
    { x: 150, y: 300, radius: 20 * 0.75, dx: Math.random() * 6 - 3, dy: Math.random() * 6 - 3, color: "purple" },
    { x: 450, y: 350, radius: 20 * 0.75, dx: Math.random() * 6 - 3, dy: Math.random() * 6 - 3, color: "orange" },
    { x: 250, y: 50, radius: 20 * 0.75, dx: Math.random() * 6 - 3, dy: Math.random() * 6 - 3, color: "pink" },
    { x: 350, y: 400, radius: 20 * 0.75, dx: Math.random() * 6 - 3, dy: Math.random() * 6 - 3, color: "cyan" }
];

// Function to check collision between two balls
function isColliding(ball1, ball2) {
    const dx = ball1.x - ball2.x; // Horizontal distance between two balls
    const dy = ball1.y - ball2.y; // Vertical distance between two balls
    const distance = Math.sqrt(dx * dx + dy * dy); // Euclidean distance formula
    return distance < ball1.radius + ball2.radius; // True if the balls overlap
}

// Function to check if three balls are colliding and create a new ball with inherited properties
function checkTripleCollision() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            for (let k = j + 1; k < balls.length; k++) {
                if (
                    isColliding(balls[i], balls[j]) &&
                    isColliding(balls[j], balls[k]) &&
                    isColliding(balls[i], balls[k])
                ) {
                    // Calculate the center of the three colliding balls
                    const newBall = {
                        x: (balls[i].x + balls[j].x + balls[k].x) / 3, // Center of the colliding balls
                        y: (balls[i].y + balls[j].y + balls[k].y) / 3 - 30, // Stacked vertically above the original balls
                        radius: balls[i].radius, // Same size as the original balls
                        dx: (balls[i].dx + balls[j].dx + balls[k].dx) / 3, // Average speed of the colliding balls
                        dy: (balls[i].dy + balls[j].dy + balls[k].dy) / 3, // Average speed of the colliding balls
                        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`, // Random color
                    };

                    // Add the new ball to the array
                    balls.push(newBall); // Add new ball to the balls array
                    return; // Exit the function after creating the new ball
                }
            }
        }
    }
}

// Function to draw and update all balls
function drawBalls() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    balls.forEach((ball) => {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fillStyle = ball.color;
        context.fill();
        context.closePath();

        ball.x += ball.dx; // Update the ball's x position
        ball.y += ball.dy; // Update the ball's y position

        // Check if ball hits the right or left wall
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx *= -1; // Reverse horizontal direction
        }
        // Check if ball hits the top or bottom wall
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy *= -1; // Reverse vertical direction
        }
    });

    checkTripleCollision(); // Check if three balls collide and handle collision
    animationFrameId = requestAnimationFrame(drawBalls); // Request next frame
}

// Start game
startBtn.addEventListener("click", () => {
    if (!gameStarted) {
        gameStarted = true; // Mark game as started
        drawBalls(); // Start the animation if it's not already running
    }
});


// Reset game
resetBtn.addEventListener("click", () => {
    cancelAnimationFrame(animationFrameId); // Stop the animation
    animationFrameId = null;
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Reset the global balls array with new values
    balls = [
        { x: 100, y: 100, radius: 20 * 0.75, dx: Math.random() * 8 - 4, dy: Math.random() * 8 - 4, color: "red" },
        { x: 200, y: 200, radius: 20 * 0.75, dx: Math.random() * 8 - 4, dy: Math.random() * 8 - 4, color: "blue" },
        { x: 300, y: 150, radius: 20 * 0.75, dx: Math.random() * 8 - 4, dy: Math.random() * 8 - 4, color: "green" },
        { x: 400, y: 250, radius: 20 * 0.75, dx: Math.random() * 8 - 4, dy: Math.random() * 8 - 4, color: "yellow" },
        { x: 150, y: 300, radius: 20 * 0.75, dx: Math.random() * 8 - 4, dy: Math.random() * 8 - 4, color: "purple" },
        { x: 450, y: 350, radius: 20 * 0.75, dx: Math.random() * 8 - 4, dy: Math.random() * 8 - 4, color: "orange" },
        { x: 250, y: 50, radius: 20 * 0.75, dx: Math.random() * 8 - 4, dy: Math.random() * 8 - 4, color: "pink" },
        { x: 350, y: 400, radius: 20 * 0.75, dx: Math.random() * 8 - 4, dy: Math.random() * 8 - 4, color: "cyan" }
    ];

    gameStarted = false; // Mark the game as not started
});
