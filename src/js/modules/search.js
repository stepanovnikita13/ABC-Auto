export function search() {
	let searchBtn = $('#searchBtn');
	let search = $('#search');
	let backBtn = $("#backBtn");
	let fullMenu = $('#fullmenu');

	$(document).ready(function () {
		searchBtn.click(function (event) {
			searchBtn.toggleClass("isOpen");
			fullMenu.toggleClass('active');
			search.toggleClass('active');
		});

		backBtn.click(function () {
			search.removeClass('active');
			$('body').removeClass('lock');
		});
	});
}