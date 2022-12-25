const fs = require('fs');

function day16() {
	const input = fs.readFileSync('./day16.txt').toString().split('\n');
	const [graph, flow] = createGraph(input);
	const distancePair = createDistancePair(graph, flow);
	// console.log(graph);
	// console.log(flow);
	// console.log(distancePair);
	console.log('part 1');
	console.log(part1(flow, distancePair));
	console.log('part 2');
	console.log(part2(flow, distancePair));
}

function createGraph(input) {
	let graph = {};
	let flow = {};
	flow['AA'] = 0;
	for (let i = 0; i < input.length; i++) {
		let valve = input[i].split(' ')[1];
		let connections = '';
		if (input[i].includes('valves ')) {
			connections = input[i].split('valves ')[1].split(', ');
		} else {
			connections = [input[i].split('valve ')[1]];
		}
		let flowRate = parseInt(input[i].split('=')[1].split(';')[0]);
		graph[valve] = connections;
		if (flowRate !== 0) {
			flow[valve] = flowRate;
		}
	}
	return [graph, flow];
}

function createDistancePair(graph, flow) {
	let keys = Object.keys(flow);
	let distancePair = {};
	for (let i = 0; i < keys.length; i++) {
		distancePair[keys[i]] = {};
		for (let j = 0; j < keys.length; j++) {
			if (i !== j) {
				distancePair[keys[i]][keys[j]] = getDistance(graph, keys[i], keys[j]);
			}
		}
	}
	return distancePair;
}

function getDistance(graph, start, end) {
	let distance = 0;
	let queue = [start];
	let count = queue.length;
	let record = new Set([start]);
	while (queue.length > 0) {
		// console.log('distance', distance);
		// console.log('queue', queue);
		// console.log('record', record);
		let node = queue.shift();
		count--;
		for (let i = 0; i < graph[node].length; i++) {
			let nodeToVisit = graph[node][i];
			if (nodeToVisit === end) {
				return distance + 1;
			}
			if (record.has(nodeToVisit)) {
				continue;
			}
			queue.push(nodeToVisit);
			record.add(nodeToVisit);
		}
		if (count === 0) {
			distance++;
			count = queue.length;
		}
	}
	return distance;
}

function part1(flow, distancePair) {
	return dfs(
		flow,
		distancePair,
		Object.keys(flow),
		['AA'],
		new Set(['AA']),
		0,
		30,
	);
}

function part2(flow, distancePair) {
	let choices = createCombination(flow);
	choices = choices.slice(0, choices.length / 2);
	let maxValue = 0;
	for (let i = 0; i < choices.length; i++) {
		let [elephant, me] = choices[i];
		maxValue = Math.max(
			maxValue,
			dfs(flow, distancePair, elephant, ['AA'], new Set(['AA']), 0, 26) +
				dfs(flow, distancePair, me, ['AA'], new Set(['AA']), 0, 26),
		);
	}
	return maxValue;
}

function dfs(flow, distancePair, list, order, record, time, timeLimit) {
	if (time >= timeLimit) {
		// console.log('time is up');
		return calculateValue(flow, distancePair, order, timeLimit);
	}
	if (order.length === list.length) {
		return calculateValue(flow, distancePair, order, timeLimit);
	}
	let maxValue = 0;
	for (let i = 0; i < list.length; i++) {
		if (!record.has(list[i])) {
			let currentNode = order[order.length - 1];
			let targetNode = list[i];
			order.push(targetNode);
			record.add(targetNode);
			time = time + distancePair[currentNode][targetNode] + 1;
			maxValue = Math.max(
				maxValue,
				dfs(flow, distancePair, list, order, record, time, timeLimit),
			);
			order.pop();
			record.delete(targetNode);
			time = time - distancePair[currentNode][targetNode] - 1;
		}
	}
	return maxValue;
}

function calculateValue(flow, distancePair, order, timeLimit) {
	let value = 0;
	let usedTime = 0;
	for (let i = 1; i < order.length; i++) {
		usedTime = usedTime + distancePair[order[i - 1]][order[i]] + 1;
		if (usedTime > timeLimit) {
			break;
		}
		value = value + (timeLimit - usedTime) * flow[order[i]];
	}
	return value;
}

function createCombination(flow) {
	let targetNodes = Object.keys(flow).filter(x => x !== 'AA');
	let selectNum = Math.floor(targetNodes.length / 2);
	return dfs2(targetNodes, [], 0, [], selectNum);
}

function dfs2(list, combo, index, ansArr, selectNum) {
	if (combo.length === selectNum) {
		let selected = ['AA', ...combo];
		let unselected = ['AA', ...list.filter(x => !combo.includes(x))];
		ansArr.push([selected, unselected]);
		return ansArr;
	}
	for (let i = index; i < list.length; i++) {
		combo.push(list[i]);
		dfs2(list, combo, i + 1, ansArr, selectNum);
		combo.pop();
	}
	return ansArr;
}

day16();
