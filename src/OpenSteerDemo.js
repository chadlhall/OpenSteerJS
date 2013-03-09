
define(function(require) {

	var Clock = require("opensteer/Clock");
	var Camera = require("opensteer/Camera");
	var PluginRegistry = require("opensteer/PluginRegistry");

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
			this.pluginRegistry = new PluginRegistry();
			this.selectedPlugin = null;
			this.selectedVehicle = null;
			this.enableAnnotation = true;


			this.selectedPlugin = this.pluginRegistry.findDefault();
			this.pluginRegistry.logPlugins();
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
		},

		openSelectedPlugin: function()
		{

		}
	});
});