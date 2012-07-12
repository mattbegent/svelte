;(function (window, document, undefined) {

"use strict"; 

//Main selector
var bScript = function(selector) {

	//If no selector
	if(!selector) {
		return false;
	}

	//Shall we create a bScript object? - must be a better way of doing this
	if(this === undefined || this === window){
		return new bScript(selector);
	}

	//Selector array
	this.currentSelectorArray = [];

	//Check if object - like this
	if(typeof selector  === "object") {
		this.currentSelectorArray.push(selector);
	}
	else {
		this.currentSelectorArray = Array.prototype.slice.call(document.querySelectorAll(selector));
	}

	//For debugging
	this.selectorName = selector;

	return this;
};

//The good stuff
bScript.fn = bScript.prototype = { 

	each: function(functionToLoop) {  

		//Check if there is something to loop through
		if (this.currentSelectorArray.length === 0) {  
			$.fn.debug("'" + this.selectorName + "' not currently available.");  
			return this;
		}

		//Lets do some looping
		[].forEach.call( this.currentSelectorArray, function(el) {
			functionToLoop(el);
		});

		return this; 
	},

	css: function(property, value) {  
		this.each(function(el) {
			el.style[property] = value;
		});
		return this; 
	},

	hide: function() {  
		this.each(function(el) {
			el.style.display = 'none';
		});
		return this; 
	},

	show: function() {  
		this.each(function(el) {
			el.style.display = 'block';
		});
		return this; 
	},

	addClass: function(classToAdd) {  
		this.each(function(el) {
			el.classList.add(classToAdd);
		});
		return this; 
	},

	removeClass: function(classToRemove) {  
		this.each(function(el) {
			el.classList.remove(classToRemove);
		});
		return this; 
	},

	toggleClass: function(classToToggle) {  
		this.each(function(el) {
			if(el.classList.toggle(classToToggle)) {
				return true;
			}
			else {
				return false;
			}
		});
		return this; 
	},

	hasClass: function(hasClass) { 
		//Only need to check one node?
		this.currentSelector[0].classList.contains(hasClass);
		return this; 
	},

	on: function(eventType, eventFunction) {  
		this.each(function(el) {
			el.addEventListener(eventType, eventFunction, false);
			return true;
		});
		return this; 
	},

	off: function(eventType, eventFunction) {  
		this.each(function(el) {
			el.removeEventListener(eventType, eventFunction, false);
			return true;
		});
		return this; 
	},

	next: function() {  
		this.each(function(el) {
			this.currentSelectorArray.push(el.nextElementSibling);
		});
		return this;
	},

	first: function() {  		
		this.currentSelectorArray = this.currentSelectorArray.slice(0,1);
		return this;
	},

	last: function() {  
		var arrayLength = this.currentSelectorArray.length;
		this.currentSelectorArray = this.currentSelectorArray.slice(arrayLength-1,arrayLength);
		return this;
	},

	//Make inline with jQuery sintax?
	append: function(position, html) {  
		this.each(function(el) {

			switch(position.toLowerCase()){
				case "before": return el.insertAdjacentHTML("beforebegin",html);
				case "after": return el.insertAdjacentHTML("afterend",html);
				case "atstart": return el.insertAdjacentHTML("afterbegin",html);
				case "atend": return el.insertAdjacentHTML("beforeend",html);
			}

		});
		return this; 
	},

	text: function(textToAdd) {  
		this.each(function(el) {
			el.innerText = textToAdd;
		});
		return this; 
	},

	html: function(htmlToAdd) {  
		this.each(function(el) {
			el.innerHTML = htmlToAdd;
		});
		return this; 
	},

	remove: function() { 
		this.each(function(el) {
			document.body.removeChild(el);
		});
		return this; 
	},

	setAttr: function(name, value) {  
		this.each(function(el) {
			el.setAttribute(name, value);
		});
		return this; 
	},

	getAttr: function(attributeName) {  
		this.each(function(el) {
			el.getAttribute(attributeName);
		});
		return this; 
	},

	removeAttr: function(attributeName) {  
		this.each(function(el) {
			el.removeAttribute(attributeName);
		});
		return this; 
	}

	//Not working!!!! - not needed
	// find: function(selector) {
	// 	this.each(function(el) {
	// 		//this.currentSelectorNodeList = el.querySelector(selector);
	// 	});
	// 	return this; 
	// },

	// filter: function(selector) {
	// 	this.each(function(el) {
	// 		if(!el.classList.contains(selector)) {
	// 			var index = this.currentSelectorArray.indexOf(el);
	// 			currentSelectorArray.splice(el,1)
	// 			console.log("Removed this element from the array" + this.currentSelectorArray);
	// 		}
	// 	});
	// 	return this; 
	// }

	//Simple animate using css3

};  

//Helper Functions
bScript.fn = { 

	//Ready function
	ready: function(readyFunctions){
		if(document.addEventListener){
			document.addEventListener('DOMContentLoaded',readyFunctions);
		}
		else {
			//Ie8 < not supported
			return;
		}
	},

	//Debug
	debug: function(message) {
		console.log("Debug: " + message);
	},

	//Return querystring value
	queryString: function(name) {  
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		if(results == null){
			return "";
		}
		else {
			return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
	},

	//Set Local storage
	setLocalStorage: function(storageName, storeContent){
		if(typeof window.localStorage != 'undefined'){
			try {   
				localStorage.setItem(storageName, storeContent);
			} catch (e) {
				 if (e == QUOTA_EXCEEDED_ERR) {
					console.log(e);
					return;
				}
			}
		}
		else{
			console.log("error");
			return false;
		}
	},

	//Get Local Storage
	getLocalStorage: function(storageName){
		if(typeof window.localStorage != 'undefined'){
			return localStorage.getItem(storageName);
		}
		else{
			return false;
		}
	},

	//Remove Local Storage
	removeLocalStorage: function(storageName){
		if(typeof window.localStorage != 'undefined'){
			localStorage.removeItem(storageName);
		}
		else{
			return false;
		}
	},

	//Is Number - http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
	isNumber: function(n){
		return !isNaN(parseFloat(n)) && isFinite(n);
	},

	//Ajax
	ajax: function(){
		alert("not yet:p!");
	}

};

//Expose bScript to the world:-)
window.bScript = window.$ = bScript;

}(window, document, undefined));   