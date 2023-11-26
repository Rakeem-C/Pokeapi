const battleBackgroundImage = new Image()
battleBackgroundImage.src = '/pokemon_Cosmic/img/battleBackground.png'
const battleBackground = new Sprite ({
position: {
  x: 0,
  y: 0
},
image: battleBackgroundImage
})


let draggle = new Monster(monsters.Draggle)
let emby = new Monster(monsters.Emby)
let battleAnimationId
let renderedSprites = [draggle, emby]
let queue 

emby.attacks.forEach((attack) => {
  const button = document.createElement('button')
  button.innerHTML = attack.name
  document.querySelector('#attacksBox').append(button)
  
})



function initBattle() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#playerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()


  draggle = new Monster(monsters.Draggle)
  emby = new Monster(monsters.Emby)
  renderedSprites = [draggle, emby]
  queue = []

  emby.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
    
  })

  //Attack button Event Listener
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    emby.attack({
      attack: selectedAttack ,
      recipient: draggle,
      renderedSprites
    })
  
    if(draggle.health <= 0) {
      queue.push(() => {
        draggle.faint()
        })
        queue.push(() => {
        gsap.to('overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(battleAnimationId)
            animate()
            document.querySelector('#userInterface').style.display = 'none'
            gsap.to('#overlappingDiv',{
              opacity: 0
            })
            battle.initiated = false
            audio.Map.play()
          }
        })
          })
    }
    //Player or Enemy attacks
     const randomAttack =
      draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]
    queue.push(() => {
      draggle.attack({
        attack: randomAttack,
        recipient: emby,
        renderedSprites
      })
  
      if(emby.health <= 0) {
        queue.push(() => {
          emby.faint()
          })
          queue.push(() => {
            gsap.to('overlappingDiv', {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId)
                animate()
                document.querySelector('#userInterface').style.display = 'none'
                gsap.to('#overlappingDiv',{
                  opacity: 0
                })

                battle.initiated = false
                audio.Map.play()
              }
            })
              })
           return
      }
    })
  })
  button.addEventListener('mouseenter', (e) =>{
  const selectedAttack = attacks[e.currentTarget.innerHTML]
  document.querySelector('#attackType').innerHTML = selectedAttack.type
  document.querySelector('#attackType').style.color = selectedAttack.color
  })
  })
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()

  renderedSprites.forEach((monster) => {
    monster.draw()
  })
}


animate()
// initBattle()
// animateBattle()





document.querySelector('#dialogueBox').addEventListener('click', (e) =>
{ 
  if(queue.length > 0) {
    queue[0]()
    queue.shift()
  } else
  e.currentTarget.style.display = 'none'
})