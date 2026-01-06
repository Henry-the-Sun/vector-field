const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let rocket = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 0,
  vy: 0,
  angle: 0,
  thrust: 0.1,
};

function drawRocket() {
  ctx.save();
  ctx.translate(rocket.x, rocket.y);
  ctx.rotate(rocket.angle);
  ctx.fillStyle = 'white';
  ctx.fillRect(-5, -10, 10, 20);
  ctx.restore();
}

function updateRocket() {
  // Basic controls: arrow keys
  if (keys['ArrowUp']) {
    rocket.vx += Math.sin(rocket.angle) * rocket.thrust;
    rocket.vy -= Math.cos(rocket.angle) * rocket.thrust;
  }
  if (keys['ArrowLeft']) rocket.angle -= 0.05;
  if (keys['ArrowRight']) rocket.angle += 0.05;

  rocket.x += rocket.vx;
  rocket.y += rocket.vy;

  // Wrap around screen edges
  if (rocket.x > canvas.width) rocket.x = 0;
  if (rocket.x < 0) rocket.x = canvas.width;
  if (rocket.y > canvas.height) rocket.y = 0;
  if (rocket.y < 0) rocket.y = canvas.height;
}

let keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateRocket();
  drawRocket();
  requestAnimationFrame(gameLoop);
}

gameLoop();
