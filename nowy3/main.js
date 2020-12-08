//Pobrac all elementy html
// utworzymy zmienna ktora bedize odpowiedzialna za to czy jestesmy w grze
//pusty obiekt, ktory bedzie zamieszczone informacje, w jakiej przestrzaeni gramy
// zmienna licznik ile jest pkt

//funkcje - pokazywanie wiadomosci w html
// timer
//losowanie// 1.) kolor 2.) w ktorej przestrzeni sie znajdujemy
//funkcja main
// listener na przycisk
// 2 funkcje ktore stworz nam pole gry
// Funkcja tworzaca kółko

const btn = document.querySelector("button");
const gameArea = document.querySelector(".gameArea");
const message = document.querySelector(".message");
const result = document.querySelector(".result");
const directions = document.querySelector(".directions");

let checkPlay = true;
let score = 0;
let mainDuration;
function gameStart() {
  directions.textContent = "Starting...";
  btn.style.display = "none";
  createCircle();
  drawColor();
  coordinates();
}

function drawColor() {
  let tab = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * 255);
    oneColor = index;
    tab.push(oneColor);
  }

  return tab;
}

function coordinates() {
  let x = window.innerWidth - 100;
  let y = window.innerHeight - 100;
  let indexX = Math.floor(Math.random() * x);
  let indexY = Math.floor(Math.random() * y);
  indexX < 0 ? indexX + 110 : indexX;
  indexY < 0 ? indexY + 110 : indexY;

  let Twoindex = [indexX, indexY];
  return Twoindex;
}

function createCircle() {
  let circle = document.createElement("div");
  circle.classList.add("box");
  circle.style.top = `${coordinates()[1]}` + "px";
  circle.style.left = `${coordinates()[0]}` + "px";
  circle.style.backgroundColor = `rgb(${drawColor()[0]},${drawColor()[1]},${
    drawColor()[2]
  })`;
  circle.start = new Date().getTime(); // to jest atrybut, gdzie jego nazwa moze byc dowolna
  circle.addEventListener("click", checkTime);
  gameArea.appendChild(circle);
}

function checkTime(e) {
  // tutaj zostaje odpalona funkcja po kliknieciu ^ i odwolujemy sie do atrybutu "start";
  console.log(e.target.start);

  let endTime = new Date().getTime();
  let duration = (endTime - e.target.start) / 1000;
  mainDuration = duration;
  if (duration > 1) {
    deletor();
    checkPlay = false;
  } else if (duration < 1) {
    score++;
    deletor();
    createCircle();
    checkPlay = true;
  }
  processChecker();
  return duration;
}

function processChecker() {
  if (checkPlay) {
    directions.innerHTML = `zajeło Ci to ${mainDuration} setnych sekundy, aby poprawnie kliknąć <p class="score">Twój wynik to ${score} z 15</p>`;
    if (score === 15) {
      victory();
      deletor();
      score = 0;
    }
  } else if (!checkPlay) {
    directions.innerHTML = `zajeło Ci to ${mainDuration} setnych sekundy, aby kliknąć <p class="score">Byłeś zbyt wolny!  <span class="looser">przegrales!</span> osiagnałes ostatecznie wynik ${score} z 15 nacisnij przycisk "start" aby spróbować jeszcze raz</p>`;
    btn.style.display = "block";
    score = 0;
    checkTime(); // tutaj pojawił sie problem
  }
}

function deletor() {
  gameArea.innerHTML = "";
}

function victory() {
  directions.innerHTML = `Gratulacje <span id="winner">wygrałes!</span>, zdobyles 15 na 15 punktów, jezeli chcesz ponownie zagrac nacisnij przycisk "Start"`;
  btn.style.display = "block";
}

btn.addEventListener("click", gameStart);

// musze stworzyc funkcje, ktora wywola mi głowna game i tam bedzie settimeOut z losowa wartoscia wywolania, ktora bedzie losowana od 1-3 sekund
