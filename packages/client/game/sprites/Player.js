import Phaser from 'phaser';
import Weapon from './Weapon';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.info);
    this.id = config.info.id;
    this.name = config.info.name;
    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.scene.physics.add.collider(this.body, this.scene.groundLayer);
    this.body.setBounce(0.3);
    this.body.setCollideWorldBounds(true);
    this.body.setFrictionX(100);

    this.direction = 1;
    this.health = 100;
    this.velocity = {
      x: 150,
      y: -400,
    };
    this.health = 100;
    this.myTurn = false;

    this.animations = {
      left: `${config.key}-left`,
      right: `${config.key}-right`,
      standLeft: `${config.key}-standLeft`,
      standRight: `${config.key}-standRight`,
    };
    this.weapon = new Weapon({
      scene: this.scene,
      key: 'bazooka',
      x: this.x,
      y: this.y,
    });
  }

  update(keys) {
    // Host can move with keyboard in TestScene
    if (this.scene.scene.key === 'TestScene') {
      if (this.id === this.scene.gameState.host && this.body.onFloor() && !this.isFlying) {
        // // Moving the player
        if (keys.left && this.myTurn) {
          this.run(-this.velocity.x);
        } else if (keys.right && this.myTurn) {
          this.run(this.velocity.x);
        } else {
          this.run(0);
        }

        // JUMP
        if (keys.jump && this.body.onFloor()) {
          this.jump();
        }

        // FIRE WEAPON
        if (keys.fire) {
          this.startFire(keys.fire);
        } else if (!keys.fire && this.startedFire) {
          this.fire();
        }
      }
    }
    // FRICTION
    if (this.body.velocity.x > 0) {
      this.body.setVelocityX(this.body.velocity.x *= 0.99);
    }

    // Weapon
    if (this.weapon) {
      this.weapon.update(this.x, this.y);
    }

    // Flying variable
    if (this.body.onFloor()) {
      this.isFlying = false;
    }

  }

  run(vel) {
    this.body.setVelocityX(vel);
    if (vel < 0) {
      this.direction = -1;
      this.anims.play(this.animations.left, true);
    } else if (vel > 0) {
      this.direction = 1;
      this.anims.play(this.animations.right, true);
    } else if (this.direction === 1) {
      this.anims.play(this.animations.standLeft);
    } else {
      this.anims.play(this.animations.standRight);
    }
  }

  jump() {
    this.body.setVelocityY(this.velocity.y);
  }

  isItMyTurn(playersTurn) {
    this.myTurn = playersTurn === this.id;
  }

  startFire() {
    this.weapon.addThrust();
    this.startedFire = true;
  }

  fire() {
    this.startedFire = false;

    this.weapon.setAngle();
    this.weapon.fire(this.direction);
  }

  takeDamage(damage) {
    this.health = this.health - damage;
  }

  flyFromExplosion(explosion, damage) {
    this.isFlying = true;
    if (this.y < explosion.y) {
      this.body.setVelocityY(-(damage * 15));
    } else {
      this.body.setVelocityY((damage * 15));
    }
    if (this.x < explosion.x) {
      console.log('booom')
      this.body.setVelocityX(-(damage * 15));
    } else {
      this.body.setVelocityX((damage * 15));
    }

  }

  die() {
    this.scene.players.remove(this);
    // this.nameText.destroy();
    // this.destroy();
  }
}
