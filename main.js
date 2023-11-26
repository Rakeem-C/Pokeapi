const urls = [
'https://pokeapi.co/api/v2/pokemon/1',
'https://pokeapi.co/api/v2/pokemon/2',
'https://pokeapi.co/api/v2/pokemon/3',
'https://pokeapi.co/api/v2/pokemon/4',
'https://pokeapi.co/api/v2/pokemon/5',
'https://pokeapi.co/api/v2/pokemon/6',
'https://pokeapi.co/api/v2/pokemon/7',
'https://pokeapi.co/api/v2/pokemon/8',
'https://pokeapi.co/api/v2/pokemon/9',
'https://pokeapi.co/api/v2/pokemon/10',
'https://pokeapi.co/api/v2/pokemon/11',
'https://pokeapi.co/api/v2/pokemon/12',
'https://pokeapi.co/api/v2/pokemon/13',
'https://pokeapi.co/api/v2/pokemon/14',
'https://pokeapi.co/api/v2/pokemon/15',
'https://pokeapi.co/api/v2/pokemon/16',
'https://pokeapi.co/api/v2/pokemon/17',
'https://pokeapi.co/api/v2/pokemon/18',
'https://pokeapi.co/api/v2/pokemon/19',
'https://pokeapi.co/api/v2/pokemon/20',
'https://pokeapi.co/api/v2/pokemon/21',
'https://pokeapi.co/api/v2/pokemon/22',
'https://pokeapi.co/api/v2/pokemon/23',
'https://pokeapi.co/api/v2/pokemon/24',
'https://pokeapi.co/api/v2/pokemon/25',
'https://pokeapi.co/api/v2/pokemon/26',
'https://pokeapi.co/api/v2/pokemon/27',
'https://pokeapi.co/api/v2/pokemon/28',
'https://pokeapi.co/api/v2/pokemon/29',
'https://pokeapi.co/api/v2/pokemon/30',
'https://pokeapi.co/api/v2/pokemon/31',
'https://pokeapi.co/api/v2/pokemon/32',
'https://pokeapi.co/api/v2/pokemon/33',
'https://pokeapi.co/api/v2/pokemon/34',
'https://pokeapi.co/api/v2/pokemon/35',
'https://pokeapi.co/api/v2/pokemon/36',
'https://pokeapi.co/api/v2/pokemon/37',
'https://pokeapi.co/api/v2/pokemon/38',
'https://pokeapi.co/api/v2/pokemon/39',
'https://pokeapi.co/api/v2/pokemon/40',
'https://pokeapi.co/api/v2/pokemon/41',
'https://pokeapi.co/api/v2/pokemon/42',
'https://pokeapi.co/api/v2/pokemon/43',
'https://pokeapi.co/api/v2/pokemon/44',
'https://pokeapi.co/api/v2/pokemon/45',
'https://pokeapi.co/api/v2/pokemon/46',
'https://pokeapi.co/api/v2/pokemon/47',
'https://pokeapi.co/api/v2/pokemon/48',
'https://pokeapi.co/api/v2/pokemon/49',
'https://pokeapi.co/api/v2/pokemon/50',
'https://pokeapi.co/api/v2/pokemon/51',
'https://pokeapi.co/api/v2/pokemon/52',
'https://pokeapi.co/api/v2/pokemon/53',
'https://pokeapi.co/api/v2/pokemon/54',
'https://pokeapi.co/api/v2/pokemon/55',
'https://pokeapi.co/api/v2/pokemon/56',
'https://pokeapi.co/api/v2/pokemon/57',
'https://pokeapi.co/api/v2/pokemon/58',
'https://pokeapi.co/api/v2/pokemon/59',
'https://pokeapi.co/api/v2/pokemon/60',
'https://pokeapi.co/api/v2/pokemon/61',
'https://pokeapi.co/api/v2/pokemon/62',
'https://pokeapi.co/api/v2/pokemon/63',
'https://pokeapi.co/api/v2/pokemon/64',
'https://pokeapi.co/api/v2/pokemon/65',
'https://pokeapi.co/api/v2/pokemon/66',
'https://pokeapi.co/api/v2/pokemon/67',
'https://pokeapi.co/api/v2/pokemon/68',
'https://pokeapi.co/api/v2/pokemon/69',
'https://pokeapi.co/api/v2/pokemon/70',
'https://pokeapi.co/api/v2/pokemon/71',
'https://pokeapi.co/api/v2/pokemon/72',
'https://pokeapi.co/api/v2/pokemon/73',
'https://pokeapi.co/api/v2/pokemon/74',
'https://pokeapi.co/api/v2/pokemon/75',
'https://pokeapi.co/api/v2/pokemon/76',
'https://pokeapi.co/api/v2/pokemon/77',
'https://pokeapi.co/api/v2/pokemon/78',
'https://pokeapi.co/api/v2/pokemon/79',
'https://pokeapi.co/api/v2/pokemon/80',
]

