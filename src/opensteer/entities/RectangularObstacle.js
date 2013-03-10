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
			ctx.strokeRect(this.position.x-this.size.width/2, this.position.y-this.size.height/2, this.size.width, this.size.height);

			ctx.restore();

			this._super(ctx);
		}
	});
});
