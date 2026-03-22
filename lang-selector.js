// Language selector with persistence
// const savedLang = localStorage.getItem('selectedLang') || 'ar';
const savedLang = localStorage.getItem('selectedLang') || 'sv';
document.documentElement.lang = savedLang;
document.body.dir = (savedLang === 'ar') ? 'rtl' : 'ltr';
document.querySelectorAll('[data-en]').forEach(el => {
	el.textContent = el.dataset[savedLang] || el.textContent;
});

// Custom select functionality
const selectSelected = document.getElementById('select-selected');
const selectItems = document.getElementById('select-items');
const options = selectItems.querySelectorAll('div');

// Set initial selected based on saved language
const initialOption = selectItems.querySelector(`[data-value="${savedLang}"]`);
if (initialOption) {
	selectSelected.innerHTML = initialOption.innerHTML;
}

// Highlight the selected option in the dropdown
const highlightSelected = () => {
	options.forEach(opt => opt.classList.remove('selected'));
	// const currentLang = localStorage.getItem('selectedLang') || 'ar';
	const currentLang = localStorage.getItem('selectedLang') || 'sv';
	const selectedOpt = selectItems.querySelector(`[data-value="${currentLang}"]`);
	if (selectedOpt) selectedOpt.classList.add('selected');
};

selectSelected.addEventListener('click', function() {
	highlightSelected();
	selectItems.classList.toggle('select-hide');
	this.classList.toggle('select-arrow-active');
});

options.forEach(option => {
	option.addEventListener('click', function() {
		const lang = this.getAttribute('data-value');
		localStorage.setItem('selectedLang', lang);
		document.documentElement.lang = lang;
		document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
		document.querySelectorAll('[data-en]').forEach(el => {
			el.textContent = el.dataset[lang] || el.textContent;
		});
		selectSelected.innerHTML = this.innerHTML;
		selectItems.classList.add('select-hide');
		selectSelected.classList.remove('select-arrow-active');
		highlightSelected(); // Update highlight after selection
	});
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
	if (!e.target.closest('.custom-select')) {
		selectItems.classList.add('select-hide');
		selectSelected.classList.remove('select-arrow-active');
	}
});

// Ensure dropdown is closed on page load
selectItems.classList.add('select-hide');
selectSelected.classList.remove('select-arrow-active');