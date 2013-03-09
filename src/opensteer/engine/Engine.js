
define(function(require) {

	var Clock = require("engine/Clock");

	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				window.oRequestAnimationFrame      ||
				window.msRequestAnimationFrame     ||
				function( callback ){
					window.setTimeout(callback, 1000 / 60);
				};
	})();

	return Class.extend({
		init: function()
		{
			this.entities = [];
			this.canvas = document.getElementById("canvas");
			this.ctx = this.canvas.getContext("2d");
		},

		addEntity: function(entity)
		{
			this.entities.push(entity);
		},

		start: function()
		{
			var that = this;
			(function animloop(){
				requestAnimFrame(animloop);
				that.update();
			})();
		},

		update: function()
		{
			var timeDx = Clock.tick();

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			var i;
			for (i = 0; i < this.entities.length; i++)
			{
				this.entities[i].update(timeDx);
				this.entities[i].draw(this.ctx);
			}
		}

	});
});