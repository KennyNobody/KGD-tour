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

	(function initHotelSliders() {
		const sliderArray = document.getElementsByClassName('hotel');

		for (let i = 1; i <= sliderArray.length; i++) {

			let nowSliderBlock = ".hotel--" + i + " .thumbs-slider__thumbs-container";
			let nowThumbsBlock = ".hotel--" + i + " .thumbs-slider__top";
			let nowNextLink = ".hotel--" + i + " .thumbs-slider__thumbs-bottom";
			let nowPrevLink = ".hotel--" + i + " .thumbs-slider__thumbs-top";

			if (nowSliderBlock) {
				let galleryThumbs = new Swiper(nowSliderBlock, {
					direction: 'vertical',
					spaceBetween: 10,
					slidesPerView: 4,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					navigation: {
						nextEl: nowNextLink,
						prevEl: nowPrevLink,
					},
					breakpoints: {
						1200: {
							direction: 'horizontal',
						}
					}
				});

				let galleryTop = new Swiper(nowThumbsBlock, {
					spaceBetween: 10,
					thumbs: {
						swiper: galleryThumbs
					}
				});
			} 
		}
		
	})();

	(function initMainSliders() {
		let swiper = new Swiper('.f-slider__slider-container', {
			slidesPerView: 3,
			spaceBetween: 20,
			navigation: {
				nextEl: '.f-slider__prev',
				prevEl: '.f-slider__next',
			},
		});
	})();

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
			console.log(i);
			if (sections[i] <= scrollPosition) {
				document.querySelector('.side-menu__link--active').classList.remove('side-menu__link--active');
				document.querySelector('.side-menu a[href*=' + i + ']').classList.add('side-menu__link--active');
			}
		}
	});

	// Появление мобильного меню
	const menuBtn = document.querySelector('.topline__menu');
	const pageBody = document.querySelector('.body');
	const menuProfile = document.querySelector('.menu__profile');
	const menuOverlay = document.querySelector('.menu__overlay');

	menuBtn.addEventListener('click', function() {
		pageBody.classList.add('body--menu');
	});

	menuOverlay.addEventListener('click', function() {
		pageBody.classList.remove('body--menu');
	});

	menuProfile.addEventListener('click', function() {
		pageBody.classList.remove('body--menu');
	});

	// Раскрытие карточки отеля

	function addEventListenerByClass(className, event, fn) {
		const hotelBtn = document.getElementsByClassName(className);

		for (let i = 0, len = hotelBtn.length; i < len; i++) {
			hotelBtn[i].addEventListener('click', fn, false);
		}
	}

	function openHotel () {
		this.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('hotel--open');
	}

	addEventListenerByClass('hotel__open', 'click', openHotel);

	// Скрывание карточки отеля

	function closeHotel () {
		this.parentNode.parentNode.parentNode.classList.remove('hotel--open');
	}

	addEventListenerByClass('hotel__close', 'click', closeHotel);

	// Выбор даты datepicker

	(function ititDatepickers() {
		let pickerStart = new Pikaday({
			field: document.getElementById('datepicker-start'),
			firstDay: 1,
			i18n: {
				previousMonth : 'Предыдущий месяц',
				nextMonth     : 'Следующий месяц',
				months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
				weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
				weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
			},
			onSelect: date => {
				const year = date.getFullYear()
				,month = date.getMonth() + 1
				,day = date.getDate()
				,formattedDate = [
				day < 10 ? '0' + day : day
				,month < 10 ? '0' + month : month
				,year
				].join('.')
				document.getElementById('datepicker-start').value = formattedDate
			}
		});

		let pickerFinish = new Pikaday({
			field: document.getElementById('datepicker-finish'),
			firstDay: 1,
			format: 'YYYY-MM-DD',
			i18n: {
				previousMonth : 'Предыдущий месяц',
				nextMonth     : 'Следующий месяц',
				months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
				weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
				weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
			},
			onSelect: date => {
				const year = date.getFullYear()
				,month = date.getMonth() + 1
				,day = date.getDate()
				,formattedDate = [
				day < 10 ? '0' + day : day
				,month < 10 ? '0' + month : month
				,year
				].join('.')
				document.getElementById('datepicker-finish').value = formattedDate
			}
		});
	})();

})();