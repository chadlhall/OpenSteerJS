
requirejs.configure({
	paths: {}
});

require (["OpenSteerDemo"], function(OpenSteerDemo) {
	var openSteerDemo = new OpenSteerDemo();
});