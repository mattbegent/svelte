require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

require(["../../svelte"], function(testing) {
    testing('.test-css').css('color', 'red');
});