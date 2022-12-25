const fs = require('fs');

function day18() {
	const list = fs
		.readFileSync('./day18.txt')
		.toString()
		.split('\n')
		.map(line => line.split(',').map(num => parseInt(num)));
	console.log('part 1');
	console.log(part1(list));
	let record = createRecord(list);
	console.log('part 2');
	console.log(part1(list) - part1(fillRecordWithOutside(record)));
}

function part1(list) {
	let surfaceArea = 6 * list.length;
	for (let i = 0; i < list.length; i++) {
		for (let j = i + 1; j < list.length; j++) {
			if (isConnected(list[i], list[j])) {
				surfaceArea -= 2;
			}
		}
	}
	return surfaceArea;
}

function isConnected([x1, y1, z1], [x2, y2, z2]) {
	if (Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2) === 1) {
		return true;
	}
	return false;
}

function createRecord(list) {
	let record = Array(20)
		.fill(null)
		.map(x =>
			Array(20)
				.fill(null)
				.map(x => Array(20).fill('air')),
		);
	for (let i = 0; i < list.length; i++) {
		let [x, y, z] = list[i];
		record[x][y][z] = 'cube';
	}
	return record;
}

function fillRecordWithOutside(record) {
	let queue = [[0, 0, 0]];
	record[0][0][0] = 'outside';
	const DIR = [
		[-1, 0, 0],
		[1, 0, 0],
		[0, -1, 0],
		[0, 1, 0],
		[0, 0, -1],
		[0, 0, 1],
	];
	while (queue.length > 0) {
		let [x, y, z] = queue.shift();
		for (let i = 0; i < DIR.length; i++) {
			let [deltaX, deltaY, deltaZ] = DIR[i];
			let [searchX, searchY, searchZ] = [x + deltaX, y + deltaY, z + deltaZ];
			if (inBoundary(searchX, searchY, searchZ)) {
				if (record[searchX][searchY][searchZ] === 'air') {
					queue.push([searchX, searchY, searchZ]);
					record[searchX][searchY][searchZ] = 'outside';
				}
			}
		}
	}
	let list = [];
	for (let x = 0; x < 20; x++) {
		for (let y = 0; y < 20; y++) {
			for (let z = 0; z < 20; z++) {
				if (record[x][y][z] === 'air') {
					list.push([x, y, z]);
				}
			}
		}
	}
	return list;
}

function inBoundary(x, y, z) {
	if (x < 0 || x >= 20 || y < 0 || y >= 20 || z < 0 || z >= 20) {
		return false;
	}
	return true;
}

day18();
