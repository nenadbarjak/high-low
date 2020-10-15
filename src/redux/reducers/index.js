import { combineReducers } from 'redux';
import deck from './deck';
import openCards from './openCards';
import nextCardOpen from './nextCard';
import statusMsg from './statusMsg';

export default combineReducers({
	deck,
	openCards,
	nextCardOpen,
	statusMsg,
});
