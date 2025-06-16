const theButton = document.getElementById('button-index');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const currentTheme = localStorage.getItem('theme');

// als de hudige theme donkere modus is dan zet colorscheme naar donker
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    sunIcon?.classList.add('hidden');
    moonIcon?.classList.remove('hidden');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    moonIcon?.classList.add('hidden');
    sunIcon?.classList.remove('hidden');
}

theButton.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    // als theme donker is zet het op lighte modus
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');

        moonIcon?.classList.add('hidden');
        sunIcon?.classList.remove('hidden');
    // als theme licht is zet het op donkere modus
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');

    sunIcon?.classList.add('hidden');
    moonIcon?.classList.remove('hidden');
}
});