export default (state = [], action) => {
	switch (action.type) {
	case 'SET_DECK':
		return [
			...action.payload.deck,
		];
	case 'TURN_CARD':
		const temp = [...state];
		temp.shift();
		return temp;
	default:
		return state;
	}
};
