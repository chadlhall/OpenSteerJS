/**
 * This class represents an immobile obstacle in the field that is round.
 */
define(function(require) {

	var Entity = require("entities/Entity");

	return Entity.extend({
		init: function(position, size)
		{
			this._super("CircularObstacle", position, size, 1000);
		},

		update: function(timeDx,gameEngine)
		{
			this._super(timeDx);
		},

		draw: function(ctx)
		{
			ctx.save();
			ctx.strokeStyle = "Orange";
			ctx.translate(this.position.x, this.position.y);
			ctx.beginPath();
			ctx.arc(0, 0, this.size.width/2, 0, Math.PI*2, false);
			ctx.stroke();
			ctx.restore();

			this._super(ctx);
		}
	});
});
