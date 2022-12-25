let list = ['a', 'b', 'c'];
let list2 = ['a', 'b', 'c', 'd', 'e', 'f'];

// permutation
function dfs(list, order, record) {
	if (order.length === list.length) {
		console.log(order);
		return;
	}
	for (let i = 0; i < list.length; i++) {
		if (!record.has(list[i])) {
			order.push(list[i]);
			record.add(list[i]);
			dfs(list, order, record);
			order.pop();
			record.delete(list[i]);
		}
	}
}

// combination
function dfs2(list, combo, index) {
	if (combo.length === 3) {
		console.log(combo);
		return;
	}
	for (let i = index; i < list.length; i++) {
		combo.push(list[i]);
		dfs2(list, combo, i + 1);
		combo.pop();
	}
}

// dfs(list, [], new Set());
dfs2(list2, [], 0);
