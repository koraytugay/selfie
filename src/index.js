const sourceCodePre = document.getElementById("source-code");

// fetch the code to be typed by the user
let sourceCodeArr;
fetch("https://raw.githubusercontent.com/koraytugay/selfie/main/src/index.js")
.then(response => response.text())
.then(responseText => {
  sourceCodeArr = responseText.split("");
  redraw();
});

// store user input as an array of input characters
const userInput = [];
document.addEventListener("keydown", e => {
  if (e.key === " ") {
    e.preventDefault();  // prevent scroll down
  }

  if (e.key === "Meta" || e.key === "Shift") {
    return;  // not interesting for us
  }

  if (e.key === "Backspace") {
    userInput.pop();
  } else if (e.key === "Enter") {
    userInput.push("\n");
    // fast forward all whitespace and new line until next character
    // this gives an IDE feeling to the user
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
  sourceCodePre.innerHTML = "";

  for (const sourceCodeChar of sourceCodeArr) {
    const sourceCodeCharSpan = document.createElement("span");
    sourceCodeCharSpan.innerText = sourceCodeChar;
    sourceCodePre.appendChild(sourceCodeCharSpan);
  }

  for (let i = 0; i < userInput.length; i++) {
    const sourceCodeCharSpan = getSourceCodeCharSpan(i);

    if (sourceCodeCharSpan.textContent === userInput[i]) {
      sourceCodeCharSpan.classList.add("correct");
    } else {
      if (sourceCodeCharSpan.innerText === " ") {
        sourceCodeCharSpan.style.backgroundColor = "darkred";
      }
      sourceCodeCharSpan.classList.add("wrong");
    }
  }

  getSourceCodeCharSpan(userInput.length).classList.add("current");
}
