$(function () {

	var $body = $('html, body'),
		$overlay = $('.loading-overlay'),
		options = {
			debug: true,
			forms: '.smoothstate-form',
			onStart: {
				duration: 600,
				render: function ($container) {
					$container.addClass('is-exiting');
					$overlay.fadeIn().addClass('active');
					smoothState.restartCSSAnimations();
					$body.animate({ 'scrollTop': 0 });
				}
			},
			onReady: {
				duration: 400,
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
    }, 1000);

	$(document).ready(function() {
		$('pre > code').each(function(i, block) {
    		hljs.highlightBlock(block);
  		});
	});
});