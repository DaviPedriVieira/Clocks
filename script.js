const deg = 6;
const digitalClock = document.querySelector('.digitalClock');
const analogicClock = document.querySelector('.analogicClock')
const cronometer = document.querySelector('.cronometer')
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
    let now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    
    digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
}


const btnDigital = document.getElementById('btnDigital');

btnDigital.addEventListener('click', function() {
    console.log("Botão digital clicado!"); 
    analogicClock.style.display = 'none';
    digitalClock.style.display = 'flex';
    cronometer.style.display = 'none';
    btnsDigitalClock.style.display = 'flex';
});

const btnAnalogico = document.getElementById('btnAnalogico');

btnAnalogico.addEventListener('click', function() {
    console.log("Botão analógico clicado!"); 
    analogicClock.style.display = 'flex';
    digitalClock.style.display = 'none';
    cronometer.style.display = 'none';
    btnsDigitalClock.style.display = 'none';
});

const btnCronometro = document.getElementById('btnCronometro');

btnCronometro.addEventListener('click', function() {
    console.log("Botão analógico clicado!"); 
    analogicClock.style.display = 'none';
    digitalClock.style.display = 'none';
    cronometer.style.display = 'block';
    btnsDigitalClock.style.display = 'none';
});


// Cronômetro
const timerElement = document.getElementById('timer');
const timesList = document.getElementById('timesList');
let times = [];

let intervalId = 0;
let timer = 0;

const formatTime = (time) => {
    const hoursCrono = Math.floor(time / 3600000);
    const minutesCrono = Math.floor((time % 3600000) / 6000);
    const secondsCrono = Math.floor((time % 6000) / 100);

    return `${hoursCrono.toString().padStart(2, '0')}:${minutesCrono.toString().padStart(2, '0')}:${secondsCrono.toString().padStart(2, '0')}`;
}

function addTime(timeIndex, saveTime){
    timesList.innerHTML += `<p>Tempo ${timeIndex}: ${formatTime(saveTime)}</p>`
}

function saveTime() {
    times.push(timer);
    addTime(times.length, timer)
};

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


setAnalogicClock();
setInterval(setAnalogicClock, 1000);
updateDigitalClock();
setInterval(updateDigitalClock, 1000);

