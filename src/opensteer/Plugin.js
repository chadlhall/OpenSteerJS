
define(function(require) {

	return Class.extend({
		init: function(name, sortOrder, initialSelection)
		{
			this.name = name;
			this.selectionOrderSortKey = sortOrder;
			this.requestInitialSelection = initialSelection;
		},

		/***** Override Methods *****/
		open: function()
		{

		},

		update: function()
		{

		},

		redraw: function()
		{

		},

		close: function()
		{

		},

		reset: function()
		{

		},

		handleFunctionKeys: function(keyNumber)
		{

		},

		printMiniHelpForFunctions: function()
		{

		},

		allVehicles: function()
		{

		},

		printPlugin: function()
		{
			console.log("Plugin:" + this.name);
		}
	});
});