const urls = [...Array(80).keys()].map(
  (item) => `https://pokeapi.co/api/v2/pokemon/${item + 1}`
);

// Shuffle the URLs
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
let pokeName;
let pokeType;
let pokePic;
let pokeHP;
let pokeHeight;
let pokeWeight;
let pokeAttack;
let pokeEffectUrl;
let pokeEffect;
let allPokemon = [];
const carousel = document.querySelector(".poke-cards");
let pokeCard;
let slides = [];
console.log(allPokemon);

async function fetchPokemonData() {
  try {
    const dataArray = await Promise.all(
      randomTwenty.map((url) => fetch(url).then((response) => response.json()))
    );
    console.log(dataArray);
    allPokemon = dataArray.map((pokeData) => ({
      pokeName: pokeData.name,
      pokeType: pokeData.types[0].type.name,
      pokePic: pokeData.sprites.front_default,
      pokeHP: pokeData.stats[0].base_stat,
      pokeHeight: pokeData.height,
      pokeWeight: pokeData.weight,
      pokeAttack: pokeData.moves[0].move.name,
      pokeEffectUrl: pokeData.moves[0].move.url,
    }));

    console.log(allPokemon);
  } catch (error) {
    console.error("There was an error fetching the data:", error);
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
    console.error("Error fetching Pokémon effect:", error);
  }
}

async function pokemonCard() {
  try {
    await fetchPokeEffect();
    for (let i = 0; i < allPokemon.length; i++) {
      pokeCard = `
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
      carousel.insertAdjacentHTML("beforeend", pokeCard);
    }
  } catch (error) {
    console.error("Error creating the Pokemon card:", error);
  }
}

//carousel

function updateIndices() {
  let current = slides.findIndex((slide) => slide.classList.contains("active"));
  let next = (current + 1) % slides.length;
  let nextTwo = (current + 2) % slides.length;
  let nextThree = (current + 3) % slides.length;
  let prev = (current - 1 + slides.length) % slides.length;
  let prevTwo = (current - 2 + slides.length) % slides.length;
  let prevThree = (current - 3 + slides.length) % slides.length;

  return { current, next, prev, nextTwo, nextThree, prevTwo, prevThree };
}

function updateCarousel() {
  let { current, next, prev, nextTwo, nextThree, prevTwo, prevThree } =
    updateIndices();
  slides.forEach((slide, index) => {
    slide.classList.remove(
      "active",
      "prev",
      "next",
      "prevTwo",
      "prevThree",
      "nextTwo",
      "nextThree"
    );
    if (index === current) slide.classList.add("active");
    if (index === next) slide.classList.add("next");
    if (index === prev) slide.classList.add("prev");
    if (index === nextTwo) slide.classList.add("nextTwo");
    if (index === prevTwo) slide.classList.add("prevTwo");
    if (index === nextThree) slide.classList.add("nextThree");
    if (index === prevThree) slide.classList.add("prevThree");
  });
}
const goToNum = (number) => {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[number].classList.add("active");
  updateCarousel();
};

const goToNext = (slides) => {
  let current = updateIndices().current;
  goToNum(current < slides.length - 1 ? current + 1 : 0);
};

const goToPrev = (slides) => {
  let current = updateIndices().current;
  goToNum(current > 0 ? current - 1 : slides.length - 1);
};

async function pokeCarousel() {
  try {
    await pokemonCard();
    slides = Array.from(document.querySelectorAll(".poke-item"));
    const buttons = document.querySelectorAll(".ctrl-button");
    

    

    buttons.forEach((button, i) => {
      button.addEventListener("click", () =>
        i === 0 ? goToPrev(slides) : goToNext(slides)
      );
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        goToPrev(slides);
      } else if (event.key === "ArrowRight") {
        goToNext(slides);
      }
    });

    updateCarousel();
  } catch (error) {
    console.error("Error creating the Pokemon card:", error);
  }
}
pokeCarousel();

// trigger & removes favorites modal

document.addEventListener("DOMContentLoaded", function () {
  let myDeck = document.querySelector(".deck-container");
  let popUp = document.getElementById("pop-up");
  let exitButton = document.querySelector("#exit");

  myDeck.addEventListener("click", function (event) {
    event.stopPropagation(); // Stop the click from propagating up to the document
    popUp.classList.add("is-visible");
  });


  exitButton.addEventListener("click", function () {
    popUp.classList.remove("is-visible");
  });
});

//Add Favorites
document.addEventListener("DOMContentLoaded", function () {
  let favButton = document.getElementById("add-favorite-button");
  favButton.addEventListener("click", function () {
    let activeIndex = slides.findIndex((slide) =>
      slide.classList.contains("active")
    );
    if (activeIndex !== -1) {
      let activeElement = slides[activeIndex];
      activeElement.classList.remove("active", "poke-item");
      activeElement.classList.add("poke-item-fav");

      // Add remove button
      let resetButton = '<button class="remove-from-fav">X</button>';
      activeElement.insertAdjacentHTML("afterbegin", resetButton);
      document.querySelector(".fav-container").appendChild(activeElement);
      removeButton(activeElement);
      // Remove the element from the slides array
      slides.splice(activeIndex, 1);

      // Set the next item as active, adjusting for the removed item
      let newActiveIndex = activeIndex % slides.length;
      if (slides.length > 0) {
        slides[newActiveIndex].classList.add("active");
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
  let container = document.querySelector(".fav-container"); // Replace with the actual parent container's selector
  let pokeItems = Array.from(container.querySelectorAll(".poke-item-fav"));

  pokeItems.sort(function (a, b) {
    let nameA = a.querySelector(".poke-name").textContent.trim().toLowerCase();
    let nameB = b.querySelector(".poke-name").textContent.trim().toLowerCase();

    if (sortAscending) {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  container.innerHTML = "";
  pokeItems.forEach((item) => container.appendChild(item));

  sortAscending = !sortAscending; // Toggle the sorting order for the next click
}

let sortButton = document.querySelector(".sort"); // Replace with the actual selector of your sort button
sortButton.addEventListener("click", sortPokeItems);

// Reset button

function resetFavContainer() {
  let favoritesContainer = document.querySelector(".fav-container");
  let pokeCards = document.querySelector(".poke-cards");

  while (favoritesContainer.firstChild) {
    let item = favoritesContainer.firstChild;
    item.classList.replace("poke-item-fav", "poke-item");
    slides.push(item);
    pokeCards.appendChild(item);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let resetFavButton = document.getElementsByClassName("reset")[0];
  resetFavButton.addEventListener("click", function () {
    resetFavContainer();
    updateTypeCounts();
  });
});

//Type Counter

function updateTypeCounts() {
  const types = [
    "water",
    "fire",
    "electric",
    "grass",
    "normal",
    "fighting",
    "fairy",
    "poison",
    "psychic",
    "ground",
    "bug",
    "rock",
  ];
  const favContainer = document.querySelector(".fav-container");

  types.forEach((type) => {
    const count = favContainer.querySelectorAll("." + type).length;
    document.getElementById(type).textContent = count;
  });
}

// Remove Favorites Individually

function removeButton(pokemonCardElement) {
  let removeButton = pokemonCardElement.querySelector(".remove-from-fav");
  if (removeButton) {
    removeButton.addEventListener("click", function () {
      pokemonCardElement.classList.replace("poke-item-fav", "poke-item");
      document.querySelector(".poke-cards").appendChild(pokemonCardElement);
      removeButton.remove();
      slides.push(pokemonCardElement);
      //Remove Remove Button

      updateTypeCounts();
    });
  }
}
