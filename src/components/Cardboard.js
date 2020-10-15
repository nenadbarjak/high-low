import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { addCard, turnCard } from '../redux/actions';

const Cardboard = ({
	deck, openCards, nextCardOpen, addCard, turnCard, statusMsg,
}) => {
	const canvasRef = useRef(null);

	const drawNextCard = (context, frameCount, image, card) => {
		const x = 660;
		const y = 210;

		let wCoord = frameCount < 60 ? x : x - (frameCount - 60) * 10;

		if (wCoord < 280) {
			wCoord = 280;
		}

		if (frameCount === 180) {
			localStorage.setItem('nextCardOpen', JSON.stringify(false));
			localStorage.setItem('openCards', JSON.stringify([...openCards, deck[0]]));
			const tempArr = [...deck];
			tempArr.shift();
			localStorage.setItem('deck', JSON.stringify(tempArr));

			turnCard();
			addCard(deck[0]);
		}

		context.drawImage(image, card.srcX, card.srcY, 61.54, 81, wCoord, y, 180, 236.92);
	};

	const winLoseText = (context) => {
		context.font = '80px Roboto';
		context.fillStyle = '#ff0';
		context.fillText(`You ${statusMsg}!`, 400, 550);
	};

	useEffect(() => {
		const img = document.getElementById('cards');
		const back = document.getElementById('back');

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		let frameCount = 0;
		let animate;

		const render = () => {
			frameCount++;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = '#076324';
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			for (let i = 0; i < openCards.length - 1; i++) {
				const row = i < 25 ? 0 : (i < 50 ? 1 : 2);
				const column = i < 25 ? i : (i < 50 ? i - 25 : i - 50);

				ctx.drawImage(img, openCards[i].srcX, openCards[i].srcY, 61.54, 81, column * 45, row * 65, 45, 59.23);
			}
			const openCard = openCards[openCards.length - 1];
			openCard && ctx.drawImage(img, openCard.srcX, openCard.srcY, 61.54, 81, 280, 210, 180, 236.92);

			ctx.drawImage(back, 660, 210, 180, 236.92);

			const nextCard = deck[0];

			nextCardOpen && drawNextCard(ctx, frameCount, img, nextCard);
			statusMsg && winLoseText(ctx);

			animate = window.requestAnimationFrame(render);
		};

		render();

		return () => {
			window.cancelAnimationFrame(animate);
		};
	}, [openCards, deck, nextCardOpen, statusMsg]);

	return (
		<div className="wrap">
			<canvas
				ref={canvasRef}
				width="1125"
				height="560	"
			/>
		</div>
	);
};

const mapStateToProps = state => ({
	deck: state.deck,
	openCards: state.openCards,
	nextCardOpen: state.nextCardOpen,
	statusMsg: state.statusMsg,
});

const mapDispatchToProps = dispatch => ({
	turnCard: () => dispatch(turnCard()),
	addCard: card => dispatch(addCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cardboard);
