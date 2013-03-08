
define(function(require) {

	var registry = [];

	sortBySelectionOrder = function(a, b)
	{
		return a.selectionOrderSortKey - b.selectionOrderSortKey;
	};

	return Class.extend({
		init: function(name, sortOrder, initialSelection)
		{
			registry.push(this);

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

		/***** Private Methods ******/
		next: function()
		{
			var i;
			for (i = 0; i < registry.length; i++)
			{
				if (registry[i] === this)
				{
					var atEnd = i === itemsInRegistry-1;
					return register[atEnd ? 0 : 1];
				}
			}

			return null;
		},

		findByName: function(name)
		{
			var i;
			for (i = 0; i < registry.length; i++)
			{
				if (registry[i].name === name)
				{
					return registry[i];
				}
			}

			return null;
		},

		applyToAll: function(func)
		{
			var i;
			for (i = 0; i < registry.length; i++)
			{
				func(registry[i]);
			}
		},

		sortBySelectionOrder: function()
		{
			registry.sort(sortBySelectionOrder);
		},

		findDefault: function()
		{
			if (registry.length === 0)
			{
				return null;
			}

			var i;
			for (i = 0; i < registry.length; i++)
			{
				if (registry[i].requestInitialSelection)
				{
					return registry[i]
				}
			}

			return registry[0];
		}
	});
});