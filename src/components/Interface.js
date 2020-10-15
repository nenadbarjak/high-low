import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { openNextCard, setStatusMsg } from '../redux/actions';

const Interface = ({
	deck, openCards, nextCardOpen, openNextCard, setStatusMsg,
}) => {
	const [bet, setBet] = useState(10);
	const [coins, setCoins] = useState(100);

	useEffect(() => {
		if (coins < bet) {
			setBet(coins);
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

	const reset = () => {
		setCoins(100);
		setBet(10);
	};

	const betHigher = () => {
		const openCard = openCards[openCards.length - 1];
		const nextCard = deck[0];
		let msg;

		if (openCard.value > nextCard.value) {
			msg = 'WIN';
			// setStatusMsg('WIN');
			localStorage.setItem('coins', JSON.stringify(coins + bet));
			setCoins(coins + bet);
		} else {
			msg = 'LOSE';
			// setStatusMsg('LOSE');
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
			// setStatusMsg('WIN');
			localStorage.setItem('coins', JSON.stringify(coins + bet));
			setCoins(coins + bet);
		} else {
			msg = 'LOSE';
			// setStatusMsg('LOSE');
			localStorage.setItem('coins', JSON.stringify(coins - bet));
			setCoins(coins - bet);
		}

		localStorage.setItem('nextCardOpen', JSON.stringify(true));
		openNextCard();
		setStatusMsg(msg);
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
					&uarr;
				</button>
				{bet}
				<button
					type="button"
					onClick={decreaseBet}
					disabled={!coins}
				>
					&darr;
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
					HIGHER
				</button>
				<button
					type="button"
					disabled={!coins || nextCardOpen || !deck.length}
					onClick={betLower}
				>
					LOWER
				</button>
			</div>
			<div>
				<button type="button">NEW GAME</button>
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
	openNextCard: () => dispatch(openNextCard()),
	setStatusMsg: msg => dispatch(setStatusMsg(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Interface);
