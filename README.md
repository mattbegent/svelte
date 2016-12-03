svelte
======================================

What is svelte?
---------------------

It is a lightweight modern JavaScript library (4.1KB minified) intended for use on projects where legacy browser support is not necessary.

It uses modern JavaScript (querySelectorAll, classList, matchesSelector) to help make it as lightweight as possible and therefore only works on the latest version of mordern browsers E.g. Chrome, Firefox, Opera, IE10+.

[![Sauce Test Status](https://saucelabs.com/browser-matrix/svelte.svg)](https://saucelabs.com/u/svelte)

Getting Started
---------------------

Simply download the minified version of svelte and reference it in your page.

	<script src="svelte.min.js"></script>

You can also install svelte using bower:

	bower install svelte	

How To
---------------------

If you have used other JavaScript libraries like Zepto or jQuery most functions will be familiar to you. For example, to set the text of an element, you would write:

	$('.hello').text('Hello svelte');

API
---------------------

* $(selector, context)
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
* one(name, callback)
* off(name, callback)
* focus()
* blur()
* trigger(eventName, detail)
* next()
* first()
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
* attr(name, (value))
* removeAttr(name)
* val((value))
* length()
* height()
* width()
* position()
* matches(selector)
* closest(selector)

Custom functions
---------------------

You can easily add a custom function to svelte by adding to $.fn.

	$.fn.cool = function() {
		return this.each(function(el) {
	    	el.textContent = 'Cool';
	    });
	}
	
	$('.says-cool').cool();	

Ajax	
---------------------

The svelte ajax function was removed in version 1.4.0. Instead it is recommended that you use the [fetch api](https://fetch.spec.whatwg.org/). There is a version of svelte bundled with a [fetch](https://github.com/github/fetch) and promises [polyfill](https://github.com/jakearchibald/es6-promise) svelte.fetch.min.js.

	fetch('/test.html')
	.then(function(response) {
		return response.text()
	}).then(function(body) {
		document.body.innerHTML = body
	})

IE9	
---------------------

If you need to support IE9, you will need to use a pollyfill for ClassList like [this one](https://github.com/remy/polyfills/blob/master/classList.js) and put it somewhere before svelte is included on the page.

	<!--[if IE 9]>
		<script src="js/classlist.js"></script>
	<![endif]-->

Get Involved
---------------------

Feel free to help make svelte better :-).
