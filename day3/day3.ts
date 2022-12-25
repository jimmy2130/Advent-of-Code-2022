import fs from 'fs';

function day3() {
	const input = fs.readFileSync('./day3.txt').toString().split('\n');
	let sum = 0;
	for (let i = 0; i < input.length; i++) {
		let firstHalf = input[i].slice(0, input[i].length / 2);
		let secondHalf = input[i].slice(input[i].length / 2);
		let common = '';
		for (let j = 0; j < firstHalf.length; j++) {
			if (secondHalf.includes(firstHalf[j])) {
				common = firstHalf[j];
				break;
			}
		}
		if (common === '') console.log('ERROR');
		if (common.toUpperCase() === common) {
			sum += common.charCodeAt(0) - 38;
		} else {
			sum += common.charCodeAt(0) - 96;
		}
	}
	console.log('part 1');
	console.log(sum);
	sum = 0;
	for (let i = 0; i < input.length; i = i + 3) {
		let firstLine = input[i];
		let secondLine = input[i + 1];
		let thirdLine = input[i + 2];
		let common = '';
		for (let j = 0; j < firstLine.length; j++) {
			if (
				secondLine.includes(firstLine[j]) &&
				thirdLine.includes(firstLine[j])
			) {
				common = firstLine[j];
				break;
			}
		}
		if (common === '') console.log('ERROR');
		if (common.toUpperCase() === common) {
			sum += common.charCodeAt(0) - 38;
		} else {
			sum += common.charCodeAt(0) - 96;
		}
	}
	console.log('part 2');
	console.log(sum);
}

day3();
