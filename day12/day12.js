const fs = require('fs');

function day12() {
  const input = fs.readFileSync('./day12.txt').toString().split('\n');
  let [map, startRow, startCol, endRow, endCol] = createMap(input);
  console.log('part 1');
  console.log(bfs(map, startRow, startCol, endRow, endCol));

  let min = Infinity;
  let startingPoints = [];
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === 1) {
        startingPoints.push([r, c]);
      }
    }
  }

  for (let i = 0; i < startingPoints.length; i++) {
    let [r, c] = startingPoints[i];
    min = Math.min(min, bfs(map, r, c, endRow, endCol));
  }
  console.log('part 2');
  console.log(min);
}

function createMap(input) {
  let map = [];
  let startRow = -1;
  let startCol = -1;
  let endRow = -1;
  let endCol = -1;
  for (let i = 0; i < input.length; i++) {
    let row = [];
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 'S') {
        startRow = i;
        startCol = j;
        row.push(1);
      } else if (input[i][j] === 'E') {
        endRow = i;
        endCol = j;
        row.push(26);
      } else {
        row.push(input[i][j].charCodeAt() - 96);
      }
    }
    map.push(row);
  }
  return [map, startRow, startCol, endRow, endCol];
}

function bfs(map, startRow, startCol, endRow, endCol) {
  let queue = [[startRow, startCol]];
  const DIR = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let steps = new Array(map.length)
    .fill(null)
    .map(x => new Array(map[0].length).fill(0));
  while (queue.length > 0) {
    let [row, col] = queue.shift();
    let currentStep = steps[row][col];
    let currentHeight = map[row][col];
    for (let i = 0; i < DIR.length; i++) {
      const [deltaRow, deltaCol] = DIR[i];
      let searchRow = row + deltaRow;
      let searchCol = col + deltaCol;
      if (inBoundary(map, searchRow, searchCol)) {
        if (steps[searchRow][searchCol] !== 0) {
          continue;
        } else if (map[searchRow][searchCol] - currentHeight > 1) {
          continue;
        } else {
          steps[searchRow][searchCol] = currentStep + 1;
          queue.push([searchRow, searchCol]);
        }
      }
    }
  }
  if (steps[endRow][endCol] === 0) {
    return Infinity;
  }
  return steps[endRow][endCol];
}

function inBoundary(map, r, c) {
  if (r < 0 || r >= map.length || c < 0 || c >= map[0].length) {
    return false;
  }
  return true;
}

day12();
