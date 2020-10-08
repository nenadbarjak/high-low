export const getDeck = () => {
	const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
	const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	const deck = [];

	suits.forEach((suit, i) => {
		numbers.forEach((number, j) => {
			const card = {
				suit,
				number,
				value: j === 0 ? 13 : j,
				srcX: j * 61.54,
				srcY: i * 81,
			};

			deck.push(card);
		});
	});

	return deck;
};

export const shuffle = (deck) => {
	for (let i = 0; i < 1000; i++) {
		const location1 = Math.floor((Math.random() * deck.length));
		const location2 = Math.floor((Math.random() * deck.length));
		const tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}

	return deck;
};
