import UITools from '/js/ui.js';

// Create/update cards
export default class Card {
	constructor(data) {
		this._ = data;
		if (data === 'new') {
			this._ = {
				id: -1,
				label: 'new',
				category: 0
			};
		}
		
		this.id = this._.id;
		this.label = this._.label;
		this.DOM = this.Create();
	}

	Create() {
		const UI = new UITools();

		return UI.Wrap([
			UI.CreateLink(this.label, `#card-${this.id}`),
			UI.CreateText('E to open | X to remove', ['show-detail']),
			UI.CreateForm([
				// UI.CreateText('ESC or E to close'),
				UI.CreateInputText(
					UI.CreateLabel('Name'),
					'name',
					'text',
					true,
					this.label
				),
				UI.CreateInputText(
					UI.CreateLabel('Description'),
					'name',
					'text',
					true,
					this.description
				),
			], '/', 'POST', ['details'], null)
		], ['card'], `card-${this.id}`)
	}
}