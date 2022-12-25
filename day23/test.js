for (let round = 1; round <= 2000; round++) {
	let arr = Array(300)
		.fill(null)
		.map(x => Array(300).fill(false));
	console.log(round);
	for (let r = 0; r < arr.length; r++) {
		for (let c = 0; c < arr[r].length; c++) {
			arr[r][c] = arr[r][c] === true ? false : true;
		}
	}
}
