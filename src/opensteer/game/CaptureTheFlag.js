
define(function(require) {

	var Engine = require("engine/Engine");

	var CircularObstacle = require("entities/CircularObstacle");
	var RectangularObstacle = require("entities/RectangularObstacle");
	var Vehicle = require("entities/Vehicle");
	var FlagStand = require("entities/FlagStand");
	var MathUtils = require("engine/MathUtils");
	var SteerSystem = require("library/SteerSystem");


	var Point = MathUtils.Point;
	var Dimension = MathUtils.Dimension;
	var Rectangle = MathUtils.Rectangle;

	var BOX_WIDTH = 10;
	var CANVAS_SIZE = 768; //TODO: get this from the canvas

	return Engine.extend({
		init: function()
		{
			this._super();
			this.steerSystem = new SteerSystem(this.entities);
		},

		start: function()
		{
			this._super();

			var i;

			var boundingRect = new Rectangle(0, 0, 0, 0);
			var size = 0;


			//Generate the walls around the map
			var top = new RectangularObstacle(new Point(CANVAS_SIZE/2,BOX_WIDTH/2), new Dimension(CANVAS_SIZE,BOX_WIDTH));
			top.isStatic = true;
			this.addEntity(top);

			var bottom = new RectangularObstacle(new Point(CANVAS_SIZE/2,CANVAS_SIZE-BOX_WIDTH/2), new Dimension(CANVAS_SIZE,BOX_WIDTH));
			bottom.isStatic = true;
			this.addEntity(bottom);

			var left = new RectangularObstacle(new Point(BOX_WIDTH/2,CANVAS_SIZE/2), new Dimension(BOX_WIDTH,CANVAS_SIZE));
			left.isStatic = true;
			this.addEntity(left);

			var right = new RectangularObstacle(new Point(CANVAS_SIZE - BOX_WIDTH/2,CANVAS_SIZE/2), new Dimension(BOX_WIDTH,CANVAS_SIZE));
			right.isStatic = true;
			this.addEntity(right);


			// Generate 3 random barriers
			for (i = 0; i < 3; i++)
			{
				do {
					boundingRect.x = Math.random()*768;
					boundingRect.y = Math.random()*768;
					size = Math.random()*256;
					boundingRect.width = size;
					boundingRect.height = size;
				} while (!this.isAreaEmpty(boundingRect));

				var circleObstacle = new CircularObstacle(new Point(boundingRect.x, boundingRect.y), new Dimension(size, size));
				circleObstacle.isStatic = true;
				this.addEntity(circleObstacle);
			}

			// And add a flag stand
			do {
				boundingRect.x = Math.random()*768;
				boundingRect.y = Math.random()*768;
				size = 64;
				boundingRect.width = size;
				boundingRect.height = size;
			} while (!this.isAreaEmpty(boundingRect));

			var flagStand = new FlagStand(new Point(boundingRect.x, boundingRect.y), new Dimension(size, size), "Green");
			this.addEntity(flagStand);

			// Generate our seeker...
			do {
				boundingRect.x = Math.random()*768;
				boundingRect.y = Math.random()*768;
				size = 32;
				boundingRect.width = size;
				boundingRect.height = size;
			} while (!this.isAreaEmpty(boundingRect));

			var seeker = new Vehicle(new Point(boundingRect.x, boundingRect.y), new Dimension(size, size), "Green", this.steerSystem, flagStand);
			this.addEntity(seeker);

			// Generate 4 random defenders
			for (i = 0; i < 4; i++)
			{
				do {
					boundingRect.x = Math.random()*768;
					boundingRect.y = Math.random()*768;
					size = 32;
					boundingRect.width = size;
					boundingRect.height = size;
				} while (!this.isAreaEmpty(boundingRect));

				var defender = new Vehicle(new Point(boundingRect.x, boundingRect.y), new Dimension(size, size), "Red", this.steerSystem, seeker);
				this.addEntity(defender);
			}





			/*var circleObstacle = new CircularObstacle(new Point(256, 256), new Dimension(128, 128));
			this.addEntity(circleObstacle);

			var vehicle = new Vehicle(new Point(512, 512), new Dimension(64, 64));
			this.addEntity(vehicle);*/
		}
	});
});