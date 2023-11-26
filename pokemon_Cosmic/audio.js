const audio = {
  Map: new Howl({
    src:'/pokemon_Cosmic/audio/map.wav',
    html5: true
  }),
  initBattle: new Howl({
    src: '/pokemon_Cosmic/audio/initBattle.wav',
    html5: true,
    volume: 0.3
  }),
  battle: new Howl({
    src: '/pokemon_Cosmic/audio/battle.mp3',
    html5: true,
    volume: 0.3
  }),
  tackleHit: new Howl({
    src: '/pokemon_Cosmic/audio/tackleHit.wav',
    html5: true
  }),
  BadBreathHit: new Howl({
    src: '/pokemon_Cosmic/audio/BadBreathHit.wav',
    html5: true
  }),
  initBadBreath: new Howl({
    src: '/pokemon_Cosmic/audio/initBadBreath.wav',
    html5: true
  }),
  victory: new Howl({
    src: '/pokemon_Cosmic/audio/victory.wav',
    html5: true
  })
}