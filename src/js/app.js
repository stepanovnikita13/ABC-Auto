import * as flsFunctions from "./modules/functions.js";
import { menu } from "./modules/navigation.js";

flsFunctions.isWebp();
menu();

$(document).ready(function () {
	let selectItem = $('.select');
	let phoneStrings = $('.js-phone'),
		sliderSwipers = $('.slider-swiper'),
		addressStrings = $('.js-address'),
		pickUpFrom = $('#pick-up-irs-from'),
		pickUpTo = $('#pick-up-irs-to'),
		creditTerm = $('#term-irs-from'),
		creditFee = $('#fee-irs-from');

	const contactsData = {
		"Москва": {
			tel: "+7(495)292-18-67",
			address: "Россия, Москва, 38КМ МКАД, 6бс1"
		},
		"Санкт-Петербург": {
			tel: "+7(780)465-26-92",
			address: "Россия, Санкт-Петербург, ул. Ленина 31"
		},
		"Ставрополь": {
			tel: "+7(865)228-78-50",
			address: "Россия, Ставрополь, ул. Доваторцев 46в"
		}
	}

	$("#phone").mask("+7 (999) 999-99-99");

	$('.top-slider').slick({
		dots: true,
		arrows: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 10000,
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 1919,
				settings: {
					arrows: true,
				}
			}
		],
	})

	let _slidesToShow = function (selector) {
		let _default = 3;
		let slidesNum = selector.attr('data-slides') ?? _default;

		return +slidesNum;
	}

	sliderSwipers.each(function () {
		$(this).slick({
			arrows: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			swipeToSlide: true,
			variableWidth: true,
			mobileFirst: true,
			responsive: [
				{
					breakpoint: 1199,
					settings: {
						arrows: true,
						swipeToSlide: false,
						slidesToShow: _slidesToShow($(this)),
						slidesToScroll: _slidesToShow($(this)),
						variableWidth: false,
					}
				}
			]
		})
	})

	$('.js-range-slider').ionRangeSlider({
		type: "double",
		skin: "round",
		values: [0, 500000, 800000, 1100000, 1400000, 1700000, 2000000, 2300000, 2700000, 3000000],
		from: 0,
		to: 1,
		grid: true,
		grid_num: 9,
		hide_from_to: true,
		hide_min_max: true,
		onStart: function (data) {
			convertRangeSliderValues();
			pickUpFrom.text(setPrefix(data.from_value));
			pickUpTo.text(setPrefix(data.to_value));
		},
		onChange: function (data) {
			pickUpFrom.text(setPrefix(data.from_value));
			pickUpTo.text(setPrefix(data.to_value));
		},
	})


	let feeInput = $('.fee-input'),
		feeMin = 0,
		feeMax = 1200000;

	$('.js-range-slider-fee').ionRangeSlider({
		type: "single",
		skin: "round",
		min: feeMin,
		max: feeMax,
		from: 0,
		grid: true,
		grid_num: 6,
		hide_from_to: true,
		hide_min_max: true,
		onStart: function (data) {
			convertRangeSliderValues();
			creditFee.text(setPrefix(data.from));
		},
		onChange: function (data) {
			creditFee.text(setPrefix(data.from));
			feeInput.prop("value", data.from);
		},
	})

	feeInput.on("input change click focus", function () {
		let value = $(this).prop("value");

		$(this).val($(this).val().replace(/\D/, ''));

		if (value == 0) {
			$(this).prop("value", "");
			return;
		}
		if (value < feeMin) {
			value = feeMin
		} else if (value > feeMax) {
			value = feeMax
		}

		$('.js-range-slider-fee').data('ionRangeSlider').update({
			from: value
		})
		creditFee.text(setPrefix(value));
	})


	$('.js-range-slider-term').ionRangeSlider({
		type: "single",
		skin: "round",
		values: [6, 12, 24, 36, 48, 60, 72, 84],
		from: 1,
		grid: true,
		grid_num: 8,
		hide_from_to: true,
		hide_min_max: true,
		onStart: function (data) {
			creditTerm.text(setPrefix(data.from_value));
		},
		onChange: function (data) {
			creditTerm.text(setPrefix(data.from_value));
		},
	})


	//Custom select menu	
	//Toggle menu
	selectItem.each(function () {
		let _ = $(this),
			selectTitle = _.children('.select__title'),
			selectLabels;
		selectTitle.click(() => {
			_.attr('data-state', (index, attr) => attr == '' ? 'active' : '');
		})
		selectLabels = _.find('.select__label');

		selectLabels.each((index, lbl) => {
			lbl.addEventListener('click', (e) => {
				selectTitle.text(e.target.textContent);

				if (_.hasClass('select-city')) {
					let tel = contactsData[e.target.textContent].tel;
					let address = contactsData[e.target.textContent].address;

					phoneStrings.each((index, obj) => obj.textContent = tel);
					addressStrings.each((index, obj) => obj.textContent = address);

					$.cookie('city', e.target.textContent);
					$.cookie('tel', tel);
					$.cookie('address', address);
				}
				_.attr('data-state', '');
			})
		})
	})




	resizeList();
	getCookie();





	function getCookie() {
		if ($.cookie('city')) {
			$('.select-city').children('.select__title').text($.cookie('city'));
			phoneStrings.each((index, obj) => obj.textContent = $.cookie('tel'));
			addressStrings.each((index, obj) => obj.textContent = $.cookie('address'));
		}
	}

	function convertRangeSliderValues() {
		let gridItems, text;
		gridItems = $('.irs-grid-text'); ///////Доработать!
		gridItems.each(function () {
			$(this).text(setPrefix($(this).text()))
		})
	}

	function setPrefix(value) {
		if (isNaN(value)) value = value.replace(/\s/g, '');

		if (value > 999 & value < 1000000) {
			value = Math.floor(value / 1000) + "т";
			return value;
		}
		if (value >= 1000000) {
			value = (value / 1000000).toFixed(2) + "м"
		}
		return value;
	}
});



$(window).resize(function () {
	resizeList();
})


function resizeList() {
	let list = $('.js-resizable-list');
	list.each(function () {
		let countOfElements = $(this).children().length;
		let columnGap = parseInt($(this).css('column-gap'));
		let countOfColumn = Math.floor(($(this).width() + columnGap + 1) / ($(this).find(':first-child').width() + columnGap));
		let listHeight = Math.ceil(countOfElements / countOfColumn) * $(this).find(':first-child').height();
		$(this).height(listHeight);
	})

}