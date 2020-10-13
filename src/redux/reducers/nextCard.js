export default (state = false, action) => {
	switch (action.type) {
	case 'OPEN_NEXT_CARD':
		return true;
	case 'TURN_CARD':
		return false;
	default:
		return state;
	}
};
