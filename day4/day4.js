const fs = require('fs');

function day4() {
  const input = fs
    .readFileSync('./day4.txt')
    .toString()
    .split('\n')
    .map(line =>
      line
        .split(',')
        .map(section => section.split('-').map(boundary => parseInt(boundary))),
    );
  // console.log(input);
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    let [[l1, h1], [l2, h2]] = input[i];
    if ((l1 >= l2 && h1 <= h2) || (l2 >= l1 && h2 <= h1)) sum++;
  }
  console.log('part 1');
  console.log(sum);
  sum = input.length;
  for (let i = 0; i < input.length; i++) {
    let [[l1, h1], [l2, h2]] = input[i];
    if (l2 > h1 || l1 > h2) sum--;
  }
  console.log('part 2');
  console.log(sum);
}

day4();
