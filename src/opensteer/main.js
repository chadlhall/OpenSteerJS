
require.config({
	paths: {
		"OpenSteer": "./"
	}
});

require (["game/CaptureTheFlag"], function(CaptureTheFlag) {
	var ctf = new CaptureTheFlag();

	ctf.start();
});
