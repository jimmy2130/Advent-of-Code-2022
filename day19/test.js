let arr = Array(1000)
	.fill(null)
	.map(x =>
		Array(1000)
			.fill(null)
			.map(x =>
				Array(1000)
					.fill(null)
					.map(x =>
						Array(1000)
							.fill(null)
							.map(x =>
								Array(1000)
									.fill(null)
									.map(x =>
										Array(1000)
											.fill(null)
											.map(x => Array(1000).fill(undefined)),
									),
							),
					),
			),
	);
arr[0][0][0][0][0][0][0] = 3;
console.log(arr[0][0][0][0][0][0][0]);

// above will fail
