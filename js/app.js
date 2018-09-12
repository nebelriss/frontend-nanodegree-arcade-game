// Enemies our player must avoid
var Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  // reset enemy position when out of frame
  if (this.x > 600) {
    this.x = -25;
  }

  // check for collision
  if (this.x + 101 > player.x && this.x - 101 < player.x && this.y === player.y) {
    player.resetPlayerPosition();
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function () {
  this.resetPlayerPosition();
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function (dt) {}

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Player.prototype.handleInput = function (input) {

  switch (input) {
    case "left":
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case "right":
      if (this.x < 404) {
        this.x += 101;
      }
      break;
    case "up":
      if (this.y > -41.5) {
        this.y -= 83;
      }
      break;
    case "down":
      if (this.y < 373.5) {
        this.y += 83;
      }
      break;
  }

  console.log(`x: ${this.x}, y: ${this.y}`)

  // TODO: Check for winning condition
  if (this.y <= 0) {
    console.log('won');
  }

}

Player.prototype.resetPlayerPosition = function () {
  this.x = 404;
  this.y = 395;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [
  new Enemy(0, 63, 100),
  new Enemy(0, 146, 150),
  new Enemy(0, 229, 200)
];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});