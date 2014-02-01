;(function (window, document) {

'use strict'; 

//Main selector
var bScript = function(selector) {

    //If no selector
    if(!selector) {
        return false;
    }

    //Shall we create a bScript object
    if(!(this instanceof bScript)) {
        return new bScript(selector);
    }

    //Selector array
    this.currentSelector = [];

    //Check if object
    if(typeof selector  === 'object') {
        this.currentSelector.push(selector);
    }
    else { // Turn nodelist into an array
        this.currentSelector = Array.prototype.slice.call(document.querySelectorAll(selector));
    }
    
    return this;
};

//The good stuff
bScript.prototype = { 

    ready: function(callback){
        document.addEventListener('DOMContentLoaded', callback);
    },

    each: function(callback) {  
        [].forEach.call(this.currentSelector, function(el) {
            callback(el);
        });
        return this; 
    },

    css: function(property, value) {  
        return this.each(function(el) {
            el.style[property] = value;
        });
    },

    hide: function() {  
        return this.each(function(el) {
            el.style.display = 'none';
        });
    },

    show: function() {  
        return this.each(function(el) {
            el.style.display = 'block';
        });
    },
    
    toggle: function() {  
        return this.each(function(el) {
            if(el.style.display === '' || el.style.display === 'block') {
                el.style.display = 'none';
            }
            else {
                el.style.display = 'block';
            }
        });
    },

    addClass: function(classToAdd) {  
        return this.each(function(el) {
            el.classList.add(classToAdd);
        }); 
    },

    removeClass: function(classToRemove) {  
        return this.each(function(el) {
            el.classList.remove(classToRemove);
        });
    },

    toggleClass: function(classToToggle) {  
        return this.each(function(el) {
            el.classList.toggle(classToToggle);
        });
    },

    hasClass: function(hasClass) { 
        //Only need to check first?
        return this.currentSelector[0].classList.contains(hasClass);
    },

    on: function(name, callback) {  
        return this.each(function(el) {
            el.addEventListener(name, callback, false);
        });
    },

    off: function(name, callback) {  
        return this.each(function(el) {
            el.removeEventListener(name, callback, false);
        });
    },

    trigger: function(name) {
        return this.each(function(el) {
            var triggerEvent = new Event(name);
            el.dispatchEvent(triggerEvent);
        });
    },

    getJSON: function(options) {

        var httpRequest = new XMLHttpRequest();
        options.url = options.url || location.href;
        options.data = options.data || null;
        options.success = options.success || function() {};
        options.error = options.error || function() {};

        httpRequest.open('GET', options.url);
        httpRequest.send(options.data);

        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    options.success(httpRequest.responseText);
                } else {
                    options.error(httpRequest.statusText);
                }
            }
        };

    },

    next: function() {  
        return this.each(function(el) {
            this.currentSelector.push(el.nextElementSibling);
        });
    },

    first: function() {         
        this.currentSelector = this.currentSelector.slice(0,1);
        return this;
    },

    last: function() {  
        var arrayLength = this.currentSelector.length;
        this.currentSelector = this.currentSelector.slice(arrayLength-1,arrayLength);
        return this;
    },

    append: function(position, html) {  
        return this.each(function(el) {

            switch(position.toLowerCase()){
                case "before": return el.insertAdjacentHTML("beforebegin",html);
                case "after": return el.insertAdjacentHTML("afterend",html);
                case "atstart": return el.insertAdjacentHTML("afterbegin",html);
                case "atend": return el.insertAdjacentHTML("beforeend",html);
            }

        });
    },

    text: function(textToAdd) {  
        return this.each(function(el) {
            el.textContent = textToAdd;
        });
    },

    html: function(htmlToAdd) {  
        return this.each(function(el) {
            el.innerHTML = htmlToAdd;
        });
    },

    empty: function() {  
        return this.each(function(el) {
            el.innerHTML = '';
        });
    },

    clone: function() {  
        return this.each(function(el) {
            el.clodeNode();
        });
    },

    remove: function() { 
        return this.each(function(el) {
            el.parentNode.removeChild(el);
        });
    },

    setAttr: function(name, value) {  
        return this.each(function(el) {
            el.setAttribute(name, value);
        });
    },

    getAttr: function(attributeName) {  
        return this.each(function(el) {
            el.getAttribute(attributeName);
        });
    },

    removeAttr: function(attributeName) {  
        return this.each(function(el) {
            el.removeAttribute(attributeName);
        });
    },

    length: function() {  
        return this.currentSelector.length;
    },

    height: function() {  
        return this.currentSelector[0].offsetHeight;
    },

    width: function() {  
        return this.currentSelector[0].offsetWidth;
    },

    native: function() {  
        return this.currentSelector[0];
    }
    
};

//Nicer way to add functions
bScript.fn = bScript.prototype;  

//Expose bScript to the world:-)
window.bScript = window.$ = bScript;

}(window, document));   