import fs from 'fs';

function day1() {
  const input = fs
    .readFileSync('./day1.txt')
    .toString()
    .split('\n\n')
    .map(line => line.split('\n').map(num => parseInt(num)));
  // console.log(input);
  const sum = input.map(elf => elf.reduce((acc, cur) => acc + cur));
  sum.sort((a, b) => b - a);
  console.log('part 1');
  console.log(sum[0]);
  console.log('part 2');
  console.log(sum[0] + sum[1] + sum[2]);
}

day1();
