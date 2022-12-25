const fs = require('fs');

function day20() {
	const input = fs.readFileSync('./day20.txt').toString();
	console.log('part 1');
	console.log(part1(createData(input)));
	console.log('part 2');
	console.log(part2(createData(input)));
}

function createData(input) {
	return input.split('\n').map((num, id) => {
		return { num: parseInt(num), id };
	});
}

function part1(data) {
	for (let id = 0; id < data.length; id++) {
		// 先查要挪的東西在哪裡
		let index = data.findIndex(d => d.id === id);
		let num = data[index]['num'];
		// 先把它放到最前面
		data = [data[index], ...data.slice(index + 1), ...data.slice(0, index)];
		// 根據num決定要挪多少距離
		if (num === 0) {
			continue;
		}
		let moveSteps = 0;
		if (num > 0) {
			moveSteps = num % (data.length - 1);
		} else if (num < 0) {
			moveSteps = (num % (data.length - 1)) + (data.length - 1);
		}
		// 挪
		data = [
			...data.slice(1, 1 + moveSteps),
			data[0],
			...data.slice(1 + moveSteps),
		];
	}
	let zeroPosition = data.findIndex(d => d.num === 0);
	return (
		data[(zeroPosition + 1000) % data.length]['num'] +
		data[(zeroPosition + 2000) % data.length]['num'] +
		data[(zeroPosition + 3000) % data.length]['num']
	);
}

function part2(data) {
	data = data.map(({ num, id }) => {
		return { num: num * 811589153, id };
	});
	for (let turn = 1; turn <= 10; turn++) {
		for (let id = 0; id < data.length; id++) {
			// 先查要挪的東西在哪裡
			let index = data.findIndex(d => d.id === id);
			let num = data[index]['num'];
			// 先把它放到最前面
			data = [data[index], ...data.slice(index + 1), ...data.slice(0, index)];
			// 根據num決定要挪多少距離
			if (num === 0) {
				continue;
			}
			let moveSteps = 0;
			if (num > 0) {
				moveSteps = num % (data.length - 1);
			} else if (num < 0) {
				moveSteps = (num % (data.length - 1)) + (data.length - 1);
			}
			// 挪
			data = [
				...data.slice(1, 1 + moveSteps),
				data[0],
				...data.slice(1 + moveSteps),
			];
		}
	}
	let zeroPosition = data.findIndex(d => d.num === 0);
	return (
		data[(zeroPosition + 1000) % data.length]['num'] +
		data[(zeroPosition + 2000) % data.length]['num'] +
		data[(zeroPosition + 3000) % data.length]['num']
	);
}

day20();
