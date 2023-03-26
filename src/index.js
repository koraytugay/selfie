const userInput = [];
let sourceCodeArr;

fetch("https://raw.githubusercontent.com/koraytugay/selfie/main/src/index.js")
.then(value => value.text())
.then(value => {
  sourceCodeArr = value.split("");
  redraw();
});

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
  }

  if (e.key === "Meta" || e.key === "Shift") {
    // ignore
  } else if (e.key === "Backspace") {
    userInput.pop();
  } else if (e.key === "Enter") {
    userInput.push("\n");
    // fast forward all whitespace and new line until next character
    while ([" ", "\n"].includes(sourceCodeArr[userInput.length])) {
      userInput.push(sourceCodeArr[userInput.length]);
    }
  } else {
    userInput.push(e.key);
  }

  redraw();
});

function getSourceCodeCharSpan(i) {
  return document.querySelector(`#source-code > span:nth-child(${i + 1})`);
}

function redraw() {
  document.getElementById("source-code").innerHTML = "";

  for (const sourceCodeChar of sourceCodeArr) {
    const sourceCodeCharSpan = document.createElement("span");
    sourceCodeCharSpan.innerText = sourceCodeChar;
    document.getElementById("source-code").appendChild(sourceCodeCharSpan);
  }

  for (let i = 0; i < userInput.length; i++) {
    const sourceCodeCharSpan = getSourceCodeCharSpan(i);

    if (sourceCodeCharSpan.textContent === userInput[i]) {
      sourceCodeCharSpan.classList.add("correct");
    } else {
      sourceCodeCharSpan.classList.add("wrong");
    }
  }

  getSourceCodeCharSpan(userInput.length).classList.add("current");
}