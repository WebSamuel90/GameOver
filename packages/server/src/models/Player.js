class Player {
  constructor(id, name) {
    this.id = id; // Socket ID
    this.name = name;
    this.health = 100;
    this.alive = true;
    this.inventory = [{
      type: 'Bazooka',
      ammo: 10,
    },
    {
      type: 'GrenadeLauncher',
      ammo: 10,
    },
    ];

    this.connected = true;
    this.color = 'blue'; // Blue, Green, Red
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
