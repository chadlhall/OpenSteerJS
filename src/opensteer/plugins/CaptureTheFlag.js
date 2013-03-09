
define(function(require) {

	var Plugin = require("../Plugin");

	return Plugin.extend({
		init: function(sortOrder, initialSelection)
		{
			this._super("Capture The Flag",sortOrder, initialSelection);
		}
	});
});