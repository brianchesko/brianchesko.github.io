// add visibility toggle to show coursework
const toggleCoursework = () => {
	const button = document.getElementById('coursework_show-btn');
	const list = document.getElementById('coursework_list');
	if (button.classList.contains('visible')) {
		button.innerText = 'show';
	} else {
		button.innerText = 'hide';
	}
	button.classList.toggle('visible');
	list.classList.toggle('visible');
};

const closeModal = (event) => {
	if (event.target != event.currentTarget) {
		return; // only process if we clicked EXACTLY the x or clickthrough, nothing on the modal
	}
	const modal = document.getElementById('image-modal');
	modal.classList.remove('image-modal__visible');
};

document.getElementById('coursework_show-btn').addEventListener('click', toggleCoursework, false);
document.getElementById('image-modal').addEventListener('click', closeModal, false);
document.getElementById('image-modal_close-button').addEventListener('click', closeModal);


