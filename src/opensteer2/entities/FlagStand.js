/**
 * This class represents an immobile obstacle in the field that is round.
 */
define(function(require) {

	var Entity = require("entities/Entity");

	return Entity.extend({
		init: function(position, size)
		{
			this._super("FlagStand", position, size, 1000);
		},

		update: function(timeDx)
		{
			this._super(timeDx);
		},

		draw: function(ctx)
		{
			ctx.save();
			ctx.fillStyle = "Gold";
			ctx.translate(this.position.x, this.position.y);
			ctx.beginPath();
			ctx.arc(0, 0, this.size.width/2, 0, Math.PI*2, false);
			ctx.fill();
			ctx.restore();

			this._super(ctx);
		}
	});
});
