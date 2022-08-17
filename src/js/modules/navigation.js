export function menu() {
	let burger = $('#burger');
	let menu = $('#menu');
	let overlay = $('#overlay');
	let fullMenu = $('#fullmenu');
	let nav = $("#nav");

	let searchBtn = $('#searchBtn');
	let search = $('#search');
	let backBtn = $("#backBtn");

	$(document).ready(function () {
		burger.click(function (event) {
			burger.toggleClass('active');

			if (window.matchMedia("(max-width: 1199px)").matches) {
				menu.toggleClass('active');
				overlay.toggleClass('active');
			} else {
				if (searchBtn.hasClass("isOpen")) {
					navShow();
					searchBtn.removeClass("isOpen");
					fullMenu.removeClass('active');
				}
				fullMenu.toggleClass("active");
				nav.toggleClass("active");
			}
			$('body').toggleClass('lock');
		});

		searchBtn.click(function () {
			searchBtn.toggleClass("isOpen");
			if (burger.hasClass("active")) {
				nav.removeClass("active");
				burger.removeClass("active");
			} else {
				fullMenu.toggleClass('active');
				search.toggleClass('active');
			}
		});

		backBtn.click(function () {
			search.removeClass('active');
			$('body').removeClass('lock');
		});
	});
}