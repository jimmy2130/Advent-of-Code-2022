import fs from 'fs';

const MATCH = {
  'rock rock': 3 + 1,
  'rock paper': 6 + 2,
  'rock scissors': 0 + 3,
  'paper rock': 0 + 1,
  'paper paper': 3 + 2,
  'paper scissors': 6 + 3,
  'scissors rock': 6 + 1,
  'scissors paper': 0 + 2,
  'scissors scissors': 3 + 3,
};

const CODE = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

type Match =
  | 'rock rock'
  | 'rock paper'
  | 'rock scissors'
  | 'paper rock'
  | 'paper paper'
  | 'paper scissors'
  | 'scissors rock'
  | 'scissors paper'
  | 'scissors scissors';
type Code = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';
type Oppo = 'A' | 'B' | 'C';
type Shape = 'rock' | 'paper' | 'scissors';

function getShape(oppo: string, intent: string): string {
  const WIN = { rock: 'paper', paper: 'scissors', scissors: 'rock' };
  const LOSE = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  if (intent === 'Y') return oppo;
  if (intent === 'Z') return WIN[oppo as Shape];
  if (intent === 'X') return LOSE[oppo as Shape];
  return 'ERROR';
}

function day2() {
  const input = fs.readFileSync('./day2.txt').toString().split('\n');
  let score = 0;
  for (let i = 0; i < input.length; i++) {
    let match = input[i]
      .split(' ')
      .map(c => CODE[c as Code])
      .join(' ');
    score += MATCH[match as Match];
  }
  console.log('part 1');
  console.log(score);

  score = 0;
  for (let i = 0; i < input.length; i++) {
    let [oppo, self] = input[i].split(' ');
    let match = `${CODE[oppo as Oppo]} ${getShape(CODE[oppo as Oppo], self)}`;
    score += MATCH[match as Match];
  }
  console.log('part 2');
  console.log(score);
}

day2();
