
document.getElementById('coursework_show-btn').addEventListener('click', () => {
	const button = document.getElementById('coursework_show-btn');
	const list = document.getElementById('coursework_list');
	if (button.classList.contains('visible')) {
		button.innerText = 'show';
	} else {
		button.innerText = 'hide';
	}
	button.classList.toggle('visible');
	list.classList.toggle('visible');
}, false);