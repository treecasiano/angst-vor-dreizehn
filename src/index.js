function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

const numberDisplay = document.getElementById("generated-number");
const scoreEl = document.getElementById("score");

const log = document.getElementsByTagName("pre")[0];

let score = 0;
scoreEl.innerText = score;

let blockVal = 0;
function generateNum() {
  numberDisplay.innerText = "";
  blockVal = getRandomInt(12);
  numberDisplay.innerText = blockVal;
}

generateNum();

const column1Button = document.getElementById("col-1-btn");
const column2Button = document.getElementById("col-2-btn");
const column3Button = document.getElementById("col-3-btn");
const column4Button = document.getElementById("col-4-btn");

const col1 = document.querySelectorAll("#col-1 .block");
const col2 = document.querySelectorAll("#col-2 .block");
const col3 = document.querySelectorAll("#col-3 .block");
const col4 = document.querySelectorAll("#col-4 .block");

let colElMatrix = [col1, col2, col3, col4];

let col1Vals = [];
let col2Vals = [];
let col3Vals = [];
let col4Vals = [];

let colValMatrix = [col1Vals, col2Vals, col3Vals, col4Vals];

// TODO: Create a factory fx for the buttons
column1Button.addEventListener("click", function (e) {
  evaluateConditions(col1, col1Vals);
});

column2Button.addEventListener("click", function (e) {
  evaluateConditions(col2, col2Vals);
});

column3Button.addEventListener("click", function (e) {
  evaluateConditions(col3, col3Vals);
});

column4Button.addEventListener("click", function (e) {
  evaluateConditions(col4, col4Vals);
});

function lose() {
  alert("You lose!");
  reset();
}

function evaluateConditions(col, columnValueList) {
  if (!blockVal && blockVal !== 0) return;

  columnValueList.push(blockVal);

  const blockValIdx = columnValueList.length - 1;

  if (blockValIdx === 4) {
    lose();
    return;
  }

  col[blockValIdx].innerText = blockVal;

  // capture surrounding values
  const valueBelow = columnValueList[blockValIdx - 1];
  const currentColIdx = colElMatrix.indexOf(col);
  let valueListToLeft = colValMatrix[currentColIdx - 1];
  let valueListToRight = colValMatrix[currentColIdx + 1];

  const valueToLeft = valueListToLeft
    ? valueListToLeft[blockValIdx]
    : undefined;
  const valueToRight = valueListToRight
    ? valueListToRight[blockValIdx]
    : undefined;

  if (
    blockVal + valueBelow === 13 ||
    blockVal + valueToLeft === 13 ||
    blockVal + valueToRight === 13
  ) {
    lose();
    return;
  }

  const matchesBelow = blockVal === valueBelow;
  const matchesToLeft = blockVal === valueToLeft;
  const matchesToRight = blockVal === valueToRight;

  if (blockVal === valueBelow) {
    console.log("matches below - score 1 point");
    incrementScore();
    columnValueList.pop(blockValIdx - 1);
  }

  if (blockVal === valueToLeft) {
    console.log("matches left - score 1 point");
    incrementScore();
    valueListToLeft = valueListToLeft.splice(blockValIdx);
  }

  if (blockVal === valueToRight) {
    console.log("matches right - score 1 point");
    incrementScore();
    valueListToRight = valueListToRight.splice(blockValIdx);
  }

  // if any of the three match, the value is popped off the column array
  if (matchesBelow || matchesToLeft || matchesToRight) {
    columnValueList.pop();
  }

  console.log("colValMatrix", colValMatrix);
  log.innerText = `Col 1: ${colValMatrix[0]},\r\Col 2: ${colValMatrix[1]},\r\Col 3: ${colValMatrix[2]},\r\Col 4: ${colValMatrix[3]}`;

  // Re-render values based on value matrix
  colElMatrix.forEach((col, colIdx) => {
    col.forEach((block, blockIdx) => {
      block.innerText = colValMatrix[colIdx][blockIdx]
        ? colValMatrix[colIdx][blockIdx]
        : "";
    });
  });

  generateNum();
}

function incrementScore() {
  score = score + 1;
  scoreEl.innerText = score;
}

function reset() {
  score = 0;
  scoreEl.innerText = score;
  blockVal = null;
  numberDisplay.innerText = blockVal;

  col1Vals = [];
  col2Vals = [];
  col3Vals = [];
  col4Vals = [];

  colValMatrix = [col1Vals, col2Vals, col3Vals, col4Vals];

  log.innerText = `Col 1: ${colValMatrix[0]},\r\Col 2: ${colValMatrix[1]},\r\Col 3: ${colValMatrix[2]},\r\Col 4: ${colValMatrix[3]}`;

  colElMatrix.forEach((col) => {
    col.forEach((block) => {
      block.innerText = "";
    });
  });

  generateNum();
}
