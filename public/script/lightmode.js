const theButton = document.getElementById('button-index');
const  currentTheme = localStorage.getItem('theme');

// als de hudige theme donkere modus is dan zet colorscheme naar donker
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('moon');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.add('sun');
}

theButton.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    // als theme donker is zet het op lighte modus
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('moon');
        document.body.classList.add('sun');
    } else {
    // als theme licht is zet het op donkere modus
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    document.body.classList.remove('sun');
    document.body.classList.add('moon');
}
});