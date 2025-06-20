# the PokeApp
![title](https://github.com/user-attachments/assets/8a10a94d-d53a-4c6c-a01d-66b75de2bde9)
*The best and one only pokeapp on the planet!*

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

De PokeApp is een functie waarmee je alle informatie kan zien van alle Pokemons er is een openbare pokemon API dus die gebruik voor deze website.

Het project is gemaakt met JSNode. Dit is een combinatie van javascript en html. De data wordt opgehaald uit een API en dit wordt in de code verwerkt.

### Aanleiding

Deze opdracht wordt meestal gebruikt voor mensen die instappen bij het bedrijf tripple om aan te kunnen tonen hoe ze met een opdracht omgaan.

### Doelstelling

De core functionality is een zoek functie maken om te navigeren door alle pokemons. Hierbij is het belangrijk om alle punten van een RAPPE-website na te gaan. Responsive, Accessible, Performance en Progressive Enhancement. Er is ook een lijst meegegeven van alle punten in een MOSCoW-methode. Dit heb ik verwerkt in het projectboard.

Dit zijn de punten die het bedrijf heeft meegegeven:

- Het tonen van een overzicht van alle Pokémon
- Een zoekfunctie waarmee gebruikers eenvoudig een Pokémon kunnen vinden
- Mogelijkheid om op een Pokémon te klikken en door te gaan naar een detailpagina met uitgebreide informatie en statistieken.

### Code Conventie

Er wordt voornamelijk id’s gebruikt in [kebab case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) en alles wordt in het engels getypt. Soms zie je een class staan omdat je geen duplicate ID kan gebruiken op een HTML tag. Er wordt een stylesheet gebruikt die is gebaseerd op het ontwerp wat ik heb gemaakt.

Ik houd ook ademruimte tussen alle code zodat het overzichtelijk en semantiek eruit komt te zien.



## Beschrijving
**Hoofdpagina**

De webpagina bestaat uit de hoofdpagina. Dit is waar de zoekfunctie zit waar je kan navigeren door alle pokemons. Als je op een pokemon klikt kom je uit op de detailpagina van de pokemon die je aanklikt. Ook is er een overzicht waar alle Pokemons zijn opgesteld. Het is mij nog niet gelukt om pagination toe te passen.

<img width="1325" alt="Screenshot 2025-06-20 at 13 15 20" src="https://github.com/user-attachments/assets/9746ce35-16b3-4b15-803c-314bbce680df" />

**Detailpagina**

De detailpagina bevat alle informatie over de pokemon zelf dit is opgehaald uit de specifieke database van de Pokemon.

<img width="1098" alt="Screenshot 2025-06-20 at 13 24 44" src="https://github.com/user-attachments/assets/e2c6e872-64e5-497e-8c8b-dc16b71bd334" />

[Website](https://dashboard.render.com/web/srv-d119esqdbo4c739pt5q0/deploys/dep-d19vijidbo4c73but150)

### Routes

Hier beschrijf ik alle routes die ik in de server heb staan. Hier laat ik dan ook wat code voorbeelden zien.

**(/)**

Dit is de hoofdpagina. Hier kom je uit wanneer je op de website klikt en zie je een zoekbalk en alle Pokemons die in de API zitten. Ik heb hier wel gelimiteerd tot 150 aangezien het veel data kost wanneer je alle Pokemons inlaad. Dit gaat ten koste van de performance.

Eerst haal ik de data op

```
        const response = await fetch(`${apiBase}pokemon?limit=150`)
        const data = await response.json()
```

Vervolgens parse ik alle elementen die ik nodig heb ik fetch dit door een pad uit te voeren

```jsx
                return {
                    id: details.id,
                    name: details.name,
                    sprite: details.sprites.other.dream_world.front_default,
                    gif: details.sprites.other.showdown.front_default,
                    audio: details.cries.latest,
                    type: details.types[0].type.name 
                }
```

**(/pokemon/:id)**

Dit is een dynamische route dit betekent dat er meerdere pokemon routes zijn. Dit wordt bepaald door een parameter. Die kan je weer gebruiken bij het fetchen van de API.

```jsx
    const id = req.params.id;

    try {
        const response = await fetch(`${apiBase}pokemon/${id}`);
        if (!response.ok) throw new Error("Pokemon not found");
      
```

Hier wordt veel meer data meegegeven omdat alle informatie zichtbaar moet zijn van de pokemon. Aangezien dit met veel fetches gaat heb ik ervoor gekozen om dit op deze manier te doen. Alle informatie uit de database die ik moest hebben heb ik opgeschreven en allemaal een variable gegeven. 

```jsx
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
```

Wanneer ik dit weergeef in mijn liquid bestand dan wordt dat path uitgevoerd om tot dat soort informatie te komen.

**(/search)**

Ook heb ik de search functie route gemaakt. Dit wordt uitgevoerd wanneer je de form inlevert van je HTML.

```jsx
        let results = data.results.filter(pokemon =>
            pokemon.name.toLowerCase().includes(keyword)
        );
```

Keyword betekent wat er in de search input van de form staat. als je dit intoetst wordt er een filter toegepast op de overview en krijg je als resultaat de pokemons die het keyword bevatten.

## Gebruik
De user story is dat je een Pokemon kan opzoeken in de PokeDex. Dat je kan navigeren door alle pokemons heen. Wanneer er iets wordt ingevuld in de search input dan worden er resultaten weergegeven van alle pokemons die de waarde van de search input bevatten.

## Kenmerken

### Ontwerpkeuzes

![image](https://github.com/user-attachments/assets/91483d42-beb8-4263-94f2-d722335f9fc2)

Ik heb gekozen voor een ander ontwerp aangezien er een eis was dat je zo creatief mogelijk mocht zijn in het design. Dit heb ik ook gedaan. Ik heb een aantal schetsen gemaakt en het ontwerp uitgewerkt in [Figma](https://www.figma.com/proto/SUTCATTM3CI9blUFRuu10X/PokeApp?node-id=0-1&t=frOaxlN5umICrDtj-1). Ik gebruik hier meestal 3 devices, Desktop, Tablet en Mobile. Vanuit het design maak ik ook een stylesheet met CSS custom properties.

<img width="808" alt="Screenshot 2025-06-20 at 16 26 43" src="https://github.com/user-attachments/assets/b7a1e48f-44a3-4783-be4c-a42103d59a01" />
Bij de desktop versie staat de navigation bar aan de linkerkant zodat je aan de rechterkant alle Pokemons ziet die er zijn. Als je het scherm kleiner maakt verspringt de navigation bar naar de bovenkant. Dit heb ik bewust gedaan zodat de Pokemons goed zichtbaar blijven.

### Kleurstelling

De kleuren zijn niet voor niks deze kleuren. De achtergrond is identiek aan de eerste (op alfabetische volgorder) type. Ik heb hierbij deze code gebruikt: 

```
        <a href="/pokemon/{{ p.id }}" class="a-head" id="type-{{ p.type | downcase }}">
            <article  class="article-head">
```

Hier heb ik aparte id’s aangemaakt in de stylesheet die de juiste kleur weergeven wat de type van de pokemon is.

```css
#type-steel {
    background-color: var(--color-pokemon-type-steel);
    border: 2px solid var(--color-pokemon-type-steel-2);

    @media screen and (max-width: 1080px) {
        border: 1.5px solid var(--color-pokemon-type-steel-2);
    }

    @media screen and (max-width: 720px) {
        border: 1px solid var(--color-pokemon-type-steel-2);
    }
}
```

Dit heb ik ook gedaan met de progressbar op de detailpagina.

## Kenmerken

Hier beschrijf ik alle elementen met wat code voorbeelden en afbeeldingen.

**Zoekfunctie**

![Screenshot 2025-06-20 at 12.37.50.png](attachment:b92fb076-491a-43b8-9033-a7ba683167ba:Screenshot_2025-06-20_at_12.37.50.png)

De main priority van de webpagina is de zoekfunctie. De zoekfunctie is een functie waarbij wanneer je iets in de input intypt en op enter drukt je een overzicht krijgt van alle pokemons die wat er in de input staat bevat.

```
        <form action="search" method="get" aria-label="Search" id="form-search">
            <input type="search" name="p" required id="search-input" placeholder="SEARCH.." size="15">
            <button>
                <img src="../assets/general/search.png" height="20" width="17">
            </button>
        </form>
```

In liquid staat de zoekfunctie in een form met de action search. Wanneer je dit form verstuurd wordt er een nieuwe route aangelegd namelijk /search.

```jsx
        let results = data.results.filter(pokemon =>
            pokemon.name.toLowerCase().includes(keyword)
        );

```

Er is een filterfunctie aangemaakt dat wat er in de search input staat er wordt gecheckt in de database welke pokemons er zijn die deze input bevatten. De results hiervan worden gerenderd met alle benodigde informatie.

```jsx
        res.render('index.liquid', {
            pokemons: detailedResults
        });
```

**Dark/Lightmode**

Ook heb ik een dark/lightmode togepast dit was een should have in de lijst van eisen die het bedrijf had doorgegeven. Echter wilde ik hiermee oefenen. Ik heb de buttons zo gestyled dat ze een pokemon thema hebben.

<img width="1325" alt="Screenshot 2025-06-20 at 13 15 15" src="https://github.com/user-attachments/assets/fa6af9f8-80bf-4b30-ac9a-49a8686e5d51" />

<img width="1325" alt="Screenshot 2025-06-20 at 13 15 20" src="https://github.com/user-attachments/assets/5d9d52bd-80fa-4850-b97c-81d4a87ec11a" />



De icons zijn images in een button dit heb ik ook responsive gemaakt met door dit te doen.

<img width="61" alt="Screenshot 2025-06-20 at 13 14 58" src="https://github.com/user-attachments/assets/2dc9fda2-67f2-4f36-b737-39a04ea5671f" />

<img width="49" alt="Screenshot 2025-06-20 at 13 16 55" src="https://github.com/user-attachments/assets/ccaf27c9-2a7b-472d-be66-6c8d03d7be97" />

```
<button id="button-index">
    <picture class="sun-icon">
        <source srcset="../assets/general/sun.avif" type="image/avif">
        <source srcset="../assets/general/sun.webp" type="image/webp">
        <img src="../assets/general/sun.png" alt="sun-icon" width="25" height="25">
    </picture>

    <picture class="moon-icon">
        <source srcset="../assets/general/moon.avif" type="image/avif">
        <source srcset="../assets/general/moon.webp" type="image/webp">
        <img src="../assets/general/moon.png" alt="moon-icon" width="25" height="25">
    </picture>
</button>
```

Ik heb de functie color scheme gebruikt in de root dus heb ik van alle kleuren een tweede kleur gemaakt in de ‘dark-theme’. Dit staat allemaal in de stylesheet.

```css
[data-theme="dark"] {
    /* inverted colors */
    --color-light: #0f0f43;
    --color-dark: #d3d3d3;
    --color-day: #21104b;
    --color-night: #acacdd;
    --color-blue: #FFCB05;
    --color-yellow: #3B5BA7;

    --color-pokemon-type-grass: #bee2b7;
    --color-pokemon-type-grass-2: #6f8a6a;
    --color-pokemon-type-grass-3: #3ca729;
  
    --color-pokemon-type-normal: #bdbdbd;
    --color-pokemon-type-normal-2: #6b6868;
    --color-pokemon-type-normal-3: #3e3e3e;
  
    --color-pokemon-type-fire: #ffb3be;
    --color-pokemon-type-fire-2: #81444d;
    --color-pokemon-type-fire-3: #4e2a27;
  
    --color-pokemon-type-water: #a5b7ff;
    --color-pokemon-type-water-2: #334691;
    --color-pokemon-type-water-3: #1d2c6d;
  
    --color-pokemon-type-flying: #aaccff;
    --color-pokemon-type-flying-2: #345889;
    --color-pokemon-type-flying-3: #1c3456;
  
    --color-pokemon-type-fighting: #e9a8a4;
    --color-pokemon-type-fighting-2: #a04d4a;
    --color-pokemon-type-fighting-3: #632624;
  
    --color-pokemon-type-poison: #dbbfe7;
    --color-pokemon-type-poison-2: #835c9a;
    --color-pokemon-type-poison-3: #4c3360;
  
    --color-pokemon-type-electric: #ffe987;
    --color-pokemon-type-electric-2: #b29a3b;
    --color-pokemon-type-electric-3: #7e6c24;
  
    --color-pokemon-type-ground: #d29e83;
    --color-pokemon-type-ground-2: #7b573c;
    --color-pokemon-type-ground-3: #503622;
  
    --color-pokemon-type-rock: #ababab;
    --color-pokemon-type-rock-2: #5e5e5e;
    --color-pokemon-type-rock-3: #363636;
  
    --color-pokemon-type-psychic: #ffbbf4;
    --color-pokemon-type-psychic-2: #b068a3;
    --color-pokemon-type-psychic-3: #743570;
  
    --color-pokemon-type-ice: #9dd1ff;
    --color-pokemon-type-ice-2: #4a7ba6;
    --color-pokemon-type-ice-3: #285177;
  
    --color-pokemon-type-bug: #c7f8cc;
    --color-pokemon-type-bug-2: #68995b;
    --color-pokemon-type-bug-3: #3c5c33;
  
    --color-pokemon-type-ghost: #c095d4;
    --color-pokemon-type-ghost-2: #724a85;
    --color-pokemon-type-ghost-3: #42294e;
  
    --color-pokemon-type-steel: #c2c2c2;
    --color-pokemon-type-steel-2: #6a6a6a;
    --color-pokemon-type-steel-3: #3c3c3c;
  
    --color-pokemon-type-dragon: #6aa4f5;
    --color-pokemon-type-dragon-2: #30578f;
    --color-pokemon-type-dragon-3: #1a2e53;
  
    --color-pokemon-type-dark: #999999;
    --color-pokemon-type-dark-2: #4c4c4c;
    --color-pokemon-type-dark-3: #292929;
  
    --color-pokemon-type-fairy: #ffa1eb;
    --color-pokemon-type-fairy-2: #b55f98;
    --color-pokemon-type-fairy-3: #793866;

    --brightness: brightness(0%);

  }
```

Ik heb de code opgelost met client-side Javascript door alle variablen te noemen die ik van style wil veranderen. Dus alle elementen met deze specifieke kleur togglen naar the dark theme in de route.

```jsx
const theButton = document.getElementById('button-index');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const videoBg = document.getElementById('video-bg');
const videoBgNight = document.getElementById('video-bg-night');
const currentTheme = localStorage.getItem('theme');

```

Omdat ik de images zo heb gestyled heb ik een extra class gemaakt waarbij de maan verdwijnt als ik naar darkmode wil gaan. Dan komt de zon icoon en veranderd alles in darkmode.

```jsx

        // als theme donker is zet het op lighte modus
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');

            moonIcon?.classList.add('hidden');
            sunIcon?.classList.remove('hidden');
            videoBg.style.display = 'none';
            videoBgNight.style.display = 'block';
        // als theme licht is zet het op donkere modus
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
        videoBg.style.display = 'block';
        videoBgNight.style.display = 'none';
    }
    });
```

Ook heb ik een achtergrond video gemaakt die gelijk staat aan het licht/donker modus. Het leek mij leuk om dit als video op de achtergrond te doen. Dit gaat echter wel ten koste van het inladen van data aangezien een video best zwaar kan zijn om te laden.

De detailpagina deel ik door drie onderwerpen. In het ontwerp dat is meegeleverd worden er drie tabbladen over de pokemon laten zien de hoofdinformatie, progressbar en evolution chain.

**Detailpagina - Hoofdinfo**

<img width="992" alt="Screenshot 2025-06-20 at 16 54 46" src="https://github.com/user-attachments/assets/cef2d190-f3d9-4f20-b279-d9cad7f7f7e2" />


Hoe kan je op een creatieve manier data laten zien. Dat was de eerste vraag die ik stelde bij het ontwerp stuk. Ik wilde een creatieve manier vinden om de Pokemon data te laten zien. Dit doe ik door icoontjes te laten zien waar de informatie per tekst instaat.

```
            <div id="pokemon-type">
            {% for type in pokemon.types %}
                <img 
                        src="../assets/detail/types/type-{{ type.type.name }}.png" 
                        height="50" 
                        width="50" 
                        alt="pokemon-type-{{ type.type.name }}"
                        class="pokemon-type {{ type.type.name }}">
            {% endfor %}
            </div>
```

De Pokemon type iconen heb ik lokaal opgeslagen en wordt weergegeven welke pokemon types er allemaal zijn. Alle iconen draaien dus ook mee met de lichte en donkere modus. Er is een aparte path hiervan gemaakt in de server.

**Detailpagina - Progressbar**

<img width="1098" alt="Screenshot 2025-06-20 at 13 24 44" src="https://github.com/user-attachments/assets/35ce1ee9-8419-43a8-b611-65f05d4236df" />


Het tweede deel is de progressbar hier zie je alle statistieken van de pokemon zoals HP, speed en defence. Ik heb dit in een progress html tag gedaan met daarbij een label in deze stijl. 

```
    <div id="pokemon-textfield">
    <label for="progressbar_attack"> Attack </label>
    <label> {{ pokemon.attack }} </label>
    </div>
    <progress id="progressbar_attack" class="progress-type-{{ pokemon.type | downcase }}" value="{{ pokemon.attack }}" max="100"> {{ pokemon.attack }} </progress>

```

Bij de styling heb ik een code gebruikt voor het selecteren van de waarde namelijk progress[value]. De kleuren staan gelijk aan de eerst benoemde pokemon type.

```css
  progress[value]::-moz-progress-bar {
    background: var(--color);
  }
```

**Detailpagina - Evolution**

<img width="316" alt="Screenshot 2025-06-20 at 16 54 08" src="https://github.com/user-attachments/assets/3a0588b5-4399-4b7e-95c1-11247b6639cb" />


Als laatste hebben we de evolution chain. Aangezien dit een andere API was dan de reguliere Pokemon API moest ik hier een aparte fetch van maken. De evolution chain was namelijk wel connected met de pokemon-species API.

```jsx
        // haal de data op van de pokemon species
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        // haal de date op van de evolution chain
        const evoChainResponse = await fetch(speciesData.evolution_chain.url);
        const evoChainData = await evoChainResponse.json();
```

Deze informatie wordt opgehaald met alleen de pokemon type, name en image.

```jsx
        const firstName = chain.species.name;
        const secondName = chain.evolves_to[0]?.species?.name || null;
        const thirdName = chain.evolves_to[0]?.evolves_to[0]?.species?.name || null;

```

Dit is de route naar alle Pokemon evolutions er is ook een active state wat betekent dat de Pokemon die je nu open hebt staan dat die de actieve stand heeft. Je kan hier dus niet op doorklikken.

```
       {% assign first = EvolutionChain.first %}
        {% if first %}
        <div id="first-evolution"
             class="fe-type{{ first.type }}{% if EvolutionChain.activeState == 'first' %} active{% endif %}">
          {% if EvolutionChain.activeState != 'first' %}
            <a href="/pokemon/{{ first.name }}">
              <img 
              src="{{ first.image }}" 
              alt="{{ first.name }}"
              height="50"
              width="50"
              id="img-evolution">
            </a>

            <div id="animation-hover-2">
              <img src="../assets/general/balloon.svg" alt="ballon-{{ first.name }}" width="200" height="100" loading="lazy">
              <p id="name {{ first.name }}"> {{ first.name | capitalize }}</p>
            </div>
            
          {% else %}
                <img 
                src="{{ first.image }}" 
                alt="{{ first.name }}"
                height="75"
                width="75"
                id="img-evolution">

                <div id="animation-hover-2">
                  <img src="../assets/general/balloon.svg" alt="ballon-{{ first.name }}" width="200" height="100" loading="lazy">
                  <p id="name {{ first.name }}"> {{ first.name | capitalize }}</p>
                </div>

          {% endif %}
        </div>
        {% endif %}
```

In de liquid file ziet het er zo uit. Eerst wordt er assign gebruikt wanneer de evolution first is bijvoorbeeld wordt dat gecheckt met de server.js. Als dit de eerste is dan wordt de active state gebruikt dus kan je er niet op klikken.

Dit heb ik ook met de andere twee gedaan zodat je door kan klikken naar een andere evolutie.



https://github.com/user-attachments/assets/a97c6e62-5d34-4728-97ea-f541b69ce3d0



**Errorpagina**

<img width="1332" alt="Screenshot 2025-06-20 at 17 00 21" src="https://github.com/user-attachments/assets/57a58ad4-c5bc-41c8-b31e-1a0a0871b5a8" />


Als de pagina niet werkt dan wordt je geleid naar de error page. Het is voor mij overzichtelijk om hier partials van te maken aangezien je dit makkelijk kan aanschrijven en de code niet herhaalt wordt. Deze komt meestal onderaan de route te staan wanneer de pagina niet werkt.

```jsx
    } catch (err) {
        res.render('error.liquid')
    }
})
```

## Installatie
Je kan deze website betreden met het installeren van JSNode 14.0 en hoger.

1. Clone de repositry van GitHub
2. Sla het lokaal op de computer
3. Open de terminal van de code applicatie
4. Stel nu de jsnode package in met 'npm install'
5. Vervolgens typ je 'npm start'
6. Ga nu naar http://localhost:8000

OnRender voert deze stappen automatisch uit zodat de installatie via de url die in de shownote staat meteen wordt uitgevoerd

## Bronnen
[PokeAPI](https://pokeapi.co)

Vecteezy

[Progressbar](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-progress-value)

[Dark/Lightmode](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)

[Assign Liquid](https://shopify.dev/docs/api/liquid/tags/assign)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
