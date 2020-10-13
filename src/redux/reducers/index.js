import { combineReducers } from 'redux';
import deck from './deck';
import openCards from './openCards';
import nextCardOpen from './nextCard';

export default combineReducers({
	deck,
	openCards,
	nextCardOpen,
});