function pickRandom(items) {
  // Shuffle the array
  for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]]; // Swap elements
  }

  // Return the first 20 items
  return items.slice(0, 20);
}

const randomTwenty = pickRandom(urls);
console.log(randomTwenty);
let pokeName 
let pokeType 
let pokePic 
let pokeHP 
let pokeHeight 
let pokeWeight 
let pokeAttack 
let pokeEffectUrl 
let pokeEffect 
let allPokemon = [];
const carousel = document.querySelector('.poke-cards');
let pokeCard
let slides = [];
console.log(allPokemon);

async function fetchPokemonData() {
  try {
    const dataArray = await Promise.all(randomTwenty.map(url =>
      fetch(url).then(response => response.json())
    ));
      console.log(dataArray);
   allPokemon = dataArray.map(pokeData => ({
      pokeName: pokeData.name,
      pokeType: pokeData.types[0].type.name,
      pokePic: pokeData.sprites.front_default,
      pokeHP: pokeData.stats[0].base_stat,
      pokeHeight: pokeData.height,
      pokeWeight: pokeData.weight,
      pokeAttack: pokeData.moves[0].move.name,
      pokeEffectUrl: pokeData.moves[0].move.url
    }));

     console.log(allPokemon);
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
  
}



async function fetchPokeEffect() {
  try {
    
    await fetchPokemonData();

    
    for (const pokemon of allPokemon) {
      const response = await fetch(pokemon.pokeEffectUrl);
      const effectData = await response.json();
      pokemon.pokeEffect = effectData.flavor_text_entries[0].flavor_text;
    }

    console.log(allPokemon);  
  } catch (error) {
    console.error('Error fetching Pokémon effect:', error);
  }
}




async function pokemonCard() {
 try {
  
  await fetchPokeEffect();
  for (let i=0; i < allPokemon.length; i++) {
  pokeCard = 
        `
        <div class="poke-item  ${allPokemon[i].pokeType}">
            <div class="card-header">
                <div class="poke-name">${allPokemon[i].pokeName}</div>
                <div class="right-side">
                    <div class="poke-hp">${allPokemon[i].pokeHP} HP</div>
                    <div class="poke-type"><img src="/images/type-icons/${allPokemon[i].pokeType}.png" alt="icon"></div>
                </div>
            </div>
            <div class='poke-img'> 
                <img src="${allPokemon[i].pokePic}" alt="pokemon img">
            </div>
            <div class="img-subhead">
                <div class="species">${allPokemon[i].pokeType} Pokemon.</div>
                <div class="length">Height: ${allPokemon[i].pokeHeight} </div>
                <div class="weight">Weight: ${allPokemon[i].pokeWeight} </div>
            </div>
            <div class="ability">
                <div class="poke-type"><img src="/images/type-icons/${allPokemon[i].pokeType}.png" alt="icon"></div>
                <div class="ability-descript"><h4 class="ability-name">${allPokemon[i].pokeAttack}</h4> <br>Effect: ${allPokemon[i].pokeEffect} </div>
                <div class="damage-amt"> 10 </div>
            </div>
        </div>
        `;

        // insert into DOM
        carousel.insertAdjacentHTML('beforeend',pokeCard);
  
  }


 } catch(error) {
  console.error('Error creating the Pokemon card:', error);
 }


}



//carousel 


function updateIndices() {
  let current = slides.findIndex(slide => slide.classList.contains('active'));
  let next = (current + 1) % slides.length;
  let nextTwo = (current + 2) % slides.length;
  let nextThree = (current + 3) % slides.length;
  let prev = (current - 1 + slides.length) % slides.length;
  let prevTwo = (current - 2 + slides.length) % slides.length;
  let prevThree = (current - 3 + slides.length) % slides.length;

  return { current, next, prev, nextTwo, nextThree, prevTwo, prevThree };
}

function updateCarousel() {
  let { current, next, prev, nextTwo, nextThree, prevTwo, prevThree } = updateIndices();
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev', 'next', 'prevTwo', 'prevThree', 'nextTwo', 'nextThree');
    if (index === current) slide.classList.add('active');
    if (index === next) slide.classList.add('next');
    if (index === prev) slide.classList.add('prev');
    if (index === nextTwo) slide.classList.add('nextTwo');
    if (index === prevTwo) slide.classList.add('prevTwo');
    if (index === nextThree) slide.classList.add('nextThree');
    if (index === prevThree) slide.classList.add('prevThree');
  });
}



