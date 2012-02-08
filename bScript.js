//TODO: Sort out major problems in ie7!!!!
//NOT function
//Tidy up child/parent selectors
//Try using prototype??? May not????

//http://net.tutsplus.com/tutorials/javascript-ajax/create-a-makeshift-javascript-templating-solution/
//http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/

;(function (window, document, undefined) {
var bScript = function(selector){	
	"use strict";

	var currentSelector = [];

	function getSelector(){

		//Match expressions
		var Class = /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/;
		var ID = /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/;
		var Tag = /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/;
		var Child = /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/; //Not currently used

		if(typeof selector === "object") { //Need another way to check for this in ie8 and below //selector instanceof Object
			return currentSelector = selector;
		}
		else if (Class.exec(selector)) //By class
		{
			if(selector.split(" ",2).length === 0) {
				return currentSelector = document.getElementsByClassName(selector.replace('.', ''));
			}
			else {
				modernQuerySelectorAll(selector);
			}
		} else if (ID.exec(selector)) { //By id
			if(selector.split(" ",2).length === 0) {
				return currentSelector = document.getElementById(selector.replace('#', ''));
			}
			else {
				modernQuerySelectorAll(selector);
			}	
		} else if (Tag.exec(selector)) { //By tag
			if(selector.split(" ",2).length === 0) {
				return currentSelector = document.getElementsByTagName(selector);
			}
			else {
				modernQuerySelectorAll(selector);
			}	
		} else if (Child.exec(selector)) { //Child selectors - doesn't do anything yet
			bError("Child selectors are not current supported");
		}
		else {
			//Need a good error catching function
			bError(selector + ' not found');
		}
	}

	function modernQuerySelectorAll(selector){
		if(document.querySelectorAll) {
			return currentSelector = document.querySelectorAll(selector);
		}
		else { //ie7 and below
			oldQuerySelectorAll(selector);
		}
	}

	//Query selector all browsers ie7 and below:
	//http://weblogs.asp.net/bleroy/archive/2009/08/31/queryselectorall-on-old-ie-versions-something-that-doesn-t-work.aspx
	function oldQuerySelectorAll(selector){
		var style = document.styleSheets[0] || document.createStyleSheet();	
			style.addRule(selector, "foo:bar");
			var all = document.all, resultSet = [];
			for (var i = 0, l = all.length; i < l; i++) {
				if (all[i].currentStyle.foo === "bar") {
					resultSet[resultSet.length] = all[i];
				}
			}
			style.removeRule(0);
			return currentSelector = resultSet;
	}

	//The important loop - this loops throught the array of hmtl objects
	function each(functionLoop) {
		var elements = currentSelector,
			n = elements.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var e = elements[i];
				functionLoop(e);
			}
		} //if only one element e.g. single htmlelement
		else if(typeof selector === "object") {
				functionLoop(currentSelector);
		}
		else { //Occurs when there is an empty array of elements
			//return; - Put back in for production
			bError("Element '" + selector + "' does not exist.");
		}
		return this;
	}

	//PUBLIC FOREACH FUNCTION HERE :-)

	//Remove sibling whitespaces - next to merge into one function

	function nextSiblingHelper(el) {
		do {el = el.nextSibling;} while (el && el.nodeType !== 1);
		return el;
	}

	function previousSiblingHelper(el) {
		do {el = el.previousSibling;} while (el && el.nodeType !== 1);
		return el;
	}

	//Insert Fallback - mostly for firefox - not ie!

	function fragment(html) {
		var element = document.createElement("div");
		var frag = document.createDocumentFragment();
		element.innerHTML = html;
		while(element.firstChild){
			frag.appendChild(element.firstChild);
		}	
		return frag;	
	}

	//Error function - make better

	function bError(errorMessage) {
		throw new Error("Error Bee: " + errorMessage);
	}

	//Not function -http://viralpatel.net/blogs/2010/01/javascript-array-remove-element-js-array-delete-element.html
	//Untested - probably won't work
	function notElement(elementToRemove){
		each(function (e) {
        	if(elements[i] == elementToRemove) {
            	elements.splice(i, 1);
            	return;
        	}
    	});
	}

	//The public functions

	function setCss(property, value) {
		each(function (e) {
			e.style[property] = value;
		});
		return this;
	}

	function setHide() {
		each(function (e) {
			e.style.display = "none";
		});
		return this;
	}

	function setShow() {
		each(function (e) {
			e.style.display = 'block';
		});
		return this;
	}

	function setToggle() {
		each(function (e) {
			if (e.style.display == 'block' || e.style.display == "") {
				e.style.display = 'none';
			} else {
				e.style.display = 'block';
			}
		});
		return this;
	}

	//Classes - Move to classList with fallback when support is greater
	function setAddClass(classToAdd) {
		each(function (e) {
			e.className += " " + classToAdd;
		});
		return this;
	}

	function setRemoveClass(classToRemove) {
		each(function (e) {
			var reg = new RegExp('(\\s|^)' + classToRemove + '(\\s|$)');
			e.className = e.className.replace(reg, "");
		});
		return this;
	}

	function setToggleClass(classToToggle){
		each(function (e) {
			setHasClass(classToToggle) ? setRemoveClass(classToToggle) : setAddClass(classToToggle);
		});
	}

	//Change to use each loop
	function setHasClass(matchClass) {
		// each(function (e) {
		// 	var regex = new RegExp('(?:\\s|^)' + matchClass + '(?:\\s|$)');
  //       	if(e.className.match(regex)){
  //       		return true;
  //       	}
		// });
		var elements = currentSelector,
			n = elements.length;
		for (var i = 0; i < n; i++) {
			if (elements[i].className.match(new RegExp('(\\s|^)' + matchClass + '(\\s|$)'))) {
				return true;
			}
		}
		return false;
	}

	//Manipulation
	function setText(newHtml) {
		each(function (e) {
			e.innerHTML = newHtml.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		});
		return this;
	}

	function getHtml() {
		var outputHtml = "";
		each(function (e) {
			var wrap = document.createElement(parent.tagName);
			wrap.appendChild(e.cloneNode(true));
			outputHtml = wrap.innerHTML;
		});
		return outputHtml;
	}

	function setRemove() {
		each(function (e) {
			e.parentNode.removeChild(e);
		});
		return;
	}
	
	function setSetAttr(attrName, attrValue) {
		each(function (e) {
			e.setAttribute(attrName, attrValue);
		});
		return this;
	}

	function setRemoveAttr(attrName) {
		each(function (e) {
			e.removeAttribute(attrName);
		});
		return this;
	}

	function setGetAttr(attrName) {
		var attributeValue = "";	
		each(function (e) {
			attributeValue = e.getAttribute(attrName);
		});
		return attributeValue;
	}

	//Insert
	function setInsert(pos, html) {
		each(function (e) {
			if(document.createElement('div').insertAdjacentHTML) {
				switch(pos.toLowerCase()){
					case "before": return e.insertAdjacentHTML("beforebegin",html);
					case "after": return e.insertAdjacentHTML("afterend",html);
					case "atstart": return e.insertAdjacentHTML("afterbegin",html);
					case "atend": return e.insertAdjacentHTML("beforeend",html);
				}	
			}
			else { //inserAdjacentHTML Fallback
				switch(pos.toLowerCase()){
					case "before": return e.parentNode.insertBefore(fragment(html),e);
					case "after": return e.parentNode.insertBefore(fragment(html),e.nextSibling);
					case "atstart": return e.insertBefore(fragment(html),e.firstChild);
					case "atend": return e.appendChild(fragment(html));
				}
			}
		});
	}

	//Object properties - Need more??? Position on page??

	function getHeight() {
		var height = 0;
		each(function (e) {
			height = e.offsetHeight;
		});
		return height;
	}

	function getWidth() {
		var width = 0;
		each(function (e) {
			width = e.offsetWidth;
		});
		return width;
	}

	//Tidy up selectors, check for bugs?
	//Generally they are a bit rubbish at the moment

	function getFirstChild() {
		var results = [];
		each(function (e) {
			var firstChild = e.childNodes[0];
			if(e.children.length != 0) {
				while (firstChild.nodeType!=1)
				{
					firstChild=firstChild.nextSibling;
				}
				results.push(firstChild);
			}
		});
		if(results.length > 0){
			return new bScript(results);
		}
		else {
			return this;
		}
	}  
	
	function getLastChild() {//Not working
		var results = [];
		each(function (e) {
			var lastChild = e.childNodes[e.childNodes.length - 1];
			if(e.children.length != 0) {
				while (lastChild.nodeType!=1)
				{
					lastChild=lastChild.previousSibling;
				}
				results.push(lastChild);
			}
		});
		if(results.length > 0){
			return new bScript(results);
		}
		else {
			return this;
		}
	}

	function getNthChild(childToGet) { //Ie8 problems since using strict
		var results = [];
		each(function (e) {
			var nthChild = e.childNodes[childToGet -1];
				if (e.childNodes.length != 0) {
					results.push(nthChild);
				}
		});
		if(results.length > 1){
			return new bScript(results);
		}
		else {
			return this;
		}
	}

	function getGetChildren() {
		var results = [];
		each(function (e) {
			var childrenToSelect = e.childNodes;
			var numberOfChildren = childrenToSelect.length;
			if (numberOfChildren > 0) {     
				for (var i = 0; i < numberOfChildren; i++) {
					var singleChild = childrenToSelect[i];
					if(singleChild.nodeType === 1){
						results.push(singleChild);
					}
				}      
			}
		});
		if(results.length > 1){
			return new bScript(results);
		}
		else {
			return this;
		}
	}

	function getGetParent() {  
		var hasParent = false;
		var results = [];
		each(function(e) {
			if(e.parentNode != undefined){
				var parentElement= e.parentNode;        
				results.push(parentElement);       
				hasParent = true;
			}
		});  
		if(hasParent === true){    
			return new bScript(results);
		}
	}

	function getNext(){
		var hasNextSibling = false;
		var results = [];
		var nextSiblingName;
		each(function(e) {
			nextSiblingName = nextSiblingHelper(e);
			if(nextSiblingName != undefined){
				hasNextSibling = true;
				results.push(nextSiblingName);
			}
		});
		if(hasNextSibling === true){    
			return new bScript(results);
		}
		return this;
	}

	function getPrevious() {
		var hasPreviousSibling = false;
		var results = [];
		var previousSiblingName;
		each(function(e) {
			previousSiblingName = previousSiblingHelper(e);
			if(previousSiblingName != undefined){
				hasPreviousSibling = true;
				results.push(previousSiblingName);
			}
		});
		if(hasPreviousSibling === true){    
			return new bScript(previousSiblingName);
		}
		return this;
	}

	//Events
	//READ - http://dean.edwards.name/my/events.js
	function setEventType(eventType, eventFunction) {
		each(function (e) {
			if (e.addEventListener) {	
				e.addEventListener(eventType, eventFunction, false);

			} else if (e.attachEvent) { //Below ie9 - need to maintain the this keyword - http://particletree.com/files/designersguide/AddEventHistory.pdf
				e["e"+eventType+eventFunction] = eventFunction;
				e[eventType+eventFunction] = function() { e["e"+eventType+eventFunction]( window.event ); }
				e.attachEvent( "on"+eventType, e[eventType+eventFunction] );
			}
		});
		return this;
	}

	function setHover(inFunction, outFunction) {
		setEventType("mouseover",inFunction);
		setEventType("mouseout",outFunction);
		return this;
	}

	function setClick(eventFunction) {
		setEventType("click",eventFunction);
		return this;
	}

	//Simple animate css function
	//Needs to improve for ie7 - a bit dodge
	//Do a slide animation using height
	function setFade(fadeType, time, onComplete){
		if(!time) {
			time = 500;
		}
		var ease = Math.sqrt;
		var start = (new Date()).getTime();	

		each(function (e) {
			animate();

			function animate(){
				var elapsed = (new Date()).getTime()-start;
				var fraction = elapsed/time;
				var opacity = 0;
				if(fraction < 1) {
					if(e.style.opacity != undefined){
						if(fadeType === "in"){
							opacity = 0 + ease(fraction);
						}
						else {
							opacity = 1 - ease(fraction);
						}	
						e.style.opacity = String(opacity);
						setTimeout(animate, Math.min(25, time-elapsed));
					}
					else { //ie opacity fallback
						if(fadeType === "in"){
							opacity = (0 + ease(fraction)) * 100;
						}
						else {
							opacity = (1 - ease(fraction)) * 100;
						}	
						//Has layout
						e.style.zoom = 1;
						e.style.filter = "alpha(opacity=" + String(opacity) + ")";
						setTimeout(animate, Math.min(25, time-elapsed));
					}	
				}
				else {
					if(e.style.opacity != undefined){
						if(fadeType === "in"){
							e.style.opacity = "1";
						}
						else {
							e.style.opacity = "0";
						}
					} else { //ie opacity fallback
						if(fadeType === "in"){
							e.style.filter = "alpha(opacity=100)";
						}
						else {
							e.style.filter = "alpha(opacity=0)";
						}
					}	
					if(onComplete) {
						onComplete(e);
					}
				}

			}
		});
		return this;
	}

	function setFadeIn(time, onComplete) {
		setFade("in", time, onComplete);
	}

	function setFadeOut(time, onComplete) {
		setFade("out", time, onComplete);
	}

	//NOT CURRENTLY WORKING

	function setSlide(slideType, time, onComplete){
		if(!time) {
			time = 500;
		}
		var ease = Math.sqrt;
		var start = (new Date()).getTime();	

		each(function (e) {
			animate();

			function animate(){
				var elapsed = (new Date()).getTime()-start;
				var fraction = elapsed/time;
				var elementHeight = e.offsetHeight;
				console.log(elementHeight);
				var height = 0;
				if(fraction < 1) {
						if(slideType === "up"){
							height = elementHeight - ease(fraction);
						}
						//else {
						//	opacity = 1 - ease(fraction);
						//}	
						e.style.height = String(height);
						setTimeout(animate, Math.min(25, time-elapsed));
				}
				else {
					if(slideType === "up"){
						e.style.height = "0px";
					}
					//else {
					//	e.style.opacity = "0";
					//}
					if(onComplete) {
						onComplete(e);
					}
				}

			}
		});
		return this;
	}

	function setSlideUp(time, onComplete) {
		setSlide("up", time, onComplete);
	}

	function doShake(time, onComplete, distance) {
		if(!time) {
			time = 500;
		}
		if(!distance) {
			distance = 5;
		}

		each(function (e) {
			var orginalStyle = e.style.cssText;
			e.style.position = "relative";
			var start = (new Date().getTime());
			animate();
			function animate() {
				var now = (new Date().getTime());
				var elapsed = now-start;
				var fraction = elapsed/time;

				if(fraction < 1){
					var x = distance * Math.sin(fraction*4*Math.PI);
					e.style.left = x + "px";
					setTimeout(animate, Math.min(25,time-elapsed));
				} 
				else {
					e.style.cssText = orginalStyle;
					if(onComplete) {
						onComplete(e);
					}
				}
			}	
		});
		return this;
	}

	//Only run if new object - is this happening?
	getSelector();

	//Public methods
	return {
		css: setCss,
		hide: setHide,
		show: setShow,
		toggle: setToggle,
		addClass: setAddClass,
		removeClass: setRemoveClass,
		hasClass: setHasClass,
		toggleClass: setToggleClass,
		text: setText,
		html: getHtml,
		remove: setRemove,
		setAttr: setSetAttr,
		removeAttr: setRemoveAttr,
		getAttr: setGetAttr,
		insert: setInsert,
		height: getHeight,
		width: getWidth,
		firstChild: getFirstChild,
		lastChild: getLastChild,
		nthChild: getNthChild,
		children: getGetChildren,
		parent: getGetParent,
		next: getNext,
		previous: getPrevious,
		eventType: setEventType,
		hover: setHover,
		click: setClick,
		fadeIn: setFadeIn,
		fadeOut: setFadeOut,
		slideUp: setSlideUp,
		shake: doShake
	};

};

