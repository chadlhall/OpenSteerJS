
define(function(require) {

	var Clock = require("engine/Clock");

	var b2World = Box2D.Dynamics.b2World,
			b2BodyDef = Box2D.Dynamics.b2BodyDef,
			b2Body = Box2D.Dynamics.b2Body,
			b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
			b2Vec2 = Box2D.Common.Math.b2Vec2,
			b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

	var PIXEL_SCALE = 10;

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

			this.world = new b2World(
				new b2Vec2(0, 0),    //gravity
				true                 //allow sleep
			);

			this.impulseVector = new b2Vec2(0, 0);
		},

		addEntity: function(entity)
		{
			var fixDef = new b2FixtureDef();
			fixDef.density = 1.0;
			fixDef.friction = 0.5;
			fixDef.restitution = 0.2;

			fixDef.shape = new b2CircleShape(entity.size.width/2/PIXEL_SCALE);

			var bodyDef = new b2BodyDef();
			bodyDef.position.Set(entity.position.x/PIXEL_SCALE, entity.position.y/PIXEL_SCALE);
			bodyDef.type = b2Body.b2_dynamicBody;
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
				entity.update(timeDx);
				entity.draw(this.ctx);

				var physicsBody = entity.physicsBody;

				entity.position.x = physicsBody.GetPosition().x*PIXEL_SCALE;
				entity.position.y = physicsBody.GetPosition().y*PIXEL_SCALE;
				entity.rotation = physicsBody.GetAngle();

				var linearVelocity = physicsBody.GetLinearVelocity();
				if (linearVelocity.x !== 0 || linearVelocity.y !== 0 || !entity.movementVector.isOrigin())
				{
					var moveVector = entity.movementVector;
					var velocity = entity.velocity;

					this.impulseVector.SetZero();
					this.impulseVector.x
							= physicsBody.GetMass() * ((moveVector.x * velocity) - linearVelocity.x);

					this.impulseVector.y
							= physicsBody.GetMass() * ((moveVector.y * velocity) - linearVelocity.y);

					physicsBody.ApplyForce(this.impulseVector, physicsBody.GetWorldCenter());
				}
			}
		}

	});
});