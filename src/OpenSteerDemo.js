
define(function(require) {

	var Clock = require("Clock");
	var Camera = require("Camera");

	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				window.oRequestAnimationFrame      ||
				window.msRequestAnimationFrame     ||
				function( callback ){
					window.setTimeout(callback, 1000 / 60);
				};
	})();

	return Class.extend({
		init: function()
		{
			this.clock = new Clock();
			this.camera = new Camera();
			this.selectedPlugin = null;
			this.selectedVehicle = null;
			this.enableAnnotation = true;

			this.selectDefaultPlugin();
			this.logPlugins();
			this.openSelectedPlugin();
		},

		start: function()
		{
			var that = this;
			(function animloop(){
				requestAnimFrame(animloop);
				that.update();
			})();
		},

		update: function()
		{
			this.clock.update();

			this.selectedPlugin.update(this.clock.totalSimulationTime, this.clock.elapsedSimulationTime);
			this.selectedPlugin.draw(this.clock.totalSimulationTime, this.clock.elapsedSimulationTime);
		}
	});
});