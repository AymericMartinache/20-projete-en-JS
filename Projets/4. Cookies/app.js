console.log('I am JS !');

//* Sélection des éléments
const cookieForm = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const toastsContainer = document.querySelector('.toasts-container');

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
