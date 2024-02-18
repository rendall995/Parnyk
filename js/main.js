// табы

(function ($) {
	$(function () {
		$('ul.tabs-list').on('click', 'li:not(.active)', function () {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('section.tabs-screen').find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
			$('.slider').slick('setPosition', 0);
		});
	});
})(jQuery);

// табы отзывы

(function ($) {
	$(function () {
		$('.reviews-nav__list').on('click', 'li:not(.active)', function () {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.reviews-wrapper').find('.reviews-content').removeClass('active').eq($(this).index()).addClass('active');

		});
	});
})(jQuery);

// табы hover

(function ($) {
	$(function () {
		$('ul.production-list').on('mouseover', 'li:not(.active)', function () {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('div.production-content').find('div.production-content__bg-inner').removeClass('active').eq($(this).index()).addClass('active');

		});
	});
})(jQuery);

$(document).ready(function () {

	// инициализация попапа

	$('.inline-popup').magnificPopup({
		type: 'inline'
	});

	// scroll

	$('.specs-form__btn2 a[href*="#"]').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate(
			{
				scrollTop: $($(this).attr('href')).offset().top,
			},
			1000,
			'linear'
		)
	});

	// отзывы галлерея

	$(".fancybox").fancybox({
		openEffect: 'none',
		closeEffect: 'none',
		nextEffect: 'none',
		prevEffect: 'none',
		padding: 0,
		margin: [20, 0, 20, 0]
	});

	// слайдер

	$('.slider').slick({
		speed: 500,
		fade: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		dots: false,
		prevArrow: '<i class="slick-arrow arrow-left icon-arrow"></i>',
		nextArrow: '<i class="slick-arrow arrow-right icon-arrow"></i>',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	});

	// видео превью

	$('.play-btn__wpapper').click(function () {
		$(this).fadeOut('200');
		$('.video-preview01').fadeOut('200');
	});
	$('.play-btn__wpapper2').click(function () {
		$(this).fadeOut('200');
		$('.video-preview02').fadeOut('200');
	});
	$('.play-btn__wpapper3').click(function () {
		$(this).fadeOut('200');
		$('.video-preview03').fadeOut('200');
	});

	// показать скрыть

	$('.choose-form__option-input').click(function () {
		if ($(this).hasClass('email-option')) {
			$('.email-wrapper').slideDown('200');
		}
		else {
			$('.email-wrapper').slideUp('200');
		}
	});

	/* карта */

	$('#Map area').hover(function () {
		var cls = $(this).data('class');
		if (typeof cls !== 'undefined') {
			$('#mapdiv > #map-cont').removeAttr('class').addClass(cls);
		}
	});
	$('#Map area').click(function (e) {
		var reg = $(this).data('name');
		e.preventDefault();
		$('#region-popup').find('input.region-input').val(reg);
	});

	// отправка форм

	$.validator.addMethod('uaphone', function (value, element, params) {
		var regex = /\+38 \(0[0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/g;
		var match = value.match(regex);
		if (match !== null) {
			if (match.length === 1) return true;
		}
		return false;
	});

	$('input[name="phone"]').mask('+38 (999) 999-99-99');
	$(document).ready(function () {
		var forms = document.getElementsByTagName('form');
		for (var i = 0; i < forms.length; i++) {
			$(forms[i]).validate({
				rules: {
					phone: {
						required: true,
						uaphone: true,
					},
				},
				messages: {
					name: {
						required: "Введіть ім'я"
					},
					phone: {
						required: 'Введіть номер телефона',
						uaphone: 'Введіть коректний номер'
					}
				},
				submitHandler: submitForm
			});
		};
	});

	function submitForm(form, e) {
		e.preventDefault();
		var data = $(form).serialize();
		var text = $(form).find('button[type="submit"]').html();
		var page = $(form).find('[name="tagmanager"]').val();
		$(form).find('[name="tagmanager"]').remove();
		$(form).find('.alert-error').remove();

		$.ajax({
			url: 'sendmessage.php',
			type: 'POST',
			data: data,
			beforeSend: function () {
				$(form).find('input, button[type="submit"]').attr('disabled', '');
				$(form).find('button[type="submit"]').html('Відправляєм...');
			}
		})

			.done(function (response) {
				$(form).find('input, button').removeAttr('disabled');
				$(form).find('[name="phone"]').val('');
				$(form).find('button[type="submit"]').html(text);
				$(form).find('input, button[type="submit"]').attr('disabled', '');
				$(form).find('button[type="submit"]').html('Отправлено');
				$('[data-type="modal"]').removeClass('active');
				$('#response-modal').addClass('active');
				setTimeout(function () {
					window.location.href = 'http://ua.promcatalog.biz/spasibo.php';
				}, 500);
				var linkP = $(form).attr('data-formlink')
				if ($(form).hasClass('price-form')) {
					$(location).attr('href', 'files/price.pdf');
				}

				setTimeout(function () {
					$('#response-modal').css('display', 'block');
				}, 500);

				setTimeout(function () {
					$('#response-modal').fadeOut(1000);
				}, 2500);

				setTimeout(function () {
					$.magnificPopup.close();
					$(".forms").trigger("reset");
					$(form).find('input, button').removeAttr('disabled');
				}, 1000);

				dataLayer.push({
					'event': 'VirtualPageview',
					'virtualPageURL': page,
					'virtualPageTitle': page.replace('/', '')
				});
			})
			.fail(function (response) {
				console.log(response);
				$(form).find('button[type="submit"]').html('Не вийшло :(');
			});
		$.cookie('lead_sended', '1', { expires: 0.5 });
	}

	$('select[name="auto"]').change(function () {
		var modelValue = $(this).val();
		$(this).closest('form').addClass("active_form");
		var carSelect = $('.active_form select[name="series"]');
		$.getJSON('ajax.php', {
			action: 'getModels',
			model: modelValue
		}, function (seriesList) {
			carSelect.html('');
			$.each(seriesList, function (i) {
				carSelect.append('<option value="' + seriesList[i] + '">' + this + '</option>');
				i++;
			});
		});
		$(this).closest('form').removeClass("active_form");
	});
});
$(document).ready(function () {

	$("#adv_form").submit(function (event) {
		if ($('#auto_adv').val() != 0 && $('#series_adv').val() != 0 && $('#year_adv').val() != 0) {
			event.preventDefault();
			// alert($(this).attr('action'));

			$.ajax({
				type: $(this).attr('method'),
				url: "/send.php",
				data: new FormData(this),
				contentType: false,
				cache: false,
				processData: false,

				success: function () {
					$('#adv_form')[0].reset();
				}
			});
			window.open("http://www.avtobarsa.com/photo/germany-tkan/");
		}


	});
});