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


app.get('/', async (req, res) => {
    const response = await fetch(`${apiBase}/pokemon?limit=30`)
    const data = await response.json()

    const pokemonsWithSprites = await Promise.all(
        data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url)
            const details = await detailsResponse.json()

            return {
                name: details.name,
                sprite: details.sprites.other.dream_world.front_default,
                gif: details.sprites.other.showdown.front_default,
                audio: details.cries.latest
            }
        })
    )

    res.render('index.liquid', {
        pokemons: pokemonsWithSprites
    })
})

app.get('/pokemon/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await fetch(`${apiBase}/pokemon/${id}`);
        const data = await response.json();

        const pokemon = {
            name: data.name,
            front: data.sprites.front_default,
            back: data.sprites.back_default,
            sprite: data.sprites.other.dream_world.front_default,
            gif: data.sprites.other.showdown.front_default,
            audio: data.cries.latest
        };

        res.render('pokemon.liquid', {
            pokemon: pokemon 
        });
    } catch (error) {
        console.error('Failed to fetch Pokémon:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/search', async function(req, res) {
    const pokemonsAPI = await fetch(apiBase)
    const keyword = req.query.p?.toLowerCase();

    // als de keyword er niet tussenstaat dan geeft hij een error aan
    if (!keyword) {
        return res.status(400).json({ error: 'No keyword provided' });
    }

    const response = await fetch(`${apiBase}/pokemon?limit=150`);
    const data = await response.json();

    // zoekt binnen alle pokemon files
    const results = data.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(keyword)
    );

    // dit laat hij zien wanneer je the searchroute uitvoert
    const detailedResults = await Promise.all(results.map(async (pokemon) => {
        const detailedResponse = await fetch (pokemon.url);
        const details = await detailedResponse.json();

        return {
            name: details.name,
            sprite: details.sprites.other.dream_world.front_default,
            gif: details.sprites.other.showdown.front_default,
            audio: details.cries.latest
        }
    }
    ))
    // laad de nieuwe pagina met de results

    res.render('index.liquid', {
        pokemons: detailedResults
    })
});

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {

  console.log('Dit is de PokeApp, gonna catch them all!')
  console.log(`http://localhost:${app.get('port')}`)
})

