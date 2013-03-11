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
			this._super("Hunter", position, size, 30);

			this.role 	= 1;
			this.stamina = MAX_STAMINA;
			this.resting = false;
			this.prey = null;

		},

		think: function(gameEngine)
		{
			if (this.resting && this.stamina++ >= MAX_STAMINA) {
				this.resting = false;
			}

			if (this.prey != null && !this.resting) {
				this.steering.pursuit(this.prey);
				this.stamina -= 2;

				if (this.stamina <= 0) {
					this.prey = null;
					this.resting = true;
				}
			} else {
				this.steering.wander();
				this.prey = gameEngine.getClosestEntity(this.position, 2, 100);
			}
		},

		draw: function(ctx)
		{
			ctx.save();
			ctx.translate(this.position.x, this.position.y);
			ctx.scale(1, -1);
			ctx.rotate(this.rotation);
            if(this.resting)
            {

                var r = Math.round((MAX_STAMINA - this.stamina)/MAX_STAMINA * 175);
                ctx.fillStyle = "rgba("+r+",0,255,1)";
            } else if(this.prey)
            {
                ctx.fillStyle = "Red";
            } else {
                ctx.fillStyle = "Blue";
            }
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
			return this.resting > 0 ? 1 : 7;
		}


	});
});