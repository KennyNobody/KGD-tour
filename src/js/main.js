(function(){

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
		console.log(sliderLength);
	})();
	
})();