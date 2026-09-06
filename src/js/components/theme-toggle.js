// Wires up the sun/moon theme toggle. Theme is applied pre-paint by an
// inline script in <head>; this just keeps the buttons and localStorage in sync.
const applyTheme = (theme) => {
	document.documentElement.setAttribute('data-theme', theme);
	try {
		localStorage.setItem('theme', theme);
	} catch (e) {}
	document.querySelectorAll('.theme-toggle_btn').forEach((btn) => {
		btn.setAttribute('aria-pressed', String(btn.dataset.themeValue === theme));
	});
};

applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');

document.querySelectorAll('.theme-toggle_btn').forEach((btn) => {
	btn.addEventListener('click', () => applyTheme(btn.dataset.themeValue));
});
