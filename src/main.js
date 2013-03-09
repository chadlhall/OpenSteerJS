
require.config({
	paths: {
		"OpenSteer": "./"
	}
});

require (["OpenSteerDemo"], function(OpenSteerDemo) {
	var openSteerDemo = new OpenSteerDemo();
});
