/* global Phaser */

const config = {
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

    this.load.spritesheet(
        'mario', // id
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16 }
    )

}

function create() {
    // image(x,y, id-assets)
    this.add.image(100, 50, 'cloud1')
        .setOrigin(0.0, 0.0) // set image origin coords, by default is in the center of the imagen (0.5, 0.5)
        .setScale(0.15);

    this.floor = this.physics.add.staticGroup()

    this.floor.create(0, config.height - 32, 'floorbricks')
        .setOrigin(0, 0)

    this.floor.create(100, config.height - 32, 'floorbricks')
        .setOrigin(0, 0)

    // this.mario = this.add.sprite(50, 212, 'mario')
    //     .setOrigin(0, 1)

    this.mario = this.physics.add.sprite(50, 100, 'mario')
        .setOrigin(0, 1)


    this.physics.add.collider(this.mario, this.floor)

    this.anims.create({
        key: 'mario-walk',
        frames: this.anims.generateFrameNumbers(
            'mario',
            { start: 3, end: 1, }
        ),
        frameRate: 12,
        repeat: -1 // repeat forever
    })
    this.anims.create({
        key: 'mario-idle',
        frames: [{ key: 'mario', frame: 0 }],
        frameRate: 12,
        repeat: -1 // repeat forever
    })

    this.anims.create({
        key: 'mario-jump',
        frames: [{ key: 'mario', frame: 5 }],
        frameRate: 12,
        repeat: -1 // repeat forever
    })
    this.keys = this.input.keyboard.createCursorKeys()

}

function update() {

    if (this.keys.left.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x -= 2
        this.mario.flipX = true
    } else if (this.keys.right.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x += 2
        this.mario.flipX = false
    } else if (this.keys.up.isDown) {
        this.mario.anims.play('mario-jump', true)
        this.mario.y += -5
    } else {
        this.mario.anims.play('mario-idle', true)
    }
}