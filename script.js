const boxes = document.querySelectorAll('grid-item');
const scoreCount = document.querySelector('span.score');
const timeLimit = document.querySelector('span.timer');

let lastBox;
let timeIsUp = false;
let score = 0;
let time = 10;
let timer;

function randomTime(minTime, maxTime) {
  return Math.round(Math.random() * (maxTime - minTime) + minTime);
}

function randomBox(boxes) {
  const index = Math.floor(Math.random() * 9);
  const box = boxes[index];

  if (box === lastBox) {
    return randomBox(boxes);
  }

  lastBox = box;
  return box;
}

function showMole() {
  const time = randomTime(500, 1000);
  const box = randomBox(boxes);

  box.classList.add('mole');

  setTimeout(() => {
    box.classList.remove('mole');
    if (!timeIsUp) showMole();
  }, time);
}

function countdown() {
  timer = setInterval(() => {
    time--;
    timeLimit.textContent = time;
    if (time <= 0) clearInterval(timer);
  }, 1000);
}

function startWackAMole() {
  timeIsUp = false;
  score = 0;
  showMole();
  countdown();
  setTimeout(() => (timeIsUp = true), 10000);
}

function endWackAMole() {
  timeIsUp = true;
  clearInterval(time);
  clearInterval(timer);
}

function resetWackAMole() {
  scoreCount.textContent = 0;
  timeLimit.textContent = 10;
  clearInterval(timer);
  timer = clearTimeout(() => (timeIsUp = true), 10000);
  time = 10;
  setTimeout(() => (timeIsUp = true), 15000);
}

function boxClick() {
  if (this.classList.contains('mole')) {
    score++;
    this.parentNode.classList.remove('mole');
    scoreCount.textContent = score;
  }
}

boxes.forEach((box) => box.addEventListener('mousedown', boxClick));
