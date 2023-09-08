/*
 * Generate Ipsum
 */
(function($) {
	'use strict';

	$(window).on('load', function() {
		const delayInterval = 250; //2000; // ms
		// const urlBase = 'https://flipsum-ipsum.net/api/icw/v1';
		const urlBase = 'https://power-plugins.com/api/flipsum/ipsum';
		var areIpsumsLoaded = false;
		var buttonMinOpacity = 0.33;
		var ipsumDelayTimeout = null;
		var defaultIpsum = null;
		var defaultParagraphCount = 0;

		var theBrowser = null;
		if (typeof browser != 'undefined') {
			theBrowser = browser;
		} else if (typeof chrome != 'undefined') {
			theBrowser = chrome;
		} else {
			theBrowser = null;
		}

		/** ********************************************************************
		 *  Event handlers.
		 ** *******************************************************************/

		$(window).on('ipsumSettingsLoaded', function() {
			if (!defaultParagraphCount || parseInt(defaultParagraphCount) <= 0) {
				defaultParagraphCount = 5;
			}

			if (!defaultIpsum) {
				defaultIpsum = 'lorem-ipsum'; //'classic';
			}

			$('#paragraph-count').attr('min', 1).attr('max', 30).val(defaultParagraphCount);

			refreshIpsumList();
		});

		$(window).on('availableIpsumsLoaded', function() {
			generateIpsum();
		});

		$('#copy-ipsum-html').click(function(event) {
			copyIpsumToClipboard(false);
		});

		$('#copy-ipsum-text').click(function(event) {
			copyIpsumToClipboard(true);
		});

		$('#overlay').click(function(event) {
			clearOverlay();
		});

		$('#paragraph-count, #ipsum-chooser').change(function(event) {
			generateIpsumAfterDelay();
		});


		/** ********************************************************************
		 *  Entry point.
		 ** *******************************************************************/
		loadSettings();


		function loadSettings() {
			if (!theBrowser) {
				$(document).trigger("ipsumSettingsLoaded", []);
			} else {
				theBrowser.storage.local.get(['favouriteIpsum', 'paragraphCount'], function(result) {
					defaultIpsum = result.favouriteIpsum;
					defaultParagraphCount = result.paragraphCount;

					$(document).trigger("ipsumSettingsLoaded", []);
				});
			}
		}

		function saveSettings() {
			if (theBrowser) {
				var currentIpsum = $('#ipsum-chooser').val();

				if (currentIpsum) {
					theBrowser.storage.local.set({
						favouriteIpsum: currentIpsum,
						paragraphCount: $('#paragraph-count').val(),
					});
				}
			}
		}

		function refreshIpsumList() {
			// console.debug(`Load: ${url}`);

			if (!areIpsumsLoaded) {
				var url = urlBase; // + '/ipsums';

				var select = $('#ipsum-chooser');
				select.empty();

				$.get(url,
					function(response) {
						// DEBUG
						// response = null;

						if (!Array.isArray(response)) {
							clearLoader();
						} else {
							response.forEach(function(ipsum) {
								var props = ''

								if (defaultIpsum && (ipsum['slug'] == defaultIpsum)) {
									props = 'selected';
								}

								select.append(`<option value="${ipsum['slug']}" ${props}>${ipsum['name']}</option>`);
							});

							areIpsumsLoaded = true;
							$(document).trigger("availableIpsumsLoaded", []);
						}
					}
				).fail(function() {
					clearLoader();
				}).always(function() {
					// clearLoader();
				});
			}
		}

		function showLoader() {
			$('#loader').show();
			$('#output').html('').hide();
			$('#generate-ipsum').attr('disabled', true).fadeTo('fast', buttonMinOpacity);
			$('.copy-ipsum').attr('disabled', true).fadeTo('fast', buttonMinOpacity);
		}

		function clearLoader() {
			var ipsumContent = $('#output').html();

			if ($('#ipsum-chooser option').length == 0) {
				$('#controls').hide()
				$('#error-no-ipsums').fadeIn();
				$('#generate-ipsum').attr('disabled', true).fadeTo('fast', buttonMinOpacity);
			} else {
				$('#error-no-ipsums').hide();

				if (ipsumContent.length == 0) {
					$('.copy-ipsum').attr('disabled', true).fadeTo('fast', buttonMinOpacity);
					$('#controls').hide()
					$('#error-bad-ipsum').fadeIn();
				} else {
					$('#error-bad-ipsum').hide();
					$('#controls').show()
					$('.copy-ipsum').attr('disabled', false).fadeTo('fast', 1.0);
					saveSettings();
				}

				$('#ipsum-chooser').attr('disabled', false);
				$('#paragraph-count').attr('disabled', false);
				$('#generate-ipsum').attr('disabled', false).fadeTo('fast', 1.0);
			}

			$('#loader').fadeOut();
		}

		function clearOverlay() {
			$('#overlay').fadeOut('fast');
		}

		function showOverlay() {
			$('#overlay').fadeIn('fast');
		}

		function generateIpsum() {
			if (areIpsumsLoaded) {
				cancelDelayedGenerator();
				clearOverlay();
				showLoader();

				var url = urlBase + '/' + $('#ipsum-chooser').val();
				url += '?paragraphs=' + $('#paragraph-count').val();
				url += '&html=1';

				// $('#debug').append( `<p>${url}</p>`);

				$.get(url,
					function(response) {
						$('#output').html(response).show();
					}
				).fail(function() {
					$('#output').html('').hide();
				}).always(function() {
					clearLoader();
				});
			}
		}

		function cancelDelayedGenerator() {
			if (ipsumDelayTimeout) {
				clearTimeout(ipsumDelayTimeout);
				ipsumDelayTimeout = null;
			}
		}

		function generateIpsumAfterDelay() {
			clearOverlay();

			cancelDelayedGenerator();

			ipsumDelayTimeout = setTimeout(
				function() {
					generateIpsum();
				},
				delayInterval
			);
		}

		function copyIpsumToClipboard(isPlainTextRequested) {
			clearOverlay();

			var ipsumContent = null;

			if (isPlainTextRequested === true) {
				ipsumContent = '';
				var paragraphIndex = 0;
				$('#output p').each(function(index, el) {
					if (paragraphIndex > 0) {
						ipsumContent += "\n\n";
					}

					ipsumContent += $(this).text();

					++paragraphIndex;
				});
			} else {
				ipsumContent = $('#output').html();
			}

			if (ipsumContent && (ipsumContent.length > 0)) {
				navigator.clipboard.writeText(ipsumContent);
				showOverlay();
			}
		}

	});
})(jQuery);