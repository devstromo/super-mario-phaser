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
}

function create() {
    // image(x,y, id-assets)
    this.add.image(0, 0, 'cloud1')
        .setOrigin(0, 0) // set image origin coords, by default is in the center of the imagen (0.5, 0.5)
        .setScale(0.15);
}

function update() {
}