async function pokeCarousel() {
  try {
    await pokemonCard();
    slides = Array.from(document.querySelectorAll('.poke-item'));
    const buttons = document.querySelectorAll('.ctrl-button');
    const goToNum = number => {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[number].classList.add('active');
      updateCarousel();
    };

    const goToNext = () => {
      let current = updateIndices().current;
      goToNum(current < slides.length - 1 ? current + 1 : 0);
    };

    const goToPrev = () => {
      let current = updateIndices().current;
      goToNum(current > 0 ? current - 1 : slides.length - 1);
    };

    buttons.forEach((button, i) => {
      button.addEventListener('click', () => i === 0 ? goToPrev() : goToNext());
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        goToPrev();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    });

    updateCarousel();
  } catch (error) {
    console.error('Error creating the Pokemon card:', error);
  }
}
pokeCarousel()


// trigger & removes favorites modal

document.addEventListener('DOMContentLoaded', function() {
  let myDeck = document.querySelector('.deck-container');
  let popUp = document.getElementById('pop-up');
  let exitButton = document.querySelector('#exit');

  myDeck.addEventListener('click', function(event) {
      event.stopPropagation(); // Stop the click from propagating up to the document
      popUp.classList.add('is-visible');
  });

  document.addEventListener('click', function(event) {
      if (!popUp.contains(event.target) && popUp.classList.contains('is-visible')) {
          popUp.classList.remove('is-visible');
      }
  });

  
  exitButton.addEventListener('click', function() {
      popUp.classList.remove('is-visible');
  });
});


//Add Favorites
document.addEventListener('DOMContentLoaded', function() {
  let favButton = document.getElementById('add-favorite-button');
  favButton.addEventListener('click', function() {
    let activeIndex = slides.findIndex(slide => slide.classList.contains('active'));
    if (activeIndex !== -1) {
      let activeElement = slides[activeIndex];
      activeElement.classList.remove('active', 'poke-item');
      activeElement.classList.add('poke-item-fav');


      // Add remove button
      let resetButton = '<button class="remove-from-fav">X</button>';
      activeElement.insertAdjacentHTML('afterbegin', resetButton);
      document.querySelector('.fav-container').appendChild(activeElement);
      removeButton(activeElement);
      // Remove the element from the slides array
      slides.splice(activeIndex, 1);

      // Set the next item as active, adjusting for the removed item
      let newActiveIndex = activeIndex % slides.length;
      if (slides.length > 0) {
        slides[newActiveIndex].classList.add('active');
      }

      // Update the carousel
      updateCarousel();

      //Update Type counter
      updateTypeCounts();
    }
  });
});



let sortAscending = true; 


function sortPokeItems() {
  let container = document.querySelector('.fav-container'); // Replace with the actual parent container's selector
  let pokeItems = Array.from(container.querySelectorAll('.poke-item-fav'));

  pokeItems.sort(function(a, b) {
      let nameA = a.querySelector('.poke-name').textContent.trim().toLowerCase();
      let nameB = b.querySelector('.poke-name').textContent.trim().toLowerCase();

      if (sortAscending) {
          return nameA.localeCompare(nameB);
      } else {
          return nameB.localeCompare(nameA);
      }
  });

  container.innerHTML = '';
  pokeItems.forEach(item => container.appendChild(item));

  sortAscending = !sortAscending; // Toggle the sorting order for the next click
}

let sortButton = document.querySelector('.sort'); // Replace with the actual selector of your sort button
sortButton.addEventListener('click', sortPokeItems);

// Reset button

function resetFavContainer() {
  let favoritesContainer = document.querySelector('.fav-container');
  let pokeCards = document.querySelector('.poke-cards');

  while (favoritesContainer.firstChild) {
    let item = favoritesContainer.firstChild;
    item.classList.replace('poke-item-fav', 'poke-item');
    slides.push(item)
    pokeCards.appendChild(item);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let resetFavButton = document.getElementsByClassName('reset')[0];
  resetFavButton.addEventListener('click', function() {
    resetFavContainer();
    updateTypeCounts()
  });
  
});



//Type Counter

function updateTypeCounts() {
  const types = ['water', 'fire', 'electric', 'grass', 'normal', 'fighting', 'fairy', 'poison', 'psychic', 'ground','bug','rock'];
  const favContainer = document.querySelector('.fav-container');

  types.forEach(type => {
    const count = favContainer.querySelectorAll('.' + type).length;
    document.getElementById(type).textContent = count;
  });
}


// Remove Favorites Individually

function removeButton(pokemonCardElement) {
  let removeButton = pokemonCardElement.querySelector('.remove-from-fav');
  if (removeButton) {
    removeButton.addEventListener('click', function() {
      pokemonCardElement.classList.replace('poke-item-fav', 'poke-item');
      document.querySelector('.poke-cards').appendChild(pokemonCardElement);
      removeButton.remove();
      slides.push(pokemonCardElement);
      //Remove Remove Button

      updateTypeCounts();
    });
  }
}








