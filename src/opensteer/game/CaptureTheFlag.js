
define(function(require) {

	var Engine = require("engine/Engine");

	var CircularObstacle = require("entities/CircularObstacle");
	var Vehicle = require("entities/Vehicle");
	var MathUtils = require("engine/MathUtils");

	var Point = MathUtils.Point;
	var Dimension = MathUtils.Dimension;

	return Engine.extend({
		init: function()
		{
			this._super();

			var circleObstacle = new CircularObstacle(new Point(256, 256), new Dimension(128, 128));
			this.addEntity(circleObstacle);

			var vehicle = new Vehicle(new Point(512, 512), new Dimension(64, 64));
			this.addEntity(vehicle);
		}
	});
});