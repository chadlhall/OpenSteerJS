/**
 * SteeringManager contains the meat of the steering algorithms.
 */
define(function(require) {

	var MAX_FORCE  = 5.4;

	// Wander
	var CIRCLE_DISTANCE = 6;
	var CIRCLE_RADIUS = 8;
	var ANGLE_CHANGE = 1;


	var Vector2 = require("engine/MathUtils").Vector2;

	return Class.extend({

		init: function(host)
		{
			this.host = host;
			this.desired = new Vector2(0,0);
			this.steering = new Vector2(0,0);
			this.wanderAngle = 0;
			this.distance = new Vector2(0,0);
			this.targetFuturePosition = new Vector2(0,0);

			this.host.velocity.truncateLength(host.getMaxVelocity());
		},

		seek:function(target, slowingRadius){
			this.steering.add(this.doSeek(target, slowingRadius));
		},

		flee:function(target){
			this.steering.add(this.doFlee(target));
		},

		wander:function(){
			this.steering.add(this.doWander());
		},

		evade:function(target){
			this.steering.add(this.doEvade(target));
		},

		pursuit:function(target){
			this.steering.add(this.doPursuit(target));
		},

		doSeek:function(targetVector, slowingRadius) {
			var force;
			var distance;

			this.desired = targetVector.clone().subtract(this.host.position);

			distance = this.desired.length();
			this.desired.normalize();

			if (distance <= slowingRadius) {
				this.desired.multiply(this.host.getMaxVelocity() * distance/slowingRadius);
			} else {
				this.desired.multiply(this.host.getMaxVelocity());
			}

			force = this.desired.subtract(this.host.velocity);

			return force;
		},

		doFlee:function(targetVector) {
			var force;

			this.desired = this.host.position.clone().subtract(targetVector);
			this.desired.normalize();
			this.desired.multiply(this.host.getMaxVelocity());

			force = this.desired.subtract(this.host.velocity);

			return force;
		},

		doWander:function() {
			var wanderForce, displacement;

			wanderForce = this.host.velocity.clone();
			wanderForce.normalize();
			wanderForce.multiply(CIRCLE_DISTANCE);

			displacement = new Vector2(0, -1);
			displacement.multiply(CIRCLE_RADIUS);

			this.setAngle(displacement, this.wanderAngle);
			this.wanderAngle += Math.random() * ANGLE_CHANGE - ANGLE_CHANGE * .5;

			wanderForce.add(displacement);
			return wanderForce;
		},

		doEvade:function(targetEntity) {
			this.distance = targetEntity.position.clone().subtract(this.host.position);

			var updatesNeeded = this.distance.length() / this.host.getMaxVelocity();

			var tv = targetEntity.velocity.clone();
			tv.multiply(updatesNeeded);

			this.targetFuturePosition = targetEntity.position.clone().add(tv);

			return this.doFlee(this.targetFuturePosition);
		},

		doPursuit:function(targetEntity) {
			this.distance = targetEntity.position.clone().subtract(this.host.position);

			var updatesNeeded = this.distance.length() / this.host.getMaxVelocity();

			var tv = targetEntity.velocity.clone();
			tv.multiply(updatesNeeded);

			this.targetFuturePosition = targetEntity.position.clone().add(tv);

			return this.doSeek(this.targetFuturePosition);
		},

		getAngle:function(vector) {
			return Math.atan2(vector.y, vector.x);
		},

		setAngle:function(vector, value) {
			var len = vector.length();
			vector.x = Math.cos(value) * len;
			vector.y = Math.sin(value) * len;
		},

		update:function() {
			var velocity = this.host.velocity;
			var position = this.host.position;
			//console.log(this.steering);
			this.steering.truncateLength(MAX_FORCE);
			this.steering.multiply(1 / this.host.mass);

			velocity.add(this.steering);
			velocity.truncateLength( this.host.getMaxVelocity());

			//this.host.movementVector.x = velocity.x;
			//this.host.movementVector.y = velocity.y;
			position.add(velocity);
		},

		reset:function(){
			this.desired.x = this.desired.y = 0;
			this.steering.x = this.steering.y = 0;
		}

	});
});