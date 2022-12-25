const fs = require('fs');

function day23() {
	const input = fs
		.readFileSync('./day23.txt')
		.toString()
		.split('\n')
		.map(line => line.split(''));
	// console.log(elfs);
	console.log('part 1');
	console.log(part1(createData(input)));
	console.log('part 2');
	console.log(part2(createData(input)));
}

function createData(input) {
	let arr = [];
	for (let r = 0; r < input.length; r++) {
		for (let c = 0; c < input[r].length; c++) {
			if (input[r][c] === '#') {
				arr.push([r, c]);
			}
		}
	}
	return arr;
}

function part1(elfs) {
	for (round = 0; round < 10; round++) {
		let [proposed, record] = firstHalf(elfs, round);
		elfs = secondHalf(elfs, proposed, record);
	}
	return getAnswer(elfs);
}

function part2(elfs) {
	let round = 0;
	while (true) {
		console.log(round);
		let [proposed, record] = firstHalf(elfs, round);
		let newElfs = secondHalf(elfs, proposed, record);
		if (JSON.stringify(newElfs) === JSON.stringify(elfs)) {
			return round + 1;
		}
		elfs = newElfs;
		round++;
	}
}

function firstHalf(elfs, round) {
	let proposed = [];
	let record = new Map();
	for (let i = 0; i < elfs.length; i++) {
		let positionRecord = createPositionRecord(elfs);
		let proposedPosition = getProposedPosition(elfs[i], positionRecord, round);
		proposed.push(proposedPosition);
		if (!record.has(JSON.stringify(proposedPosition))) {
			record.set(JSON.stringify(proposedPosition), 1);
		} else {
			record.set(
				JSON.stringify(proposedPosition),
				record.get(JSON.stringify(proposedPosition)) + 1,
			);
		}
	}
	return [proposed, record];
}

function createPositionRecord(elfs) {
	return elfs.reduce((acc, cur) => {
		acc.add(JSON.stringify(cur));
		return acc;
	}, new Set());
}

function getProposedPosition([x, y], record, round) {
	// no neighbor
	const NEIGHBOR = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1],
	];
	let hasNeighbor = false;
	for (let i = 0; i < NEIGHBOR.length; i++) {
		let [deltaX, deltaY] = NEIGHBOR[i];
		let [searchX, searchY] = [x + deltaX, y + deltaY];
		if (record.has(JSON.stringify([searchX, searchY]))) {
			hasNeighbor = true;
			break;
		}
	}
	if (!hasNeighbor) return [x, y];
	const DIR = [
		[
			[-1, 0],
			[-1, -1],
			[-1, 1],
		],
		[
			[1, 0],
			[1, -1],
			[1, 1],
		],
		[
			[0, -1],
			[1, -1],
			[-1, -1],
		],
		[
			[0, 1],
			[1, 1],
			[-1, 1],
		],
	];
	const MOVE = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	];
	for (let i = round % 4; i < (round % 4) + 4; i++) {
		let index = i % 4;
		let hasNeighbor = false;
		for (let j = 0; j < DIR[index].length; j++) {
			let [deltaX, deltaY] = DIR[index][j];
			let [searchX, searchY] = [x + deltaX, y + deltaY];
			if (record.has(JSON.stringify([searchX, searchY]))) {
				hasNeighbor = true;
				break;
			}
		}
		if (!hasNeighbor) {
			let [moveX, moveY] = MOVE[index];
			return [x + moveX, y + moveY];
		}
	}
	return [x, y];
}

function secondHalf(elfs, proposed, record) {
	let final = [];
	for (let i = 0; i < proposed.length; i++) {
		if (record.get(JSON.stringify(proposed[i])) === 1) {
			final.push(proposed[i]);
		} else {
			final.push(elfs[i]);
		}
	}
	return final;
}

function getAnswer(elfs) {
	let [xMin, xMax, yMin, yMax] = [Infinity, -Infinity, Infinity, -Infinity];
	for (let i = 0; i < elfs.length; i++) {
		let [x, y] = elfs[i];
		if (x < xMin) xMin = x;
		else if (x > xMax) xMax = x;
		if (y < yMin) yMin = y;
		else if (y > yMax) yMax = y;
	}
	return (xMax - xMin + 1) * (yMax - yMin + 1) - elfs.length;
}

day23();
