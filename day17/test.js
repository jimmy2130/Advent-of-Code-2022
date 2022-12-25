let arr = [1, 2, 3];
console.log(Math.max(...arr));

let count = 0;
for (let i = 0; i < 1000000000000; i++) {
	if (i % 7 === 0) {
		count++;
	}
}
console.log(count);
