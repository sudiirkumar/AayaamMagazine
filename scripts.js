function filterAndSortMagazines() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterCriteria = document.getElementById('filterCriteria').value;
    const sortCriteria = document.getElementById('sortCriteria').value;
    const magazineList = document.getElementById('magazineList');
    const magazines = Array.from(magazineList.getElementsByClassName('magazine-item'));

    let hasVisibleMagazines = false;

    // Filter magazines based on the selected filter criteria and search input
    magazines.forEach(magazine => {
        let textToMatch = '';

        if (filterCriteria === 'title') {
            textToMatch = magazine.getElementsByClassName('magazine-title')[0].innerText.toLowerCase();
        } else if (filterCriteria === 'publication-date') {
            textToMatch = magazine.getElementsByClassName('publication-date')[0].innerText.toLowerCase();
        } else if (filterCriteria === 'popularity') {
            textToMatch = magazine.dataset.popularity.toLowerCase();
        }

        if (textToMatch.includes(searchInput) || searchInput === '') {
            magazine.style.display = '';
            hasVisibleMagazines = true;
        } else {
            magazine.style.display = 'none';
        }
    });

    // Sort all magazines or only the visible ones based on the sort criteria
    magazines.sort((a, b) => {
        if (sortCriteria === 'title-asc') {
            return a.getElementsByClassName('magazine-title')[0].innerText.localeCompare(b.getElementsByClassName('magazine-title')[0].innerText);
        } else if (sortCriteria === 'title-desc') {
            return b.getElementsByClassName('magazine-title')[0].innerText.localeCompare(a.getElementsByClassName('magazine-title')[0].innerText);
        } else if (sortCriteria === 'date-asc') {
            return new Date(a.dataset.date) - new Date(b.dataset.date);
        } else if (sortCriteria === 'date-desc') {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        } else if (sortCriteria === 'popularity-asc') {
            return a.dataset.popularity - b.dataset.popularity;
        } else if (sortCriteria === 'popularity-desc') {
            return b.dataset.popularity - a.dataset.popularity;
        }
    });

    // Reorder elements in the DOM based on the sorted order
    magazines.forEach(magazine => magazineList.appendChild(magazine));

    // Show 'No results found' message if no magazines are visible
    const noResultsMessage = document.getElementById('noResultsMessage');
    noResultsMessage.style.display = hasVisibleMagazines ? 'none' : 'block';
}

// Call this function on page load to sort the magazines initially...
document.addEventListener('DOMContentLoaded', () => {
    filterAndSortMagazines();
});
