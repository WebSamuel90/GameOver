class Player {
  constructor(id, name) {
    this.id = id; // Socket ID
    this.name = name;
    this.health = 100;
    this.alive = true;
    this.inventory = [{
      type: 'Bazooka',
      ammo: 10,
      key: 'bazooka',
    },
    {
      type: 'GrenadeLauncher',
      ammo: 10,
      key: 'grenadelauncher', // using this until grenadelauncher exist
    },
    ];

    this.connected = true;
    this.colors = [
      'blue', 'green', 'red', 'purple', 'yellow', 'darkblue', 'turquoise', 'grey',
    ];
    this.color = this.colors[
      Math.floor(Math.random() * this.colors.length)
    ]; // blue, green, red, purple, yellow, darkblue, turquoise
  }

  updateHealth(healthChange) {
    this.health += healthChange;
    if (this.health < 0) this.health = 0;
  }

  die() {
    this.alive = false;
  }
}

export default Player;
