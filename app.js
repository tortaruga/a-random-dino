const loading = document.getElementById('loading');
const result = document.getElementById('result');
const errorMsg = document.getElementById('error');
const dinoName = document.getElementById('dino-name');
const dinoSummary = document.getElementById('dino-summary');
const dinoDescription = document.getElementById('dino-description');
const wrapper = document.querySelector('.random-dino-wrapper');

const generateDinoBtn = document.getElementById('generate-random-dino');

generateDinoBtn.addEventListener('click', getRandomDinoInfo);

async function getDinosaurData() {
    hideElement(result);
    displayElement(loading);

    try {
        const url = 'https://dinoapi.brunosouzadev.com/api/dinosaurs';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('error fetching. status: ' + response.status);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error.message);
        hideElement(loading);
        displayElement(errorMsg);
        throw error;
    } 
}

async function getRandomDinoInfo() {
    try {
        
        const allDinos = await getDinosaurData();

        if (!allDinos || !Array.isArray(allDinos)) {
            throw new Error('invalid data format: should be an array');
        }

        displayElement(result);
        hideElement(loading);

        const randomIndex = Math.floor(Math.random() * allDinos.length); 
    
        let {name, weight, height, type, diet, period, existed, region, description} = allDinos[randomIndex];

    name = capitalizeWords(name);
    region = capitalizeWords(region); 
    period = capitalizeWords(period);

    const randomDinoSummary = `${name}, with a weight of ${weight} and a height of ${height}, was a ${diet} ${type} dinosaur who lived during the ${period} (${existed}) in ${region}`;
    dinoName.textContent = name;
    dinoSummary.textContent = randomDinoSummary;
    dinoDescription.textContent = description;
    wrapper.classList.add('generated');

    } catch (error) {
        console.error('error: ', error.message);
        hideElement(loading);
        displayElement(errorMsg);
    }
}

// utility functions
function capitalizeWords(str) {
    return str.trim()
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
} 

function hideElement(el) {
    el.style.display = 'none';
}

function displayElement(el) {
    el.style.display = 'flex';
}
