const fs = require('fs');

function day24() {
	const input = fs.readFileSync('./day24.txt').toString();
	const start = [0, 1];
	const end = [input.split('\n').length - 1, input.split('\n')[0].length - 2];

	console.log('part 1');
	console.log(mazeSimulation(createMap(input), start, end)[0]);

	console.log('part 2');
	console.log(part2(createMap(input), start, end));
}

function createMap(input) {
	return input.split('\n').map(row =>
		row.split('').map(ch => {
			if (ch === '.') return '';
			else return ch;
		}),
	);
}

function part2(map, start, end) {
	let totalTime = 0;
	let time;
	[time, map] = mazeSimulation(map, start, end);
	totalTime += time;
	[time, map] = mazeSimulation(map, end, start);
	totalTime += time;
	[time, map] = mazeSimulation(map, start, end);
	totalTime += time;
	return totalTime;
}

function mazeSimulation(map, pos, [goalR, goalC]) {
	let record = Array(1000)
		.fill(null)
		.map(x =>
			Array(map.length)
				.fill(null)
				.map(x => Array(map[0].length).fill(false)),
		); //[min][r][c]
	const dir = [
		[0, 0],
		[-1, 0],
		[1, 0],
		[0, 1],
		[0, -1],
	];
	let min = 0;
	let queue = [pos];
	let queueLength = queue.length;
	while (queue.length > 0) {
		// console.log(min);
		let [r, c] = queue.shift();
		queueLength--;
		if (r === goalR && c === goalC) {
			return [min, map];
		}
		map = simulateForward(map);
		for (let i = 0; i < dir.length; i++) {
			let [deltaR, deltaC] = dir[i];
			let [searchR, searchC] = [r + deltaR, c + deltaC];
			if (
				isValid(map, searchR, searchC) === true &&
				record[min][searchR][searchC] === false
			) {
				queue.push([searchR, searchC]);
				record[min][searchR][searchC] = true;
			}
		}
		if (queueLength === 0) {
			min++;
			queueLength = queue.length;
		} else {
			map = simulateBackward(map);
		}
	}
	return ['fail', ''];
}

function isValid(map, r, c) {
	if (r < 0 || r >= map.length || c < 0 || c >= map[r].length) {
		return false;
	}
	if (map[r][c] === '') {
		return true;
	}
	return false;
}

function simulateForward(map) {
	let newMap = Array(map.length)
		.fill(null)
		.map(x => Array(map[0].length).fill(''));

	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			if (map[r][c] === '') {
				continue;
			}
			if (map[r][c] === '#') {
				newMap[r][c] = '#';
				continue;
			}
			for (let ch = 0; ch < map[r][c].length; ch++) {
				if (map[r][c][ch] === '>') {
					newMap[r][c + 1 === map[r].length - 1 ? 1 : c + 1] += '>';
				} else if (map[r][c][ch] === '<') {
					newMap[r][c - 1 === 0 ? map[r].length - 2 : c - 1] += '<';
				} else if (map[r][c][ch] === 'v') {
					newMap[r + 1 === map.length - 1 ? 1 : r + 1][c] += 'v';
				} else if (map[r][c][ch] === '^') {
					newMap[r - 1 === 0 ? map.length - 2 : r - 1][c] += '^';
				}
			}
		}
	}
	return newMap;
}

function simulateBackward(map) {
	let newMap = Array(map.length)
		.fill(null)
		.map(x => Array(map[0].length).fill(''));

	for (let r = 0; r < map.length; r++) {
		for (let c = 0; c < map[r].length; c++) {
			if (map[r][c] === '') {
				continue;
			}
			if (map[r][c] === '#') {
				newMap[r][c] = '#';
				continue;
			}
			for (let ch = 0; ch < map[r][c].length; ch++) {
				if (map[r][c][ch] === '>') {
					newMap[r][c - 1 === 0 ? map[r].length - 2 : c - 1] += '>';
				} else if (map[r][c][ch] === '<') {
					newMap[r][c + 1 === map[r].length - 1 ? 1 : c + 1] += '<';
				} else if (map[r][c][ch] === 'v') {
					newMap[r - 1 === 0 ? map.length - 2 : r - 1][c] += 'v';
				} else if (map[r][c][ch] === '^') {
					newMap[r + 1 === map.length - 1 ? 1 : r + 1][c] += '^';
				}
			}
		}
	}
	return newMap;
}

function drawMap(map) {
	for (let r = 0; r < map.length; r++) {
		let str = '';
		for (let c = 0; c < map[r].length; c++) {
			if (map[r][c] === '') {
				str += '.';
			} else if (map[r][c] === '#') {
				str += '#';
			} else if (map[r][c].length !== 1) {
				str += map[r][c].length;
			} else {
				str += map[r][c];
			}
		}
		console.log(str);
	}
}

day24();
