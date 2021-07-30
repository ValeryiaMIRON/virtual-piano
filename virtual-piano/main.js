const piano = document.querySelector('.piano');
const audio = document.querySelectorAll('audio')
const pianoКeys = document.querySelectorAll('.piano-key');
const swichModeButtons = document.querySelectorAll('.switch-mode-btn')
const buttonFullScreen = document.querySelector('.fullscreen');
const notesMap = {"68":"c", "70":"d", "71":"e", "72":"f", "74":"g", "75":"a", "76":"b", "82":"c♯", "84":"d♯", "85":"f♯", "73":"g♯", "79":"a♯"}
let currentMode = "notes"


//запускаем аудио
function playAudio(event) {
    const note = event.target.dataset?.note;
    if (note) {
        const audioElement = Array.from(audio).find((el) => el.dataset.note === note);
        if (audioElement) {
            audioElement.currentTime = 0;
            audioElement.play();  
        }
        
    }
}

//клавиатура
window.addEventListener('keydown', (event) => playAudio2(event));
function playAudio2(event) {
console.log(event.which)
const note = notesMap[event.which];
if (note) {
    const audioElement = Array.from(audio).find((el) => el.dataset.note === note);
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();  
    }
}
}
//переключение кнопки
function switchMode(event) {
    const mode = event.target.dataset.mode;
    if (currentMode !== mode) {
        currentMode = mode
        piano.dataset.mode = mode
        swichModeButtons.forEach((el) => el.classList.remove("btn-active"))
        event.target.classList.add("btn-active")
    }
}

swichModeButtons.forEach((el) => el.addEventListener('click', switchMode));


//экран
buttonFullScreen.addEventListener('click', () => {
    if (document.body.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    if (document.fullScreenElement == null) {
        document.exitFullscreen();
    }
});

//активные клавиши для мыши
piano.addEventListener('click', (event) => {
    if(event.target.classList.contains('piano-key')) {
      pianoКeys.forEach((el) => {
        if(el.classList.contains('piano-key-active')) {
          el.classList.remove('piano-key-active');
        }
      });
      event.target.classList.add('piano-key-active');
    }
  });


  piano.addEventListener('mouseout', (event) => {
    if(event.target.classList.contains('piano-key')) {
      event.target.classList.remove('piano-key-active');
    }
  });

//активные клавищи для клавиатуры
window.addEventListener('keydown', (event) => {
    pianoКeys.forEach((elem) => {
        if (event.code === `Key${elem.getAttribute('data-letter')}`) {
            elem.classList.add('piano-key-active');
        }
    });  
});

window.addEventListener('keyup', (event) => {
    pianoКeys.forEach((elem) => {
        if (event.code === `Key${elem.getAttribute('data-letter')}`) {
            elem.classList.remove('piano-key-active');
        }
    });  
});

//зажатая левая кнопка мыши

const startAudio = (event) => {
    event.target.classList.add('piano-key-active');
    playAudio(event);
}

const stopAudio = (event) => {
    event.target.classList.remove('piano-key-active');
}

const startCorrespondOver = (event) => {
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.add('piano-key-active');
        playAudio(event);
    }

    pianoКeys.forEach(elem => {
        elem.addEventListener('mouseover', startAudio);
        elem.addEventListener('mouseout', stopAudio);
    });

}

const stopCorrespondOver = (event) => {
    event.target.classList.remove('piano-key-active');
    pianoКeys.forEach(elem => {
        elem.removeEventListener('mouseover', startAudio);
        elem.removeEventListener('mouseout', stopAudio);
    });
}

piano.addEventListener('mousedown', startCorrespondOver, false);
piano.addEventListener("mouseup", stopCorrespondOver)
