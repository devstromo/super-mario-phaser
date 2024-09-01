const INIT_AUDIOS = [
    {
        key: 'gameover',
        path: 'assets/sound/music/gameover.mp3',
    },
    {
        key: 'goomba-stomp',
        path: 'assets/sound/effects/goomba-stomp.wav',
    },
]

export const initAudio = ({ load }) => {
    //--- audio ---
    INIT_AUDIOS.forEach(({ key, path }) => {
        load.audio(key, path)
    })
}