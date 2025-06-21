document.getElementById('form-search').addEventListener('submit', async function(e) {
    e.preventDefault();
    // wanneer je iets zoekt (dus op enter klikt refresh de pagina niet)

    const input = document.getElementById('search-input');
    // selecteer de search input
    const query = input.value.trim().toLowerCase();

    if (!query) return;

    // laat de content zien
    try {

        // de request van de server wordt opgevraagd ner war je hebt ingevuld in de search input
        // encodeURIcomponent zorgt ervoor dat spaties en speciale tekens in de search input kunnen
        const response = await fetch(`/search?p=${encodeURIComponent(query)}`);
        const html = await response.text();

        const parser = new DOMParser();
        // de html slaat de search input op in de server
        const doc = parser.parseFromString(html, 'text/html');
        // het wordt omgezet tot een virtueel html document
        const newContent = doc.getElementById('overview');
        // de resultaten worden weergegeven op de pagina

        if (newContent) {
            document.getElementById('overview').innerHTML = newContent.innerHTML;
        } else {
            // als er geen resultaten worden weergegeven laat dit dan zien
            document.getElementById('overview').innerHTML = 
            '<p> No results found </p>';
        }  
    } catch (err) {

        // wanneer heel de functie niet werkt
        document.getElementById('overview').innerHTML = '<p> The search function is not working </p>';
    }
});