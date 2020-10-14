import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { openNextCard } from '../redux/actions';

const Interface = ({
	nextCardOpen, openNextCard,
}) => {
	const [bet, setBet] = useState(10);
	const [coins, setCoins] = useState(100);

	useEffect(() => {
		if (coins < bet) {
			setBet(coins);
		}
	}, [coins, bet]);

	useEffect(() => {
		let coins = JSON.parse(localStorage.getItem('coins'));
		if (coins) {
			setCoins(coins)
		}

		let bet = JSON.parse(localStorage.getItem('bet'));
		if (bet) {
			setBet(bet)
		}
	}, [])

	const increaseBet = () => {
		if (bet <= coins - 10) {
			localStorage.setItem('bet', JSON.stringify(bet + 10))
			setBet(prevBet => prevBet + 10);
		}
	};

	const decreaseBet = () => {
		if (coins >= 10 && bet >= 20) {
			localStorage.setItem('bet', JSON.stringify(bet - 10))
			setBet(prevBet => prevBet - 10);
		}
	};

	const reset = () => {
		setCoins(100);
		setBet(10);
	};

	const handleClick = () => {
		localStorage.setItem('nextCardOpen', JSON.stringify(true))
		openNextCard();
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
					disabled={!coins || nextCardOpen}
					onClick={handleClick}
				>
					HIGHER
				</button>
				<button
					type="button"
					disabled={!coins || nextCardOpen}
					onClick={handleClick}
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
	nextCardOpen: state.nextCardOpen,
});

const mapDispatchToProps = dispatch => ({
	openNextCard: () => dispatch(openNextCard()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Interface);
