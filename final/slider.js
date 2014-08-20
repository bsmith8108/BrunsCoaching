var Slider = (function() {
	
	var $container = $( '#ps-container' ),
		$contentwrapper = $container.children( 'div.ps-contentwrapper' ),
		// the items (description elements for the slides/products)
		$items = $contentwrapper.children( 'div.ps-content' ),
		itemsCount = $items.length,
		$slidewrapper = $container.children( 'div.ps-slidewrapper' ),
		// the slides (product images)
		$slidescontainer = $slidewrapper.find( 'div.ps-slides' ),
		$slides = $slidescontainer.children( 'div' ),
		// navigation arrows
		$navhome = $slidewrapper.find( 'nav > a#home' ),
		$navcoaching = $slidewrapper.find( 'nav > a#coaching' ),
		$navabout = $slidewrapper.find( 'nav > a#about' ),
		$navfaq = $slidewrapper.find( 'nav > a#faq' ),
		$navtestimonials = $slidewrapper.find( 'nav > a#testimonials' ),
		$navcontact = $slidewrapper.find( 'nav > a#contact' ),
		// current index for items and slides
		current = 0,
		// checks if the transition is in progress
		isAnimating = false,
		// support for CSS transitions
		support = Modernizr.csstransitions,
		// transition end event
		// https://github.com/twitter/bootstrap/issues/2870
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// its name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],

		init = function() {

			// show first item
			var $currentItem = $items.eq( current ),
				$currentSlide = $slides.eq( current ),
				initCSS = {
					top : 0,
					zIndex : 999
				};

			$currentItem.css( initCSS );
			$currentSlide.css( initCSS );
			initEvents();

		},
		initEvents = function() {
			$navhome.on( 'click', function( event ) {
				if( !isAnimating ) {
					slide( 'home' );
				}
				return false;
			} );
			$navabout.on( 'click', function( event ) {
				if( !isAnimating ) {
					slide( 'about' );
				}
				return false;
			} );
			$navcoaching.on( 'click', function( event ) {
				if( !isAnimating ) {
					slide( 'coaching' );
				}
				return false;
			} );
			$navfaq.on( 'click', function( event ) {
				if( !isAnimating ) {
					slide( 'faq' );
				}
				return false;
			} );
			$navtestimonials.on( 'click', function( event ) {
				if( !isAnimating ) {
					slide( 'testimonials' );
				}
				return false;
			} );
			$navcontact.on( 'click', function( event ) {
				if( !isAnimating ) {
					slide( 'contact' );
				}
				return false;
			} );
			// transition end event
			$items.on( transEndEventName, removeTransition );
			$slides.on( transEndEventName, removeTransition );
			
		},
		removeTransition = function() {
			isAnimating = false;
			$(this).removeClass('ps-move');
		},
		
		slide = function( dir ) {
			isAnimating = true;
			var $currentItem = $items.eq( current ),
				$currentSlide = $slides.eq( current );

			// update current value
			if( dir === 'home' ) {
				current = 0;
			}
			else if( dir === 'about' ) {
				current = 2;
			}
			else if( dir === 'coaching' ) {
				current = 1;
			}
			else if( dir === 'faq' ) {
				current = 3;
			}
			else if( dir === 'testimonials' ) {
				current = 4;
			}
			else if( dir === 'contact' ) {
				current = 5;
			}
				// new item that will be shown
			var $newItem = $items.eq( current ),
				// new slide that will be shown
				$newSlide = $slides.eq( current );

			// position the new item up or down the viewport depending on the direction
			$newItem.css( {
				top : ( dir === 'next' ) ? '-100%' : '100%',
				zIndex : 999
			} );
			
			$newSlide.css( {
				top : ( dir === 'next' ) ? '100%' : '-100%',
				zIndex : 999
			} );

			setTimeout( function() {
				// move the current item and slide to the top or bottom depending on the direction 
				$currentItem.addClass( 'ps-move' ).css( {
					top : ( dir === 'next' ) ? '100%' : '-100%',
					zIndex : 1
				} );

				$currentSlide.addClass( 'ps-move' ).css( {
					top : ( dir === 'next' ) ? '-100%' : '100%',
					zIndex : 1
				} );

				// move the new ones to the main viewport
				$newItem.addClass( 'ps-move' ).css( 'top', 0 );
				$newSlide.addClass( 'ps-move' ).css( 'top', 0 );

				// if no CSS transitions set the isAnimating flag to false
				if( !support ) {
					isAnimating = false;
				}

			}, 0 );

		};

	return { init : init };

})();
