export const setDeck = deck => ({
	type: 'SET_DECK',
	payload: {
		deck,
	},
});

export const turnCard = () => ({
	type: 'TURN_CARD',
});

export const setOpenCards = openCards => ({
	type: 'SET_OPEN_CARDS',
	payload: {
		openCards,
	},
});

export const addCard = card => ({
	type: 'ADD_CARD',
	payload: {
		card,
	},
});

export const openNextCard = () => ({
	type: 'OPEN_NEXT_CARD',
});

export const setStatusMsg = msg => ({
	type: 'SET_MSG',
	payload: {
		msg,
	},
});
