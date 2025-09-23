document.addEventListener('DOMContentLoaded', () => {
    // Select all the necessary elements
    const searchInput = document.getElementById('campground-search');
    const cards = document.querySelectorAll('.campground-card');
    const loadMoreBtn = document.getElementById('btn-load-more');
    const noResultsMessage = document.getElementById('no-results-message');

    const itemsToShowInitially = 10;
    const itemsPerLoad = 5;
    let currentlyShown = itemsToShowInitially;

    // Initially hide cards beyond the initial count
    const hideExtraCards = () => {
        cards.forEach((card, index) => {
            if (index >= itemsToShowInitially) {
                card.classList.add('d-none');
            }
        });
        if (loadMoreBtn && cards.length > itemsToShowInitially) {
            loadMoreBtn.classList.remove('d-none');
        } else if (loadMoreBtn) {
            loadMoreBtn.classList.add('d-none');
        }
    };
    hideExtraCards();

    // Event listener for the "Load More" button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const nextBatch = currentlyShown + itemsPerLoad;

            for (let i = currentlyShown; i < nextBatch && i < cards.length; i++) {
                cards[i].classList.remove('d-none');
            }
            currentlyShown = nextBatch;

            if (currentlyShown >= cards.length) {
                loadMoreBtn.classList.add('d-none');
            }
        });
    }

    // Event listener for the search bar
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        let resultsFound = 0;

        // Hide the "Load More" button during a search
        if (loadMoreBtn) {
            loadMoreBtn.classList.add('d-none');
        }

        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const location = card.querySelector('.text-muted').textContent.toLowerCase();

            if (title.includes(searchTerm) || location.includes(searchTerm)) {
                card.classList.remove('d-none');
                resultsFound++;
            } else {
                card.classList.add('d-none');
            }
        });

        // Mostrar u ocultar el mensaje de no hay resultados
        if (noResultsMessage) {
            if (resultsFound === 0 && searchTerm.length > 0) {
                noResultsMessage.classList.remove('d-none');
            } else {
                noResultsMessage.classList.add('d-none');
            }
        }

        // Si el campo de búsqueda está vacío, restaurar el estado inicial
        if (searchTerm.length === 0) {
            hideExtraCards();
            if (loadMoreBtn) loadMoreBtn.classList.remove('d-none');
        }
    });
});