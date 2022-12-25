const fs = require('fs');

function day23() {
	const input = fs
		.readFileSync('./day23.txt')
		.toString()
		.split('\n')
		.map(line => line.split(''));
	console.log('part 1');
	console.log(part1(createData(input)));
	console.log('part 2');
	console.log(part2(createData(input)));
}

function createData(input) {
	let arr = Array(300)
		.fill(null)
		.map(x => Array(300).fill('.'));
	for (let r = 0; r < input.length; r++) {
		for (let c = 0; c < input[r].length; c++) {
			if (input[r][c] === '#') {
				arr[r + 120][c + 120] = '#';
			}
		}
	}
	return arr;
}

function part1(elfs) {
	for (round = 0; round < 10; round++) {
		elfs = simulate(elfs, round);
	}
	return getAnswer(elfs);
}

function part2(elfs) {
	let round = 0;
	while (true) {
		let newElfs = simulate(elfs, round);
		let same = true;
		for (let r = 0; r < elfs.length; r++) {
			for (let c = 0; c < elfs[r].length; c++) {
				if (elfs[r][c] !== newElfs[r][c]) {
					same = false;
					break;
				}
			}
		}
		if (same === true) {
			return round + 1;
		}
		elfs = newElfs;
		round++;
	}
}

function simulate(elfs, round) {
	let proposedMap = Array(300)
		.fill(null)
		.map(x => Array(300).fill('.'));

	let stepBackList = Array(300)
		.fill(null)
		.map(x => Array(300).fill(null));

	for (let r = 0; r < elfs.length; r++) {
		for (let c = 0; c < elfs[r].length; c++) {
			if (elfs[r][c] === '#') {
				let [proposedX, proposedY] = getProposedPosition([r, c], elfs, round);
				if (proposedMap[proposedX][proposedY] === '.') {
					proposedMap[proposedX][proposedY] = '#';
					stepBackList[proposedX][proposedY] = r * 300 + c;
				} else if (proposedMap[proposedX][proposedY] === '#') {
					proposedMap[r][c] = '#';
					proposedMap[proposedX][proposedY] = 'X';
					let stepBackC = stepBackList[proposedX][proposedY] % 300;
					let stepBackR =
						(stepBackList[proposedX][proposedY] - stepBackC) / 300;
					proposedMap[stepBackR][stepBackC] = '#';
				} else if (proposedMap[proposedX][proposedY] === 'X') {
					proposedMap[r][c] = '#';
				}
			}
		}
	}

	for (let r = 0; r < proposedMap.length; r++) {
		for (let c = 0; c < proposedMap[r].length; c++) {
			if (proposedMap[r][c] === 'X') {
				proposedMap[r][c] = '.';
			}
		}
	}

	return proposedMap;
}

function getProposedPosition([x, y], map, round) {
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
		if (map[searchX][searchY] === '#') {
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
			if (map[searchX][searchY] === '#') {
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

function getAnswer(elfs) {
	let [cMin, cMax, rMin, rMax] = [Infinity, -Infinity, Infinity, -Infinity];
	let elfsCount = 0;
	for (let r = 0; r < elfs.length; r++) {
		for (let c = 0; c < elfs.length; c++) {
			if (elfs[r][c] === '#') {
				elfsCount++;
				if (c < cMin) cMin = c;
				else if (c > cMax) cMax = c;
				if (r < rMin) rMin = r;
				else if (r > rMax) rMax = r;
			}
		}
	}
	return (cMax - cMin + 1) * (rMax - rMin + 1) - elfsCount;
}

day23();
