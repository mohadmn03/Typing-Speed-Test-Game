//Array of words
let names = [
  "Facebook",
  "Instagram",
  "Linkedin",
  "Twitter",
  "Gmail",
  "Outlook",
  "Hotmail",
  "Yahoo",
  "Microsoft",
  "Ibm",
  "Gpu",
  "Iphone",
  "Samsung",
  "Buddytree",
  "Fedex",
  "Web3Dev",
];
//levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
//default level
let defaultLevelName = "Normal"; //task : choose box to change the level
let defaultLevelSeconds = lvls[defaultLevelName];
//Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".lvl");
let SecondsSpan = document.querySelector(".seconds");
let theWord = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".got");
let scoreTotal = document.querySelector(".total");
let finishMessage = document.querySelector(".finish");
//setting level name & seconds & score
lvlNameSpan.innerHTML = defaultLevelName;
SecondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = names.length;
//disable paste event
input.onpaste = (event) => {
  return false;
};
//start game
startButton.addEventListener("click", (event) => {
  startButton.remove();
  input.focus();
  //generate word
  genWords();
});
function genWords() {
  //get random word from array
  let randomNumber = Math.floor(Math.random() * names.length);
  let randomWord = names[randomNumber];
  theWord.innerHTML = randomWord;
  //get and remove word index
  let wordIndex = names.indexOf(randomWord);
  names.splice(wordIndex, 1);
  upComingWords.innerHTML = "";
  //wors in ....
  for (let i = 0; i < names.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(names[i]);
    div.appendChild(txt);
    upComingWords.appendChild(div);
  }
  //call start play function
  startPlay();
}
function startPlay() {
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      //stop timer
      clearInterval(start);
      //
      if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        timeLeftSpan.innerHTML = defaultLevelSeconds;
        if (names.length > 0) {
          genWords();
        } else {
          upComingWords.remove();
          let good = document.createElement("span");
          good.className = "good";
          let goodText = document.createTextNode("AWESOME DUDE! U DO GREAT");
          good.appendChild(goodText);
          finishMessage.appendChild(good);
        }
      } else {
        let bad = document.createElement("span");
        bad.className = "bad";
        let badText = document.createTextNode("GAME OVER!");
        bad.appendChild(badText);
        finishMessage.appendChild(bad);
        scoreGot.innerHTML = 0;
        setInterval(() => {
          document.querySelector(".bad").innerHTML += ".";
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  }, 1000);
}
