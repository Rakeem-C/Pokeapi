const monsters = {
  Emby: {
    position:{
      x: 300,
      y: 350
    },
    image: {
      src: '/pokemon_Cosmic/img/embySprite.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    isEnemy: false,
    name: 'Emby',
    attacks: [attacks.Tackle, attacks.BadBreath,attacks.None,attacks.None]
    },
    Draggle: {
      position:{
        x: 800,
        y: 100
      },
       image: {
        src: '/pokemon_Cosmic/img/draggleSprite.png'
      },
      frames: {
        max: 4,
        hold: 30
      },
      animate: true,
      isEnemy: true,
      name: 'Draggle',
      attacks: [attacks.Tackle, attacks.BadBreath]
      }
}