//DOMLOADED FUNCTION
//Check out: http://dustindiaz.com/smallest-domready-ever
//http://net.tutsplus.com/tutorials/javascript-ajax/from-jquery-to-javascript-a-reference/
var DomLoaded = {
	onload: [],
	isReady: false,
	loaded: function () {
		if (arguments.callee.done) {
			return;
		}
		arguments.callee.done = true;
		isReady = true;
		for (i = 0; i < DomLoaded.onload.length; i++) {
			DomLoaded.onload[i]();
		}
	},
	load: function (fireThis) {
		this.onload.push(fireThis);
		if (/complete|interactive/.test(document.readyState)) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout(DomLoaded.loaded, 1);
		}

		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", DomLoaded.loaded, false);
			//Fallback
			window.addEventListener("load", DomLoaded.loaded, false);
		}
		// If IE event model is used
		else if (document.attachEvent) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent("onreadystatechange", DomLoaded.loaded);

			// A fallback to window.onload, that will always work
			window.attachEvent("onload", DomLoaded.loaded);

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch (e) {}

			if (document.documentElement.doScroll && toplevel) {
				DomLoaded.doScrollCheck;
			}
		}
	},
	// The DOM ready check for Internet Explorer
	doScrollCheck: function () {
		if (isReady) {
			return;
		}
		try {
			// If IE is used, use the trick by Diego Perini
			// http://javascript.nwbox.com/IEContentLoaded/
			document.documentElement.doScroll("left");
		} catch (e) {
			setTimeout(DomLoaded.doScrollCheck, 1);
			return;
		}

		// and execute any waiting functions
		DomLoaded.loaded;
	}

};

