const dino = document.querySelector(".dino");
const obstacle = document.querySelector(".obstacle");
const informations = document.querySelector(".informations");
const btn = document.querySelector("button");
const gameArea = document.querySelector(".gameArea");

// złapałem elementy

let score = 0;
let flag = true;

window.addEventListener("click", function () {
  dino.classList.add("dinoAnim");
  if (flag) {
    score++;
  }
  tools.scoreCounter();

  setTimeout(tools.deletor, 400);
  tools.nextLvl();
});

//nasłuchiwanie na click  odpala animacje skakania

let tools = {
  deletor() {
    dino.classList.remove("dinoAnim");
  },

  scoreCounter() {
    informations.textContent = `Zdobyłeś ${score} punktów!`;
  },

  nextLvl() {
    if (score > 2) {
      gameArea.style.backgroundColor = "white";
      obstacle.style.backgroundColor = "red";
      if (score > 3) {
        gameArea.style.backgroundColor = "#555";
        obstacle.style.backgroundColor = "white";
        if (score > 4 && score < 50) {
          tools.newObstacle();
        }
      }
    }
  },

  newObstacle() {
    if (score > 4 && score < 7) {
      const newDanger = document.createElement("div");
      newDanger.classList.add("obstacle2");
      gameArea.appendChild(newDanger);
    }

    if (score > 11 && score < 16) {
      const obst2 = document.querySelectorAll(".obstacle2");
      obst2.forEach((element) => {
        element.classList.add("bgcUpgrade");
      });
    }

    if (score > 18 && score < 21) {
      const newDanger2 = document.createElement("div");
      newDanger2.classList.add("obstacle3");
      gameArea.appendChild(newDanger2);
    }
  },
};

// wszystkie wywala mi setTimeOutem animacje skoku, co 0,4 sec, nalicza pkty, robi eventy, tworzy nowe przeszkody

let processChecker = setInterval(function () {
  let player = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let danger = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );

  if (player >= 500 && danger < 50 && danger > 0) {
    obstacle.style.animation = "none";
    obstacle.style.display = "none";
    btn.style.display = "block";
    alert("przegrales");
    informations.textContent = `Twój wynik to  ${score} punktów`;
    score = 0;
    flag = false;
  }
}, 30);

//sprawdza czy nie nastapilo zderzenie elementów

btn.addEventListener("click", function () {
  obstacle.style.animation = "fly 1s linear infinite";
  obstacle.style.display = "block";
  btn.style.display = "none";
  flag = true;
  const obst2 = document.querySelectorAll(".obstacle2");
  obst2.forEach((element) => {
    gameArea.removeChild(element);
  });
  const obst3 = document.querySelectorAll(".obstacle3");
  obst3.forEach((element) => {
    gameArea.removeChild(element);
  });
});

// wywołanie kolejnej gry;
// usuwanie wczesniejszych poziomow i dodatkowych elementów
