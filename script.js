let pokemon = [];
let currentPokemon;
let loadedPokemon = 1;

async function loadPokemon() {
    let start = loadedPokemon;
    let end = loadedPokemon + 151;

    for (let i = start; i < end; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/` + i;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemon.push(currentPokemon);
        renderPokemonInfo(i);
    }

    loadedPokemon = end;
}

function renderPokemonInfo(i) {
    dex = document.getElementById('pokedex');
    let capitalizedPokemonName = pokemon[i - 1]['name'].charAt(0).toUpperCase() + pokemon[i - 1]['name'].slice(1);

    let versions;
    let generation;
    let version;

    if (i < 152) {
        versions = 'versions'
        generation = 'generation-i';
        version = 'red-blue';
    } else if (i < 252) {
        versions = 'versions'
        generation = 'generation-ii';
        version = 'gold';
    } else if (i < 387) {
        versions = 'versions'
        generation = 'generation-iii';
        version = 'emerald';
    } else if (i < 494) {
        versions = 'versions'
        generation = 'generation-iv';
        version = 'diamond-pearl';
    } else if (i < 650) {
        versions = 'versions'
        generation = 'generation-v';
        version = 'black-white';
    } else if (i < 808) {
        versions = 'versions'
        generation = 'generation-vii';
        version = 'ultra-sun-ultra-moon';
    } else if (i < 1200) {
        versions = 'other'
        generation = 'official-artwork';
        version = '';
    }

    dex.innerHTML +=
        `<div onclick="openInfoCard(${i})" class="card-all">
        <h2> ${capitalizedPokemonName}</h2>
        <div class="dex-img-container">
            <img class="dex-img" src="${currentPokemon['sprites'][versions][generation][version]['front_default']}">
        </div>
    </div> 
    `;
}


function openInfoCard(i) {
    document.getElementById('infoCard').innerHTML = loadHTML(i);
    showStats(i);
}

function previousPokemon(i) {
    if (i > 1) {
        i--;
        openInfoCard(i);
    }
}

function nextPokemon(i) {
    i++;
    openInfoCard(i);
}

function closeDex() {
    document.getElementById('overarching-container').classList.add('d-none');
}

function showStats(i) {
    HP = pokemon[i - 1]['stats'][0]['base_stat'];
    Att = pokemon[i - 1]['stats'][1]['base_stat'];
    Def = pokemon[i - 1]['stats'][2]['base_stat'];
    SpAtt = pokemon[i - 1]['stats'][3]['base_stat'];
    SpDef = pokemon[i - 1]['stats'][4]['base_stat'];
    Speed = pokemon[i - 1]['stats'][5]['base_stat'];
    statTotal = HP + Att + Def + SpAtt + SpDef + Speed;

    const ctx = document.getElementById('show-stats');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special Attak', 'Special Defense', 'Speed'],
            datasets: [{
                label: 'Base Stats',
                data: [HP, Att, Def, SpAtt, SpDef, Speed, 149],
                borderWidth: 1,
                backgroundColor: [
                    'rgb(255,0,0,0.45)',
                    'rgb(240,128,48,0.45)',
                    'rgb(248,208,48,0.45)',
                    'rgb(104,144,240,0.45)',
                    'rgb(120,200,80)',
                    'rgb(248,88,136,0.45)'
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            tooltips: {
                enabled: false
            },
        }
    });
}


function showShiny(i) {
    document.getElementById('pokeImage').src = pokemon[i - 1]['sprites']['other']['official-artwork']['front_shiny'];
}

function showRegular(i) {
    document.getElementById('pokeImage').src = pokemon[i - 1]['sprites']['other']['official-artwork']['front_default']
}

function hideStats() {
    document.getElementById('pokeinfo').classList.add('opacity-zero-percent');
    document.getElementById('pokestats').classList.remove('opacity-zero-percent');
}

function hideInfo() {
    document.getElementById('pokeinfo').classList.remove('opacity-zero-percent');
    document.getElementById('pokestats').classList.add('opacity-zero-percent');
}

function showCredits() {
    document.getElementById('footer').classList.remove('d-none');
    document.getElementById('info').classList.add('d-none');
}

function closeCredits() {
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('info').classList.remove('d-none');
}

function loadHTML(i) {
    let capitalizedPokemonName = pokemon[i - 1]['name'].charAt(0).toUpperCase() + pokemon[i - 1]['name'].slice(1)
    let pokeImage = pokemon[i - 1]['sprites']['other']['official-artwork']['front_default'];
    let TypeOne = pokemon[i - 1]['types'][0]['type']['name'].charAt(0).toUpperCase() + pokemon[i - 1]['types'][0]['type']['name'].slice(1);
    let TypeTwo = pokemon[i - 1]['types'][1] ? pokemon[i - 1]['types'][1]['type']['name'].charAt(0).toUpperCase() + pokemon[i - 1]['types'][1]['type']['name'].slice(1) : '';
    let weightinKG = pokemon[i - 1]['weight'] / 10;
    let ability1 = pokemon[i - 1]['abilities'][0]['ability']['name'].charAt(0).toUpperCase() + pokemon[i - 1]['abilities'][0]['ability']['name'].slice(1);
    let ability2 = pokemon[i - 1]['abilities'][1] ? pokemon[i - 1]['abilities'][1]['ability']['name'].charAt(0).toUpperCase() + pokemon[i - 1]['abilities'][1]['ability']['name'].slice(1) : '';
    let ability3 = pokemon[i - 1]['abilities'][2] ? pokemon[i - 1]['abilities'][2]['ability']['name'].charAt(0).toUpperCase() + pokemon[i - 1]['abilities'][2]['ability']['name'].slice(1) : '';

    return `
    <div id="overarching-container" class="overarching-container">
    <div class="left-page-upper-decoration">
        <div class="big-blue-light"></div>
        <div class="three-small-lights">
            <div class="red-light"></div>
            <div class="green-light"></div>
            <div class="yellow-light"></div>
        </div>
    </div>
    <div class="encompassing-container">
        <div class="left-page">
            <div class="image-plus-decoration">
                <div class="small-red-lights-image-container">
                    <div class="small-red-lights-image"></div>
                    <div class="small-red-lights-image"></div>
                </div>
                <div class="wrap-around-image crt-effect">
                    <img id="pokeImage" class="big-picture" src="${pokeImage}">
                    <div class="pokemon-name-banner">
                        <span> ${capitalizedPokemonName} </span>
                        <span> #${i} </span>
                    </div>
                    <div class="red-light-and-stripes-image">
                        <div class="red-light-image"></div>
                        <div class="stripes-container">
                            <div class="stripes-image"></div>
                            <div class="stripes-image"></div>
                            <div class="stripes-image"></div>
                            <div class="stripes-image"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="left-page-lower-decoration">
                <div class="circlethinbuttons-rectangle">
                    <div class="greycircle-thinbuttons">
                        <div class="grey-circle"></div>
                        <div class="thin-buttons">
                            <div onclick='showShiny(${i})' class="thin-red-button pointer"> Shiny </div>
                            <div onclick='showRegular(${i})' class="thin-blue-button pointer"> Regular </div>
                        </div>
                    </div>
                    <div class="next-previous-mon-container">
                        <img onclick="previousPokemon(${i})" src="img/icons/left.png" class="previous-mon-button">
                        <img onclick="nextPokemon(${i})" src="img/icons/right.png" class="next-mon-button">
                    </div>
                </div>
            </div>
        </div>
        <div class="hinge">
            <div class="hinge-block">
                <div class="hinge-line"></div>
                <div class="hinge-line"></div>
            </div>
            <div class="hinge-block">
                <div class="hinge-line"></div>
                <div class="hinge-line"></div>
            </div>
        </div>
        <div class="right-page">
            <div class="display-and-buttons">
                <div class="green-display crt-effect">
                    <div class="">
                        <div id="pokeinfo" class="pokeinfo pointer-hover">
                            <span class="info-span"> Type: ${TypeOne}${TypeTwo ? ' / ' + TypeTwo : ''}</span> <br>
                            <span class="info-span"> Height: ${pokemon[i - 1]['height']}0 cm</span>
                            <span class="info-span"> Weight: ${weightinKG}kg</span>
                            <span class="info-span"> Possible Abilities: <br> ${ability1}${ability2 ? ' / ' + ability2 :
            ''}${ability3 ? '<br>' + ability3 : ''}</span>
                        </div>
                        <div id="pokestats" class="opacity-zero-percent">
                            <canvas id="show-stats"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="various-buttons">
                <div class="greenredbutton-leftrightbutton">
                    <div class="green-red-button">
                        <div class="red-light"></div>
                        <div class="green-light"></div>
                    </div>
                    <div class="left-right-button">
                        <img onclick="nextInfo()" src="img/icons/left.png" class="left-button">
                        <img onclick="previousInfo()" src="img/icons/right.png" class="right-button">
                    </div>
                </div>
                <div class="misc-buttons">
                    <div class="thin-buttons">
                        <div onclick="hideStats()" class="thin-red-button pointer">Stats</div>
                        <div onclick="hideInfo()" class="thin-blue-button pointer">Info</div>
                    </div>
                    <img onclick="closeDex()" class="cross" src="img/icons/cross.png">
                </div>
            </div>
        </div>
    </div>
    <div class="simulating-border-container"></div>
</div>
`;
}


// Add an event listener to the document to listen for clicks
document.addEventListener('click', function (event) {
    const infoCard = document.getElementById('overarching-container');
    const clickedOnPokemon = event.target.closest('.card-all');

    // Check if the click target is not on a Pokemon card, not on the "nextPokemon" button, and not on the "previousPokemon" button
    if (!clickedOnPokemon && event.target.className !== 'next-mon-button' && event.target.className !== 'previous-mon-button') {
        // Close the infoCard only if the click target is not within it or its ancestors
        if (!infoCard.contains(event.target)) {
            closeDex();
        }
    }
});



