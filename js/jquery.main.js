$(function () {
	'use strict';
	var $body = $('html, body'),
		$overlay = $('.loading-overlay'),
		options = {
			debug: true,

			onStart: {
				duration: 1000,
				render: function ($container) {
					$container.addClass('is-exiting');
					$overlay.fadeIn().addClass('active');
					smoothState.restartCSSAnimations();
					$body.animate({ 'scrollTop': 0 });
				}
			},
			onReady: {
				duration: 750,
				render: function ($container, $newContent) {
					$container.removeClass('is-exiting');		
					$container.html($newContent);
				}
			}, 
			onAfter: function () {
				$overlay.fadeOut().removeClass('active');						
			}
		},
		smoothState = $('#main').smoothState(options).data('smoothState');
	
	setTimeout(function(){
        $overlay.removeClass('active');
    }, 3000);
});