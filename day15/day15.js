const fs = require('fs');
const test = 10;
const part1CheckRow = 2000000;

function day15() {
	const input = fs.readFileSync('./day15.txt').toString().split('\n');
	const data = createData(input);
	console.log('part 1');
	console.log(part1(data, part1CheckRow));
	console.log('part 2');
	console.log(part2(data));
}

function createData(input) {
	let arr = [];
	for (let i = 0; i < input.length; i++) {
		let [sensorStr, beaconStr] = input[i].split(': ');
		let sensorX = parseInt(sensorStr.split(', ')[0].split('=')[1]);
		let sensorY = parseInt(sensorStr.split(', ')[1].split('=')[1]);
		let beaconX = parseInt(beaconStr.split(', ')[0].split('=')[1]);
		let beaconY = parseInt(beaconStr.split(', ')[1].split('=')[1]);
		arr.push([sensorX, sensorY, beaconX, beaconY]);
	}
	return arr;
}

function part1(data, checkRow) {
	// get every possible rangeInput from data
	let rangeInput = [];
	for (let i = 0; i < data.length; i++) {
		let [sensorX, sensorY, beaconX, beaconY] = data[i];
		let closestDistance =
			Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
		if (closestDistance < Math.abs(sensorY - checkRow)) {
			continue;
		}
		let xDelta = closestDistance - Math.abs(sensorY - checkRow);
		rangeInput.push([sensorX - xDelta, sensorX + xDelta]);
	}
	rangeInput.sort((a, b) => a[0] - b[0]);
	// merge rangeInput to range
	let range = [rangeInput[0]];
	for (let i = 1; i < rangeInput.length; i++) {
		let [low, high] = range[range.length - 1];
		let [addedLow, addedHigh] = rangeInput[i];
		if (addedLow > high) {
			range.push(rangeInput[i]);
		} else {
			range[range.length - 1][1] = Math.max(high, addedHigh);
		}
	}
	// console.log('range', range);
	// count the positions in range
	let count = range.reduce((acc, cur) => {
		acc += cur[1] - cur[0] + 1;
		return acc;
	}, 0);
	// subtract the position that is already a beacon
	let record = new Set();
	for (let i = 0; i < data.length; i++) {
		let [sensorX, sensorY, beaconX, beaconY] = data[i];
		if (beaconY === checkRow) {
			count = isBeaconInRange(range, beaconX, record) ? count - 1 : count;
		}
	}
	return count;
}

function part2(data) {
	for (let row = 0; row <= 4000000; row++) {
		let range = getRange(data, row);
		if (range.length !== 1) {
			return (range[0][1] + 1) * 4000000 + row;
		}
	}
}

function getRange(data, checkRow) {
	// get every possible rangeInput from data
	let rangeInput = [];
	for (let i = 0; i < data.length; i++) {
		let [sensorX, sensorY, beaconX, beaconY] = data[i];
		let closestDistance =
			Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
		if (closestDistance < Math.abs(sensorY - checkRow)) {
			continue;
		}
		let xDelta = closestDistance - Math.abs(sensorY - checkRow);
		rangeInput.push([sensorX - xDelta, sensorX + xDelta]);
	}
	rangeInput.sort((a, b) => a[0] - b[0]);
	// merge rangeInput to range
	let range = [rangeInput[0]];
	for (let i = 1; i < rangeInput.length; i++) {
		let [low, high] = range[range.length - 1];
		let [addedLow, addedHigh] = rangeInput[i];
		if (addedLow > high) {
			range.push(rangeInput[i]);
		} else {
			range[range.length - 1][1] = Math.max(high, addedHigh);
		}
	}
	return range;
}

function isBeaconInRange(range, x, record) {
	for (let i = 0; i < range.length; i++) {
		let [low, high] = range[i];
		if (low <= x && x <= high && !record.has(x)) {
			record.add(x);
			return true;
		}
	}
	return false;
}

day15();
