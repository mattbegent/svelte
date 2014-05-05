bScript - The lightweight JavaScript framework
======================================

What is bScript?
---------------------

It is a lightweight JavaScript framework (3.55KB minified) intended for use on small projects where a large framework is not necessary.

It uses mordern javascript (querySelectorAll, forEach, classList, matchesSelector) to help make it as lightweight as possible and therefore only works on the latest version of mordern browsers E.g. Chrome, Firefox, Opera, ie10+.

Getting Started
---------------------

1) Simply download the minified version of bScript and reference it in your page.

	<script src="bScript.min.js"></script>

2) Put all of your functions inside the ready function:

	$(document).ready(function() {
	   //Insert all super cool functions here
	});

How To
---------------------

Examples of every function can be found on the test page. If you have used other JavaScript frameworks most functions will be familiar to you. For example, to add some CSS to a selector, you would write:

	$('.example-css').css("color","red");

API
---------------------

* $(selector, context)
* ready(callback)
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
* trigger(eventName)
* ajax({ url: url, data: data, type: type, success: sucess, error: error }})
* next()
* first()
* last()
* append(position, html)
* text(textToAdd)
* html(htmlToAdd)
* empty()
* clone()
* remove()
* setAttr(name, value)
* getAttr(name)
* removeAttr(name)
* length()
* height()
* width()
* matches()

Roadmap
---------------------

* Complete unit testing
* Performance testing
* Comprehensive documentation

Get Involved
---------------------

Feel free to help make bScript better :-).