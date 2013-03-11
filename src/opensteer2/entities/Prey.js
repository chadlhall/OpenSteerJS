/**
 * This guys hunts. He be awesome
 */
define(function(require) {

	var Entity = require("entities/Entity");
	var MathUtils = require("engine/MathUtils");
	var Engine = require("engine/Engine");

	var Point = MathUtils.Point;

	var MAX_STAMINA = 400;

	return Entity.extend({
		init: function(position, size)
		{
			this._super("Prey", position, size, 20);

			this.role 	= 2;
			this.stamina = MAX_STAMINA;
			this.resting = false;
			this.hunter = null;
		},

		think: function(gameEngine)
		{
			this.hunter = gameEngine.getClosestEntity(this.position, 1, 130);


			if (this.hunter != null) {
				this.steering.evade(this.hunter);
			} else {
				this.steering.wander();
			}
		},

		draw: function(ctx)
		{
			ctx.save();
			ctx.translate(this.position.x, this.position.y);
			ctx.scale(1, -1);
			ctx.rotate(this.rotation);
			ctx.fillStyle = this.hunter?"Yellow":"Green";
			ctx.beginPath();

			// Move to right side of triangle
			ctx.moveTo(Math.cos(0) * (this.size.width/2), Math.sin(0) * (this.size.height/2));

			// draw to upper left
			ctx.lineTo(Math.cos(Math.PI * 0.75) * (this.size.width/2), Math.sin(Math.PI * 0.75) * (this.size.height/2));

			// Draw to lower left
			ctx.lineTo(Math.cos(Math.PI * 1.25) * (this.size.width/2), Math.sin(Math.PI * 1.25) * (this.size.height/2));

			ctx.closePath();
			ctx.fill();

			// Move to top right, draw a white line down the middle so we can see where forward is
			ctx.beginPath();
			ctx.moveTo(Math.cos(0) * (this.size.width/2), Math.sin(0) * (this.size.height/2));
			ctx.lineTo(0, 0);
			ctx.strokeStyle = "White";
			ctx.stroke();

			ctx.strokeStyle = "Maroon";
			ctx.beginPath();
			ctx.arc(0, 0, this.size.width/2, 0, Math.PI*2, false);
			ctx.stroke();

			ctx.restore();

			this._super(ctx);
		},

		getMaxVelocity:function()
		{
			return this.hunter != null ? 3 : 1;
		}


	});
});