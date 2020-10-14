export default (state = null, action) => {
	switch (action.type) {
        case 'SET_MSG':
            return action.payload.msg;
        case 'TURN_CARD':
            return null;
        default:
            return state;
	}
};