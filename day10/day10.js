const fs = require('fs');

function day10() {
  const input = fs.readFileSync('./day10.txt').toString().split('\n');
  let register = 1;
  let cycles = ['x'];
  for (let i = 0; i < input.length; i++) {
    let [instruction, value] = input[i].split(' ');
    if (instruction === 'noop') {
      cycles.push(register);
    } else if (instruction === 'addx') {
      cycles.push(register);
      cycles.push(register);
      register += parseInt(value);
    }
  }

  let check = 20;
  let ans = 0;
  while (cycles[check]) {
    ans += check * cycles[check];
    check += 40;
  }
  console.log('part 1');
  console.log(ans);

  let pattern = '';
  cycles.shift();
  for (let i = 0; i < cycles.length; i++) {
    if (
      cycles[i] - 1 === i % 40 ||
      cycles[i] === i % 40 ||
      cycles[i] + 1 === i % 40
    ) {
      pattern += '#';
    } else {
      pattern += '.';
    }
  }
  console.log('part 2');
  console.log(pattern.slice(0, 40));
  console.log(pattern.slice(40, 80));
  console.log(pattern.slice(80, 120));
  console.log(pattern.slice(120, 160));
  console.log(pattern.slice(160, 200));
  console.log(pattern.slice(200, 240));
}

day10();
