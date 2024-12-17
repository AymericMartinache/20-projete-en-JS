// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

//* Sélection des éléments
const form = document.querySelector('form');
const input = document.querySelector('input');
const errorMsg = document.querySelector('.error-msg');
const loader = document.querySelector('.loader');
const resultDisplay = document.querySelector('.results-display');

//* Gérer l'entrée de la recherche grâce au formulaire et à l'input.
form.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
    evt.preventDefault();
    if (input.value === '') {
        errorMsg.textContent = 'Veuillez remplir le champ de recherche.';
        errorMsg.style.color = '#e92e04';
        resultDisplay.textContent = '';
        return;
    } else {
        errorMsg.textContent = '';
        loader.style = 'display:flex';
        resultDisplay.textContent = '';
        wikiAPICall(input.value);
    }
}

//* Fonction d'appel à l'API
async function wikiAPICall(searchInput) {
    try {
        const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
        );
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const data = await response.json();

        loader.style = 'display:none';

        createCards(data.query.search);
    } catch (error) {
        console.log('Erreur fetch : ', error);
        errorMsg.textContent = `
           Une erreur est survenue ... ${error}
        `;
        errorMsg.style.color = '#e92e04';

        loader.style.display = 'none';
    }
}

//* Création des cartes
function createCards(data) {
    // Si pas de données

    if (!data.length) {
        errorMsg.textContent = 'Aucun résultat';
        errorMsg.style.color = '#111';
        loader.style.display = 'none';
        return;
    }
    data.forEach((element) => {
        const url = `https://fr.wikipedia.org/?curid=${element.pageid}`;
        const card = document.createElement('div');
        card.className = 'result-item';
        card.innerHTML = `
            <h3 class="result-title">
                <a href="${url}" target="_blank">${element.title} </a>
            </h3>

            <a href="${url}" class="result-link" target="_blank">${url}</a>
            <span class="result-snippet">${element.snippet}</span>
            <br>            
            `;
        resultDisplay.appendChild(card);
        loader.style.display = 'none';
    });
}
