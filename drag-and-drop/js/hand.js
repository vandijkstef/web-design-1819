// Handles the hand
export default class Hand {
	constructor() {
		this.DOM = {
			wrap: document.querySelector('#handwrap'),
			hand: document.querySelector('#hand')
		}
	}

	focusOn(element) {
			const posData = element.getBoundingClientRect();
			this.DOM.wrap.style.top = Math.floor(posData.y - 15) + 'px';
			this.DOM.wrap.style.left = Math.floor(posData.right - 40) + 'px';
			// console.log(posData, this.DOM.wrap);
	}
}