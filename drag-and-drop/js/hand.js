// Handles the hand
export default class Hand {
	constructor() {
		this.DOM = {
			wrap: document.querySelector('#handwrap'),
			hand: document.querySelector('#hand'),
			forbidden: document.querySelector('#forbidden')
		}
	}

	focusOn(element, position) {
		const posData = element.getBoundingClientRect();
		if (element.classList.contains('footer')) {
			this.DOM.wrap.classList.add('point');
		} else {
			this.DOM.wrap.classList.remove('point');
		}
		if (position) {
			if (position.scope === 'solo') {
				this.DOM.wrap.classList.add('point');
				this.DOM.wrap.classList.add('edit');
				this.DOM.wrap.style.top = Math.floor(posData.y + 15) + 'px';
				this.DOM.wrap.style.left = Math.floor(posData.left - 40) + 'px';
			} else {
				console.warn('Cant move hand');
			}
		} else {
			this.DOM.wrap.classList.remove('point');
			this.DOM.wrap.style.top = Math.floor(posData.y - 15) + 'px';
			this.DOM.wrap.style.left = Math.floor(posData.right - 40) + 'px';
		}
		// console.log(posData, this.DOM.wrap);
	}

	forbidden() {
		const forbiddenClass = 'forbidden';
		if (!this.DOM.wrap.classList.contains(forbiddenClass)) {
			this.DOM.wrap.classList.add(forbiddenClass);
			setTimeout(() => {
				this.DOM.wrap.classList.remove(forbiddenClass);
			}, 200)
		}
	}
}