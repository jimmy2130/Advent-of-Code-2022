const fs = require('fs');

function day8() {
  const trees = fs
    .readFileSync('./day8.txt')
    .toString()
    .split('\n')
    .map(line => line.split('').map(digit => parseInt(digit)));
  let visibleMap = new Array(trees.length)
    .fill(null)
    .map(row => new Array(trees[0].length).fill(false));
  // from left to right
  for (let i = 0; i < trees.length; i++) {
    let currentHeight = -1;
    for (let j = 0; j < trees.length; j++) {
      if (trees[i][j] > currentHeight) {
        visibleMap[i][j] = true;
        currentHeight = trees[i][j];
      }
    }
  }
  // from right to left
  for (let i = 0; i < trees.length; i++) {
    let currentHeight = -1;
    for (let j = trees.length - 1; j >= 0; j--) {
      if (trees[i][j] > currentHeight) {
        visibleMap[i][j] = true;
        currentHeight = trees[i][j];
      }
    }
  }
  // from top to bottom
  for (let i = 0; i < trees.length; i++) {
    let currentHeight = -1;
    for (let j = 0; j < trees.length; j++) {
      if (trees[j][i] > currentHeight) {
        visibleMap[j][i] = true;
        currentHeight = trees[j][i];
      }
    }
  }
  // from bottom to top
  for (let i = trees.length - 1; i >= 0; i--) {
    let currentHeight = -1;
    for (let j = trees.length - 1; j >= 0; j--) {
      if (trees[j][i] > currentHeight) {
        visibleMap[j][i] = true;
        currentHeight = trees[j][i];
      }
    }
  }
  let ans = visibleMap.flat().filter(visible => visible === true).length;
  console.log('part 1');
  console.log(ans);

  let scoreMap = new Array(trees.length)
    .fill(null)
    .map(row => new Array(trees[0].length).fill(0));
  for (let r = 0; r < trees.length; r++) {
    for (let c = 0; c < trees.length; c++) {
      scoreMap[r][c] =
        getScore(trees, { r, c }, 'UP') *
        getScore(trees, { r, c }, 'DOWN') *
        getScore(trees, { r, c }, 'RIGHT') *
        getScore(trees, { r, c }, 'LEFT');
    }
  }
  let maxScore = Math.max(...scoreMap.flat());
  console.log('part 2');
  console.log(maxScore);
}

function getScore(trees, { r, c }, dir) {
  let currentHeight = trees[r][c];
  let score = 0;
  if (dir === 'UP') {
    let cursor = r - 1;
    while (cursor >= 0) {
      score++;
      if (trees[cursor][c] < currentHeight) {
        cursor--;
      } else {
        break;
      }
    }
  } else if (dir === 'DOWN') {
    let cursor = r + 1;
    while (cursor < trees.length) {
      score++;
      if (trees[cursor][c] < currentHeight) {
        cursor++;
      } else {
        break;
      }
    }
  } else if (dir === 'RIGHT') {
    let cursor = c + 1;
    while (cursor < trees.length) {
      score++;
      if (trees[r][cursor] < currentHeight) {
        cursor++;
      } else {
        break;
      }
    }
  } else if (dir === 'LEFT') {
    let cursor = c - 1;
    while (cursor >= 0) {
      score++;
      if (trees[r][cursor] < currentHeight) {
        cursor--;
      } else {
        break;
      }
    }
  }
  return score;
}

day8();
