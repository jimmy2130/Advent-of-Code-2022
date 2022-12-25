const fs = require('fs');

function day25() {
	const input = fs.readFileSync('./day25.txt').toString().split('\n');
	let sum = input.reduce((acc, cur) => {
		acc += convertSnafuToDecimal(cur);
		return acc;
	}, 0);
	console.log(convertDecimalToSnafu(sum));
}

function convertSnafuToDecimal(str) {
	let multiplier = 1;
	let ans = 0;
	for (let i = str.length - 1; i >= 0; i--) {
		if (str[i] === '1' || str[i] === '2' || str[i] === '0') {
			ans += parseInt(str[i]) * multiplier;
		} else if (str[i] === '-') {
			ans += -1 * multiplier;
		} else if (str[i] === '=') {
			ans += -2 * multiplier;
		}
		multiplier *= 5;
	}
	return ans;
}

function convertDecimalToSnafu(num) {
	let str = num.toString(5);
	let ans = '';
	let overflow = 0;
	for (let i = str.length - 1; i >= 0; i--) {
		let digit = parseInt(str[i]) + overflow;
		if (digit === 0 || digit === 1 || digit === 2) {
			overflow = 0;
			ans = digit.toString() + ans;
		} else if (digit === 3) {
			overflow = 1;
			ans = '=' + ans;
		} else if (digit === 4) {
			overflow = 1;
			ans = '-' + ans;
		} else if (digit === 5) {
			overflow = 1;
			ans = '0' + ans;
		}
	}
	if (overflow === 1) {
		ans = '1' + ans;
	}
	return ans;
}

day25();
