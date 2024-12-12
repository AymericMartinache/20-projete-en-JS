const BMIData = [
    { name: 'Maigreur', color: 'midnightblue', range: [0, 18.5] },
    { name: 'Bonne santé', color: 'green', range: [18.5, 25] },
    { name: 'Surpoids', color: 'lightcoral', range: [25, 30] },
    { name: 'Obésité modérée', color: 'orange', range: [30, 35] },
    { name: 'Obésité sévère', color: 'crimson', range: [35, 40] },
    { name: 'Obésité morbide', color: 'purple', range: 40 },
];

// IMC = poids en kg / taille² en m

// Séléction des éléments
const form = document.querySelector('form');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const bmiValue = document.querySelector('.bmi-value');
const result = document.querySelector('.result');

// Ajout des evt
form.addEventListener('submit', handleSubmit);

// Fonction du submit
function handleSubmit(e) {
    e.preventDefault();
    calculateBMI();
}

// Fonction de calcul d'IMC
function calculateBMI() {
    // Récupération des valeurs des inputs
    const height = heightInput.value / 100;
    const weight = weightInput.value;

    // Gestion des erreurs
    if (!height || !weight || height <= 0 || weight <= 0) {
        handleError();
        return;
    }
    // Calcul de l'IMC
    const imc = Number((weight / (height * height)).toFixed(1));
    // console.log(imc);

    showResult(imc);
}

// Affichage des erreurs
function handleError() {
    bmiValue.textContent = 'Wops !';
    bmiValue.style.color = 'inherit';
    result.textContent = "Merci d'indiquer votre taille et votre poids";
    result.style.color = 'inherit';
}

// Affichage des résultats
function showResult(imc) {
    const rank = BMIData.find((data) => {
        if (imc >= data.range[0] && imc < data.range[1]) return data;
        else if (typeof data.range === 'number' && imc > data.range)
            return data;
    });

    // IMC
    bmiValue.textContent = imc;
    bmiValue.style.color = `${rank.color}`;

    // Résultat
    result.textContent = `Résultat : ${rank.name}`;
}
