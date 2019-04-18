import Kanban from './js/kanban.js';

const data = {
	cards: [{
		id: 0,
		label: 'Test a',
		category: 0
	},{
		id: 1,
		label: 'Test b',
		category: 1
	},{
		id: 2,
		label: 'Test c',
		category: 2
	},{
		id: 3,
		label: 'Test d',
		category: 0
	},{
		id: 4,
		label: 'Test e',
		category: 1
	},{
		id: 5,
		label: 'Test f',
		category: 2
	},{
		id: 6,
		label: 'Test g',
		category: 0
	},{
		id: 7,
		label: 'Test h',
		category: 1
	},{
		id: 8,
		label: 'Test i',
		category: 2
	},{
		id: 9,
		label: 'Test j',
		category: 0
	},{
		id: 10,
		label: 'Test k',
		category: 1
	},{
		id: 11,
		label: 'Test l',
		category: 2
	},]
}

document.addEventListener('DOMContentLoaded', () => {
	new Kanban('#kanban', data);
	document.body.classList.add('infocus');
	window.onfocus = () => {
		document.body.classList.add('infocus');
	};
	window.onblur = () => {
		document.body.classList.remove('infocus');
	};
});