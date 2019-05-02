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

	var galleryThumbs = new Swiper('.thumbs-slider__thumbs-container', {
		direction: 'vertical',
		spaceBetween: 10,
		slidesPerView: 4,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.thumbs-slider__thumbs-bottom',
			prevEl: '.thumbs-slider__thumbs-top',
		},
	});
	var galleryTop = new Swiper('.thumbs-slider__top', {
		spaceBetween: 10,
		thumbs: {
			swiper: galleryThumbs
		}
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

	// Изменение активного пунка меню в сайдбаре

	var section = document.querySelectorAll(".section-anchor");
	var sections = {};
	var i = 0;

	Array.prototype.forEach.call(section, function(e) {
		sections[e.id] = e.offsetTop;
	});

	document.addEventListener('scroll', function() {
		var scrollPosition = document.documentElement.scrollTop + 50 || document.body.scrollTop + 50;

		for (i in sections) {
			if (sections[i] <= scrollPosition) {
				document.querySelector('.side-menu__link--active').classList.remove('side-menu__link--active');
				document.querySelector('a[href*=' + i + ']').classList.add('side-menu__link--active');
			}
		}
	});

	// Появление мобильного меню
	const menuBtn = document.querySelector('.topline__menu');
	const pageBody = document.querySelector('.body');
	const menuOverlay = document.querySelector('.menu__overlay');

	menuBtn.addEventListener('click', function() {
		pageBody.classList.add('body--menu');
	});

	menuOverlay.addEventListener('click', function() {
		pageBody.classList.remove('body--menu');
	})

})();