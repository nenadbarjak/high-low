import React, { useEffect, useRef } from 'react';
import { getDeck, shuffle } from '../utils/deck';

const Cardboard = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const img = document.getElementById('cards');
		const back = document.getElementById('back');

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = '#076324';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		const deck = shuffle(getDeck());
		// deck.forEach((card, index) => {
		// 	let row = index < 25 ? 0 : (index < 50 ? 1 : 2)
		// 	let column = index < 25 ? index : (index < 50 ? index - 25 : index - 50)

		// 	ctx.drawImage(img, card.srcX, card.srcY, 61.54, 81, column * 45, row * 65, 45, 59.23)
		// });
		for (let i = 0; i < deck.length - 2; i++) {
			const row = i < 25 ? 0 : (i < 50 ? 1 : 2);
			const column = i < 25 ? i : (i < 50 ? i - 25 : i - 50);

			ctx.drawImage(img, deck[i].srcX, deck[i].srcY, 61.54, 81, column * 45, row * 65, 45, 59.23);
		}
		const openCard = deck[deck.length - 1];
		ctx.drawImage(img, openCard.srcX, openCard.srcY, 61.54, 81, 280, 210, 180, 236.92);
		ctx.drawImage(back, 660, 210, 180, 236.92);
	}, []);

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

export default Cardboard;
