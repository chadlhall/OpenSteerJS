/**
 * Entity is the base class for anything in the world. It is collidable.
 * This way our vehicles don't need to avoid both vehicles and obstacles, just do it generically based on entities.
 */
define(function(require) {

	var MathUtils = require("engine/MathUtils");

	var Point = MathUtils.Point;
	var Dimension = MathUtils.Dimension;

	return Class.extend({
		init: function(type, position, size)
		{
			this.id = 0;
			this.type = type;
			this.position = new Point(position);
			this.size = new Dimension(size);
			this.rotation = 0;
			this.physicsBody = null;

			this.movementVector = new Point(0, 0); // They start out pointing up
			this.velocity = 10;
			this.rotationalVelocity = 0;
		},

		update: function(timeDx)
		{

		},

		draw: function(ctx)
		{

		}
	});
});

