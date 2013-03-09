/**
 * This class extends entity and adds method pertaining to moving a vehicle around.
 * The actual movement physics work should be done in entity.
 */
define(function(require) {

	var Entity = require("engine/Entity");
	var MathUtils = require("engine/MathUtils");

	var Point = MathUtils.Point;

	return Entity.extend({
		init: function(position, size, fillColor, steerSystem)
		{
			this._super("Vehicle", position, size);

			this.fillColor = fillColor;
			this.steerSystem = steerSystem;
		},

		update: function(timeDx)
		{
			this._super(timeDx);
			this.applySteeringForce(this.steerSystem.steerForWander(this));
		},

		draw: function(ctx)
		{
			ctx.save();
			ctx.translate(this.position.x, this.position.y);
			ctx.scale(1, -1);
			ctx.rotate(this.rotation);
			ctx.fillStyle = this.fillColor;
			ctx.beginPath();

			// Move to lower left of triangle
			ctx.moveTo(Math.cos(1.25*Math.PI) * (this.size.width/2), Math.sin(1.25*Math.PI) * (this.size.height/2));

			// draw to upper
			ctx.lineTo(Math.cos(Math.PI/2) * (this.size.width/2), Math.sin(Math.PI/2) * (this.size.height/2));

			// Draw to lower right
			ctx.lineTo(Math.cos(1.75*Math.PI) * (this.size.width/2), Math.sin(Math.PI*1.75) * (this.size.height/2));

			ctx.closePath();
			ctx.fill();

			// Move to top right, draw a white line down the middle so we can see where forward is
			ctx.beginPath();
			ctx.moveTo(Math.cos(Math.PI/2) * (this.size.width/2), Math.sin(Math.PI/2) * (this.size.height/2));
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

		/**
		 * This function takes a force (x,y) and applies it to the current velocity and movement.
		 */
		applySteeringForce:function(force)
		{

		}
	});
});
