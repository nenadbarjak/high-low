import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Cardboard from './components/Cardboard';
import Interface from './components/Interface';
import {
	setDeck, addCard, turnCard, setOpenCards, openNextCard,
} from './redux/actions';
import { getDeck, shuffle } from './utils/deck';

const App = ({
	setDeck, setOpenCards, addCard, turnCard, openNextCard,
}) => {
	useEffect(() => {
		let deck = JSON.parse(localStorage.getItem('deck'));
		const openCards = JSON.parse(localStorage.getItem('openCards'));
		const nextCardOpen = JSON.parse(localStorage.getItem('nextCardOpen'));

		if (nextCardOpen) {
			openNextCard();
		}

		if (deck && openCards) {
			setDeck(deck);
			setOpenCards(openCards);
		} else {
			deck = shuffle(getDeck());
			// localStorage.setItem('deck', JSON.stringify(deck))
			localStorage.setItem('openCards', JSON.stringify([deck[0]]));

			setDeck(deck);
			addCard(deck[0]);
			turnCard();

			deck.shift();
			localStorage.setItem('deck', JSON.stringify(deck));
		}
	}, []);

	return (
		<div>
			<Cardboard />
			<Interface />
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	setDeck: deck => dispatch(setDeck(deck)),
	setOpenCards: openCards => dispatch(setOpenCards(openCards)),
	addCard: card => dispatch(addCard(card)),
	turnCard: () => dispatch(turnCard()),
	openNextCard: () => dispatch(openNextCard()),
});

export default connect(null, mapDispatchToProps)(App);
