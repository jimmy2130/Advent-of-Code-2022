const fs = require('fs');

function day21() {
	const input = fs.readFileSync('./day21.txt').toString().split('\n');
	console.log('part 1');
	console.log(part1(createData(input)));
	console.log('part 2');
	console.log(part2(createData2(input)));
}

function createData(input) {
	let ansList = new Map();
	let monkeys = new Map();
	for (let i = 0; i < input.length; i++) {
		let [name, operation] = input[i].split(': ');
		if (
			operation.includes('+') ||
			operation.includes('-') ||
			operation.includes('*') ||
			operation.includes('/')
		) {
			ansList.set(name, 'unknown');
			monkeys.set(name, operation);
		} else {
			ansList.set(name, parseInt(operation));
		}
	}
	return [ansList, monkeys];
}

function createData2(input) {
	let ansList = new Map();
	let monkeys = new Map();
	for (let i = 0; i < input.length; i++) {
		let [name, operation] = input[i].split(': ');
		if (name === 'humn') {
			ansList.set(name, 'unknown');
		} else if (
			operation.includes('+') ||
			operation.includes('-') ||
			operation.includes('*') ||
			operation.includes('/')
		) {
			ansList.set(name, 'unknown');
			monkeys.set(name, operation);
		} else {
			ansList.set(name, parseInt(operation));
		}
	}
	return [ansList, monkeys];
}

function part1([ansList, monkeys]) {
	while (monkeys.size > 0) {
		monkeys.forEach((value, key) => {
			let result = calculate(value, ansList);
			if (result !== 'unknown') {
				ansList.set(key, result);
				monkeys.delete(key);
			}
		});
	}
	return ansList.get('root');
}

function part2([ansList, monkeys]) {
	let [targetA, sign, targetB] = monkeys.get('root').split(' ');
	while (
		ansList.get(targetA) === 'unknown' &&
		ansList.get(targetB) === 'unknown'
	) {
		monkeys.forEach((value, key) => {
			let result = calculate(value, ansList);
			if (result !== 'unknown') {
				ansList.set(key, result);
				monkeys.delete(key);
			}
		});
	}
	const targetAns = !Number.isNaN(parseInt(ansList.get(targetA)))
		? parseInt(ansList.get(targetA))
		: parseInt(ansList.get(targetB));
	const targetVar = !Number.isNaN(parseInt(ansList.get(targetA)))
		? targetB
		: targetA;

	let m = [1, 1]; //[分子, 分母]
	let n = [0, 1]; //[分子, 分母]
	let pointer = 'humn';
	while (pointer !== targetVar) {
		let accessKey = '';
		monkeys.forEach((value, key) => {
			if (value.split(' ').includes(pointer)) {
				accessKey = key;
			}
		});
		let [a, sign, b] = monkeys.get(accessKey).split(' ');
		let knownNum = !Number.isNaN(parseInt(ansList.get(a)))
			? parseInt(ansList.get(a))
			: parseInt(ansList.get(b));
		let knownPosition = !Number.isNaN(parseInt(ansList.get(a))) ? 'a' : 'b';
		if (sign === '+') {
			n[0] += knownNum * n[1];
		} else if (sign === '*') {
			m[0] *= knownNum;
			n[0] *= knownNum;
		} else if (sign === '-') {
			m[0] *= knownPosition === 'b' ? 1 : -1;
			n[0] =
				knownPosition === 'b' ? n[0] - knownNum * n[1] : knownNum * n[1] - n[0];
		} else if (sign === '/') {
			m[1] *= knownNum;
			n[1] *= knownNum;
		}
		// 約分
		if (n[0] % 2 === 0 && n[1] % 2 === 0) {
			n[0] /= 2;
			n[1] /= 2;
		}
		pointer = accessKey;
	}
	let multiplier = m[1] / n[1];
	return (targetAns * m[1] - n[0] * multiplier) / m[0];
}

function calculate(operation, ansList) {
	let [a, sign, b] = operation.split(' ');
	if (ansList.get(a) === 'unknown') {
		return 'unknown';
	}
	if (ansList.get(b) === 'unknown') {
		return 'unknown';
	}
	if (sign === '+') {
		return ansList.get(a) + ansList.get(b);
	}
	if (sign === '-') {
		return ansList.get(a) - ansList.get(b);
	}
	if (sign === '*') {
		return ansList.get(a) * ansList.get(b);
	}
	if (sign === '/') {
		return ansList.get(a) / ansList.get(b);
	}
}

day21();
