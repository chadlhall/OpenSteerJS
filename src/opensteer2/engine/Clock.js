define(function (require)
{
	"use strict";

	var moduleName = "GameClock";
	var GameClock = Class.extend({
		init: function ()
		{
			this.wallLastTimestamp = Date.now();
			this.gameTime = 0;
		},

		tick: function ()
		{
			var wallCurrent = Date.now();
			var wallDelta = (wallCurrent - this.wallLastTimestamp);
			this.wallLastTimestamp = wallCurrent;
			this.gameTime += wallDelta;

			return wallDelta;
		},

		getLocalTime: function()
		{
			return this.wallLastTimestamp;
		},

		getGameTime: function()
		{
			return this.gameTime;
		},

		setGameTime: function(time)
		{
			this.gameTime = time;
		}
	});

	var instance = null;
	var getGameClock = function ()
	{
		if (instance === null)
		{
			instance = new GameClock();
		}

		return instance;
	};

	return getGameClock();
});