import express from 'express'
import { Liquid } from 'liquidjs';

const app = express()
const engine = new Liquid()

app.engine('liquid', engine.express())
app.set('view engine', 'liquid')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.set('port', process.env.PORT || 8000)
app.set('views', './views')

const apiBase = "https://pokeapi.co/api/v2/";

// const previous = "`${apiBase}pokemon?offset=-1`";
// const next = "`${apiBase}pokemon?offset=+1`";


app.get('/', async (req, res) => {
    try {
        const response = await fetch(`${apiBase}pokemon?limit=20`)
        const data = await response.json()

        const pokemonsWithSprites = await Promise.all(
            data.results.map(async (pokemon) => {
                const detailsResponse = await fetch(pokemon.url)
                const details = await detailsResponse.json()

                return {
                    name: details.name,
                    sprite: details.sprites.other.dream_world.front_default,
                    gif: details.sprites.other.showdown.front_default,
                    audio: details.cries.latest,
                    type: details.types[0].type.name 
                }
            })
        )

        res.render('index.liquid', {
            pokemons: pokemonsWithSprites
        })
    } catch (err) {
        res.render('error.liquid')
    }
})

app.get('/pokemon/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await fetch(`${apiBase}pokemon/${id}`);
        if (!response.ok) throw new Error("Pokemon not found");
      
        const data = await response.json();
        
        // haal de data op van de pokemon species
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        // haal de date op van de evolution chain
        const evoChainResponse = await fetch(speciesData.evolution_chain.url);
        const evoChainData = await evoChainResponse.json();
      
        const chain = evoChainData.chain;

        const firstName = chain.species.name;
        const secondName = chain.evolves_to[0]?.species?.name || null;
        const thirdName = chain.evolves_to[0]?.evolves_to[0]?.species?.name || null;

        // zorgen dat dit dezelfde pokemon is van de evolutionchain
        const getPokemonData = async (name) => {
            const response = await fetch(`${apiBase}pokemon/${name}`);
            if (!response.ok) return null;
            const pokemonEvo = await response.json();
            return {
              name: pokemonEvo.name,
              image: pokemonEvo.sprites.front_default,
              type: pokemonEvo.types[0].type.name
            };
          };

        // krijgen van de pokemon data anders laat niks zien
        const firstData = await getPokemonData(firstName);
        const secondData = secondName ? await getPokemonData(secondName) : null;
        const thirdData = thirdName ? await getPokemonData(thirdName) : null;

        // nieuwe benaming van de states first, second en third
        const activeState =
        pokemon.name === firstName ? "first" :
        pokemon.name === secondName ? "second" :
        pokemon.name === thirdName ? "third" : null;

        // laat de json file zien van de evolutionchain pad van evolution chain
        const evolutionChain = {
            first: firstData,
            second: secondData,
            third: thirdData,
            activeState
        };

        const pokemon = {
            name: data.name,
            front: data.sprites.front_default,
            back: data.sprites.back_default,
            sprite: data.sprites.other.dream_world.front_default,
            gif: data.sprites.other.showdown.front_default,
            audio: data.cries.latest,
            id: data.id,
            xp: data.base_experience,
            weight: data.weight,
            height: data.height,
            types: data.types,
            abilities: data.abilities,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special_attack: data.stats[3].base_stat,
            special_defense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
            type: data.types[0].type.name,
            typeTwo: data.types[1]?.type?.name || null 
          };
        


        res.render('pokemon.liquid', { pokemon })
    } catch (err) {
        res.render('error.liquid')
    }
})


app.get('/search', async (req, res) => {
    try {
        const keyword = req.query.p?.toLowerCase() || "";

        const response = await fetch(`${apiBase}pokemon`);
        const data = await response.json();

        const results = data.results.filter(pokemon =>
            pokemon.name.toLowerCase().includes(keyword)
        );

        if (results.length === 0) {
            return res.render('empty.liquid');
        }

        const detailedResults = await Promise.all(results.map(async (pokemon) => {
            const detailedResponse = await fetch(pokemon.url);
            const details = await detailedResponse.json();

            return {
                name: details.name,
                sprite: details.sprites.other.dream_world.front_default,
                gif: details.sprites.other.showdown.front_default,
                audio: details.cries.latest
            }
        }));

        res.render('index.liquid', {
            pokemons: detailedResults
        });
    } catch (err) {
        res.render('empty.liquid')
    }
})


// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {

  console.log('Dit is de PokeApp, gonna catch them all!')
  console.log(`http://localhost:${app.get('port')}`)
})

