const fs = require('fs');

function day5() {
  const [rawStack, rawInstructions] = fs
    .readFileSync('./day5.txt')
    .toString()
    .split('\n\n')
    .map(str => str.split('\n'));

  let stack = new Array(10).fill(null).map(x => new Array());
  let instructions = [];

  for (let i = 0; i < rawStack.length - 1; i++) {
    for (let j = 1; j < rawStack[i].length; j = j + 4) {
      if (rawStack[i][j] !== ' ') {
        stack[(j - 1) / 4 + 1] = [rawStack[i][j], ...stack[(j - 1) / 4 + 1]];
      }
    }
  }
  // console.log(stack);
  let stack2 = JSON.parse(JSON.stringify(stack));

  for (let i = 0; i < rawInstructions.length; i++) {
    let line = rawInstructions[i].split(' ');
    let numbers = [line[1], line[3], line[5]].map(x => parseInt(x));
    instructions.push(numbers);
  }
  // console.log(instructions);
  for (let i = 0; i < instructions.length; i++) {
    let [number, from, to] = instructions[i];
    let movedSupplies = stack[from].slice(stack[from].length - number);
    stack[from] = stack[from].slice(0, stack[from].length - number);
    stack[to] = [...stack[to], ...movedSupplies.reverse()];
    // console.log(stack);
  }
  // console.log(stack);
  let ans = getTop(stack);
  console.log('part 1');
  console.log(ans);
  for (let i = 0; i < instructions.length; i++) {
    let [number, from, to] = instructions[i];
    let movedSupplies = stack2[from].slice(stack2[from].length - number);
    stack2[from] = stack2[from].slice(0, stack2[from].length - number);
    stack2[to] = [...stack2[to], ...movedSupplies];
    // console.log(stack2);
  }
  ans = getTop(stack2);
  console.log('part 2');
  console.log(ans);
}

function getTop(stack) {
  return stack.reduce((acc, cur, index) => {
    if (index !== 0) acc += cur[cur.length - 1];
    return acc;
  }, '');
}

day5();
