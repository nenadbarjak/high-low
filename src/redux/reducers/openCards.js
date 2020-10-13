// export default (state = {}, action) => {
//     switch (action.type) {
//         case 'SET_OPEN_CARDS':
//             return {
//                 openDeck: [...action.payload.openCards],
//                 nextCardOpen: false
//             }
//         case 'ADD_CARD':
//             return {
//                 openDeck: [
//                     ...state.openDeck,
//                     action.payload.card
//                 ],
//                 nextCardOpen: false
//             }
//         case 'OPEN_NEXT_CARD':
//             return {
//                 openDeck: [
//                     ...state.openDeck
//                 ],
//                 nextCardOpen: true
//             }
//         default:
//             return state;
//     }
// }
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
