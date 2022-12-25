const fs = require('fs');

function day9() {
  const input = fs.readFileSync('./day9.txt').toString().split('\n');
  let head = [0, 0];
  let tail = [0, 0];
  let record = new Set([JSON.stringify(tail)]);

  for (let i = 0; i < input.length; i++) {
    let [dir, steps] = input[i].split(' ');
    for (let step = 1; step <= parseInt(steps); step++) {
      // move head
      if (dir === 'R') head[0] += 1;
      else if (dir === 'L') head[0] -= 1;
      else if (dir === 'U') head[1] += 1;
      else if (dir === 'D') head[1] -= 1;
      // move tail
      moveTail(head, tail);
      // record
      record.add(JSON.stringify(tail));
    }
  }
  console.log('part 1');
  console.log(record.size);

  head = [0, 0];
  let tailsArray = new Array(9).fill(null).map(x => [0, 0]);
  record = new Set([JSON.stringify(tailsArray[tailsArray.length - 1])]);

  for (let i = 0; i < input.length; i++) {
    let [dir, steps] = input[i].split(' ');
    for (let step = 1; step <= parseInt(steps); step++) {
      // move head
      if (dir === 'R') head[0] += 1;
      else if (dir === 'L') head[0] -= 1;
      else if (dir === 'U') head[1] += 1;
      else if (dir === 'D') head[1] -= 1;
      // move tail 0 ~ tail 8
      for (let tail = 0; tail < tailsArray.length; tail++) {
        if (tail === 0) {
          moveTail(head, tailsArray[tail]);
        } else {
          moveTail(tailsArray[tail - 1], tailsArray[tail]);
        }
        if (tail === tailsArray.length - 1) {
          record.add(JSON.stringify(tailsArray[tailsArray.length - 1]));
        }
      }
    }
  }
  console.log('part 2');
  console.log(record.size);
}

function moveTail(head, tail) {
  let [hx, hy] = head;
  let [tx, ty] = tail;
  if (Math.abs(hx - tx) <= 1 && Math.abs(hy - ty) <= 1) {
    return;
  }
  if (hx === tx && hy - ty === 2) {
    tail[1]++;
  } else if (hx === tx && ty - hy === 2) {
    tail[1]--;
  } else if (hy === ty && hx - tx === 2) {
    tail[0]++;
  } else if (hy === ty && tx - hx === 2) {
    tail[0]--;
  } else if (hx > tx && hy > ty) {
    tail[0]++;
    tail[1]++;
  } else if (hx > tx && hy < ty) {
    tail[0]++;
    tail[1]--;
  } else if (hx < tx && hy < ty) {
    tail[0]--;
    tail[1]--;
  } else if (hx < tx && hy > ty) {
    tail[0]--;
    tail[1]++;
  } else {
    console.log('ERROR');
  }
}

day9();
