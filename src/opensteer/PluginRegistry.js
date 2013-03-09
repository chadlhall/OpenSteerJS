
define(function(require) {

	var sortBySelectionOrder = function(a, b)
	{
		return a.selectionOrderSortKey - b.selectionOrderSortKey;
	};

	return Class.extend({
		init: function()
		{
			this.registry = [];
		},

		add: function(plugin)
		{
			this.registry.push(plugin);
		},

		next: function(plugin)
		{
			var i;
			for (i = 0; i < this.registry.length; i++)
			{
				if (this.registry[i] === plugin)
				{
					var atEnd = i === itemsInRegistry-1;
					return this.registry[atEnd ? 0 : 1];
				}
			}

			return null;
		},

		findByName: function(name)
		{
			var i;
			for (i = 0; i < this.registry.length; i++)
			{
				if (this.registry[i].name === name)
				{
					return this.registry[i];
				}
			}

			return null;
		},

		applyToAll: function(func)
		{
			var i;
			for (i = 0; i < this.registry.length; i++)
			{
				func(this.registry[i]);
			}
		},

		sortBySelectionOrder: function()
		{
			this.registry.sort(sortBySelectionOrder);
		},

		findDefault: function()
		{
			if (this.registry.length === 0)
			{
				return null;
			}

			var i;
			for (i = 0; i < this.registry.length; i++)
			{
				if (this.registry[i].requestInitialSelection)
				{
					return this.registry[i]
				}
			}

			return this.registry[0];
		},

		logPlugins: function()
		{
			this.applyToAll("printPlugin");
		}
	});
});