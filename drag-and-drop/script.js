import Kanban from './js/kanban.js';

const data = {
	cards: [{
		id: 0,
		label: 'Test a',
		category: 0,
		description: '',
	},{
		id: 1,
		label: 'Test b',
		category: 1,
		description: '',
	},{
		id: 2,
		label: 'Test c',
		category: 2,
		description: '',
	},{
		id: 3,
		label: 'Test d',
		category: 0,
		description: '',
	},{
		id: 4,
		label: 'Test e',
		category: 1,
		description: '',
	},{
		id: 5,
		label: 'Test f',
		category: 2,
		description: '',
	},{
		id: 6,
		label: 'Test g',
		category: 0,
		description: '',
	},{
		id: 7,
		label: 'Test h',
		category: 1,
		description: '',
	},{
		id: 8,
		label: 'Test i',
		category: 2,
		description: '',
	},{
		id: 9,
		label: 'Test j',
		category: 0,
		description: '',
	},{
		id: 10,
		label: 'Test k',
		category: 1,
		description: '',
	},{
		id: 11,
		label: 'Test l',
		category: 2,
		description: '',
	},]
}

if (!localStorage.getItem('kanbandata')) {
	console.log('data init');
	localStorage.setItem('kanbandata', JSON.stringify(data));
}

const workData = JSON.parse(localStorage.getItem('kanbandata'));

document.addEventListener('DOMContentLoaded', () => {

	new Kanban('#kanban', workData);

	const focusWatcher = false;

	document.body.classList.add('infocus');
	if (focusWatcher) {
		window.onfocus = () => {
			document.body.classList.add('infocus');
		};
		window.onblur = () => {
			document.body.classList.remove('infocus');
		};
	} else {
		document.body.classList.remove('unexplained');
		document.querySelector('#explain').parentElement.removeChild(document.querySelector('#explain'));
	}
});