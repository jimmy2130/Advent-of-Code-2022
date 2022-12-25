const fs = require('fs');

function day17() {
	const input = fs.readFileSync('./day17.txt').toString();
	const blocks = ['H', 'X', 'L', 'I', 'O'];
	let heightMap = Array(7)
		.fill(null)
		.map(() => {
			let arr = Array(50000).fill(false);
			arr[0] = true;
			return arr;
		});
	let inputIndex = 0;

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
			if (!canMoveDown(blockPosition, heightMap)) {
				heightMap = updateHeightMap(blockPosition, heightMap);
				break;
			}
			blockPosition = pushDown(blockPosition);
		}
	}
	console.log('part 1');
	console.log(getHighestPoint(heightMap));

	console.log('part 2');
	console.log(1565517241382);
	// 走完每輪指令剛好會循環，可用一個循環所得到的最高值乘以需要達到目標的循環數，再處理剩餘的磚塊
	// 由下面的測試，一個循環會落下1737塊磚塊(2714)，兩個循環會落下3477塊磚塊(5438)
	// 知道每增加1740塊磚塊，最高值會增加2724
	// 已知一兆是由2920+1740*574712642
	// 找到落下2920塊磚塊的分數是4574
	// 所以落下一兆塊磚塊的分數是4574+2724*574712642

	// inputIndex = 0;
	// let blockIndex = 0;
	// while (inputIndex < input.length * 1) {
	// 	let block = blocks[blockIndex % blocks.length];
	// 	let blockPosition = getBlockPosition(block, heightMap);
	// 	while (true) {
	// 		if (input[inputIndex % input.length] === '>') {
	// 			blockPosition = pushRight(blockPosition, heightMap);
	// 		} else if (input[inputIndex % input.length] === '<') {
	// 			blockPosition = pushLeft(blockPosition, heightMap);
	// 		}
	// 		inputIndex++;
	// 		if (!canMoveDown(blockPosition, heightMap)) {
	// 			heightMap = updateHeightMap(blockPosition, heightMap);
	// 			break;
	// 		}
	// 		blockPosition = pushDown(blockPosition);
	// 	}
	// 	blockIndex++;
	// }

	// console.log('test');
	// console.log('remaining', inputIndex % input.length);
	// console.log('blockIndex', blockIndex);
	// for (let i = 0; i < heightMap.length; i++) {
	// 	console.log(heightMap[i].lastIndexOf(true));
	// }
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
	if (blockPosition.some(([x, y]) => heightMap[x + 1][y] === true)) {
		return blockPosition;
	}
	return blockPosition.map(([x, y]) => [x + 1, y]);
}

function pushLeft(blockPosition, heightMap) {
	if (blockPosition.some(([x, y]) => x - 1 < 0)) {
		return blockPosition;
	}
	if (blockPosition.some(([x, y]) => heightMap[x - 1][y] === true)) {
		return blockPosition;
	}
	return blockPosition.map(([x, y]) => [x - 1, y]);
}

function canMoveDown(blockPosition, heightMap) {
	if (blockPosition.some(([x, y]) => y - 1 <= 0)) {
		return false;
	}
	return blockPosition.every(([x, y]) => heightMap[x][y - 1] === false);
}

function updateHeightMap(blockPosition, heightMap) {
	for (let i = 0; i < blockPosition.length; i++) {
		let [x, y] = blockPosition[i];
		heightMap[x][y] = true;
	}
	return heightMap;
}

function pushDown(blockPosition) {
	return blockPosition.map(([x, y]) => [x, y - 1]);
}

function getHighestPoint(heightMap) {
	return heightMap.reduce((acc, cur) => {
		if (cur.lastIndexOf(true) > acc) {
			acc = cur.lastIndexOf(true);
		}
		return acc;
	}, 0);
}

day17();
