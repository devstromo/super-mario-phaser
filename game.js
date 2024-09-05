/* global Phaser */

import { createAnimations } from "./animations.js"
import { initAudio, playAudio } from "./audio.js"
import { checkControls } from "./controls.js"
import { initSpritesheet } from "./spritesheet.js"

const config = {
    autoFocus: false,
    type: Phaser.AUTO, // webgl, canvas
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload, // precargar recursos del juego
        create, // se ejecuta cuando el juego comienza
        update // se ejecuta en cada frame
    }
}

new Phaser.Game(config)

function preload() {
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )
    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    initSpritesheet(this)

    //--- audio ---
    initAudio(this)

}

function create() {
    createAnimations(this)
    // image(x,y, id-assets)
    this.add.image(100, 50, 'cloud1')
        .setOrigin(0.0, 0.0) // set image origin coords, by default is in the center of the imagen (0.5, 0.5)
        .setScale(0.15);

    this.floor = this.physics.add.staticGroup()

    this.floor.create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor.create(150, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    // this.mario = this.add.sprite(50, 212, 'mario')
    //     .setOrigin(0, 1)

    this.mario = this.physics.add.sprite(50, 100, 'mario')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(300)

    this.enemy = this.physics.add.sprite(120, config.height - 30, 'goomba')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setVelocityX(-50)
    this.enemy.anims.play('goomba-walk', true)


    this.coins = this.physics.add.staticGroup()

    this.coins.create(150, 150, 'coin').anims.play('coin-idle', true)
    this.coins.create(300, 150, 'coin').anims.play('coin-idle', true)

    this.physics.add.overlap(this.mario, this.coins, collectCoin, null, this)

    this.physics.world
        .setBounds(0, 0, 2000, config.height)


    this.physics.add.collider(this.mario, this.floor)

    this.physics.add.collider(this.enemy, this.floor)


    this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this)


    this.cameras.main
        .setBounds(0, 0, 2000, config.height)

    this.cameras.main
        .startFollow(this.mario)




    this.keys = this.input.keyboard.createCursorKeys()

}

function update() {

    checkControls(this)
    const { mario, scene } = this

    // death check
    if (mario.y >= config.height) {
        killMario(this)
    }
}

function onHitEnemy(mario, enemy) {
    if (mario.body.touching.down && enemy.body.touching.up) {
        enemy.anims.play('goomba-hurt', true)
        enemy.setVelocityX(0)
        playAudio('goomba-stomp', this)
        setTimeout(() => {
            enemy.destroy()
        }, 500);
        mario.setVelocityY(-200);
    } else {
        // mario death
        killMario(this)
    }
}

function killMario(game) {
    const { mario, scene } = game

    if (mario.isDead) return

    mario.isDead = true
    mario.anims.play('mario-dead', true)
    mario.setCollideWorldBounds(false)

    playAudio('gameover', game, { volume: 0.2 })
    setTimeout(() => {
        mario.setVelocityY(-200);
    }, 100);

    setTimeout(() => {
        scene.restart()
    }, 2000);
}

function collectCoin(mario, coin) {
    coin.disableBody(true, true)
    playAudio('coin-pickup', this, { volume: 0.2 })
    this.add.text(
        coin.x,
        coin.y,
        100,
        {
            fontFamily: 'pixel',
            fontSize: config.width / 25,
        }
    )
}