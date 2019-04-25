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
				hotkey: '',
			};
		}
		
		this.id = this._.id;
		this.label = this._.label;
		this.description = this._.description;
		this.hotkey = this._.hotkey;
		this.DOM = this.Create();
	}

	Create() {
		const UI = new UITools();
		console.log(this);
		const hotkey = UI.CreateInputText(
			UI.CreateLabel('Hotkey'),
			'hotkey',
			'number',
			false,
			this.hotkey
		);
		hotkey.querySelector('input').setAttribute('max', 9);
		hotkey.querySelector('input').setAttribute('min', 1);
		const card = UI.Wrap([
			UI.CreateLink(this.label, `#card-${this.id}`),
			UI.CreateText(this.hotkey || '', ['hotkey']),
			// UI.CreateText('E to open | X to remove', ['show-detail']),
			UI.CreateText('E to open', ['show-detail']),
			UI.CreateForm([
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
				hotkey,
				UI.CreateText('ESC or E to close'),
			], '/', 'POST', ['details'], null)
		], ['card'], `card-${this.id}`)

		if (this.hotkey) {
			card.dataset.hotkey = this.hotkey;
		}
		return card;
	}
}