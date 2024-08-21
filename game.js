/* global Phaser */

const config = {
    type: Phaser.AUTO, // webgl, canvas
    width: 256,
    height: 244,
    backgroundColor: '#fff',
    parent: 'game',
    scene: {
        preload, // precargar recursos del juego
        create, // se ejecuta cuando el juego comienza
        update // se ejecuta en cada frame
    }
}

new Phaser.Game(config)

function preload() {
    console.log('preload');
}

function create() {
    console.log('create');
}

function update() {
    console.log('update');
}