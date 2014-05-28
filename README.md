svelte - A lightweight modern JavaScript library
======================================

What is svelte?
---------------------

It is a lightweight modern JavaScript library (4.33KB minified) intended for use on projects where legacy browser support is not necessary.

It uses mordern JavaScript (querySelectorAll, forEach, classList, matchesSelector) to help make it as lightweight as possible and therefore only works on the latest version of mordern browsers E.g. Chrome, Firefox, Opera, IE9+.

Getting Started
---------------------

1) Simply download the minified version of svelte and reference it in your page.

	<script src="svelte.min.js"></script>

2) Put all of your functions inside the domready function:

	domready(function() {
	   //Insert all super cool functions here
	});

How To
---------------------

Examples of every function can be found on the test page. If you have used other JavaScript like Zepto or jQuery most functions will be familiar to you. For example, to set the text of an element, you would write:

	$('.hello').text("Hello svelte");

API
---------------------

* $(selector, context)
* domready(callback)
* each(callback)
* css(property, value)
* hide()
* show()
* toggle()
* addClass(className)
* removeClass(className)
* toggleClass(className)
* hasClass(className)
* on(name, callback)
* off(name, callback)
* trigger(eventName, detail)
* ajax({ url: url, data: data, type: type, cache: true, success: sucess, error: error }})
* next()
* first(selector)
* last()
* parent()
* children()
* append(position, html)
* text(textToAdd)
* html(html)
* outerHTML(html)
* empty()
* clone()
* remove()
* setAttr(name, value)
* getAttr(name)
* removeAttr(name)
* val()
* length()
* height()
* width()
* position()
* matches(selector)

Custom functions
---------------------

You can easily add a custom function to svelte by adding to $.fn.

	$.fn.cool = function() {
		return this.each(function(el) {
	    	el.textContent = 'Cool';
	    });
	}
	
	$('.says-cool').cool();

Roadmap
---------------------

* Complete unit testing
* Performance testing
* Comprehensive documentation

Get Involved
---------------------

Feel free to help make svelte better :-).