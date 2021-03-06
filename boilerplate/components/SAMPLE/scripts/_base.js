//-------------------------------------
//-- SAMPLE - Base
//-------------------------------------

//= **require     bower_components/foobar
//= **require     components/nwayo/scripts/wrapper-foobar
//= **jshtml      components/SAMPLE/templates/foobar
//= **jshtml_tree components/SAMPLE/templates

(() => {
	'use strict';

	const local = {};


	//-- Cache data instantly
	local.cache = () => {

		/* ... */

	};


	//-- Cache data once DOM is loaded
	local.cacheDOM = () => {

		/* ... */

	};


	//-- Bind events once DOM is loaded
	local.bind = () => {

		/* ... */

	};


	//-- Subscribe to topics
	local.subscribe = () => {

		/* ... */

	};


	//-- Execute once DOM is loaded
	local.start = () => {

		/* ... */

	};


	//-- Execute once page is loaded
	local.delayedStart = () => {

		/* ... */

	};




	// Outline
	local.cache();
	local.subscribe();

	// DOM Ready
	pinki.vow.when(DOM_PARSED).then(() => {
		local.cacheDOM();
		local.bind();
		local.start();
	});

	// Document loaded
	pinki.vow.when(DOCUMENT_LOADED).then(() => {
		local.delayedStart();
	});

})();
