export default (state = [], action) => {
	switch (action.type) {
	case 'SET_OPEN_CARDS':
		return [
			...action.payload.openCards,
		];
	case 'ADD_CARD':
		return [
			...state,
			action.payload.card,
		];
	default:
		return state;
	}
};
