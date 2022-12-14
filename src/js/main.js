'use strict';

if (location.hash) {
	window.scrollTo(0, 0);

	setTimeout(function() {
		window.scrollTo(0, 0);
	}, 50);
}

$(function() {
	let sliderCalculateTheTaxCreditTns = null;

	initActiveHeaderAfterScroll();
	initViewportUnitsOnMobile();
	initHamburgerMenu();
	initStopAnimationsDuringWindowResizing();
	initAos();
	initAccordionScroll();
	initMapMultipleMarkers();
	initInputOnlyNumbers();
	initCustomSelect();
	initSliders();
	initFormValidate();
	initSetYear();
	initSmoothAnchorLinks();
	initStickyFooter();
	initMaskMoney();
	initSvgInjector();
	initMatchHeight();
	initCookiesBanner();

	$(window).on('resize', function() {
		initStickyFooter();
	});

	// ACTIVE HEADER AFTER SCROLL
	function initActiveHeaderAfterScroll() {
		var header = $('.js-header');

		$(window).on('scroll', function() {
			if ($(this).scrollTop() > 1) {
				header.addClass('active');
			} else {
				header.removeClass('active');
			}
		});

		if ($(document).scrollTop() > 1) {
			header.addClass('active');
		}
	}

	// VIEWPORT UNITS ON MOBILE
	function initViewportUnitsOnMobile() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');

		$(window).on('resize', function() {
			vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', vh + 'px');
		});
	}

	// HAMBURGER MENU
	function initHamburgerMenu() {
		let hamburger = $('.js-hamburger-menu'),
				menu = $('.js-header-menu');

		hamburger.on('click', function(e) {
			e.preventDefault();

			function openMenu() {
				hamburger.addClass('active');
				menu.addClass('active');
				$('body').addClass('overflow-hidden');
			}

			function closeMenu() {
				hamburger.removeClass('active');
				menu.removeClass('active');
				$('body').removeClass('overflow-hidden');
			}

			if ($(this).hasClass('active')) {
				closeMenu();
			} else {
				openMenu();
			}
		})
	}

	// STOP ANIMATIONS DURING WINDOW RESIZING
	function initStopAnimationsDuringWindowResizing() {
		var resizeTimer;

		$(window).on('resize', function() {
			$('body').addClass('resize-animation-stopper');

			clearTimeout(resizeTimer);

			resizeTimer = setTimeout(function() {
				$('body').removeClass('resize-animation-stopper');
			}, 400);
		});
	}

	// ANIMATION ON SCROLL
	function initAos() {
		AOS.init({
			duration: 1000,
			once: true,
			easing: 'ease-in-out'
		});
	}

	// ACCORDION SCROLL
	function initAccordionScroll() {
		$('.js-accordion .accordion-collapse').on('shown.bs.collapse', function () {
			var headerOffset = $('.js-header').outerHeight();

			if (headerOffset === undefined) {
				headerOffset = 0;
			}

			var top = $(this).closest('.accordion-item').offset().top - headerOffset - 10;

			$('body, html').animate({
				scrollTop: top
			}, 300);
		});
	}

	// GOOGLE MAP WITH MULTIPLE MARKER
	function initMapMultipleMarkers() {
		var mapBlock = $('.js-map-multiple-markers');

		if (!mapBlock.length) return;

		var map = new google.maps.Map(mapBlock.get(0), {
			disableDefaultUI: true,
			styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
		});

		// array of markers (with coordinates, name, address)
		var multipleMarkers = [
			{
				lat: 45.45922196159336,
				lng: 9.20883535584747,
				name: 'Ufficio 1',
				address: 'Via Spartaco 10, Milano'
			},
			{
				lat: 45.06800106010096,
				lng: 7.701812855834449,
				name: 'Ufficio 2',
				address: 'Via Giovanni Francesco Napione 22, Torino'
			},
		];

		var infoWindow = new google.maps.InfoWindow();

		google.maps.event.addListener(map, 'click', function() {
			infoWindow.close();
		});

		// Determine the boundaries of the visible area of the map in accordance with the position of the markers
		var bounds = new google.maps.LatLngBounds();

		// create the markers
		for (var i = 0; i < multipleMarkers.length; i++){

			var latLng = new google.maps.LatLng(multipleMarkers[i].lat, multipleMarkers[i].lng);
			var name = multipleMarkers[i].name;
			var address = multipleMarkers[i].address;

			addMarker(latLng, name, address);

			// Expand the boundaries of our visible area by adding the coordinates of our current marker
			bounds.extend(latLng);
		}

		// Automatically scale the map so that all markers are in the visible area of the map
		map.fitBounds(bounds);

		function addMarker(latLng, name, address) {
			var icon = {
				url: './img/map-marker.svg',
				scaledSize: new google.maps.Size(53,70)
			};

			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: name,
				icon: icon
			});

			google.maps.event.addListener(marker, 'click', function() {
				var contentString = '<div class="infowindow">' +
															'<h6>' + name + '</h6>' +
															'<p>' + address + '</p>' +
														'</div>';

				infoWindow.setContent(contentString);
				infoWindow.open(map, marker);
			});
		}
	}

	// INPUT ONLY NUMBERS
	function initInputOnlyNumbers() {
		(function($) {
			$.fn.inputFilter = function(callback) {
				return this.on("input keydown keyup mousedown mouseup select contextmenu drop focusout", function(e) {
					if (callback(this.value)) {
						// Accepted value
						this.oldValue = this.value;
						this.oldSelectionStart = this.selectionStart;
						this.oldSelectionEnd = this.selectionEnd;
					} else if (this.hasOwnProperty("oldValue")) {
						// Rejected value - restore the previous one
						this.reportValidity();
						this.value = this.oldValue;
						this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
					} else {
						// Rejected value - nothing to restore
						this.value = "";
					}
				});
			};
		}(jQuery));

		$('.js-only-numbers').inputFilter(function(value) {
			return /^-?\d*$/.test(value);
		});
	}

	// CUSTOM SELECT
	function initCustomSelect() {
		let select = $('.js-select');

		select.each(function() {
			$(this).select2({
				minimumResultsForSearch: Infinity,
				dropdownParent: $(this).closest('.js-select-parent')
			});
		});
	}

	// SLIDERS
	function initSliders() {
		let sliderCalculateTheTaxCredit = $('.js-slider-calculate-the-tax-credit');

		if (sliderCalculateTheTaxCredit.length) {
			sliderCalculateTheTaxCreditTns = tns({
				container: '.js-slider-calculate-the-tax-credit',
				gutter: 15,
				controls: false,
				nav: false,
				loop: false,
				autoHeight: true,
				touch: false,
				speed: 1000
			});

			$('#modalCalculateTheTaxCredit').on('shown.bs.modal', function (e) {
				setTimeout(function() {
					sliderCalculateTheTaxCreditTns.updateSliderHeight();
				}, 100)
			});

			$('#modalCalculateTheTaxCredit').on('hidden.bs.modal', function (e) {
				sliderCalculateTheTaxCreditTns.goTo('first');

				$('.js-form-calculate-the-tax-credit').trigger('reset');
				$('.js-form-contact').trigger('reset');
			});

			$('.js-go-next-slide').on('click', function(e) {
				e.preventDefault();

				sliderCalculateTheTaxCreditTns.goTo('next');
			});
		}
	}

	// FORM VALIDATE
	function initFormValidate() {
		var formWriteToUs = $('.js-form-write-to-us');

		if (formWriteToUs.length) {
			formWriteToUs.validate({
				lang: 'it',
				errorClass: 'is-invalid',

				errorPlacement: function(error, element) {
					error.addClass('invalid-feedback');

					if (element.attr('type') === 'checkbox' && element.closest('.custom-checkbox').length) {
						error.insertAfter(element.closest('.custom-checkbox'));
					} else {
						error.insertAfter(element);
					}
				},

				submitHandler: function(form) {
					$.ajax({
						type: 'POST',
						url: 'files/mail.php',
						data: $(form).serialize()
					}).done(function() {
						setTimeout(function() {
							// show success block
							$(form).trigger('reset').addClass('d-none');
							$('.js-form-write-to-us-success').removeClass('d-none');

							// scroll compensation
							var headerOffset = $('.js-header').outerHeight();

							if (headerOffset === undefined) {
								headerOffset = 0;
							}

							var top = $('#section-write-to-us').offset().top - headerOffset;

							$('body, html').animate({
								scrollTop: top
							}, 300);
						}, 1000);
					});

					return false;
				}
			});
		}

		var formCalculateTheTaxCredit = $('.js-form-calculate-the-tax-credit');

		if (formCalculateTheTaxCredit.length) {
			formCalculateTheTaxCredit.validate({
				lang: 'it',
				errorClass: 'is-invalid',

				errorPlacement: function(error, element) {
					error.addClass('invalid-feedback');

					if (element.attr('type') === 'checkbox' && element.closest('.custom-checkbox').length) {
						error.insertAfter(element.closest('.custom-checkbox'));
					} else {
						error.insertAfter(element);
					}
				},

				submitHandler: function(form) {
					function numberWithCommas(x) {
						var parts = x.toString().split('.');
								parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
								parts[1] = (parts[1] === undefined) ? '00' : (Number(0 + '.' + parts[1]).toFixed(2)).split('.')[1];

						return parts.join(',');
					}

					let annualStaffCost = +$('.js-annual-staff-cost').maskMoney('unmasked')[0],
							calcLowerNumber = numberWithCommas(annualStaffCost * 0.15 * 0.15),
							calcUpperNumber = numberWithCommas(annualStaffCost * 0.4 * 0.15);

					$('.js-calc-lower-number').text(calcLowerNumber);
					$('.js-calc-upper-number').text(calcUpperNumber);

					$('#modalCalculateTheTaxCredit').modal('show');
					$(form).trigger('reset');

					return false;
				}
			});
		}

		var formContact = $('.js-form-contact');

		if (formContact.length) {
			formContact.validate({
				lang: 'it',
				errorClass: 'is-invalid',

				errorPlacement: function(error, element) {
					error.addClass('invalid-feedback');

					if (element.attr('type') === 'checkbox' && element.closest('.custom-checkbox').length) {
						error.insertAfter(element.closest('.custom-checkbox'));
					} else {
						error.insertAfter(element);
					}
				},

				submitHandler: function(form) {
					$.ajax({
						type: 'POST',
						url: 'files/mail.php',
						data: $(form).serialize()
					}).done(function() {
						setTimeout(function() {
							$(form).trigger('reset');
							sliderCalculateTheTaxCreditTns.goTo('next');
						}, 1000);
					});

					return false;
				}
			});
		}
	}

	// SET YEAR
	function initSetYear() {
		let currentYear = new Date().getFullYear();

		$('.js-year').text(currentYear);
	}

	// SMOOTH ANCHOR LINKS
	function initSmoothAnchorLinks() {
		var animationComplete = true,
				smoothAnchorLinks = $('a[href*="#"]:not([href="#"]):not(.js-no-scroll)'),
				headerHeight = $('.js-header').length ? $('.js-header').outerHeight() : 0,
				urlHash = window.location.href.split("#")[1];

		function scrollToElement(element, offset = 0) {
			if (animationComplete && element.length) {
				animationComplete = false;

				var additionalOffset = element.attr('data-offset') === undefined ? 0 : +element.attr('data-offset');

				$('body, html').animate({
					scrollTop: element.offset().top - (offset + additionalOffset)
				}, 500).promise().done(function() {
					animationComplete = true;
				});
			}
		}

		// link click scroll
		smoothAnchorLinks.on('click', function() {
			var idOfElement = $(this).attr('href').split('#')[1],
					element = $('#' + idOfElement);

			scrollToElement(element, headerHeight);
		});

		// hash in url scroll
		const pageReloaded = (
			(window.performance.navigation && window.performance.navigation.type === 1) ||
				window.performance
					.getEntriesByType('navigation')
					.map((nav) => nav.type)
					.includes('reload')
		);

		function removeHashFromUrl() {
			if (window.history) {
				window.history.pushState('', document.title, window.location.href.replace(window.location.hash, ''));
			} else {
					window.location.hash = '';
			}
		}

		if (urlHash) {
			if (pageReloaded) {
				removeHashFromUrl();
			} else {
				var element = $('#' + urlHash);

				setTimeout(function() {
					if ($('.js-header').length && window.scrollY === 0) {
						$('body, html').animate({scrollTop: 2}, 100).promise().done(function() {
							setTimeout(function() {
								headerHeight = $('.js-header').outerHeight();

								scrollToElement(element, headerHeight);
							}, 500);
						});
					}
				}, 1000);
			}
		}
	}

	// STICKY FOOTER
	function initStickyFooter() {
		var footerHeight = $('.js-footer').outerHeight();

		$('.js-wrap-for-sticky').css('padding-bottom', footerHeight);
	}

	// MASK MONEY
	function initMaskMoney() {
		let inputWithMask = $('.js-mask-money');

		if (inputWithMask.length) {
			inputWithMask.each(function() {
				$(this).maskMoney({
					prefix: '???',
					thousands: '.',
					decimal: ','
				});
			})
		}
	}

	// SVG INJECTOR
	function initSvgInjector() {
		var mySVGsToInject = document.querySelectorAll('img.js-svg-injector');

		SVGInjector(mySVGsToInject);
	}

	// MATCH HEIGHT
	function initMatchHeight() {
		$('.js-match-height').matchHeight();
	}

	// COOKIES BANNER
	function initCookiesBanner() {
		var cookiesBanner = $('.js-cookies-banner'),
				rejectCookiesBtn = $('.js-reject-cookies'),
				acceptCookiesBtn = $('.js-accept-cookies');

		if (!cookiesBanner.length) return;

		var cookiesAreRejected = Cookies.get('cookiesAreRejected'),
				cookiesAreAccepted = Cookies.get('cookiesAreAccepted');

		if (cookiesAreRejected === undefined && cookiesAreAccepted === undefined) {
			cookiesBanner.removeClass('d-none');
		}

		rejectCookiesBtn.on('click', function(e) {
			e.preventDefault();

			Cookies.set('cookiesAreRejected', 'true', { expires: 7 });
			cookiesBanner.addClass('d-none');
		});

		acceptCookiesBtn.on('click', function(e) {
			e.preventDefault();

			Cookies.set('cookiesAreAccepted', 'true', { expires: 7 });
			cookiesBanner.addClass('d-none');
		});
	}
});