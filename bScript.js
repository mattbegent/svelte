;(function (window, document, undefined) {

"use strict"; 

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
    this.currentSelectorArray = [];

    //Check if object
    if(typeof selector  === "object") {
        this.currentSelectorArray.push(selector);
    }
    else { // Turn nodelist into an array
        this.currentSelectorArray = Array.prototype.slice.call(document.querySelectorAll(selector));
    }
    
    return this;
};

//The good stuff
bScript.prototype = { 

    ready: function(readyFunctions){
        if(document.addEventListener){
            document.addEventListener('DOMContentLoaded', readyFunctions);
        }
    },

    each: function(functionToLoop) {  
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

    //hasClass: function(hasClass) { 
        //Only need to check one node?
    //  this.currentSelector[0].classList.contains(hasClass);
    //  return this; 
    //},

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
    
};

//Nicer way to add functions
bScript.fn = bScript.prototype;  

//Expose bScript to the world:-)
window.bScript = window.$ = bScript;

}(window, document, undefined));   