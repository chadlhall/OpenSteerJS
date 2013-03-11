
define(function(require) {
	var Point = Class.extend({
		init: function(x, y)
		{
			this.setCoordinates(x, y);
		},

		setCoordinates: function(x, y)
		{
			if (typeof(x) === "object")
			{
				this.x = x.x;
				this.y = x.y;
			}
			else
			{
				this.x = x;
				this.y = y;
			}
		},

		isOrigin: function()
		{
			return this.x === 0 && this.y === 0;
		},

		zero: function()
		{
			this.x = 0;
			this.y = 0;
		},

		equals: function(otherPoint)
		{
			return this.x === otherPoint.x && this.y === otherPoint.y;
		},

		distanceFrom: function(otherPoint)
		{
			return Math.sqrt(Math.pow(otherPoint.x - this.x, 2) + Math.pow(otherPoint.y - this.y, 2));
		},

		midpointFrom: function(otherPoint)
		{
			return new Point((this.x + otherPoint.x)/2, (this.y + otherPoint.y)/2);
		},

		normalize: function()
		{
			if (this.x === 0 && this.y === 0)
			{
				return;
			}
			var length = Math.sqrt((this.x * this.x) + (this.y * this.y));
			this.x = this.x / length;
			this.y = this.y / length;
		},

		clone:function()
		{
			return new Point(this.x, this.y);
		},

		// vector addition
		add:function(vector)
		{
			this.x+=vector.x;
			this.y+=vector.y;
			return this;
		},

		// vector subtraction
		subtract:function(vector)
		{
			this.x-=vector.x;
			this.y-=vector.y;
			return this;
		},

		// vector times scalar product (scale length of vector times argument)
		multiply:function(scalar)
		{
			this.x *= scalar;
			this.y *= scalar;
			return this;
		},

		dot:function(other)
		{
			return this.x * other.x + this.y * other.y;
		},

		lengthSquared: function()
		{
			return this.dot(this);
		},

		length: function()
		{
			return Math.sqrt(this.lengthSquared());
		},

		truncateLength:function(maxLength)
		{
			var maxLengthSquared = maxLength * maxLength;
			var vecLengthSquared = this.lengthSquared();
			if (vecLengthSquared <= maxLengthSquared)
			{
				return this;
			}
			else {
				return this.multiply(maxLength / Math.sqrt(vecLengthSquared));
			}
		}

	});

	var Dimension = Class.extend({
		init: function(width, height)
		{
			this.setDimensions(width, height);
		},

		setDimensions: function(width, height)
		{
			if (typeof(width) === "object")
			{
				this.width = width.width;
				this.height = width.height;
			}
			else
			{
				this.width = width;
				this.height = height;
			}
		}
	});

	var Rectangle = Point.extend({
		init: function(x, y, width, height)
		{
			this._super(x, y);

			if (typeof(x) === 'object')
			{
				this.width = x.width;
				this.height = x.height;
			}
			else
			{
				this.width = width;
				this.height = height;
			}
		},

		normalize: function()
		{
			if(this.width < 0)
			{
				this.x += this.width;
				this.width = -this.width;
			}
			if(this.height < 0)
			{
				this.y += this.height;
				this.height = -this.height;
			}
		}
	});

	return {
		Point: Point,
		Dimension: Dimension,
		Rectangle: Rectangle,
		Vector2: Point
	}
});