console.log('I am JS !');

//* Sélection des éléments
const cookieForm = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const toastsContainer = document.querySelector('.toasts-container');
const cookiesList = document.querySelector('.cookies-list');
const displayCookiesBtn = document.querySelector('.display-cookie-btn');
const infoTxt = document.querySelector('.info-txt');

// Validation des champs
inputs.forEach((input) => {
    input.addEventListener('invalid', handleValidation);
    input.addEventListener('input', handleValidation);
});

// Message si l'input est vide
function handleValidation(e) {
    if (e.type === 'invalid') {
        e.target.setCustomValidity('Ce champ ne peut pas être vide !');
    } else if (e.type === 'input') {
        e.target.setCustomValidity('');
    }
}

// Récupération des données des input
cookieForm.addEventListener('submit', handleForm);

// Envoie du formulaire
function handleForm(e) {
    e.preventDefault();

    const newCookie = {};

    inputs.forEach((input) => {
        const nameAttribute = input.getAttribute('name');
        newCookie[nameAttribute] = input.value;
    });

    // Date d'expiration à une semaine
    newCookie.expire = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    // console.log(newCookie);

    createCookie(newCookie);

    cookieForm.reset();
}

// Création des cookies
function createCookie(newCookie) {
    // On vérifie si le cookie existe
    if (doesCookieExist(newCookie.name)) {
        creatToast({
            name: newCookie.name,
            state: 'modifié',
            color: 'orangered',
        });
    } else {
        creatToast({
            name: newCookie.name,
            state: 'ajouté',
            color: 'green',
        });
    }

    document.cookie = `${encodeURIComponent(
        newCookie.name
    )}=${encodeURIComponent(
        newCookie.value
    )}; expires = ${newCookie.expire.toUTCString()}`;

    if (cookiesList.children.length) {
        displayCookies();
    }
}

// On vérifie si le cookie existe
function doesCookieExist(name) {
    const cookies = document.cookie.replace(/\s/g, '').split(';');
    const onlyCookiesName = cookies.map((cookie) => cookie.split('=')[0]);
    // console.log(cookies, onlyCookiesName);

    const cookiePresence = onlyCookiesName.find(
        (cookie) => cookie === encodeURIComponent(name)
    );
    return cookiePresence;
}

// Affichage des toast
function creatToast({ name, state, color }) {
    const toastInfo = document.createElement('p');
    toastInfo.className = 'toast';

    toastInfo.textContent = `Le cookie "${name}" a été ${state} !`;
    toastInfo.style.background = color;
    toastsContainer.appendChild(toastInfo);

    setTimeout(() => {
        toastInfo.remove();
    }, 2500);
}

// Affichage des cookies
displayCookiesBtn.addEventListener('click', displayCookies);

let lock = false;

function displayCookies() {
    if (cookiesList.children.length) cookiesList.textContent = '';

    const cookies = document.cookie.replace(/\s/g, '').split(';').reverse();
    // console.log(cookies);

    if (!cookies[0]) {
        if (lock) return;

        lock = true;
        infoTxt.textContent = 'Aucun cookie à afficher !';
        setTimeout(() => {
            infoTxt.textContent = '';
            lock = false;
        }, 3000);
        return;
    }

    createElements(cookies);
}

function createElements(cookies) {
    cookies.forEach((cookie) => {
        const formatCookie = cookie.split('=');
        const listItem = document.createElement('li');
        const name = decodeURIComponent(formatCookie[0]);
        listItem.innerHTML = `
        <p>
            <span>Nom : </span>${name}
        </p>
        <p>
            <span>Valeur : </span>${decodeURIComponent(formatCookie[1])}
        </p>
        <button>x</button>
        `;

        listItem.querySelector('button').addEventListener('click', (e) => {
            creatToast({ name, state: 'supprimé', color: 'crimson' });
            document.cookie = `${encodeURIComponent(
                formatCookie[0]
            )}=; expires=${new Date(0).toUTCString()}`;

            e.target.parentElement.remove();
        });
        cookiesList.appendChild(listItem);
    });
}
