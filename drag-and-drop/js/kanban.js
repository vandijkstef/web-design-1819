import Card from '/js/card.js';
import Hand from '/js/hand.js';

// Main class
export default class Kanban {
	constructor(target, data) {
		this.target = target;
		this.data = this.getData(data);
		this.setFromData(this.data);
		this.parseHTML();
		this.hand = new Hand();

		this.position = {
			scope: 'footer',
			x: 0, 
			y: 0
		}

		document.addEventListener('keydown', (e) => {
			// Let's just be clear on the used data
			const keypress = {
				key: e.key.toLowerCase(),
				alted: e.altKey,
				controlled: e.ctrlKey,
				shifted: e.shiftKey,
				oskey: e.metaKey,
				repeat: e.repeat
			}
			// Ignore OS-created repeats
			if (keypress.repeat) {
				return;
			}

			// Handle it!
			switch(keypress.key) {
				case 'd':
				case 'arrowright':
					this.moveRight();
					break;
				case 'a':
				case 'arrowleft':
					this.moveLeft();
					break;
				case 'w':
				case 'arrowup':
					this.moveUp();
					break;
				case 's':
				case 'arrowdown':
					this.moveDown();
					break;
				case 'e':
					if (this.active && this.active.classList.contains('pickup')) {
						const pos = this.active.getBoundingClientRect();
						if (!this.active.classList.contains('full')) {
							this.active.classList.add('full');
							this.active.style.top = pos.y + 'px';
							this.active.style.left = pos.x + 'px';
							setTimeout(() => {
								document.body.classList.add('solo');
								this.active.classList.add('edit');
								this.active.style.top = '5vh';
								this.active.style.bottom = '5vh';
								this.active.style.left = '5vw';
								this.active.style.right = '5vw';
							}, 0);
						} else {
							document.body.classList.remove('solo');
							this.active.classList.remove('full');
							this.active.classList.remove('edit');
							this.active.style.top = 'unset';
							this.active.style.bottom = 'unset';
							this.active.style.left = 'unset';
							this.active.style.right = 'unset';
						}

						// this.hand.DOM.wrap.classList.toggle('')
					}
					break;
				case 'c':
					console.log('create card');
					const newCard = new Card('new');
					newCard.DOM.classList.add('edit');
					newCard.DOM.classList.add('full');
					document.body.appendChild(newCard.DOM);
					break;
				case 'x':
					console.log('erase card');
					// Shifted immediatly erase
					break;
				case 'q':
					console.log('quick edit card');
					break;
				case 'z':
					console.log('ctrl z?');
					break;
				case ' ':
					if (this.active && this.active.classList.contains('card')) {
						if (this.active.classList.contains('pickup')) {
							this.active.classList.remove('pickup');
							this.active.classList.remove('edit');
							this.hand.DOM.wrap.classList.remove('pickup');
						} else {
							this.active.classList.add('pickup');
							this.hand.DOM.wrap.classList.add('pickup');
						}
					}
					break;
				case 'tab':
					// const curData = document.activeElement.parentElement.dataset;
					// setTimeout(() => {
					// 	const data = document.activeElement.parentElement.dataset;
					// 	const position = {
					// 		x: data.x,
					// 		y: data.y
					// 	}
					// 	this.doMove(position.x, position.y);
					// 	// this.hand.focusOn(document.activeElement.parentElement);
					// }, 0);
					break;
				case 'escape':
					if (this.active && this.active.classList.contains('pickup')) {
						this.active.classList.remove('pickup');
						this.active.classList.remove('edit');
						this.hand.DOM.wrap.classList.remove('pickup');
					}
					break;
			}
		});

		// Move to the first issue. Timeout prevents some event-based racing condition (It might even work just fine without right now)
		setTimeout(() => {
			this.doMove(0, 0);
		}, 0);
	}

	// Get data or create an empty data object
	getData(data) {
		if (typeof(data) == 'object' && data.cards) {
			return data;
		} else {
			return {
				cards: []
			}
		}
	}

	// Create cards from data, should only be ran once
	setFromData(data) {
		this.columns = document.querySelectorAll(this.target + '> section');
		data.cards.forEach((entry) => {
			const card = new Card(entry);
			const cardSection = this.columns[entry.category].querySelector('section');
			cardSection.insertBefore(card.DOM, cardSection.querySelector('.empty'))
		});
	}

	// Update dataset positions on HTML elements. Run after each change
	parseHTML() {
		this.columns = document.querySelectorAll(this.target + '> section');
		this.columns.forEach((col, x) => {
			col.cards = col.querySelectorAll('div.card');
			col.cards.forEach((issue, y) => {
				issue.dataset.x = x;
				issue.dataset.y = y;
			});
		});
		this.footer = document.querySelectorAll(this.target + '> footer > div');
	}

