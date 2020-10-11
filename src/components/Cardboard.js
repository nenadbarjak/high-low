import React, { useEffect, useRef } from 'react';
import { getDeck, shuffle } from '../utils/deck';

const Cardboard = () => {
	const canvasRef = useRef(null);

	const move = (context, frameCount, image) => {
		let x = 661;
		let y = 210;

		let wCoord = x - (frameCount - 120) * 10;
		
		wCoord < 280 ? wCoord = 280 : wCoord = wCoord;

		if (frameCount > 120) {
			context.drawImage(image, wCoord, y, 180, 236.92)
		}
	}

	useEffect(() => {
		const img = document.getElementById('cards');
		const back = document.getElementById('back');

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		let frameCount = 0;
		let animate
		//let moving = false

		const deck = shuffle(getDeck());
		
		// deck.forEach((card, index) => {
		// 	let row = index < 25 ? 0 : (index < 50 ? 1 : 2)
		// 	let column = index < 25 ? index : (index < 50 ? index - 25 : index - 50)

		// 	ctx.drawImage(img, card.srcX, card.srcY, 61.54, 81, column * 45, row * 65, 45, 59.23)
		// });
		// for (let i = 0; i < deck.length - 2; i++) {
		// 	const row = i < 25 ? 0 : (i < 50 ? 1 : 2);
		// 	const column = i < 25 ? i : (i < 50 ? i - 25 : i - 50);

		// 	ctx.drawImage(img, deck[i].srcX, deck[i].srcY, 61.54, 81, column * 45, row * 65, 45, 59.23);
		// }
		// const openCard = deck[deck.length - 2];
		// ctx.drawImage(img, openCard.srcX, openCard.srcY, 61.54, 81, 280, 210, 180, 236.92);
		// //ctx.drawImage(back, 660, 210, 180, 236.92);

		const render = () => {
			frameCount++
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			ctx.fillStyle = '#076324';
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			for (let i = 0; i < deck.length - 2; i++) {
				const row = i < 25 ? 0 : (i < 50 ? 1 : 2);
				const column = i < 25 ? i : (i < 50 ? i - 25 : i - 50);
	
				ctx.drawImage(img, deck[i].srcX, deck[i].srcY, 61.54, 81, column * 45, row * 65, 45, 59.23);
			}
			const openCard = deck[deck.length - 2];
			ctx.drawImage(img, openCard.srcX, openCard.srcY, 61.54, 81, 280, 210, 180, 236.92);

			ctx.drawImage(back, 660, 210, 180, 236.92)

			move(ctx, frameCount, back)

			animate = window.requestAnimationFrame(render)
		}

		render()

		return () => {
			window.cancelAnimationFrame(animate)
		}
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
