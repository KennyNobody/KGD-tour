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
			paddingAbsolute : true,
			scrollbars : {
				clickScrolling : true
			}
		});
	});

	// Всплывающие окошки с информацией https://atomiks.github.io/tippyjs/

	
})();