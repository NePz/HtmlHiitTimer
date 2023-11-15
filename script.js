let intervalId;
let isActive = false;
let duration = 0;
let mode = '';
let roundsRemaining = 0;
let soundEnabled = false;
let beepSound = new Audio('audio/475557__rannem__bip.mp3');
let startBeep = new Audio('audio/455202__start_boop.mp3');
let goVoice = new Audio('audio/180723__jerrarjombler__go2.mp3');
let restVoice = new Audio('audio/108889__timkahn__rest.mp3');
let pauseVoice = new Audio('audio/108895__timkahn__workout-paused.mp3')
let completeVoice = new Audio('audio/108894__timkahn__workout-complete.mp3')

function startTimer() {
  if (!isActive) {
    intervalId = setInterval(updateTimer, 1000);
    isActive = true;
    startBeep.play();
  } else {
    clearInterval(intervalId);
    isActive = false;
    pauseVoice.playbackRate = 1.5;
    pauseVoice.play();
  }
}

function resetTimer() {
  clearInterval(intervalId);
  isActive = false;
  duration = 0;
  mode = '';
  roundsRemaining = document.getElementById('rounds').value;
  updateDisplay();
}

function updateTimer() {
  if (duration > 0) {
    duration--;
  } else {
    switchMode();
  }
  updateDisplay();
  playBeep();
}

function switchMode() {
  switch (mode) {
    case 'Prep':
      mode = 'Work';
      duration = document.getElementById('workTime').value;
      console.log("work");
      if (soundEnabled) {
        goVoice.playbackRate = 1.1;
        goVoice.play();
      }
      break;
    case 'Work':
      mode = 'Rest';
      duration = document.getElementById('restTime').value;
      console.log("rest");
      if (soundEnabled) {
        restVoice.playbackRate = 1.5;
        restVoice.play();
      }
      break;
    case 'Rest':
      mode = 'Work';
      duration = document.getElementById('workTime').value;
      if (roundsRemaining <= 0) {
        resetTimer(); // Call resetTimer() when roundsRemaining is 0 or negative
        mode = 'Complete'
        if (soundEnabled) {
          completeVoice.playbackRate = 1.3;
          completeVoice.play();
        }
      } else {
        roundsRemaining--;
        if (soundEnabled) {
          goVoice.playbackRate = 1.1;
          goVoice.play();
        }
      }
      console.log("work");
      break;
    default:
      if (roundsRemaining > 0) {
        mode = 'Prep';
        duration = document.getElementById('prepTime').value;
      } else {
        clearInterval(intervalId);
        isActive = false;
      }

  }
}

function updateDisplay() {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  document.getElementById('timer').textContent = formattedTime;
  document.getElementById('mode').textContent = mode;
  document.getElementById('roundsRemaining').textContent = `Rounds remaining: ${roundsRemaining}`;
}

//! Beep Sound
function toggleSound() {
  soundEnabled = !soundEnabled;
}

function playBeep() {
  if (soundEnabled) {
    beepSound.play();
  }
}





function updateSettings() {
  duration = document.getElementById('prepTime').value;
  mode = 'Prep';
  roundsRemaining = document.getElementById('rounds').value;
  updateDisplay();
}

window.onload = () => {
  duration = document.getElementById('prepTime').value;
  mode = 'Prep';
  roundsRemaining = document.getElementById('rounds').value;
  updateDisplay();
};

//! THEMES

function toggleSettings() {
  const settingsPanel = document.getElementById('settingsPanel');
  if (settingsPanel.style.display === 'none') {
    settingsPanel.style.display = 'block';
  } else {
    settingsPanel.style.display = 'none';
  }
}

// Update toggleTheme() function to manage settings panel visibility
function toggleTheme() {
  const body = document.body;
  const themeText = document.getElementById('themeText');
  const settingsPanel = document.getElementById('settingsPanel');

  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    themeText.textContent = 'Dark Mode';
    settingsPanel.classList.add('dark-mode');
  } else {
    themeText.textContent = 'Light Mode';
    settingsPanel.classList.remove('dark-mode');
  }
}
