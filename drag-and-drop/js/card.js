import UITools from '/js/ui.js';

// Create/update cards
export default class Card {
	constructor(data) {
		this._ = data;
		if (data === 'new') {
			this._ = {
				id: -1,
				label: 'new',
				category: 0,
				description: '',
			};
		}
		
		this.id = this._.id;
		this.label = this._.label;
		this.description = this._.description;
		this.DOM = this.Create();
	}

	Create() {
		const UI = new UITools();
		console.log(this);
		return UI.Wrap([
			UI.CreateLink(this.label, `#card-${this.id}`),
			UI.CreateText('E to open | X to remove', ['show-detail']),
			UI.CreateForm([
				// UI.CreateText('ESC or E to close'),
				UI.CreateInputText(
					UI.CreateLabel('Name'),
					'label',
					'text',
					true,
					this.label
				),
				UI.CreateInputText(
					UI.CreateLabel('Description'),
					'description',
					'text',
					false,
					this.description
				),
			], '/', 'POST', ['details'], null)
		], ['card'], `card-${this.id}`)
	}
}