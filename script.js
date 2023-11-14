let intervalId;
let isActive = false;
let duration = 0;
let mode = '';
let roundsRemaining = 0;

function startTimer() {
  if (!isActive) {
    intervalId = setInterval(updateTimer, 1000);
    isActive = true;
  } else {
    clearInterval(intervalId);
    isActive = false;
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
}

function switchMode() {
  switch (mode) {
    case 'Prep':
      mode = 'Work';
      duration = document.getElementById('workTime').value;
      break;
    case 'Work':
      mode = 'Rest';
      duration = document.getElementById('restTime').value;
      break;
    case 'Rest':
      mode = 'Work';
      duration = document.getElementById('workTime').value;
      roundsRemaining--;
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

function updateSettings() {
  duration = document.getElementById('prepTime').value;
  mode = 'Prep';
  roundsRemaining = document.getElementById('rounds').value;
  updateDisplay();
}

function toggleSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    if (settingsPanel.style.display === 'none') {
      settingsPanel.style.display = 'block';
    } else {
      settingsPanel.style.display = 'none';
    }
  }
  

window.onload = () => {
  duration = document.getElementById('prepTime').value;
  mode = 'Prep';
  roundsRemaining = document.getElementById('rounds').value;
  updateDisplay();
};
