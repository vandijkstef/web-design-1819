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
			scope: 'kanban',
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
			if (keypress.repeat || document.body.classList.contains('unexplained') && keypress.key != ' ' || document.activeElement.tagName.toLowerCase() === 'input' && keypress.key != 'a') {
				return;
			}

			if (document.body.classList.contains('unexplained') && keypress.key == ' ') {
				document.body.classList.remove('unexplained');
				console.log('explainish');
				return
			}

			// Handle it!
			switch(keypress.key) {
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					if (this.position.scope === 'kanban') {
						const hotCard = document.querySelector('[data-hotkey="' + keypress.key + '"]');
						if (hotCard) {
							this.hand.focusOn(hotCard);
							this.position.x = hotCard.dataset.x;
							this.position.y = hotCard.dataset.y
						}
					}
					break;
				case 'd':
				case 'arrowright':
					if (this.hand.DOM.wrap.classList.contains('edit')) {
						this.hand.DOM.wrap.classList.add('writing');
						console.log('edit the label..', this.active);
						const input = this.hand.focusing.querySelector('input');
						input.dataset.curValue = input.value;
						requestAnimationFrame(() => {
							input.focus();
						});
					} else {
						this.moveRight();
					}
					break;
				case 'a':
				case 'arrowleft':
					if (this.hand.DOM.wrap.classList.contains('writing')) {
						if (keypress.controlled) {
							const input = this.hand.focusing.querySelector('input');
							this.hand.DOM.wrap.classList.remove('writing');
							input.blur();

							const dataId = this.active.id.split('-')[1];
							const data = JSON.parse(localStorage.getItem('kanbandata'));
							const entry = data.cards.find((entry) => {
								if (entry.id === parseInt(dataId)) {
									return true;
								} else {
									return false;
								}
							});
							
							entry[input.name] = input.value;

							if (input.name === 'label') {
								this.active.querySelector('a').innerText = input.value;
							}

							if (input.name === 'hotkey') {
								this.active.querySelector('.hotkey').innerText = input.value;
								this.active.dataset.hotkey = input.value;
							}

							localStorage.setItem('kanbandata', JSON.stringify(data));

						}
					} else {
						this.moveLeft();
					}
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
							this.position.scope = 'solo';
							this.position.y = 0;
							this.active.style.top = pos.y + 'px';
							this.active.style.left = pos.x + 'px';
							requestAnimationFrame(() => {
								document.body.classList.add('solo');
								this.active.classList.add('edit');
								this.active.style.top = '5vh';
								this.active.style.bottom = '5vh';
								this.active.style.left = '5vw';
								this.active.style.right = '5vw';
								this.hand.DOM.wrap.classList.add('working');
								setTimeout(() => {
									this.hand.DOM.wrap.classList.remove('working');
									this.hand.focusOn(document.querySelector('.card.full.edit label'), this.position);
								}, 400);
							});
						} else {
							document.body.classList.remove('solo');
							this.active.classList.remove('full');
							this.active.classList.remove('edit');
							this.position.scope = 'kanban';
							this.active.style.top = 'unset';
							this.active.style.bottom = 'unset';
							this.active.style.left = 'unset';
							this.active.style.right = 'unset';
							this.hand.DOM.wrap.classList.add('working');
							this.hand.DOM.wrap.classList.remove('edit');
							setTimeout(() => {
								this.hand.DOM.wrap.classList.remove('working');
								this.hand.focusOn(this.active);
							}, 200);
						}
					}
					break;
				case 'c':
					console.log('create card');
					// const newCard = new Card('new');
					// newCard.DOM.classList.add('edit');
					// newCard.DOM.classList.add('full');
					// document.body.appendChild(newCard.DOM);
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
							if (!this.active.classList.contains('full')) {
								this.active.classList.remove('pickup');
								this.active.classList.remove('edit');
								this.hand.DOM.wrap.classList.remove('pickup');
							}
						} else {
							this.active.classList.add('pickup');
							this.hand.DOM.wrap.classList.add('pickup');
						}
					}
					break;
				case 'tab':
					// TODO: Decide tab key use?
					break;
				case 'escape':
					if (this.active && document.body.classList.contains('solo')) {
						document.body.classList.remove('solo');
							this.active.classList.remove('full');
							this.active.classList.remove('edit');
							this.position.scope = 'kanban';
							this.active.style.top = 'unset';
							this.active.style.bottom = 'unset';
							this.active.style.left = 'unset';
							this.active.style.right = 'unset';
							this.hand.DOM.wrap.classList.add('working');
							this.hand.DOM.wrap.classList.remove('edit');
							setTimeout(() => {
								this.hand.DOM.wrap.classList.remove('working');
								this.hand.focusOn(this.active);
							}, 200);
					}
					// TODO: Redo escape
					// if (this.active && this.active.classList.contains('pickup')) {
					// 	this.active.classList.remove('pickup');
					// 	this.active.classList.remove('edit');
					// 	this.hand.DOM.wrap.classList.remove('pickup');
					// }
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

			
			if (newActive) {
				this.active = newActive;
				this.active.classList.add('active');
				this.active.querySelector('a').focus(); 
				this.hand.focusOn(this.active);
			} else {
				console.log('Couldn\'t perform move');
				this.hand.forbidden();
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
			if (!this.hand.DOM.wrap.classList.contains('writing')) {
				const inputs = document.querySelectorAll('.active label');
				if (inputs[posY]) {
					this.position.y = posY;
				} else {
					this.hand.forbidden();
				}
				console.log(this.position.y);
				this.hand.focusOn(inputs[this.position.y], this.position);
			}
		} else {
			console.warn('CASE SHOULD NOT BE REACHABLE');
		}
	}

	// Direction movement handlers -> All should result in calling .doMove and not change this.position .x & .y
	// They DO change scope
	moveLeft() {
		let newPosX = this.position.x - 1;
		let newPosY = this.position.y;

		const compare = this.columns.length - 1;
		if (newPosX < 0) {
			newPosX = 0;
			this.hand.forbidden();
		}
		if (newPosY > this.columns[newPosX].cards.length - 1) {
			newPosY = this.columns[newPosX].cards.length - 1;
		}

		this.doMove(newPosX, newPosY);
	}
	moveRight() {
		let newPosX = this.position.x + 1;
		let newPosY = this.position.y;

		const compare = this.columns.length - 1;
		
		if (newPosX > compare) {
			newPosX = compare;
			this.hand.forbidden();
		}
		if (newPosY > this.columns[newPosX].cards.length - 1) {
			newPosY = this.columns[newPosX].cards.length - 1;
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
				this.hand.forbidden();
			}
		}
		this.doMove(newPosX, newPosY);
	}
	moveDown() {
		let newPosX = this.position.x;
		let newPosY = this.position.y + 1;
		if (newPosY > this.columns[newPosX].cards.length) {
			this.doMove(newPosX, this.columns[newPosX].cards.length - 1);
		} else {
			this.doMove(newPosX, newPosY);
		}
	}

}
