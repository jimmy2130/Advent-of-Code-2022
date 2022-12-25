const fs = require('fs');

function day6() {
  const input = fs.readFileSync('./day6.txt').toString();
  // console.log(input.length);
  let window = [];
  let ans = -1;
  for (let i = 0; i < input.length; i++) {
    window.push(input[i]);
    if (window.length === 4) {
      if (new Set(window).size === 4) {
        ans = i + 1;
        break;
      } else {
        window.shift();
      }
    }
  }
  console.log('part 1');
  console.log(ans);
  window = [];
  ans = -1;
  for (let i = 0; i < input.length; i++) {
    window.push(input[i]);
    if (window.length === 14) {
      if (new Set(window).size === 14) {
        ans = i + 1;
        break;
      } else {
        window.shift();
      }
    }
  }
  console.log('part 2');
  console.log(ans);
}

day6();