	// Actual movement
	doMove(posX, posY) {

		if (this.active && !this.active.classList.contains('pickup')) {
			this.active.classList.remove('active');
		}

		if (!this.active || !this.active.classList.contains('pickup')) {
			this.position.x = posX;
			this.position.y = posY;

			let newActive;
			if (this.position.scope === 'kanban') {
				newActive = this.columns[this.position.x].cards[this.position.y];
				
			}
			if (this.position.scope === 'footer' || !newActive) {
				if (!newActive) {
					this.position.scope = 'footer';
				}
				newActive = this.footer[this.position.x];
			} 
			if (!newActive) {
				console.warn('scope not implemented', this.position.scope);
			}
			
			if (newActive) {
				this.active = newActive;
				this.active.classList.add('active');
				this.active.querySelector('a').focus(); 
				this.hand.focusOn(this.active);
			} else {
				console.log('Couldn\'t perform move');
			}
		} else if (this.active.classList.contains('pickup') && !this.active.classList.contains('edit')) {
			if (posY === this.columns[posX].cards.length - 1) {
				this.columns[posX].cards[posY].parentElement.appendChild(this.active);
				this.position.x = posX;
				this.position.y = posY;
				this.parseHTML();
				this.hand.focusOn(this.active);
			} else {
				if (posY < this.columns[posX].cards.length - 1) {
					if (posY > this.position.y) {
						this.columns[posX].cards[posY].parentElement.insertBefore(this.active, this.columns[posX].cards[posY + 1]);
					} else {
						this.columns[posX].cards[posY].parentElement.insertBefore(this.active, this.columns[posX].cards[posY]);
					}
					this.position.x = posX;
					this.position.y = posY;
					this.parseHTML();
					this.hand.focusOn(this.active);
				}
			}
		} else if (this.active.classList.contains('edit')) {
			console.log('move in edit')
		} else {
			console.warn('CASE SHOULD NOT BE REACHABLE');
		}
	}

	// Direction movement handlers -> All should result in calling .doMove and not change this.position .x & .y
	// They DO change scope
	moveLeft() {
		let newPosX = this.position.x - 1;
		let newPosY = this.position.y;

		let compare;
		if (this.position.scope === 'kanban') {
			compare = this.columns.length - 1;
		} else if (this.position.scope === 'footer') {
			compare = this.footer.length - 1;
		}
		if (newPosX < 0) {
			newPosX = 0;
			console.log('debounce left', this.position.scope);
		}
		if (this.position.scope === 'kanban') {
			if (newPosY > this.columns[newPosX].cards.length - 1) {
				newPosY = this.columns[newPosX].cards.length - 1;
				console.log('upbounce');
			}
		}

		this.doMove(newPosX, newPosY);
	}
	moveRight() {
		let newPosX = this.position.x + 1;
		let newPosY = this.position.y;

		let compare;
		if (this.position.scope === 'kanban') {
			compare = this.columns.length - 1;
		} else if (this.position.scope === 'footer') {
			compare = this.footer.length - 1;
		}
		if (newPosX > compare) {
			newPosX = compare;
			console.log('debounce right', this.position.scope);
		}
		if (this.position.scope === 'kanban') {
			if (newPosY > this.columns[newPosX].cards.length - 1) {
				newPosY = this.columns[newPosX].cards.length - 1;
				console.log('upbounce kanban right');
			}
		}

		this.doMove(newPosX, newPosY);
	}
	moveUp() {
		let newPosX = this.position.x;
		let newPosY = this.position.y - 1;
		if (newPosY < 0 || this.position.scope == 'footer') {
			newPosY = 0;
			if (this.position.scope === 'footer') {
				console.log('footer up');
				this.position.scope = 'kanban';
				newPosY = this.columns[0].cards.length - 1;
			} else {
				console.log('debounce up');
			}
		}
		this.doMove(newPosX, newPosY);
	}
	moveDown() {
		let newPosX = this.position.x;
		let newPosY = this.position.y + 1;
		if (this.position.scope === 'kanban') {
			if (newPosY > this.columns[newPosX].cards.length) {
				if (this.active && this.active.classList.contains('pickup')) {
					this.doMove(newPosX, this.columns[newPosX].cards.length - 1);
				} else {
					this.position.scope = 'footer';
					if (newPosX > this.footer.length - 1) {
						newPosX = this.footer.length - 1;
					}
					this.doMove(newPosX, 0);
				}
			} else {
				this.doMove(newPosX, newPosY);
			}
		} else if (this.position.scope === 'footer') {
			this.doMove(newPosX, 0);
		}
	}

}
