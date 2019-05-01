(function(){

	// Слайдер https://idangero.us/swiper/

	(function ititSlider() {
		const sliderLength = document.querySelectorAll(".slider .slider__slide").length;
		const sliderNav = document.querySelector(".slider__nav");

		if (sliderLength > 1) {
			let slider = new Swiper('.slider', {
				navigation: {
					nextEl: '.slider__btn--next',
					prevEl: '.slider__btn--prev',
					disabledClass: 'slider__btn--inactive'
				},
			});
			sliderNav.classList.add('slider__nav--active');
		}
	})();

	// Кастомный скроллбар https://kingsora.github.io/OverlayScrollbars/

	document.addEventListener("DOMContentLoaded", function() {
		OverlayScrollbars(document.querySelectorAll(".custom-scroll"), {
			// paddingAbsolute : true,
			// scrollbars : {
			// 	clickScrolling : true
			// }
		});
	});

	// Всплывающие окошки 

	MicroModal.init();

	let closeBtns = document.querySelectorAll('.close');

	if (closeBtns) {
		[].forEach.call(closeBtns, function(item) {
			item.addEventListener('click', function() {
				let openedModal = document.querySelector('.is-open');

				openedModal.classList.remove('is-open');
				openedModal.setAttribute('aria-modal', 'true');

			});
		});
	}

	// Переключение вкладок в регистрации

	const regLink = document.querySelector('#modal__link--reg');
	const regBlock = document.querySelector('.modal__tab--reg');

	const authLink = document.querySelector('#modal__link--auth');
	const authBlock = document.querySelector('.modal__tab--auth');

	if (regLink) {
		regLink.addEventListener('click', function() {
			authBlock.classList.add('hidden');
			regBlock.classList.remove('hidden');
		});
	}
	
	if (authLink) {
		authLink.addEventListener('click', function() {
			regBlock.classList.add('hidden');
			authBlock.classList.remove('hidden');
		});
	}

})();