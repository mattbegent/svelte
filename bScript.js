;(function (window, document, undefined) {
//TODO: Sort out this keyword inside events in ie7	
//TODO: NOT function
//TODO: Tidy up child/parent selectors a lot
//TODO: Make speedier	
//TODO: Child selectors in getSelector function
//TODO: Public foreach function
//TODO: Slide animation
//TODO: Ajax requests
//TODO: Helper module - e.g. local storage?
var bScript = function(selector){	
	"use strict";

	var currentSelector = "";

	//PRIVATE FUNCTIONS

	function getSelector(){

		if(typeof selector === "object") { //If already an object
			return currentSelector = selector;
		}
		else { //Query selector
			modernQuerySelectorAll(selector);
		}
	}

	function modernQuerySelectorAll(selector){
		try {
			if(document.querySelectorAll) {
				return currentSelector = document.querySelectorAll.call(document, selector);
			}
			else { //ie7 and below
				oldQuerySelectorAll(selector);
			}
		}
		catch(e){
			//bError(selector + ' not found');
			return;	
		}
	}

	//Query selector all browsers ie7 and below:
	//Source: http://weblogs.asp.net/bleroy/archive/2009/08/31/queryselectorall-on-old-ie-versions-something-that-doesn-t-work.aspx
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

	//The important loop - this loops through the html elements
	function each(functionLoop) {
		var elements = currentSelector,
			n = elements.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var e = elements[i];
				functionLoop(e);
			}
		} //if only one element e.g. single html element
		else if(typeof selector === "object") {
				functionLoop(currentSelector);
		}
		else { //Occurs when there is an empty array of elements
			return;
			//bError("Element '" + selector + "' does not exist.");
		}
		return this;
	}

	//Remove sibling whitespaces - merge into one function
	function nextSiblingHelper(e) {
		do {e = e.nextSibling;} while (e && e.nodeType !== 1);
		return e;
	}

	function previousSiblingHelper(e) {
		do {e = e.previousSibling;} while (e && e.nodeType !== 1);
		return e;
	}

	//Insert Fallback - mostly for old versions of firefox - not ie!
	function fragment(html) {
		var element = document.createElement("div");
		var frag = document.createDocumentFragment();
		element.innerHTML = html;
		while(element.firstChild){
			frag.appendChild(element.firstChild);
		}	
		return frag;	
	}

	//Check if funciton - not currenly used
	function isFunction(functionToCheck) {
	 	var getType = {};
	 	return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
	}

	//Error function - make better
	function bError(errorMessage) {
		throw new Error("Error Bee: " + errorMessage);
	}

	//PUBLIC FUNCTIONS

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

	//Classes - Move to classList with fallback when support is greater?
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
		//Make this function neater
		var hasInnerText =(document.getElementsByTagName("body")[0].innerText !== undefined) ? true : false;
		each(function (e) {
			if(hasInnerText){
				e.innerText  = newHtml;
			}
			else { //Firefox
				e.textContent = newHtml;
			}
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

	function getGetAttr(attrName) {
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

	//Object properties - Add more?

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

	//Selectors

	function getFirstChild() {
		var results = [];
		each(function (e) {
			var firstChild = e.childNodes[0];
			if(e.children.length !== 0) {
				while (firstChild.nodeType !== 1)
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
	
	function getLastChild() {//Not working?
		var results = [];
		each(function (e) {
			var lastChild = e.childNodes[e.childNodes.length - 1];
			if(e.children.length !== 0) {
				while (lastChild.nodeType !== 1)
				{
					lastChild = lastChild.previousSibling;
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
			var nthChild = e.childNodes[childToGet];
			if (e.childNodes.length !== 0) {
				while (nthChild.nodeType !== 1)
				{
					nthChild = nthChild.nextSibling;
				}
				results.push(nthChild);
			}
		});
		if(results.length > 0){
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
		if(results.length > 0){
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
	function setEventType(eventType, eventFunction) {
		each(function (e) {
			if (e.addEventListener) {	
				e.addEventListener(eventType, eventFunction, false);
				return true;

			} else if (e.attachEvent) { //Below ie9 - need to maintain the this keyword - http://particletree.com/files/designersguide/AddEventHistory.pdf
				e["e"+eventType+eventFunction] = eventFunction;
				e[eventType+eventFunction] = function() { e["e"+eventType+eventFunction]( window.event ); }
				var r = e.attachEvent( "on"+eventType, e[eventType+eventFunction] );
				return r;
			}
		});
		//return;
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
					if(onComplete && typeof onComplete === "function") {
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

	function setShake(time, onComplete, distance) {
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
					if(onComplete && typeof onComplete === "function") {
						onComplete(e);
					}
				}
			}	
		});
		return this;
	}

	//Init function
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
		getAttr: getGetAttr,
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
		shake: setShake
	};

};

//DOMLOADED FUNCTION
//Inspiration from jQuery
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
			// Diego Perini trick - http://javascript.nwbox.com/IEContentLoaded/
			document.documentElement.doScroll("left");
		} catch (e) {
			setTimeout(DomLoaded.doScrollCheck, 1);
			return;
		}
		DomLoaded.loaded;
	}
};

//Expose bScript to the world:-)
window.bScript = window.$ = bScript;

//Expose DomLoaded to the world:-)
window.DomLoaded = DomLoaded;

}(window, document, undefined));   