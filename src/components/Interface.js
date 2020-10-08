import React, { useState, useEffect } from 'react';

const Interface = () => {
	const [bet, setBet] = useState(10);
	const [coins, setCoins] = useState(100);

	useEffect(() => {
		if (coins < bet) {
			setBet(coins);
		}
	}, [coins, bet]);

	const increaseBet = () => {
		if (bet <= coins - 10) {
			setBet(prevBet => prevBet + 10);
		}
	};

	const decreaseBet = () => {
		if (coins >= 10 && bet >= 20) {
			setBet(prevBet => prevBet - 10);
		}
	};

	const reset = () => {
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
					disabled={!coins}
				>
					HIGHER
				</button>
				<button
					type="button"
					disabled={!coins}
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

export default Interface;
