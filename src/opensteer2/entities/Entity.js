/**
 * Entity is the base class for anything in the world. It is collidable.
 * This way our vehicles don't need to avoid both vehicles and obstacles, just do it generically based on entities.
 */
define(function(require) {

	var MathUtils = require("engine/MathUtils");
	var SteeringManager = require("entities/SteeringManager");

	var Point = MathUtils.Point;
	var Dimension = MathUtils.Dimension;
	var Vector2 = MathUtils.Vector2;

	var GameSize = 768;

	return Class.extend({
		init: function(type, position, size, mass)
		{
			this.id = 0;
			this.type = type;
			this.position = new Point(position);
			this.size = new Dimension(size);
			this.mass = mass;
			this.movementVector = new Vector2(0, 0);
			//this.velocity = 4;
			this.velocity = new Vector2(-1,-2);
			this.rotation = 0;

			this.steering = new SteeringManager(this);

			this.isStatic = false;
			this.physicsBody = null;
		},

		think: function(gameEngine)
		{
			this.steering.wander();
		},

		update: function(timeDx,gameEngine)
		{
			if(!this.isStatic)
			{
				this.think(gameEngine);
				this.steering.update();

				//steering.reset();

				// Adjust boid rodation to match the velocity vector.
				//this.rotation = 90 + (180 * this.getAngle(this.velocity)) / Math.PI;
				this.rotation = Math.atan2(-this.velocity.y, this.velocity.x);

				if (this.position.x < 0 || this.position.x > GameSize || this.position.y < 0 || this.position.y > GameSize) {
					this.reset();
				}
			}

		},

		draw: function(ctx)
		{

		},


		getAngle: function(vector)
		{
			return Math.atan2(vector.y, vector.x);
		},

		reset: function()
		{
			this.position.x = GameSize / 2;
			this.position.y = GameSize / 2;
		},

		getMaxVelocity: function()
		{
			return 3;
		}
	});
});