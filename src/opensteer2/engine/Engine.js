
define(function(require) {

	var Clock = require("engine/Clock");

	var b2World = Box2D.Dynamics.b2World,
			b2AABB = Box2D.Collision.b2AABB,
			b2BodyDef = Box2D.Dynamics.b2BodyDef,
			b2Body = Box2D.Dynamics.b2Body,
			b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
			b2Vec2 = Box2D.Common.Math.b2Vec2,
			b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
			b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
			B2DebugDraw = Box2D.Dynamics.b2DebugDraw;

	var PIXEL_SCALE = 10;

	var GAME = null;

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
			GAME = this;
			this.entities = [];
			this.canvas = document.getElementById("canvas");
			this.ctx = this.canvas.getContext("2d");

			this.world = new b2World(
				new b2Vec2(0, 0),    //gravity
				true                 //allow sleep
			);

			if (typeof(window) !== 'undefined' && this.canvas && false)
			{
				this.debugDraw = new B2DebugDraw();
				this.debugDraw.SetSprite(this.ctx);
				this.debugDraw.SetDrawScale(10);
				this.debugDraw.SetFillAlpha(0.3);
				this.debugDraw.SetLineThickness(1.0);
				this.debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
				this.world.SetDebugDraw(this.debugDraw);
			}

			this.impulseVector = new b2Vec2(0, 0);
		},

		addEntity: function(entity)
		{
			var fixDef = new b2FixtureDef();
			fixDef.density = 1.0;
			fixDef.friction = 0.5;
			fixDef.restitution = 0.2;

			if (entity.type === "RectangularObstacle")
			{
				fixDef.shape = new b2PolygonShape();
				fixDef.shape.SetAsBox(entity.size.width/PIXEL_SCALE/2, entity.size.height/PIXEL_SCALE/2);
			}
			else
			{
				fixDef.shape = new b2CircleShape(entity.size.width/2/PIXEL_SCALE);
			}

			var bodyDef = new b2BodyDef();
			bodyDef.position.Set(entity.position.x/PIXEL_SCALE, entity.position.y/PIXEL_SCALE);
			bodyDef.type = entity.isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
			bodyDef.userData = entity;
			bodyDef.fixedRotation = true;

			entity.physicsBody = this.world.CreateBody(bodyDef);
			entity.physicsBody.CreateFixture(fixDef);

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

			this.world.Step(1 / 60, 10, 10);
			this.world.ClearForces();

			var i;
			for (i = 0; i < this.entities.length; i++)
			{
				var entity = this.entities[i];
				entity.update(timeDx,this);
				entity.draw(this.ctx);

				var physicsBody = entity.physicsBody;

				entity.position.x = physicsBody.GetPosition().x*PIXEL_SCALE;
				entity.position.y = physicsBody.GetPosition().y*PIXEL_SCALE;
				//entity.rotation = physicsBody.GetAngle();

				/*var linearVelocity = physicsBody.GetLinearVelocity();
				if (!entity.movementVector.isOrigin())
				{
					var moveVector = entity.movementVector;
					var velocity = entity.velocity;

					this.impulseVector.SetZero();
					this.impulseVector.x
							= physicsBody.GetMass() * (moveVector.x - linearVelocity.x);

					this.impulseVector.y
							= physicsBody.GetMass() * (moveVector.y - linearVelocity.y);

					physicsBody.ApplyImpulse(this.impulseVector, physicsBody.GetWorldCenter());
				}*/

				/*if (entity.rotationalVelocity !== 0)
				{
					physicsBody.ApplyTorque(entity.rotationalVelocity);
				}*/
			}

			if (this.debugDraw)
			{
				var ctx = this.debugDraw.GetSprite();
				ctx.save();
				this.world.DrawDebugData();
				ctx.restore();
			}
		},

		findEntitiesInArea: function(area, callback)
		{
			var aabb = new b2AABB();

			aabb.lowerBound.Set(area.x/PIXEL_SCALE, area.y/PIXEL_SCALE);
			aabb.upperBound.Set((area.x+area.width)/PIXEL_SCALE, (area.y+area.height)/PIXEL_SCALE);

			this.world.QueryAABB(function(fixture) {
				var entity = fixture.GetBody().GetUserData();
				return callback(entity);
			}, aabb);
		},

		isAreaEmpty: function(area)
		{
			var empty = true;

			this.findEntitiesInArea(area, function(entity) {
				if (entity)
				{
					empty = false;
					return false;
				}

				return true;
			});

			return empty;
		},


		getClosestEntity:function(startPoint, role, range)
		{
			var candidate = null;
			var distance = 100000;
			var small = 100000;

			for (var i = 0; i < this.entities.length; i++) {
				distance = this.entities[i].position.distanceFrom(startPoint);

				if (distance <= range && distance < small && (role < 0 || role == this.entities[i].role)) {
					small = distance;
					candidate = this.entities[i];
				}
			}

			return candidate;
		}


});
});