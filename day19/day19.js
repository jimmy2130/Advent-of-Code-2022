const fs = require('fs');

function day19() {
	const input = fs.readFileSync('./day19.txt').toString().split('\n');
	const blueprints = getBluePrints(input);
	// console.log(blueprints);
	console.log('part 1');
	console.log(part1(blueprints));
	// console.log('part 2');
	// console.log(part2(blueprints));
}

function getBluePrints(input) {
	return input.reduce((acc, cur) => {
		let [index, orco, clco, obco, obcc, gcor, gcob] = cur
			.match(/\d+/g)
			.map(num => parseInt(num));
		acc.push({
			oreRobot: { ore: orco },
			clayRobot: { ore: clco },
			obsidianRobot: { ore: obco, clay: obcc },
			geodeRobot: { ore: gcor, obsidian: gcob },
		});
		return acc;
	}, []);
}

function part1(blueprints) {
	let ans = 0;
	for (let i = 0; i < blueprints.length; i++) {
		console.log(i, '==');
		let value = dfs(
			{ ore: 0, clay: 0, obsidian: 0, geode: 0 },
			{ oreRobot: 1, clayRobot: 0, obsidianRobot: 0, geodeRobot: 0 },
			blueprints[i],
			24,
			new Map(),
		);
		console.log('value', value);
		ans += (i + 1) * value;
	}
	return ans;
}

function part2(blueprints) {
	let ans = 1;
	for (let i = 0; i < 3; i++) {
		console.log(i);
		ans *= dfs(
			{ ore: 0, clay: 0, obsidian: 0, geode: 0 },
			{ oreRobot: 1, clayRobot: 0, obsidianRobot: 0, geodeRobot: 0 },
			blueprints[i],
			32,
			new Map(),
		);
	}
	return ans;
}

function dfs(material, robots, blueprint, remainingTime, record) {
	let { ore, clay, obsidian, geode } = material;
	let { oreRobot, clayRobot, obsidianRobot, geodeRobot } = robots;
	if (remainingTime === 0) {
		return geode;
	}
	if (record.has(`${JSON.stringify(material)}${JSON.stringify(robots)}`)) {
		return record.get(`${JSON.stringify(material)}${JSON.stringify(robots)}`);
	}
	let maxGeode = 0;
	if (
		ore >= blueprint.geodeRobot.ore &&
		obsidian >= blueprint.geodeRobot.obsidian
	) {
		maxGeode = Math.max(
			maxGeode,
			dfs(
				{
					ore: ore - blueprint.geodeRobot.ore + oreRobot,
					clay: clay + clayRobot,
					obsidian: obsidian - blueprint.geodeRobot.obsidian + obsidianRobot,
					geode: geode + geodeRobot,
				},
				{ ...robots, geodeRobot: geodeRobot + 1 },
				blueprint,
				remainingTime - 1,
				record,
			),
		);
	} else if (
		ore >= blueprint.obsidianRobot.ore &&
		clay >= blueprint.obsidianRobot.clay
	) {
		maxGeode = Math.max(
			maxGeode,
			dfs(
				{
					ore: ore - blueprint.obsidianRobot.ore + oreRobot,
					clay: clay - blueprint.obsidianRobot.clay + clayRobot,
					obsidian: obsidian + obsidianRobot,
					geode: geode + geodeRobot,
				},
				{ ...robots, obsidianRobot: obsidianRobot + 1 },
				blueprint,
				remainingTime - 1,
				record,
			),
		);
	} else {
		if (ore >= blueprint.clayRobot.ore) {
			maxGeode = Math.max(
				maxGeode,
				dfs(
					{
						ore: ore - blueprint.clayRobot.ore + oreRobot,
						clay: clay + clayRobot,
						obsidian: obsidian + obsidianRobot,
						geode: geode + geodeRobot,
					},
					{ ...robots, clayRobot: clayRobot + 1 },
					blueprint,
					remainingTime - 1,
					record,
				),
			);
		}
		if (ore >= blueprint.oreRobot.ore) {
			maxGeode = Math.max(
				maxGeode,
				dfs(
					{
						ore: ore - blueprint.oreRobot.ore + oreRobot,
						clay: clay + clayRobot,
						obsidian: obsidian + obsidianRobot,
						geode: geode + geodeRobot,
					},
					{ ...robots, oreRobot: oreRobot + 1 },
					blueprint,
					remainingTime - 1,
					record,
				),
			);
		}
		maxGeode = Math.max(
			maxGeode,
			dfs(
				{
					ore: ore + oreRobot,
					clay: clay + clayRobot,
					obsidian: obsidian + obsidianRobot,
					geode: geode + geodeRobot,
				},
				{ ...robots },
				blueprint,
				remainingTime - 1,
				record,
			),
		);
	}

	record.set(`${JSON.stringify(material)}${JSON.stringify(robots)}`, maxGeode);

	return maxGeode;
}

day19();
