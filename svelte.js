/**
* @fileOverview svelte - the lightweight modern JavaScript framework 
* @author Matt Begent
* @version 1.0.0
*/

(function (window, document) {

'use strict'; 

var svelte = {

    /**
    * The dom ready function
    * @memberOf svelte
    * @param {function} callback Run functions when the dom is loaded
    * @returns svelte
    * @example
    * domready(function() { });
    */
    domready: function(callback){
        document.addEventListener('DOMContentLoaded', callback);
    },

    /**
    * Each loop
    * @memberOf svelte
    * @param {function} callback Function to be run on each selector
    * @returns svelte
    * @example
    * $('.each').each(function() { });
    */
    each: function(callback) {  
        [].forEach.call(this.selector, function(el) {
            callback(el);
        });
        return this; 
    },

    /**
    * Find a new selector within a parent selector
    * @memberOf svelte
    * @param {string} selector Find a new selector within a parent selector
    * @returns svelte
    * @example
    * $('.parent').find('.child');
    */
    find: function(selector) {
        this.selector = this.selector[0].querySelectorAll(selector);
        return this;
    },

    /**
    * Set the CSS for an element
    * @memberOf svelte
    * @param {string} property Property of element to set
    * @param {string} value Value of property to set
    * @returns svelte
    * @example
    * $('.color').css('color', 'red');
    */
    css: function(property, value) {  
        if(value) {
            return this.each(function(el) {
                el.style[property] = value;
            });
        } else {
            return getComputedStyle(this.selector[0])[property];
        }
    },

    /**
    * Sets selector to display none
    * @memberOf svelte
    * @returns svelte
    * @example
    * $('.hide').hide();
    */
    hide: function() {  
        return this.each(function(el) {
            el.style.display = 'none';
        });
    },

    /**
    * Sets selector to display block
    * @memberOf svelte
    * @returns svelte
    * @example
    * $('.show').show();
    */
    show: function() {  
        return this.each(function(el) {
            el.style.display = 'block';
        });
    },

    /**
    * Checks whether the selector is visible
    * @memberOf svelte
    * @returns Boolean
    * @example
    * $('.visible').visible();
    */
    visible: function() {
        return this.selector[0].offsetWidth > 0 || this.selector[0].offsetHeight > 0;
    },
    
    /**
    * Toggles the display property of the selector
    * @memberOf svelte
    * @returns Boolean
    * @example
    * $('.visible').visible();
    */
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

    /**
    * Adds a class to the selector
    * @memberOf svelte
    * @param {string} className Name of class to add
    * @returns svelte
    * @example
    * $('.class').addClass('another-class');
    */
    addClass: function(className) {  
        return this.each(function(el) {
            if (el.classList) {
                el.classList.add(className); 
            } else { // IE9
               el.className += ' ' + className; 
            }
        }); 
    },

    /**
    * Removes a class from the selector
    * @memberOf svelte
    * @param {string} className Name of class to remove
    * @returns svelte
    * @example
    * $('.class remove-class').removeClass('remove-class');
    */
    removeClass: function(className) {  
        return this.each(function(el) {
            if (el.classList) {
                el.classList.remove(className);
            } else { // IE9
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        });
    },

    /**
    * Toggles a class from the selector
    * @memberOf svelte
    * @param {string} className Name of class to toggle
    * @returns svelte
    * @example
    * $('.class toggle-class').toggleClass('toggle-class');
    */
    toggleClass: function(className) {  
        return this.each(function(el) {
            if(el.classList) {
                el.classList.toggle(className);
            } else { // IE9

                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);

                if (existingIndex >= 0) {
                    classes.splice(existingIndex, 1);
                } else {
                    classes.push(className);
                }  

                el.className = classes.join(' ');

            }
        });
    },

    /**
    * Checks whether the selector has a specific class
    * @memberOf svelte
    * @returns Boolean
    * @example
    * $('.class').hasClass('another-class');
    */
    hasClass: function(className) { 
        var firstSelector = this.selector[0];
        if(firstSelector.classList) {
            return firstSelector.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(firstSelector.className);
        }  
    },

    /**
    * Attaches an event to the selector
    * @memberOf svelte
    * @param {string} name Name of event e.g. click
    * @param {function} callback Callback to run when event is triggered
    * @returns svelte
    * @example
    * $('.click-me').on('click', function() { alert('Clicked!'); });
    */
    on: function(name, callback) {  
        return this.each(function(el) {
            el.addEventListener(name, callback);
        });
    },

    /**
    * Removes an event from the selector
    * @memberOf svelte
    * @param {string} name Name of event e.g. click
    * @param {function} callback Callback to run when event is triggered
    * @returns svelte
    * @example
    * $('.click-me').off('click', function() { alert('Clicked!'); });
    */
    off: function(name, callback) {  
        return this.each(function(el) {
            el.removeEventListener(name, callback);
        });
    },

    /**
    * Trigger an event from the selector
    * @memberOf svelte
    * @param {string} name Name of event e.g. click
    * @param {object} detail The data passed when initializing the event
    * @returns svelte
    * @example
    * $('.click-me').trigger('click');
    */
    trigger: function(name, detail) {
        return this.each(function(el) {
            var triggerEvent = ((detail) ? new CustomEvent(name, detail) : document.createEvent('HTMLEvents')); 
            if(!detail) {
                triggerEvent.initEvent(name, true, false);
            }
            
            el.dispatchEvent(triggerEvent);
        });
    },

    /**
    * Ajax function
    * @memberOf svelte
    * @param {object} options Ajax options
    * @example 
        $.fn.ajax({
            url: "data/test.json",
            type: "GET",
            success: function(data) {
                $(".test-json").text(data);
            },
            error: function() {
                $(".test-json").text("An error has occurred");
            }
        });
    */
    ajax: function(options) {

        var httpRequest = new XMLHttpRequest();
        options.url = options.url || location.href;
        options.data = options.data || null;
        options.type = options.type || 'GET';
        options.cache = options.cache || true;
        options.success = options.success || function() {};
        options.error = options.error || function() {};

        var pageUrl = ((!options.cache) ? options.url : (options.url + ((/\?/).test(options.url) ? "&" : "?") + (new Date()).getTime()));

        httpRequest.open(options.type, pageUrl);
        if(options.type === 'POST') {
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
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

    /**
    * Find the previous sibling to the current selector
    * @memberOf svelte
    * @returns svelte
    * @example
    * $('.selector').prev();
    */
    prev: function() {  
        this.selector = this.selector[0].previousElementSibling;
        return this;
    },

    /**
    * Find the next sibling to the current selector
    * @memberOf svelte
    * @returns svelte
    * @example
    * $('.selector').next();
    */
    next: function() {  
        this.selector = this.selector[0].nextElementSibling;
        return this;
    },

    /**
    * Find the first element of the selector
    * @memberOf svelte
    * @returns svelte
    * @example
    * $('.selector').first();
    */
    first: function() {         
        this.selector = this.selector[0];
        return this;
    },

    /**
    * Find the last element of the selector
    * @memberOf svelte
    * @returns svelte
    * @example
    * $('.selector').last();
    */
    last: function() {  
        var arrayLength = this.selector.length;
        this.selector = this.selector.slice(arrayLength-1,arrayLength);
        return this;
    },

    /**
    * Add HTML to the page in relation to the current selector
    * @memberOf svelte
    * @param {string} position The position to add the html - before, after, atstart, atend
    * @param {string} html The HTML to add
    * @returns svelte
    * @example
    * $('.html').append('before','<p>I am before</p>');
    */
    append: function(position, html) {  
        return this.each(function(el) {

            switch(position.toLowerCase()){
                case 'before': return el.insertAdjacentHTML('beforebegin',html);
                case 'after': return el.insertAdjacentHTML('afterend',html);
                case 'atstart': return el.insertAdjacentHTML('afterbegin',html);
                case 'atend': return el.insertAdjacentHTML('beforeend',html);
            }

        });
    },

    /**
    * Set the text of a selector
    * @memberOf svelte
    * @param {string} text Text to set
    * @returns svelte or text
    * @example
    * $('.text').text('Some text.');
    */
    text: function(text) {  
        if(text) {
            return this.each(function(el) {
                el.textContent = text;
            });
        } else {
            return this.selector[0].textContent.trim();
        }
    },

    /**
    * Set the HTML of a selector
    * @memberOf svelte
    * @param {string} html HTML to set
    * @returns svelte or HTML
    * @example
    * $('.text').html('<span>A span.</span>');
    */
    html: function(html) {  
        if(html) {
            return this.each(function(el) {
                el.innerHTML = html;
            });
        } else {
            return this.selector[0].innerHTML;
        }
    },

    /**
    * Empty the HTML of a selector
    * @memberOf svelte
    * @returns svelte
    * @example
    * $('.empty-me').empty();
    */
    empty: function() {  
        return this.each(function(el) {
            el.innerHTML = '';
        });
    },

    /**
    * Clone a selector
    * @memberOf svelte
    * @returns svelte
    * @example
    * $('.empty-me').clone();
    */
    clone: function() {  
        return this.each(function(el) {
            el.clodeNode(true);
        });
    },

    /**
    * Removes a selector
    * @memberOf svelte
    * @returns svelte
    * @example
    * $('.remove-me').remove();
    */
    remove: function() { 
        return this.each(function(el) {
            el.parentNode.removeChild(el);
        });
    },

    /**
    * Set the attribute of a selector
    * @memberOf svelte
    * @param {string} name Attr to set
    * @param {string} value Value to set
    * @returns svelte
    * @example
    * $('.attr').setAttr('data-attr','Value');
    */
    setAttr: function(name, value) {  
        return this.each(function(el) {
            el.setAttribute(name, value);
        });
    },

    /**
    * Get the value of an attribute of a selector
    * @memberOf svelte
    * @param {string} name Attr to get
    * @returns Attribute value
    * @example
    * $('.attr').setAttr('data-attr');
    */
    getAttr: function(name) {  
        return this.selector[0].getAttribute(name);
    },

    /**
    * Remove an attribute from a selector
    * @memberOf svelte
    * @param {string} name Attr to remove
    * @returns svelte
    * @example
    * $('.attr').removeAttr('data-attr');
    */
    removeAttr: function(name) {  
        return this.each(function(el) {
            el.removeAttribute(name);
        });
    },

    /**
    * Get the value of a selector
    * @memberOf svelte
    * @returns value
    * @example
    * $('.input').val();
    */
    val: function() {
        return this.selector[0].value;
    },

    /**
    * Get the number of matched elements in the selector
    * @memberOf svelte
    * @returns length
    * @example
    * $('.length').length();
    */
    length: function() {  
        return this.selector.length;
    },

    /**
    * Get the height of the first element in the selector
    * @memberOf svelte
    * @returns height
    * @example
    * $('.height').height();
    */
    height: function() {  
        return this.selector[0].offsetHeight;
    },

    /**
    * Get the width of the first element in the selector
    * @memberOf svelte
    * @returns height
    * @example
    * $('.width').width();
    */
    width: function() {  
        return this.selector[0].offsetWidth;
    },

    /**
    * Returns the position of the first element in the selector relative to the viewport
    * @memberOf svelte
    * @returns TextRectangle object
    * @example
    * $('.position').position();
    */
    position: function() {  
        return this.selector[0].getBoundingClientRect();
    },

    /**
    * Returns true if the element matches the selector string
    * @memberOf svelte
    * @param {string} selector Selector to match
    * @returns boolean
    * @example
    * $('.paragraph').matches('p');
    */
    matches: function(selector) {  
        var el = this.selector[0];
        // Tidy up
        Element.prototype.matches =  Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector;
        return el.matches(selector);
    }
};

/** @constructor svelte */
function $(selector, context) {
    return Object.create(svelte, {        
        selector: {
            get: function () { 
                if(typeof selector  === 'string') {
                    var startAt = document.querySelector(context) || document;
                    return Array.prototype.slice.call(startAt.querySelectorAll(selector));            
                } else {
                    return [selector]; // could be an object, dom node or a function but always kept in an array
                }
            },
            set: function(value) {
                selector = value;
            }
        },
        name: {
            value: 'svelte'
        },
        version: {
            value: '1.0.0'
        }
    });
}

//Expose svelte to the world:-)
window.$ = $;

//Expose functions to the world
window.$.fn = window.$.svelte = svelte;

//Shortcut to domready
window.domready = svelte.domready;

}(window, document));   