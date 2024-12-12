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

function handleSubmit(e) {
    e.preventDefault();

    // Récupération des données
    const height = heightInput.value / 100;
    const weight = weightInput.value;

    // Calcul de l'IMC
    const imc = Number((weight / (height * height)).toFixed(1));
    // console.log(`Taille: ${height} m, Poids: ${weight} kg`, imc);

    // Si pas de données
    if (!height || !weight || imc === '') {
        result.style.color = 'red';
        result.textContent = 'Veuillez remplir les champs';
        imc = 0;
    } else {
        bmiValue.textContent = imc;
        result.style.color = 'black';

        result.innerHTML = `
          Votre indice d'IMC est de : <span>${imc}</span>
        `;
    }
}
