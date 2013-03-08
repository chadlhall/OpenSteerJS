
define(function(require) {

	return Class.extend({
		init: function()
		{
			this.fixedFrameRate = 0;
			this.setPausedState = false;
			this.setAnimationMode = false;
			this.variableFrameRateMode = true;

			this.previousRealTime = 0;
			this.previousSimulationTime = 0;

			this.startTime = 0;
			this.totalRealTime = 0;
			this.totalSimulationTime = 0;
			this.totalPausedTime = 0;

			this.totalAdvanceTime = 0;
			this.elapsedSimulationTime = 0;

			this.elapsedNonWaitRealTime = 0;
			this.newAdvanceTime = 0;
		},

		update: function()
		{
			var timeNow = new Date().getTime();

			if (this.startTime === 0)
			{
				this.startTime = timeNow;
			}

			this.totalRealTime = timeNow - this.startTime;
			this.elapsedRealTime = this.totalRealTime - this.previousRealTime;
			this.totalSimulationTime = this.totalRealTime + this.totalAdvanceTime - this.totalPausedTime;

			this.elapsedSimulationTime = this.totalSimulationTime - this.previousSimulationTime;

			this.previousSimulationTime = timeNow;
			this.previousRealTime = timeNow;
		},

		updateSmoothedRegisters: function()
		{

		}
	});

});