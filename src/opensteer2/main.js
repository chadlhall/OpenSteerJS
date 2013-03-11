
require.config({
	paths: {
		"OpenSteer2": "./"
	}
});

require (["game/CaptureTheFlag"], function(CaptureTheFlag) {
	var ctf = new CaptureTheFlag();

	ctf.start();
});
