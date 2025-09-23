const searchInput = document.getElementById('campground-search');
const cards = document.querySelectorAll('.campground-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const location = card.querySelector('.text-muted').textContent.toLowerCase();

        if (title.includes(searchTerm) || location.includes(searchTerm)) {
            card.style.display = ''; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
});