/* global Phaser */

const config = {
    type: Phaser.AUTO, // webgl, canvas
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
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

    this.add.tileSprite(0, config.height - 32, config.width, 32,
        'floorbricks')
        .setOrigin(0, 0)

    this.mario = this.add.sprite(50, 212, 'mario')
        .setOrigin(0, 1)

    this.anims.create({
        key: 'mario-walk',
        frames: this.anims.generateFrameNumbers(
            'mario',
            { start: 0, end: 4, }
        ),
        frameRate: 12,
        repeat: -1 // repeat forever
    })

    this.keys = this.input.keyboard.createCursorKeys()

}

function update() {

    if (this.keys.left.isDown) {
        this.mario.x -= 2
        this.mario.anims.play('mario-walk', true)
    } else if (this.keys.right.isDown) {
        this.mario.x += 2
        this.mario.anims.play('mario-walk', true)
    } else {

    }
}