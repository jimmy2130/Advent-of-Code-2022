const fs = require('fs');

function day22() {
	const [rawMap, rawInstruction] = fs
		.readFileSync('./day22.txt')
		.toString()
		.split('\n\n');
	console.log('part 1');
	console.log(part1(createMap(rawMap), createInstruction(rawInstruction)));
	console.log('part 2');
	console.log(part2(createMap(rawMap), createInstruction(rawInstruction)));
}

function createMap(rawMap) {
	let map = rawMap.split('\n').map(r => r.split(''));
	let cLength = map[0].length;
	for (let r = 0; r < map.length; r++) {
		if (map[r].length !== cLength) {
			let blank = Array(cLength - map[r].length).fill(' ');
			map[r] = [...map[r], ...blank];
		}
	}
	return map;
}

function createInstruction(rawInstruction) {
	let instruction = [];
	let temp = '';
	for (let i = 0; i < rawInstruction.length; i++) {
		if (rawInstruction[i] === 'L') {
			instruction.push(parseInt(temp));
			temp = '';
			instruction.push('L');
		} else if (rawInstruction[i] === 'R') {
			instruction.push(parseInt(temp));
			temp = '';
			instruction.push('R');
		} else {
			temp += rawInstruction[i];
		}
	}
	instruction.push(parseInt(temp));
	return instruction;
}

function part1(map, instruction) {
	const DIR = {
		r: [0, 1],
		u: [-1, 0],
		d: [1, 0],
		l: [0, -1],
	};
	let [r, c] = getOrigin(map);
	let direction = 'r';
	for (let i = 0; i < instruction.length; i++) {
		if (instruction[i] === 'L') {
			direction = turnLeft(direction);
		} else if (instruction[i] === 'R') {
			direction = turnRight(direction);
		} else {
			const [deltaR, deltaC] = DIR[direction];
			for (let step = 1; step <= instruction[i]; step++) {
				let searchR = r + deltaR;
				let searchC = c + deltaC;
				[searchR, searchC] = moveInside(searchR, searchC, map);
				while (map[searchR][searchC] === ' ') {
					searchR += deltaR;
					searchC += deltaC;
					[searchR, searchC] = moveInside(searchR, searchC, map);
				}
				if (map[searchR][searchC] === '.') {
					r = searchR;
					c = searchC;
				} else if (map[searchR][searchC] === '#') {
					break;
				}
			}
		}
	}
	return 1000 * (r + 1) + 4 * (c + 1) + getScoreFromDirection(direction);
}

function part2(map, instruction) {
	const DIR = {
		r: [0, 1],
		u: [-1, 0],
		d: [1, 0],
		l: [0, -1],
	};
	let [r, c] = getOrigin(map);
	let direction = 'r';
	for (let i = 0; i < instruction.length; i++) {
		if (instruction[i] === 'L') {
			direction = turnLeft(direction);
		} else if (instruction[i] === 'R') {
			direction = turnRight(direction);
		} else {
			for (let step = 1; step <= instruction[i]; step++) {
				let [deltaR, deltaC] = DIR[direction];
				let searchR = r + deltaR;
				let searchC = c + deltaC;
				let searchDirection = direction;
				[searchR, searchC, searchDirection] = warp(
					searchR,
					searchC,
					searchDirection,
					map,
				);
				if (map[searchR][searchC] === '.') {
					r = searchR;
					c = searchC;
					direction = searchDirection;
				} else if (map[searchR][searchC] === '#') {
					break;
				}
			}
		}
	}
	return 1000 * (r + 1) + 4 * (c + 1) + getScoreFromDirection(direction);
}

function getOrigin(map) {
	for (let c = 0; c < map[0].length; c++) {
		if (map[0][c] !== ' ' && map[0][c] !== '#') {
			return [0, c];
		}
	}
}

function turnLeft(direction) {
	if (direction === 'r') return 'u';
	if (direction === 'u') return 'l';
	if (direction === 'l') return 'd';
	if (direction === 'd') return 'r';
}

function turnRight(direction) {
	if (direction === 'r') return 'd';
	if (direction === 'd') return 'l';
	if (direction === 'l') return 'u';
	if (direction === 'u') return 'r';
}

function moveInside(r, c, map) {
	if (r < 0) r += map.length;
	else if (r >= map.length) r -= map.length;
	else if (c < 0) c += map[0].length;
	else if (c >= map[0].length) c -= map[0].length;
	return [r, c];
}

function warp(r, c, direction, map) {
	if (r === -1 && c >= 50 && c <= 99) {
		return [c + 100, 0, 'r'];
	}
	if (r === -1 && c >= 100 && c <= 149) {
		return [199, c - 100, 'u'];
	}
	if (r >= 0 && r <= 49 && c === 150) {
		return [149 - r, 99, 'l'];
	}
	if (r >= 100 && r <= 149 && c === 100) {
		return [149 - r, 149, 'l'];
	}
	if (r === 200 && c >= 0 && c <= 49) {
		return [0, c + 100, 'd'];
	}
	if (r >= 150 && r <= 199 && c === -1) {
		return [0, r - 100, 'd'];
	}
	if (r >= 100 && r <= 149 && c === -1) {
		return [149 - r, 50, 'r'];
	}
	if (r >= 0 && r <= 49 && c === 49) {
		return [149 - r, 0, 'r'];
	}
	if (r === 50 && c === 100) {
		console.log('9 fire');
		if (direction === 'd') return [50, 99, 'l'];
		if (direction === 'r') return [49, 100, 'u'];
		console.log('r50c100 error');
	}
	if (r === 50 && c >= 100 && c <= 149) {
		return [c - 50, 99, 'l'];
	}
	if (r >= 50 && r <= 99 && c === 100) {
		return [49, r + 50, 'u'];
	}
	if (r === 150 && c === 50) {
		console.log('12 fire');
		if (direction === 'd') return [150, 49, 'l'];
		if (direction === 'r') return [149, 50, 'u'];
		console.log('r150c50 error');
	}
	if (r === 150 && c >= 50 && c <= 99) {
		return [c + 100, 49, 'l'];
	}
	if (r >= 150 && r <= 199 && c === 50) {
		return [149, r - 100, 'u'];
	}
	if (r === 99 && c === 49) {
		console.log('15 fire');
		if (direction === 'u') return [99, 50, 'r'];
		if (direction === 'l') return [100, 49, 'd'];
		console.log('r99c49 error');
	}
	if (r === 99 && c >= 0 && c <= 49) {
		return [c + 50, 50, 'r'];
	}
	if (r >= 50 && r <= 99 && c === 49) {
		return [100, r - 50, 'd'];
	}
	return [r, c, direction];
}

function getScoreFromDirection(direction) {
	if (direction === 'r') return 0;
	if (direction === 'd') return 1;
	if (direction === 'l') return 2;
	if (direction === 'u') return 3;
}

day22();
