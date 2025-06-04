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
    const response = await fetch(`${apiBase}/pokemon?limit=25`)
    const data = await response.json()

    const pokemonsWithSprites = await Promise.all(
        data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url)
            const details = await detailsResponse.json()

            return {
                name: pokemon.name,
                sprite: details.sprites.other.dream_world.front_default,
                audio: details.cries.latest
            }
        })
    )

    res.render('index.liquid', {
        pokemons: pokemonsWithSprites
    })
})

app.get('/pokemon/:id', async (req, res) => {
    const id = req.params.id
    const response = await fetch(`${apiBase}/pokemon/${id}`)
    const data = await response.json()

    res.render('pokemon.liquid', {
        pokemon: data
    })
})

// app.get('/search', async (req, res) => {

// }

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {

  console.log('Dit is de PokeApp, gonna catch them all!')
  console.log(`http://localhost:${app.get('port')}`)
})

