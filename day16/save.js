const fs = require('fs');

function day16() {
	const input = fs.readFileSync('./day16.txt').toString().split('\n');
	const [graph, flow] = createGraph(input);
	const distancePair = createDistancePair(graph, flow);
	// console.log(graph);
	console.log(flow);
	console.log(distancePair);
	console.log('part 1');
	console.log(part1(flow, distancePair));
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
	let table = createTable(flow);
	let closed = Object.keys(table).filter(key => key.includes('close'));
	let opened = Object.keys(table).filter(key => key.includes('open'));
	for (let minute = 1; minute <= 30; minute++) {
		// first, do the closed ones
		for (let i = 0; i < closed.length; i++) {
			let node = closed[i].split(' ')[0];
			let [bestChoice, visitedNode] = getClosedBestChoice(
				node,
				minute,
				table,
				distancePair,
				flow,
			);
			table[closed[i]].push(bestChoice);
			table[`${closed[i].split(' ')[0]} c record`].push(visitedNode);
		}
		// second, do the opened ones
		for (let i = 0; i < opened.length; i++) {
			let node = opened[i].split(' ')[0];
			let [bestChoice, visitedNode] = getOpenedBestChoice(
				node,
				minute,
				table,
				distancePair,
				flow,
			);
			table[opened[i]].push(bestChoice);
			table[`${opened[i].split(' ')[0]} o record`].push(visitedNode);
		}
	}
	console.log(table);
	return table['AA close'][30];
}

function createTable(flow) {
	let table = {};
	let keys = Object.keys(flow);
	for (let i = 0; i < keys.length; i++) {
		table[`${keys[i]} close`] = [0];
		table[`${keys[i]} open`] = [0];
		table[`${keys[i]} c record`] = [[]];
		table[`${keys[i]} o record`] = [[]];
	}
	return table;
}

function getClosedBestChoice(node, minute, table, distancePair, flow) {
	let bestValue = 0;
	let visitedNode = [];
	// open its valve
	if (table[`${node} open`][minute - 1] > bestValue) {
		bestValue = table[`${node} open`][minute - 1];
		visitedNode = [...table[`${node} o record`][minute - 1]];
	}
	// go to other nodes
	let nodes = Object.keys(flow);
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i] === node) {
			continue; // no need to stay at the same place
		}
		let leftMinutes = minute - distancePair[node][nodes[i]];
		if (leftMinutes < 0) {
			continue; // impossible to move to the target node
		}
		if (table[`${nodes[i]} close`][leftMinutes] > bestValue) {
			bestValue = table[`${nodes[i]} close`][leftMinutes];
			visitedNode = [...table[`${nodes[i]} c record`][leftMinutes]];
		}
	}
	// console.log(visitedNode);
	return [bestValue, visitedNode];
}

function getOpenedBestChoice(node, minute, table, distancePair, flow) {
	let bestValue = 0;
	let visitedNode = [];
	// go to other nodes
	let nodes = Object.keys(flow);
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i] === node) {
			continue; // no need to stay at the same place
		}
		let leftMinutes = minute - distancePair[node][nodes[i]];
		if (leftMinutes < 0) {
			continue; // impossible to move to the target node
		}
		if (table[`${nodes[i]} c record`][leftMinutes].includes(node)) {
			continue; // cannot open the valve twice
		}
		if (table[`${nodes[i]} close`][leftMinutes] > bestValue) {
			bestValue = table[`${nodes[i]} close`][leftMinutes];
			visitedNode = [...table[`${nodes[i]} c record`][leftMinutes]];
		}
	}
	return [bestValue + minute * flow[node], [...visitedNode, node]];
}

day16();
