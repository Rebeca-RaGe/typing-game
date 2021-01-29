let time = document.getElementById("time");
let score = document.getElementById("score");
let word = document.getElementById("word");
let answer = document.getElementById("answer");
const header = document.getElementsByClassName("header");
const title = document.getElementById("title");
const level = document.getElementById("level");
const settingsBtn = document.getElementById("settings-btn");
const mainContent = document.getElementById("main-content");
const endGame =  document.getElementById("end-game-container");
let lastScore = document.getElementById("last-score");
const resetBtn = document.getElementById("reset");


// Words levels
const words_level1 = [
  "dog",
  "cat",
  "sun",
  "tree",
  "mouse",
  "kitchen",
  "steer",
  "mix",
  "book",
  "table",
  "chair",
  "door",
  "silver",
  "purple",
  "black",
  "garage",
  "science",
  "delete",
  "cream",
  "pijama",
  "api",
  "dream",
  "desire",
  "passion"
];

const words_level2 = [
  "smartphone",
  "apartment",
  "bookstore",
  "computer",
  "garbage",
  "television",
  "restroom",
  "backpack",
  "napkins",
  "cobbler",
  "architect",
  "language",
  "makeup",
  "wardrobe",
  "cabinet",
  "puzzles",
  "lantern",
  "landloor",
  "tenant",
  "property",
  "community",
  "leggings",
  "engineers",
  "happiness",
  "friendship",
  "conditioner"
];

const words_level3 = [
  "membership",
  "meditation",
  "social media",
  "internship",
  "engineering",
  "scientific",
  "imagination",
  "definition",
  "responsable",
  "self taught",
  "independent",
  "professional",
  "psychiatrist",
  "otolaryngologist",
  "resilience",
  "inspiration",
  "irregardless",
  "disinterested",
  "lieutenant",
  "entrepreneur",
  "acceptable",
  "conscience",
  "connoisseur",
  "onomatopoeia",
  "fuchsia",
];

// Init
let seconds;
let points;
let currentLevel = localStorage.getItem("level") ? localStorage.getItem("level") : "easy";
level.value = currentLevel;
let currentWord;
let timeInterval;
init();

function init(){
  title.classList.add("animation");
  currentLevel = localStorage.getItem("level") ? localStorage.getItem("level") : "easy";
  level.value = currentLevel;
  //Set initial time according level
  seconds = setTime();
  points = 0;
  currentWord = "";
  time.innerText = seconds;
  score.innerText = points;
  mainContent.classList.remove("hide");
  mainContent.classList.add("show");
  endGame.classList.remove("show");
  endGame.classList.add("hide");
  
  changeWord();

  // Focus on input text
  answer.focus();
  timeInterval = setInterval(() => {
    seconds--;
    time.innerText = seconds;
    if(seconds<1){
      showEndGame();
    }
  }, 1000);
}



// Event listeners
settingsBtn.addEventListener("click",toggleToolbar);
level.addEventListener("change",changeLevel);
answer.addEventListener("keyup",compareWords);
resetBtn.addEventListener("click",reset);

// Show/Hide Toolbar
function toggleToolbar(){
  header[0].classList.contains("toggle") ? header[0].classList.remove('toggle'): header[0].classList.add("toggle");
}

function setTime(){
  switch(currentLevel){
    case "easy":
        seconds = 5;
      break;
    case "medium":
      seconds = 6;
      break;
    case "hard":
      seconds = 7;
      break;
  }
  return seconds;
}

function changeLevel(e){
  switch(e.target.value){
    case "easy":
        currentLevel = "easy";
      break;
    case "medium":
      currentLevel = "medium";
      break;
    case "hard":
      currentLevel = "hard";
      break;
  }
  changeWord();
  answer.focus();
}

function compareWords(e){
  if(e.target.value === currentWord && seconds>0){
    changeWord();
    addScore();
    addTime();
  }
}

// Generate Random Word according level
function changeWord(){
  switch(currentLevel){
    case "easy":
        currentWord = words_level1[Math.floor(Math.random()*words_level1.length)];
      break;
    case "medium":
        currentWord = words_level2[Math.floor(Math.random()*words_level2.length)];
      break;
    case "hard":
        currentWord = words_level3[Math.floor(Math.random()*words_level3.length)];
      break;
  }
  
  word.innerText = currentWord;
  answer.value = "";
}

function addTime(){
  switch(currentLevel){
    case "easy":
      seconds +=1;
      break;
    case "medium":
       seconds +=1;
      break;
    case "hard":
        seconds +=2;
      break;
  }
  time.innerText =seconds;
}

function addScore(){
  switch(currentLevel){
    case "easy":
        points +=1
      break;
    case "medium":
        points += 2;
      break;
    case "hard":
        points += 3;
      break;
  }
  score.innerText = points;
}

function showEndGame(){
  clearInterval(timeInterval);
  lastScore.innerText = points;
  endGame.classList.remove("hide");
  endGame.classList.add("show");
  mainContent.classList.remove("show");
  mainContent.classList.add("hide");
  localStorage.setItem("level",currentLevel);
}

function reset(){
  init();
}