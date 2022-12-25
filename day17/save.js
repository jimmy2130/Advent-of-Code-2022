const fs = require('fs');

function day17() {
	const input = fs.readFileSync('./day17.txt').toString();
	const blocks = ['H', 'X', 'L', 'I', 'O'];
	let heightMap = new Set();
	let inputIndex = 0;
	let record = [];
	for (let blockIndex = 0; blockIndex < 2022; blockIndex++) {
		let block = blocks[blockIndex % blocks.length];
		let blockPosition = getBlockPosition(block, heightMap);
		while (true) {
			if (input[inputIndex % input.length] === '>') {
				blockPosition = pushRight(blockPosition, heightMap);
			} else if (input[inputIndex % input.length] === '<') {
				blockPosition = pushLeft(blockPosition, heightMap);
			}
			inputIndex++;
			// console.log(blockPosition);
			if (!canMoveDown(blockPosition, heightMap)) {
				heightMap = updateHeightMap(blockPosition, heightMap);
				break;
			}
			blockPosition = pushDown(blockPosition);
			// console.log(blockPosition);
		}
		record.push(getHighestPoint(heightMap));
	}
	console.log('part 1');
	// console.log(heightMap);
	// console.log(inputIndex);
	console.log(getHighestPoint(heightMap));
}

function getBlockPosition(block, heightMap) {
	let hp = getHighestPoint(heightMap);
	if (block === 'H') {
		return [
			[2, hp + 4],
			[3, hp + 4],
			[4, hp + 4],
			[5, hp + 4],
		];
	}
	if (block === 'X') {
		return [
			[3, hp + 4],
			[3, hp + 5],
			[3, hp + 6],
			[2, hp + 5],
			[4, hp + 5],
		];
	}
	if (block === 'L') {
		return [
			[2, hp + 4],
			[3, hp + 4],
			[4, hp + 4],
			[4, hp + 5],
			[4, hp + 6],
		];
	}
	if (block === 'I') {
		return [
			[2, hp + 4],
			[2, hp + 5],
			[2, hp + 6],
			[2, hp + 7],
		];
	}
	if (block === 'O') {
		return [
			[2, hp + 4],
			[3, hp + 4],
			[2, hp + 5],
			[3, hp + 5],
		];
	}
	console.log('block position error!');
}

function pushRight(blockPosition, heightMap) {
	if (blockPosition.some(([x, y]) => x + 1 >= 7)) {
		return blockPosition;
	}
	if (
		blockPosition.some(([x, y]) => heightMap.has(JSON.stringify([x + 1, y])))
	) {
		return blockPosition;
	}
	return blockPosition.map(([x, y]) => [x + 1, y]);
}

function pushLeft(blockPosition, heightMap) {
	if (blockPosition.some(([x, y]) => x - 1 < 0)) {
		return blockPosition;
	}
	if (
		blockPosition.some(([x, y]) => heightMap.has(JSON.stringify([x - 1, y])))
	) {
		return blockPosition;
	}
	return blockPosition.map(([x, y]) => [x - 1, y]);
}

function canMoveDown(blockPosition, heightMap) {
	if (blockPosition.some(([x, y]) => y - 1 <= 0)) {
		return false;
	}
	return blockPosition.every(
		([x, y]) => !heightMap.has(JSON.stringify([x, y - 1])),
	);
}

function updateHeightMap(blockPosition, heightMap) {
	// console.log('function');
	// console.log('blockPosition', blockPosition);
	// console.log('heightMap', heightMap);
	for (let i = 0; i < blockPosition.length; i++) {
		heightMap.add(JSON.stringify(blockPosition[i]));
	}
	// console.log('result', heightMap);
	return heightMap;
}

function pushDown(blockPosition) {
	return blockPosition.map(([x, y]) => [x, y - 1]);
}

function getHighestPoint(heightMap) {
	let hp = 0;
	heightMap.forEach(value => {
		hp = Math.max(hp, JSON.parse(value)[1]);
	});
	return hp;
}

day17();
