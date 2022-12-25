const fs = require('fs');

function day11() {
  const input = fs.readFileSync('./day11.txt').toString().split('\n\n');
  let monkeys = createData(input);
  for (let turn = 1; turn <= 20; turn++) {
    for (let id = 0; id < monkeys.length; id++) {
      let monkey = monkeys[id];
      while (monkey.items.length > 0) {
        let item = monkey.items.shift();
        item = operate(monkey.operation, item);
        item = Math.floor(item / 3);
        if (item % monkey.test === 0) {
          monkeys[monkey.ifTrue].items.push(item);
        } else {
          monkeys[monkey.ifFalse].items.push(item);
        }
        monkey.inspectTimes++;
      }
    }
  }

  console.log('part 1');
  console.log(getAnswer(monkeys));

  monkeys = createData2(input);
  const tests = monkeys.reduce((acc, cur) => {
    acc.push(cur.test);
    return acc;
  }, []);
  for (let turn = 1; turn <= 10000; turn++) {
    for (let id = 0; id < monkeys.length; id++) {
      let monkey = monkeys[id];
      while (monkey.numbers.length > 0) {
        let numbers = monkey.numbers.shift();
        numbers = operate2(monkey.operation, numbers, tests);
        if (numbers[id] === 0) {
          monkeys[monkey.ifTrue].numbers.push(numbers);
        } else {
          monkeys[monkey.ifFalse].numbers.push(numbers);
        }
        monkey.inspectTimes++;
      }
    }
  }
  console.log('part 2');
  console.log(getAnswer(monkeys));
}

function createData(input) {
  let monkeys = [];
  for (let i = 0; i < input.length; i++) {
    let monkey = {};
    let [id, items, operation, test, ifTrue, ifFalse] = input[i].split('\n');
    monkey.items = items
      .split(': ')[1]
      .split(', ')
      .map(num => parseInt(num));
    monkey.operation = operation.split(' = ')[1].split(' ');
    monkey.test = parseInt(test.split(' by ')[1]);
    monkey.ifTrue = parseInt(ifTrue.split('monkey ')[1]);
    monkey.ifFalse = parseInt(ifFalse.split('monkey ')[1]);
    monkey.inspectTimes = 0;
    monkeys.push(monkey);
  }
  return monkeys;
}

function operate(inputRules, item) {
  let rules = [...inputRules];
  if (rules[0] === 'old') {
    rules[0] = item;
  } else {
    rules[0] = parseInt(rules[0]);
  }
  if (rules[2] === 'old') {
    rules[2] = item;
  } else {
    rules[2] = parseInt(rules[2]);
  }
  if (rules[1] === '*') return rules[0] * rules[2];
  if (rules[1] === '+') return rules[0] + rules[2];
  return 'ERROR';
}

function createData2(input) {
  let monkeys = [];
  for (let i = 0; i < input.length; i++) {
    let monkey = {};
    let [id, items, operation, test, ifTrue, ifFalse] = input[i].split('\n');
    monkey.numbers = items
      .split(': ')[1]
      .split(', ')
      .map(num => parseInt(num));

    monkey.operation = operation.split(' = ')[1].split(' ');
    monkey.test = parseInt(test.split(' by ')[1]);
    monkey.ifTrue = parseInt(ifTrue.split('monkey ')[1]);
    monkey.ifFalse = parseInt(ifFalse.split('monkey ')[1]);
    monkey.inspectTimes = 0;
    monkeys.push(monkey);
  }
  for (let i = 0; i < monkeys.length; i++) {
    let monkey = monkeys[i];
    for (let j = 0; j < monkey.numbers.length; j++) {
      monkey.numbers[j] = getRemainings(monkey.numbers[j], monkeys);
    }
  }
  return monkeys;
}

function getRemainings(number, monkeys) {
  return monkeys.reduce((acc, cur) => {
    acc.push(number % cur.test);
    return acc;
  }, []);
}

function operate2(rules, numbers, tests) {
  if (rules[1] === '+') {
    // console.log('add');
    numbers = numbers.map((x, i) => (x + parseInt(rules[2])) % tests[i]);
  } else if (rules[1] === '*' && rules[2] === 'old') {
    // console.log('square');
    numbers = numbers.map((x, i) => x ** 2 % tests[i]);
  } else {
    // console.log('multiply');
    numbers = numbers.map((x, i) => (x * parseInt(rules[2])) % tests[i]);
  }
  return numbers;
}

function getAnswer(monkeys) {
  let arr = monkeys
    .reduce((acc, cur) => {
      acc.push(cur.inspectTimes);
      return acc;
    }, [])
    .sort((a, b) => b - a);
  return arr[0] * arr[1];
}

day11();
