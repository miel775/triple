document.getElementById('form-search').addEventListener('submit', async function(e) {
    e.preventDefault();

    const input = document.getElementById('search-input');
    const query = input.value.trim().toLowerCase();

    if (!query) return;

    try {
        const response = await fetch(`/search?p=${encodeURIComponent(query)}`);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.getElementById('overview');

        if (newContent) {
            document.getElementById('overview').innerHTML = newContent.innerHTML;
        } else {
            document.getElementById('overview').innerHTML = '<p>No results found.</p>';
        }  
    } catch (err) {
        document.getElementById('overview').innerHTML = "views/empty.liquid";
    }
});