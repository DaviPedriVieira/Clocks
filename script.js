const deg = 6;
const digitalClock = document.querySelector('.digitalClock');
const analogicClock = document.querySelector('.analogicClock')
const cronometer = document.querySelector('.cronometer')
const divShowPeriod = document.querySelector('#showPeriod')
const btnsDigitalClock = document.querySelector('#btnsChangeType')
const digitalClockBackground = document.querySelector('.digitalClockBackground')
const analogicClockBackground = document.querySelector('.analogicClockBackground')



// Relógio analógico
const hour = document.querySelector('#hourPointer');
const min = document.querySelector('#minutePointer');
const sec = document.querySelector('#secondPointer');

function updateAnalogicClock() {
    let now = new Date();
    let hPointer = now.getHours() * 30;   //  360°/12h = 30° p hr
    let minPointer = now.getMinutes() * deg; //  360°/60min = 6° p min
    let secPointer = now.getSeconds() * deg; 

    hour.style.transform = `rotateZ(${hPointer + minPointer / 12}deg)`; //  minutos/12 = fração que o ponteiro da hr vai andar
    min.style.transform = `rotateZ(${minPointer}deg)`;  
    sec.style.transform = `rotateZ(${secPointer}deg)`; 
};



// Relógio digital
const btnAmPm = document.getElementById('amPm');

btnAmPm.addEventListener('click', changeTimeFormat);

let use24HourFormat = false;

function changeTimeFormat() {
    use24HourFormat = !use24HourFormat;
    updateDigitalClock();
}

function updateDigitalClock() {
    const now = new Date();
    let hours;

    if (use24HourFormat) {
        hours = String(now.getHours()).padStart(2, "0");
    } else {
        hours = String((now.getHours() % 12) || 12).padStart(2, "0");
    }

    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    digitalClock.textContent = `${hours}:${minutes}:${seconds}`;;

    const clock = localStorage.getItem('whichClock');
    if (clock === 'digital') {
        if(!use24HourFormat) {
            divShowPeriod.style.display = 'flex';
            divShowPeriod.textContent = now.getHours() >= 12 ? 'PM' : 'AM';
        } else {
            divShowPeriod.style.display = 'none';
    }} else {
        divShowPeriod.style.display = 'none';
    }
    saveFormatToLocalStorage(use24HourFormat)
}

function saveFormatToLocalStorage(use24HourFormat) {
    localStorage.setItem('hourFormat', JSON.stringify(use24HourFormat));
}

window.onload = loadDigitalClockTimeFormat();

function loadDigitalClockTimeFormat() {
    const use24HourFormat = localStorage.getItem('hourFormat');
    if (use24HourFormat == 'true') {
        btnAmPm.click();
    }
};



// Cronômetro
const timerElement = document.getElementById('timer');
const timesList = document.getElementById('timesList');
let times = [];
let interval = 0;
let timer = 0;


function ShowTheTime(time){
    const hoursCrono = Math.floor(time / 3600000).toString().padStart(2, '0');
    const minutesCrono = Math.floor((time % 3600000) / 6000).toString().padStart(2, '0');
    const secondsCrono = Math.floor((time % 6000) / 100).toString().padStart(2, '0');
    const milisecondsCrono = (time % 100).toString().padStart(2, '0');

    return `${hoursCrono}:${minutesCrono}:${secondsCrono}:${milisecondsCrono}`;
};

function deleteTimeFromList(index) {
    let confirmation = confirm('Deseja realmente excluir? ');
    if (confirmation) {
        times.splice(index, 1);
        saveTimesToLocalStorage();
        showTimes(); 
    }
}  

function saveTimeOnTheList() {
    if (timer == 0) {
        alert("Tempo inválido!");
    } else if (times.includes(timer)) {
        alert("Já existe um tempo igual salvo na lista!");
    } else {
        times.push(timer);
        saveTimesToLocalStorage();
        showTimes();
    }
}

function saveTimesToLocalStorage() {
    localStorage.setItem('times', JSON.stringify(times));
}

// carrega os tempos do localStorage
function loadTimesListFromLocalStorage() {
    const savedTimes = localStorage.getItem('times');
    if (savedTimes) {
        times = JSON.parse(savedTimes);
        showTimes(); 
    }
}

function showTimes() {
    timesList.innerHTML = ''; 

    times.forEach((time, index) => {
        timesList.innerHTML += `<p>Tempo ${index + 1}: ${ShowTheTime(time)} <button id="deleteTime" onclick="deleteTimeFromList(${index})"><i class="fa-solid fa-circle-xmark"></i></button></p>`;
    });
}

loadTimesListFromLocalStorage();

function resetTimer() {
    clearInterval(interval);
    timer = 0;
    setTimer (timer);
    const button = document.getElementById('power');
    button.getAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function ChangeBtnTimerForm() {
    const button = document.getElementById('startAndStop');
    const action = button.getAttribute('action');

    clearInterval(interval);

    if(action == 'start' || action == 'continue'){
        interval = setInterval(() => {
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
    timerElement.innerText = ShowTheTime(time);
};

document.getElementById('startAndStop').addEventListener('click', ChangeBtnTimerForm);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('save').addEventListener('click', saveTimeOnTheList);


// mostrar ou não cada relógio
const btnDigital = document.getElementById('btnDigital');

btnDigital.addEventListener('click', () => {
    changeToDigitalClock();
    saveClockType('digital');
});

function changeToDigitalClock() {
    analogicClock.style.display = 'none';
    digitalClock.style.display = 'flex';
    cronometer.style.display = 'none';
    btnsDigitalClock.style.display = 'flex';
    divShowPeriod.style.display = 'flex';
    digitalClockBackground.style.display = 'flex';
    analogicClockBackground.style.display = 'none';
}


const btnAnalogico = document.getElementById('btnAnalogico');

btnAnalogico.addEventListener('click', () => {
    changeToAnalogicClock();
    saveClockType('analogic');
});

function changeToAnalogicClock() {
    analogicClock.style.display = 'flex';
    digitalClock.style.display = 'none';
    cronometer.style.display = 'none';
    btnsDigitalClock.style.display = 'none';
    divShowPeriod.style.display = 'none';
    digitalClockBackground.style.display = 'none';
    analogicClockBackground.style.display = 'flex';
}


const btnCronometro = document.getElementById('btnCronometro');

btnCronometro.addEventListener('click', () => {
    changeToCronometer();
    saveClockType('cronometer');
});

function changeToCronometer() {
    analogicClock.style.display = 'none';
    digitalClock.style.display = 'none';
    cronometer.style.display = 'block';
    btnsDigitalClock.style.display = 'none';
    divShowPeriod.style.display = 'none';
    digitalClockBackground.style.display = 'none';
    analogicClockBackground.style.display = 'none';
}


// salvando relógios no local storage
function saveClockType(clockType) {
    localStorage.setItem('whichClock', clockType);
}

function loadClockType() {
    const whichClock = localStorage.getItem('whichClock');
    if (whichClock === 'digital') {
        changeToDigitalClock();
    } else if (whichClock === 'analogic') {
        changeToAnalogicClock();
    } else if (whichClock === 'cronometer') {
        changeToCronometer();
    } else {
        changeToAnalogicClock();
    }
}

loadClockType();


updateAnalogicClock();
setInterval(updateAnalogicClock, 1000);
updateDigitalClock();
setInterval(updateDigitalClock, 1000);
