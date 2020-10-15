import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	openNextCard, setStatusMsg, setDeck, addCard, turnCard, setOpenCards,
} from '../redux/actions';
import { getDeck, shuffle } from '../utils/deck';

const Interface = ({
	deck, openCards, nextCardOpen, openNextCard, setStatusMsg, setDeck, turnCard, setOpenCards,
}) => {
	const [bet, setBet] = useState(10);
	const [coins, setCoins] = useState(100);

	useEffect(() => {
		if (coins < bet) {
			setBet(coins);
		}

		if (!coins) {
			alert('You have no coins. Click RESET button to get 100 coins and play again.');
		}
	}, [coins, bet]);

	useEffect(() => {
		const coins = JSON.parse(localStorage.getItem('coins'));
		if (coins) {
			setCoins(coins);
		}

		const bet = JSON.parse(localStorage.getItem('bet'));
		if (bet) {
			setBet(bet);
		}
	}, []);

	const increaseBet = () => {
		if (bet <= coins - 10) {
			localStorage.setItem('bet', JSON.stringify(bet + 10));
			setBet(prevBet => prevBet + 10);
		}
	};

	const decreaseBet = () => {
		if (coins >= 10 && bet >= 20) {
			localStorage.setItem('bet', JSON.stringify(bet - 10));
			setBet(prevBet => prevBet - 10);
		}
	};

	const betHigher = () => {
		const openCard = openCards[openCards.length - 1];
		const nextCard = deck[0];
		let msg;

		if (openCard.value > nextCard.value) {
			msg = 'WIN';
			localStorage.setItem('coins', JSON.stringify(coins + bet));
			setCoins(coins + bet);
		} else {
			msg = 'LOSE';
			localStorage.setItem('coins', JSON.stringify(coins - bet));
			setCoins(coins - bet);
		}

		localStorage.setItem('nextCardOpen', JSON.stringify(true));
		openNextCard();
		setStatusMsg(msg);
	};

	const betLower = () => {
		const openCard = openCards[openCards.length - 1];
		const nextCard = deck[0];
		let msg;

		if (openCard.value < nextCard.value) {
			msg = 'WIN';
			localStorage.setItem('coins', JSON.stringify(coins + bet));
			setCoins(coins + bet);
		} else {
			msg = 'LOSE';
			localStorage.setItem('coins', JSON.stringify(coins - bet));
			setCoins(coins - bet);
		}

		localStorage.setItem('nextCardOpen', JSON.stringify(true));
		openNextCard();
		setStatusMsg(msg);
	};

	const newGame = () => {
		localStorage.clear();
		localStorage.setItem('coins', JSON.stringify(coins));

		const newDeck = shuffle(getDeck());
		localStorage.setItem('openCards', JSON.stringify([newDeck[0]]));

		setDeck(newDeck);
		setOpenCards([newDeck[0]]);
		turnCard();

		newDeck.shift();
		localStorage.setItem('deck', JSON.stringify(newDeck));
		setBet(10);
	};

	const reset = () => {
		localStorage.clear();

		const newDeck = shuffle(getDeck());
		localStorage.setItem('openCards', JSON.stringify([newDeck[0]]));

		setDeck(newDeck);
		setOpenCards([newDeck[0]]);
		turnCard();

		newDeck.shift();
		localStorage.setItem('deck', JSON.stringify(newDeck));

		setCoins(100);
		setBet(10);
	};

	return	(
		<div className="wrap">
			<div>
				<h1>Bet</h1>
				<button
					type="button"
					onClick={increaseBet}
					disabled={!coins}
				>
					+ 10 coins
				</button>
				{bet}
				<button
					type="button"
					onClick={decreaseBet}
					disabled={!coins}
				>
					- 10 coins
				</button>
			</div>
			<div>
				<h1>
					Coins:
					{coins}
				</h1>
			</div>
			<div>
				<button
					type="button"
					disabled={!coins || nextCardOpen || !deck.length}
					onClick={betHigher}
				>
					&uarr; HIGHER
				</button>
				<button
					type="button"
					disabled={!coins || nextCardOpen || !deck.length}
					onClick={betLower}
				>
					&darr; LOWER
				</button>
			</div>
			<div>
				<button
					type="button"
					onClick={newGame}
				>
					NEW GAME
				</button>
			</div>
			<div>
				<button
					onClick={reset}
					type="button"
				>
					RESET
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	deck: state.deck,
	openCards: state.openCards,
	nextCardOpen: state.nextCardOpen,
});

const mapDispatchToProps = dispatch => ({
	setDeck: deck => dispatch(setDeck(deck)),
	setOpenCards: openCards => dispatch(setOpenCards(openCards)),
	addCard: card => dispatch(addCard(card)),
	turnCard: () => dispatch(turnCard()),
	openNextCard: () => dispatch(openNextCard()),
	setStatusMsg: msg => dispatch(setStatusMsg(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Interface);
