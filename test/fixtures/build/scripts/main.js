/*!
 * @preserve Generated by nwayo 3.3.5 for PROJECT_NAME:site
 */

 (function(global, undefined) { 
	//-------------------------------------
	//-- Collection starter kit
	//-------------------------------------
	//-------------------------------------
	//-- Exclusion starter kit
	//-------------------------------------
	
	/* eslint-disable no-unused-vars */
	var define = undefined;
	var require = undefined;
	
	
	/* eslint-disable strict, no-unused-vars, no-redeclare, prefer-destructuring */
	var PROJECT = global.nwayo.project;
	var app = global[PROJECT];
	var konstan = app.konstan;
	
	var DOM_PARSE = global.nwayo.promises.DOMParse;
	var DOCUMENT_LOAD = global.nwayo.promises.documentLoad;
	var GLOBAL_JQUERY_LOAD = global.nwayo.promises.globalJQueryLoad;
	
	var __ = global.nwayo.shortcuts;
	
	var jQuery = global.nwayo.vendor.jQuery;
	var $ = global.nwayo.vendor.jQuery;
	var _ = global.nwayo.vendor.lodash;
	var Modernizr = global.nwayo.vendor.Modernizr;
	var PubSub = global.nwayo.vendor.PubSub;

//-------------------------------------
//-- Common
//-------------------------------------
function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} //-------------------------------------
//-- Common - Util
//-------------------------------------

(function () {
	'use strict';

	//-- Public class
	app.util = function () {function _class() {_classCallCheck(this, _class);}return _class;}();











































































})();

//-------------------------------------
//-- Common - Base
//-------------------------------------

//= **require bower_components/kafe/dist/kafe
//= **require bower_components/nwayo-toolbox/toolbox/scripts/wrapper/jsrender
//= **require bower_components/nwayo-toolbox/toolbox/scripts/helpers/lazyload

(function () {
	'use strict';

	var local = {};


	//-- Cache data instantly
	local.cache = function () {

		// tmpl
		/**
  $.views.helpers({
  	konstan:   (key) => { return _.get(konstan, key); },
  	translate: (key) => { return app.translation[key]; }
  });
  /**/

		// app.lazyload.register({
		// 	'image': {
		// 		firstPass: ($this, options) => {
		// 			$this.attr('src', options.url);
		// 		}
		// 	},
		//
		// 	'bg-image': {
		// 		firstPass: ($this, options) => {
		// 			$this.css('background-image', `url('${options.url}')`);
		// 		}
		// 	},
		//
		// 	'SAMPLE': {
		// 		preprocess: ($this/* , options */) => {
		// 			setTimeout(() => { $this.addClass('placeholder'); }, 1000);
		// 		},
		// 		firstPass: ($this, options) => {
		// 			if (options.url) {
		// 				$this.find(`${__.component('main-image')} > img`).attr('src', options.url);
		// 			}
		// 		},
		// 		secondPass: ($this, options) => {
		// 			if (options.hoverUrl && !Modernizr.touchevents) {
		// 				const $hover = $this.find(__.component('main-image'));
		// 				$hover.css('background-image', `url('${options.hoverUrl}')`);
		//
		// 				$hover.imagesLoaded({ background:true })
		// 					.then(() => {
		// 						$hover.addClass('hover');
		// 					})
		// 				;
		// 			}
		// 		}
		// 	}
		// });


		// Optional scroll
		app.scrollTransition = Modernizr.touchevents ? 0 : konstan.transition.animation;

	};


	//-- Cache data once DOM is loaded
	local.cacheDOM = function () {

		/**
                               // translation
                               app.translation = {};
                               $('[data-translation]').each(function() {
                               	$.extend(app.translation, $(this).data('translation'));
                               });
                               /**/


		/** lodash: camelCase
                                    // tmpl
                                    $('script[type="text/x-jsrender"][id^="jshtml-"]').each(function() {
                                    	const id = $(this).attr('id');
                                    	app.tmpl[`html${_.upperFirst(_.camelCase(id.substring(7)))}`] = $.templates(`#${id}`);
                                    });
                                    /**/

	};


	//-- Bind events once DOM is loaded
	local.bind = function () {

		FastClick.attach(document.body);

		__.$body

		// External links
		.on('click', 'a[data-external]', function () {
			$(this).attr('target', '_blank');
		})


		/**
     // Open links in top window
     .on('click', __.action('open-top'), function() {
     	$(this).attr('target', '_top');
     })
     /**/


		/**
          // Anchors
          .on('click', 'a[data-anchor="true"]', function(e) {
          	e.preventDefault();
          	$.scrollTo($(this).attr('href'), app.scrollTransition, {offset:{top:-15}});
          })
          /**/


		/**
               // Simple toggler
               .on('click', `${__.component('toggle-wrapper')} ${__.action('toggle-content')}`, function() {
               	$(this).closest(__.component('toggle-wrapper')).toggleClass('opened');
               })
               /**/;


	};


	//-- Subscribe to topics
	local.subscribe = function () {

		// When global jQuery is ready
		/**
  $.when(GLOBAL_JQUERY_LOAD).then(($Global) => {
  	$Global().on('click');
  });
  /**/

	};


	//-- Execute once DOM is loaded
	local.start = function () {

		__.$document.foundation();

		/**
                             // Webfont loader
                             WebFont.load({
                             	custom:       { families: ['FontName1','FontName2','FontName3'] },
                             	loading:      () => { __.$body.trigger('WebFont:loading'); },
                             	active:       () => { __.$body.trigger('WebFont:active'); },
                             	inactive:     () => { __.$body.trigger('WebFont:inactive'); },
                             	fontloading:  (familyName, fvd) => { __.$body.trigger('WebFont:loading_font'); },
                             	fontactive:   (familyName, fvd) => { __.$body.trigger('WebFont:active_font'); },
                             	fontinactive: (familyName, fvd) => { __.$body.trigger('WebFont:inactive_font'); }
                             });
                             		// Fonts loaded
                             __.$body.on('WebFont:active', () => {
                             	});
                             /**/





	};


	//-- Execute once page is loaded
	local.delayedStart = function () {

		__.$body.addClass('document-loaded');

		/**
                                        // Equalizer
                                        kafe.ext.foundation.equalizer({
                                        	wrapper: __.$component('element-list'),
                                        	item:    __.$component('element-list-item'),
                                        	rows:    {
                                        		small:  2,
                                        		medium: 3,
                                        		large:  4
                                        	}
                                        });
                                        /**/

	};






	// Outline
	local.cache();
	local.subscribe();

	// DOM Ready
	$.when(DOM_PARSE).then(function () {
		local.cacheDOM();
		local.bind();
		local.start();
	});

	// Document loaded
	$.when(DOCUMENT_LOAD).then(function () {
		local.delayedStart();
	});

})();


//-------------------------------------
//-- Form
//-------------------------------------
//-------------------------------------
//-- Form - Base
//-------------------------------------

//= **require bower_components/jquery.inputmask/dist/inputmask/inputmask
//= **require bower_components/jquery.inputmask/dist/inputmask/inputmask.extensions
//= **require bower_components/jquery.inputmask/dist/inputmask/inputmask.date.extensions
//= **require bower_components/jquery.inputmask/dist/inputmask/inputmask.extensions
//= **require bower_components/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions
//= **require bower_components/jquery.inputmask/dist/inputmask/jquery.inputmask

(function () {
	'use strict';

	var local = {};

	//-- Input mask
	var bindInputMask = function bindInputMask() /* $context = __.$body */{

		/**
                                                                        // Numeric
                                                                        $context.find('input[data-mask="numeric-integer"]').inputmask('integer', {
                                                                        	allowPlus:     false,
                                                                        	allowMinus:    false,
                                                                        	min:           1,
                                                                        	integerDigits: 3
                                                                        });
                                                                        	$context.find('input[data-mask="numeric-integer-nomin"]').inputmask('integer', {
                                                                        	allowPlus:     false,
                                                                        	allowMinus:    false,
                                                                        	integerDigits: 3
                                                                        });
                                                                        	$context.find('input[data-mask="numeric-decimal"]').inputmask('decimal', {
                                                                        	allowPlus:     false,
                                                                        	allowMinus:    false,
                                                                        	min:           1,
                                                                        	integerDigits: 5,
                                                                        	digits:        2
                                                                        });
                                                                        	// Phone
                                                                        $context.find('input[type="tel"]').inputmask('(999) 999-9999');
                                                                        $context.find('input[type="tel"][data-mask="ext"]').inputmask('(999) 999-9999 [ext: 99999]');
                                                                        	// Postal code
                                                                        $context.find('input[data-mask="postalcode"]').inputmask('A9A 9A9');
                                                                        	// Date
                                                                        if (!Modernizr.inputtypes.date) {
                                                                        	$context.find('input[type="date"]').inputmask('yyyy-mm-dd', { placeholder:app.env.lang === 'fr' ? 'aaaa-mm-jj' : 'yyyy-mm-dd' });
                                                                        }
                                                                        	// Time
                                                                        $('input[data-mask="time"]').inputmask('hh:mm:ss');
                                                                        	// Credit card
                                                                        $('input[data-mask="credit-card"]').inputmask('9{10}');
                                                                        $('input[data-mask="credit-card-cvv"]').inputmask('9{4}');
                                                                        	/**/








	};


	//-- Numeric keyboard
	var bindNumericKeyboard = function bindNumericKeyboard() /* $context = __.$body */{

		/**
                                                                                    $context.find(`
                                                                                    	input[data-mask="numeric-integer"],
                                                                                    	input[data-mask="numeric-integer-nomin"],
                                                                                    	input[data-mask="credit-card"],
                                                                                    	input[data-mask="credit-card-cvv"]
                                                                                    `)
                                                                                    .attr('pattern', '\\d*');
                                                                                    /**/
	};


	//-- Form events
	var rebindFormEvent = function rebindFormEvent($context) {
		bindInputMask($context);
		bindNumericKeyboard($context);

		PubSub.publish(PROJECT + '.form.rebindFormEvent');
	};




	//-- Cache data instantly
	local.cache = function () {

		//

	};


	//-- Cache data once DOM is loaded
	local.cacheDOM = function () {

		//

	};


	//-- Bind events once DOM is loaded
	local.bind = function () {

		rebindFormEvent();

		/*
                     // Bind on text field change
                     $('input:text').on('input paste cut keyup', () => {});
                     /**/

	};


	//-- Subscribe to topics
	local.subscribe = function () {

		PubSub.subscribe('SAMPLE', function (msg, data) {
			rebindFormEvent(data.$context);
		});

	};


	//-- Execute once DOM is loaded
	local.start = function () {

		//

	};


	//-- Execute once page is loaded
	local.delayedStart = function () {

		//

	};






	// Outline
	local.cache();
	local.subscribe();

	// DOM Ready
	$.when(DOM_PARSE).then(function () {
		local.cacheDOM();
		local.bind();
		local.start();
	});

	// Document loaded
	$.when(DOCUMENT_LOAD).then(function () {
		local.delayedStart();
	});

})();


//-------------------------------------
//-- Site
//-------------------------------------
//-------------------------------------
//-- Site - Base
//-------------------------------------

(function () {
	'use strict';

	var local = {};


	//-- Cache data instantly
	local.cache = function () {

		// Env
		// app.env.isUniquePage = app.env.pageId === 'UID';
		// app.env.isTypePage   = _.includes(app.env.pageTags, 'TYPE-ID');
		// app.env.isOneOfThese = !!_.intersection(app.env.pageTags, ['ID1', 'ID2']).length;

	};


	//-- Cache data once DOM is loaded
	local.cacheDOM = function () {

		//

	};


	//-- Bind events once DOM is loaded
	local.bind = function () {

		//

	};


	//-- Subscribe to topics
	local.subscribe = function () {

		// PubSub.subscribe('foo.bar',  () => {});

		// Bind on the global jQuery elements
		// PubSub.subscribe('nwayo.jQueryGlobal.ready', (msg, $Global) => {
		// 	$Global('[data-block="minicart"]').dropdownDialog('close');
		// });

	};


	//-- Execute once DOM is loaded
	local.start = function () {

		//

	};


	//-- Execute once page is loaded
	local.delayedStart = function () {

		//

	};






	// Outline
	local.cache();
	local.subscribe();

	// DOM Ready
	$.when(DOM_PARSE).then(function () {
		local.cacheDOM();
		local.bind();
		local.start();
	});

	// Document loaded
	$.when(DOCUMENT_LOAD).then(function () {
		local.delayedStart();
	});

})();


 })(typeof window !== 'undefined' ? window : this);
