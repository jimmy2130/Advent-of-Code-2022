const fs = require('fs');

function day13() {
  const input = fs.readFileSync('./day13.txt').toString().split('\n\n');
  let pairs = input.map(x => x.split('\n').map(line => JSON.parse(line)));
  // console.log(pairs);
  let sum = 0;
  for (let i = 0; i < pairs.length; i++) {
    let [left, right] = pairs[i];
    if (checkOrder(left, right) === true) {
      // console.log(i + 1);
      sum += i + 1;
    }
  }
  console.log('part 1');
  console.log(sum);

  let packets = pairs.reduce((acc, cur) => {
    acc.push(cur[0]);
    acc.push(cur[1]);
    return acc;
  }, []);
  // let packets = pairs.flat();
  packets.push([[2]]);
  packets.push([[6]]);
  // console.log(packets);
  let order = new Array(packets.length).fill(null).map((x, i) => i + 1);
  for (let i = 0; i < packets.length; i++) {
    for (let j = i + 1; j < packets.length; j++) {
      if (checkOrder(packets[i], packets[j]) === false) {
        [packets[i], packets[j]] = [packets[j], packets[i]];
        [order[i], order[j]] = [order[j], order[i]];
      }
    }
  }
  console.log('part 2');
  console.log(
    (order.indexOf(order.length) + 1) * (order.indexOf(order.length - 1) + 1),
  );
}

function checkOrder(left, right) {
  let pointer = 0;
  let stop = false;
  while (!stop) {
    if (
      typeof left[pointer] === 'undefined' &&
      typeof right[pointer] === 'undefined'
    ) {
      stop = true;
    } else if (
      typeof left[pointer] === 'undefined' &&
      typeof right[pointer] === 'number'
    ) {
      return true;
    } else if (
      typeof left[pointer] === 'undefined' &&
      typeof right[pointer] === 'object'
    ) {
      return true;
    } else if (
      typeof left[pointer] === 'number' &&
      typeof right[pointer] === 'undefined'
    ) {
      return false;
    } else if (
      typeof left[pointer] === 'number' &&
      typeof right[pointer] === 'number'
    ) {
      if (left[pointer] < right[pointer]) return true;
      if (left[pointer] > right[pointer]) return false;
    } else if (
      typeof left[pointer] === 'number' &&
      typeof right[pointer] === 'object'
    ) {
      let result = checkOrder([left[pointer]], right[pointer]);
      if (result === true || result === false) return result;
    } else if (
      typeof left[pointer] === 'object' &&
      typeof right[pointer] === 'undefined'
    ) {
      return false;
    } else if (
      typeof left[pointer] === 'object' &&
      typeof right[pointer] === 'number'
    ) {
      let result = checkOrder(left[pointer], [right[pointer]]);
      if (result === true || result === false) return result;
    } else if (
      typeof left[pointer] === 'object' &&
      typeof right[pointer] === 'object'
    ) {
      let result = checkOrder(left[pointer], right[pointer]);
      if (result === true || result === false) return result;
    }
    pointer++;
  }
  return 'unknown';
}

day13();
