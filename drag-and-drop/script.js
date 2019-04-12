class Kanban {
	constructor(target) {
		this.target = target;
		this.setFromData(data.issues);
		this.parseHTML();
		this.hand = new Hand();

		this.position = {
			x: 0, 
			y: 0
		}

		document.addEventListener('keydown', (e) => {
			const keypress = {
				key: e.key.toLowerCase(),
				alted: e.altKey,
				controlled: e.ctrlKey,
				shifted: e.shiftKey,
				oskey: e.metaKey,
				repeat: e.repeat
			}
			if (keypress.repeat) {
				return;
			}

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
					console.log('expand card');
					break;
				case 'c':
					console.log('create card');
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
					this.active.classList.toggle('pickup');
					this.hand.DOM.wrap.classList.toggle('pickup');
					break;
			}
		});

		setTimeout(() => {
			this.doMove(0, 0);
		}, 0);
	}

	setFromData(data) {
		this.columns = document.querySelectorAll(this.target + '> section');
		data.forEach((entry) => {
			const card = new Card(entry.label);
			const cardSection = this.columns[entry.category].querySelector('section');
			cardSection.appendChild(card.DOM);
		});
	}

	parseHTML() {
		this.columns = document.querySelectorAll(this.target + '> section');
		this.columns.forEach((col, x) => {
			col.cards = col.querySelectorAll('div');
			col.cards.forEach((issue, y) => {
				issue.dataset.x = x;
				issue.dataset.y = y;
			});
		});
	}

	doMove(posX, posY) {
		
		if (this.active && !this.active.classList.contains('pickup')) {
			this.active.classList.remove('active');
		}

		if (!this.active || !this.active.classList.contains('pickup')) {
			this.position = {
				x: posX,
				y: posY
			}
			this.active = this.columns[this.position.x].issues[this.position.y];
			this.active.classList.add('active');
			this.active.focus(); 
			this.hand.focusOn(this.active);
		} else if (this.active.classList.contains('pickup')) {
			// console.log(this.active.dataset.x, this.active.dataset.y, posX, posY);
			this.columns[posX].issues[posY].parentElement.insertBefore(this.active, this.columns[posX].issues[posY]);
			this.position = {
				x: posX,
				y: posY
			}
			this.parseHTML();
			this.hand.focusOn(this.active);
		} else {
			console.warn('CASE SHOULD NOT BE REACHABLE');
		}
	}

	moveLeft() {
		let newPosX = this.position.x - 1;
		let newPosY = this.position.y;

		if (newPosX < 0) {
			newPosX = 0;
			console.log('debounce');
		}
		if (newPosY > this.columns[newPosX].issues.length - 1) {
			newPosY = this.columns[newPosX].issues.length - 1;
			console.log('upbounce');
		}

		this.doMove(newPosX, newPosY);
	}

	moveRight() {
		let newPosX = this.position.x + 1;
		let newPosY = this.position.y;

		if (newPosX > this.columns.length - 1) {
			newPosX = this.columns.length - 1;
			console.log('debounce');
		}
		if (newPosY > this.columns[newPosX].issues.length - 1) {
			newPosY = this.columns[newPosX].issues.length - 1;
			console.log('upbounce');
		}

		this.doMove(newPosX, newPosY);
	}

	moveUp() {
		let newPosX = this.position.x;
		let newPosY = this.position.y - 1;
		if (newPosY < 0) {
			newPosY = 0;
			console.log('debounce');
		}
		this.doMove(newPosX, newPosY);
	}

	moveDown() {
		let newPosX = this.position.x;
		let newPosY = this.position.y + 1;
		if (newPosY > this.columns[newPosX].issues.length - 1) {
			newPosY = this.columns[newPosX].issues.length - 1;
			console.log('debounce');
		}
		this.doMove(newPosX, newPosY);
	}
}

class Hand {
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
			console.log(posData, this.DOM.wrap);
	}
}

class Card {
	constructor(label) {
		this.label = label;
		this.DOM = this.Create();
	}

	Create() {
		const el = document.createElement('div');
		el.innerText = this.label;
		return el;
	}
}

const data = {
	issues: [{
		label: 'Test a',
		category: 0
	},{
		label: 'Test b',
		category: 1
	},{
		label: 'Test c',
		category: 2
	},{
		label: 'Test d',
		category: 0
	},{
		label: 'Test e',
		category: 1
	},{
		label: 'Test f',
		category: 2
	},{
		label: 'Test g',
		category: 0
	},{
		label: 'Test h',
		category: 1
	},{
		label: 'Test i',
		category: 2
	},{
		label: 'Test j',
		category: 0
	},{
		label: 'Test k',
		category: 1
	},{
		label: 'Test l',
		category: 2
	},]
}

document.addEventListener('DOMContentLoaded', () => {
	new Kanban('#kanban');
	document.body.classList.add('infocus');
	window.onfocus = () => {
		document.body.classList.add('infocus');
	};
	window.onblur = () => {
		document.body.classList.remove('infocus');
	};
});