export const createAnimations = (game) => {
    game.anims.create({
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers(
            'mario',
            { start: 3, end: 1, }
        ),
        frameRate: 12,
        repeat: -1 // repeat forever
    })
    game.anims.create({
        key: 'mario-idle',
        frames: [{ key: 'mario', frame: 0 }],
        frameRate: 12,
        repeat: -1 // repeat forever
    })

    game.anims.create({
        key: 'mario-jump',
        frames: [{ key: 'mario', frame: 5 }],
    })
}