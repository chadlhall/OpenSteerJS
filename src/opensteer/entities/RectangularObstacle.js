/**
 * This class represents an immobile obstacle in the field that is rectangular.
 */
define(function(require) {

	var Entity = require("engine/Entity");

	return Entity.extend({
		init: function(position, size)
		{
			this._super("RectangularObstacle", position, size);
		},

		update: function(timeDx)
		{
			this._super(timeDx);
		},

		draw: function(ctx)
		{
			ctx.save();
			ctx.strokeStyle = "Orange";
			ctx.translate(this.position.x, this.position.y);
			ctx.beginPath();
			ctx.rect(-this.width/2, -this.height/2, this.size.width, this.size.height);
			ctx.stroke();
			ctx.restore();

			this._super(ctx);
		}
	});
});
