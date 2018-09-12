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

  // reset enemy position when out of frame and add random speed.
  if (this.x > 600) {
    this.x = -25;

    // add random speed between 100 and 500
    this.speed = Math.floor((Math.random() * (600 - 100) + 100));
  }

  // check for collision
  if (this.x + 60 > player.x && this.x - 60 < player.x && this.y === player.y) {
    resetGame()
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
  this.playerCanMove = true;
  this.resetPlayerPosition();
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function (dt) {}

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Player.prototype.handleInput = function (input) {

  if (this.playerCanMove) {
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
        if (this.y > -20) {
          this.y -= 83;
        }
        break;
      case "down":
        if (this.y < 373.5) {
          this.y += 83;
        }
        break;
    }
  }

  // Check for winning condition. If game is won show message and reset the game.
  if (this.y <= 0) {
    this.lockPlayerMovement();
    swal({
      title: "Gratulationa!",
      text: 'You have won the game!',
      icon: "success",
      button: "Restart Game",
    }).then((value) => {
      if (value) {
        resetGame();
        this.unlockPlayerMovement();
      }
    });
  }

}

Player.prototype.resetPlayerPosition = function () {
  this.x = 404;
  this.y = 395;
}

Player.prototype.lockPlayerMovement = function () {
  this.playerCanMove = false;
}

Player.prototype.unlockPlayerMovement = function () {
  this.playerCanMove = true;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function resetGame() {
  allEnemies.length = 0;
  allEnemies.push(new Enemy(0, 63, 250));
  allEnemies.push(new Enemy(0, 146, 400));
  allEnemies.push(new Enemy(0, 229, 200));
  player.resetPlayerPosition();
}

const allEnemies = [];
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
  },

  resetGame()
);