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
		if (element.classList.contains('footer')) {
			this.DOM.wrap.classList.add('point');
		} else {
			this.DOM.wrap.classList.remove('point');
		}
		this.DOM.wrap.style.top = Math.floor(posData.y - 15) + 'px';
		this.DOM.wrap.style.left = Math.floor(posData.right - 40) + 'px';
		// console.log(posData, this.DOM.wrap);
	}
}