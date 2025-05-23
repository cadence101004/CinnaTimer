let timer;
let time = 1500; // Start with Pomodoro
let isRunning = false;
let pomodoroCount = 0;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");

function updateDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function setMode(mode) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));

  if (mode === "pomodoro") {
    time = 1500;
    document.getElementById("pomodoro").classList.add("active");
  } else if (mode === "short") {
    time = 300;
    document.getElementById("short").classList.add("active");
  } else if (mode === "long") {
    time = 900;
    document.getElementById("long").classList.add("active");
  }

  pauseTimer();
  updateDisplay();
}

function startTimer() {
  isRunning = true;
  startBtn.textContent = "PAUSE";
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      startBtn.textContent = "START";

      // Handle automatic switching
      if (document.getElementById("pomodoro").classList.contains("active")) {
        pomodoroCount++;
        if (pomodoroCount % 4 === 0) {
          setMode("long");
        } else {
          setMode("short");
        }
      } else {
        setMode("pomodoro");
      }

      alert("Time’s up! 🎀 Switching to next mode.");
      startTimer(); // Auto-start next round
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = "START";
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

// Manual mode switch (resets timer)
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setMode(btn.id);
  });
});

document.getElementById("add-task").addEventListener("click", () => {
  const taskText = prompt("Enter your task:");
  if (taskText) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("task-list").appendChild(li);
  }
});

setMode("pomodoro");
updateDisplay();

window.addEventListener("DOMContentLoaded", () => {
  const musicBtn = document.getElementById("music-toggle");
  const ytMusic = document.getElementById("yt-music");
  let musicOn = false;

  musicBtn.addEventListener("click", () => {
    if (!musicOn) {
      ytMusic.src = "https://www.youtube.com/embed/z7S9wIJ8mT8?autoplay=1&loop=1&playlist=z7S9wIJ8mT8";
      ytMusic.style.display = "none";
      musicBtn.textContent = "🔇 MUSIC OFF";
    } else {
      ytMusic.src = "";
      musicBtn.textContent = "🎵 MUSIC ON";
    }
    musicOn = !musicOn;
  });
});