//LITTLE HELPERS

var helperB = (function(){
	"use strict";
    function setStorage(itemName, itemValue){
		if (typeof window.sessionStorage === 'undefined') {
			return;
		} else {
			try {           
				sessionStorage.setItem(itemName, itemValue);
			} catch (e) {
				 throw new Error(e);
			}
		}
	}

	function getStorage(itemToGet) {
		if(typeof window.sessionStorage !== 'undefined' && sessionStorage.getItem(itemToGet) !== null) {         
			return sessionStorage.getItem(itemToGet);
		}
		else {
			return false;
		}
	} 

	function setDelay(functionToDelay, delayTime){
		if(!delayTime){
			delayTime = 5000;
		}
		setTimeout(function(){
			functionToDelay;
		},delayTime);
	}

    return {
        setStorage: setStorage,
        getStorage: getStorage,
        delay: setDelay
    };

}());

//Expose bScript to the world:-)
window.bScript = window.$ = bScript;

//Expose DomLoaded to the world:-)
window.DomLoaded = DomLoaded;

//Expose helperB to the world:-)
window.helperB = helperB;

}(window, document, undefined));

//Currently non core helpers
//TODO: Put these functions into a helper.
//xml - works on server, needs to be turned into a nice function
function xmlRequest(url, xmlFunction) {
	"use strict";
	http_request = false;

	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	http_request.onreadystatechange = xmlFunction;
	http_request.open('GET', url, true);
	http_request.send(null);
	return http_request;
}

//Storage
     