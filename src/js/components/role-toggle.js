// Expands/collapses the per-role detail bullets in the work history list.
// Click or Enter/Space toggles a row between its one-line summary and the
// full bullet list; rows are independent, any number can be open at once.
document.querySelectorAll('#work .role-row').forEach((row) => {
	const marker = row.querySelector('.role-row_marker');

	const setOpen = (open) => {
		row.classList.toggle('is-open', open);
		row.setAttribute('aria-expanded', String(open));
		if (marker) marker.textContent = open ? '−' : '+';
	};

	row.addEventListener('click', () => setOpen(!row.classList.contains('is-open')));

	row.addEventListener('keydown', (e) => {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		setOpen(!row.classList.contains('is-open'));
	});
});
