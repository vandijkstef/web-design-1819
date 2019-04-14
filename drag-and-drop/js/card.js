// Create/update cards
export default class Card {
	constructor(data) {
		this._ = data;

		this.id = this._.id;
		this.label = this._.label;
		this.DOM = this.Create();
	}

	Create() {
		const el = document.createElement('div');
		el.classList.add('card');
		el.id = `card-${this.id}`;

		const a = document.createElement('a');
		a.href = `#card-${this.id}`;
		a.innerText = this.label;

		const showDetail = document.createElement('div');
		showDetail.classList.add('show-detail');

		const showDetailText = document.createElement('p');
		showDetailText.innerText = 'Press E to edit';
		showDetail.appendChild(showDetailText);

		const details = document.createElement('div');
		details.classList.add('details');

		const detailText = document.createElement('p');
		detailText.innerText = 'Details';
		details.appendChild(detailText)
		
		el.appendChild(a);
		el.appendChild(showDetail);
		el.appendChild(details);
		return el;
	}
}