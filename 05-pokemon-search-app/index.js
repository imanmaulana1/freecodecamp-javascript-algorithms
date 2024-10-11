document
  .getElementById('search-button')
  .addEventListener('click', searchPokemon);

async function searchPokemon(e) {
  e.preventDefault();
  const searchInput = document.getElementById('search-input').value.trim();

  if (!searchInput) return;

  const url = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }
    const data = await response.json();
    document.getElementById('pokemon-name').innerText = data.name.toUpperCase();
    document.getElementById('pokemon-id').innerText = `#${data.id}`;
    document.getElementById('weight').innerText = `Weight: ${data.weight}`;
    document.getElementById('height').innerText = `Height: ${data.height}`;

    // Reset previous types
    document.getElementById('types').innerHTML = '';

    // Populate types
    data.types.forEach((typeInfo) => {
      const typeElement = document.createElement('span');
      typeElement.innerText = typeInfo.type.name.toUpperCase();
      document.getElementById('types').appendChild(typeElement);
    });

    // Add sprite image
    const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = '';
    const spriteImg = document.createElement('img');
    spriteImg.src = data.sprites.front_default;
    spriteImg.alt = `${data.name} sprite`;
    spriteImg.id = 'sprite'
    spriteContainer.appendChild(spriteImg);

    document.getElementById('hp').innerText = data.stats[0].base_stat; // HP
    document.getElementById('attack').innerText = data.stats[1].base_stat; // Attack
    document.getElementById('defense').innerText = data.stats[2].base_stat; // Defense
    document.getElementById('special-attack').innerText = data.stats[3].base_stat; // Special Attack
    document.getElementById('special-defense').innerText = data.stats[4].base_stat; // Special Defense
    document.getElementById('speed').innerText = data.stats[5].base_stat; // Speed
  } catch (error) {
    alert(error.message);
  }
}
