
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
			var top = new RectangularObstacle(new Point(0,0), new Dimension(768,10));
			top.isStatic = true;
			this.addEntity(top);

			var bottom = new RectangularObstacle(new Point(0,758), new Dimension(768,10));
			bottom.isStatic = true;
			this.addEntity(bottom);

			var left = new RectangularObstacle(new Point(0,0), new Dimension(10,768));
			left.isStatic = true;
			this.addEntity(left);

			var right = new RectangularObstacle(new Point(758,0), new Dimension(10,768));
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

				var defender = new Vehicle(new Point(boundingRect.x, boundingRect.y), new Dimension(size, size), "Red", this.steerSystem);
				this.addEntity(defender);
			}

			// Generate our seeker...
			do {
				boundingRect.x = Math.random()*768;
				boundingRect.y = Math.random()*768;
				size = 32;
				boundingRect.width = size;
				boundingRect.height = size;
			} while (!this.isAreaEmpty(boundingRect));

			var seeker = new Vehicle(new Point(boundingRect.x, boundingRect.y), new Dimension(size, size), "Green", this.steerSystem);
			this.addEntity(seeker);

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

			/*var circleObstacle = new CircularObstacle(new Point(256, 256), new Dimension(128, 128));
			this.addEntity(circleObstacle);

			var vehicle = new Vehicle(new Point(512, 512), new Dimension(64, 64));
			this.addEntity(vehicle);*/
		}
	});
});