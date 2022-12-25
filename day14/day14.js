const fs = require('fs');

function day14() {
	const input = fs.readFileSync('./day14.txt').toString().split('\n');
	let map = createMap(input);
	const lowestRow = getLowestRow(map);
	// console.log(lowestRow);

	console.log('part 1');
	console.log(simulate(map, lowestRow));
	map = updateMap(createMap(input), lowestRow);
	console.log('part 2');
	console.log(simulate(map, lowestRow + 2));
}

function createMap(input) {
	let map = new Array(1000).fill(null).map(x => new Array(1000).fill(false));
	for (let i = 0; i < input.length; i++) {
		let points = input[i]
			.split(' -> ')
			.map(x => x.split(',').map(num => parseInt(num)));
		for (let j = 0; j < points.length - 1; j++) {
			let [startCol, startRow] = points[j];
			let [endCol, endRow] = points[j + 1];
			drawMap(map, startRow, startCol, endRow, endCol);
		}
	}
	return map;
}

function updateMap(map, lowestRow) {
	for (let i = 0; i < map[lowestRow + 2].length; i++) {
		map[lowestRow + 2][i] = true;
	}
	return map;
}

function drawMap(map, startRow, startCol, endRow, endCol) {
	if (startRow === endRow) {
		if (startCol > endCol) {
			[startCol, endCol] = [endCol, startCol];
		}
		for (let i = startCol; i <= endCol; i++) {
			map[startRow][i] = true;
		}
	} else if (startCol === endCol) {
		if (startRow > endRow) {
			[startRow, endRow] = [endRow, startRow];
		}
		for (let i = startRow; i <= endRow; i++) {
			map[i][startCol] = true;
		}
	} else {
		console.log('drawMap ERROR!');
	}
}

function getLowestRow(map) {
	for (let r = map.length - 1; r >= 0; r--) {
		if (map[r].includes(true)) {
			return r;
		}
	}
}

function simulate(map, lowestRow) {
	let count = 0;
	let keepGoing = true;
	while (true) {
		let [r, c] = [0, 500];
		if (map[r][c] === true) {
			break;
		}
		// start simulating
		while (true) {
			if (r + 1 > lowestRow) {
				keepGoing = false;
				break;
			}
			if (map[r + 1][c] === false) {
				r = r + 1;
			} else if (map[r + 1][c - 1] === false) {
				r = r + 1;
				c = c - 1;
			} else if (map[r + 1][c + 1] === false) {
				r = r + 1;
				c = c + 1;
			} else {
				map[r][c] = true;
				count++;
				break;
			}
		}
		if (keepGoing === false) {
			break;
		}
	}
	return count;
}

day14();
