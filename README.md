bScript - The lightweight js framework
======================================

What is bScript?
---------------------

It is a lightweight JavaScript framework (3.2KB minified) intended for use on small projects where a large framework is not necessary.

It uses mordern javascript (querySelectorAll, forEach, classList) to help make it as lightweight as possible and therefore only works on the latest version of mordern browsers E.g. Chrome, Firefox, Opera, ie9+.

Getting Started
---------------------

1) Simply download the minified version of bScript and reference it in your page.

	<script src="bScript.min.js"></script>

2) Put all of your functions inside the DomLoaded function:

	$.fn.ready(function() {
	//Insert all super cool functions here
	});

How To
---------------------

Examples of every function can be found on the test page. If you have used other JavaScript frameworks most functions will be familiar to you. For example, to add some css to a selector, you would write:

	$('.example-css').css("color","red");

Get Involved
---------------------

Feel free to help make bScript better :-).