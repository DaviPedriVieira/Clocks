const deg = 6;
const digitalClock = document.querySelector('.digitalClock');
const analogicClock = document.querySelector('.analogicClock')
const cronometer = document.querySelector('.cronometer')
const divShowPeriod = document.querySelector('#showPeriod')
const btnsDigitalClock = document.querySelector('#btnsChangeType')


// relógio analógico
const hour = document.querySelector('#hourPointer');
const min = document.querySelector('#minutePointer');
const sec = document.querySelector('#secondPointer');


function setAnalogicClock() {
    let day = new Date();
    let hPointer = day.getHours() * 30;
    let minPointer = day.getMinutes() * deg;
    let secPointer = day.getSeconds() * deg;

    hour.style.transform = `rotateZ(${hPointer + minPointer / 12}deg)`;
    min.style.transform = `rotateZ(${minPointer}deg)`;
    sec.style.transform = `rotateZ(${secPointer}deg)`;
};


// relógio digital
function updateDigitalClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
   
    digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
}


// mostrar ou não cada relógio
const btnDigital = document.getElementById('btnDigital');

btnDigital.addEventListener('click', () => {
    changeToDigitalClock();
    saveClockStateToLocalStorage('digital');
});

function changeToDigitalClock() {
    analogicClock.style.display = 'none';
    digitalClock.style.display = 'flex';
    cronometer.style.display = 'none';
    btnsDigitalClock.style.display = 'flex';
    divShowPeriod.style.display = 'flex';
}


const btnAnalogico = document.getElementById('btnAnalogico');

btnAnalogico.addEventListener('click', () => {
    changeToAnalogicClock();
    saveClockStateToLocalStorage('analogic');
});

function changeToAnalogicClock() {
    analogicClock.style.display = 'flex';
    digitalClock.style.display = 'none';
    cronometer.style.display = 'none';
    btnsDigitalClock.style.display = 'none';
    divShowPeriod.style.display = 'none';
}


const btnCronometro = document.getElementById('btnCronometro');

btnCronometro.addEventListener('click', () => {
    changeToCronometer();
    saveClockStateToLocalStorage('cronometer');
});

function changeToCronometer() {
    analogicClock.style.display = 'none';
    digitalClock.style.display = 'none';
    cronometer.style.display = 'block';
    btnsDigitalClock.style.display = 'none';
    divShowPeriod.style.display = 'none';
}

// Cronômetro
const timerElement = document.getElementById('timer');
const timesList = document.getElementById('timesList');
let times = [];


let intervalId = 0;
let timer = 0;


function formatTime(time){
    const hoursCrono = Math.floor(time / 3600000).toString().padStart(2, '0');
    const minutesCrono = Math.floor((time % 3600000) / 6000).toString().padStart(2, '0');
    const secondsCrono = Math.floor((time % 6000) / 100).toString().padStart(2, '0');
    const milisecondsCrono = (time % 100).toString().padStart(2, '0');;

    return `${hoursCrono}:${minutesCrono}:${secondsCrono}:${milisecondsCrono}`;
};

// exclui um tempo da lista
function deleteTimeFromList(index) {
    let confirmation = confirm('Deseja realmente excluir? ');
    if (confirmation) {
        times.splice(index, 1);
        saveTimesToLocalStorage();
        renderTimes(); 
    }
}  

function saveTime() {
    if (timer == 0) {
        alert("Tempo inválido!");
    } else if (times.includes(timer)) {
        alert("Já existe um tempo igual salvo na lista!");
    } else {
        times.push(timer);
        saveTimesToLocalStorage();
        renderTimes();
    }
}


// salva os tempos no localStorage
function saveTimesToLocalStorage() {
    localStorage.setItem('times', JSON.stringify(times));
}

// carrega os tempos do localStorage
function loadTimesFromLocalStorage() {
    const savedTimes = localStorage.getItem('times');
    if (savedTimes) {
        times = JSON.parse(savedTimes);
        renderTimes(); 
    }
}

// renderiza a lista de tempos
function renderTimes() {
    timesList.innerHTML = ''; 

    times.forEach((time, index) => {
        timesList.innerHTML += `<p>Tempo ${index + 1}: ${formatTime(time)} <button id="deleteTime" onclick="deleteTimeFromList(${index})"><i class="fa-solid fa-circle-xmark"></i></button></p>`;
    });
}

loadTimesFromLocalStorage();

function resetTimer() {
    clearInterval(intervalId);
    timer = 0;
    setTimer (timer);
    marksList.innerHTML = '';
    const button = document.getElementById('power');
    button.getAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function toggleTimer() {
    const button = document.getElementById('startAndStop');
    const action = button.getAttribute('action');

    clearInterval(intervalId);

    if(action == 'start' || action == 'continue'){
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
};

function setTimer(time) {
    timerElement.innerText = formatTime(time);
};

document.getElementById('startAndStop').addEventListener('click', toggleTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('save').addEventListener('click', saveTime);


// salvando relógios no local storage

function saveClockStateToLocalStorage(clockType) {
    localStorage.setItem('clockState', clockType);
}

function loadClockStateFromLocalStorage() {
    const clockState = localStorage.getItem('clockState');
    if (clockState === 'digital') {
        digitalClock.style.display = 'flex';
        analogicClock.style.display = 'none';
        cronometer.style.display = 'none';
        btnsDigitalClock.style.display = 'flex';
    } else if (clockState === 'analogic') {
        digitalClock.style.display = 'none';
        analogicClock.style.display = 'flex';
        cronometer.style.display = 'none';
        btnsDigitalClock.style.display = 'none';
    } else if (clockState === 'cronometer') {
        digitalClock.style.display = 'none';
        analogicClock.style.display = 'none';
        cronometer.style.display = 'block';
        btnsDigitalClock.style.display = 'none';
    } else {
        digitalClock.style.display = 'flex';
        analogicClock.style.display = 'none';
        cronometer.style.display = 'none';
        btnsDigitalClock.style.display = 'flex';
    }
}

// Carregar o estado do relógio do localStorage ao carregar a página
loadClockStateFromLocalStorage();


setAnalogicClock();
setInterval(setAnalogicClock, 1000);
updateDigitalClock();
setInterval(updateDigitalClock, 1000);


/*

falta:
fazer a funcionalidade dos botões Am/Pm
salvar relógios no local storage

*/