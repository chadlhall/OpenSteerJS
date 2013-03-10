/**
 * SteerSystem contains the meat of the steering algorithms. It knows about all the entities currently in the game
 * and allows entities to ask it for steering directions. There should only be one instance steer system per running
 * game.
 */
define(function(require) {

	var Vector2 = require("engine/MathUtils").Vector2;

	return Class.extend({

		init: function(entities)
		{
			this.entities = entities;
		},


		/**
		 * Wanders the map
		 * @param entity the entity that wants to wander. Not sure we need this?
		 * @return returns a steering vector of type Vector2
		 */
		steerForWander: function(entity)
		{
			var newRotation = entity.rotation + (Math.random() > 0.4 ? (Math.PI/180) : -(Math.PI/180)); //entity.rotation + (Math.random() > 0.1 ? 0.1 : -0.1);

			var newUp = new Vector2(Math.cos(newRotation), -Math.sin(newRotation));

			return newUp;
		},

		// Seek behavior
		steerForSeek: function(entity, targetEntity)
		{
			var offset = targetEntity.position.subtract(entity.position);
			var desiredVelocity = offset.truncateLength(entity.velocity);
			return desiredVelocity.subtract(entity.movementVector);

		},

		// Flee behavior
		steerForFlee: function(entity, targetEntity)
		{
			var offset = entity.position.subtract(targetEntity.position.subtract);
			var desiredVelocity = offset.truncateLength(entity.velocity);
			return desiredVelocity.subtract(entity.movementVector);
		},

		// Path Following behaviors
		steerToFollowPath: function(entity, direction, predictionTime,path)
		{

		},

		steerToStayOnPath:function(entity, predictionTime, path)
		{

		},

		// ------------------------------------------------------------------------
		// Obstacle Avoidance behavior
		//
		// Returns a steering force to avoid a given obstacle.  The purely
		// lateral steering force will turn our vehicle towards a silhouette edge
		// of the obstacle.  Avoidance is required when (1) the obstacle
		// intersects the vehicle's current path, (2) it is in front of the
		// vehicle, and (3) is within minTimeToCollision seconds of travel at the
		// vehicle's current velocity.  Returns a zero vector value (Vec3::zero)
		// when no avoidance is required.
		steerToAvoidObstacles:function (entity,minTimeToCollision)
		{

		},


		// ------------------------------------------------------------------------
		// Unaligned collision avoidance behavior: avoid colliding with other
		// nearby vehicles moving in unconstrained directions.  Determine which
		// (if any) other other vehicle we would collide with first, then steers
		// to avoid the site of that potential collision.  Returns a steering
		// force vector, which is zero length if there is no impending collision.
		steerToAvoidNeighbors:function(entity,minTimeToCollision)
		{

		},


		// Given two vehicles, based on their current positions and velocities,
		// determine the time until nearest approach
		predictNearestApproachTime:function(entity, other)
		{

		},

		// Given the time until nearest approach (predictNearestApproachTime)
		// determine position of each vehicle at that time, and the distance
		// between them
		computeNearestApproachPositions:function(entity,other,time)
		{

		},


		// ------------------------------------------------------------------------
		// avoidance of "close neighbors" -- used only by steerToAvoidNeighbors
		//
		// XXX  Does a hard steer away from any other agent who comes withing a
		// XXX  critical distance.  Ideally this should be replaced with a call
		// XXX  to steerForSeparation.
		steerToAvoidCloseNeighbors:function(entity,minSeparationDistance,others)
		{

		},


		// ------------------------------------------------------------------------
		// used by boid behaviors
		inBoidNeighborhood:function(entity,other,minDistance,maxDistance,cosMaxAngle)
		{

		},


		// ------------------------------------------------------------------------
		// Separation behavior -- determines the direction away from nearby boids
		steerForSeparation:function(entity,maxDistance,cosMaxAngle,flock)
		{

		},


		// ------------------------------------------------------------------------
		// Alignment behavior
		steerForAlignment:function(entity,maxDistance,cosMaxAngle,flock)
		{

		},


		// ------------------------------------------------------------------------
		// Cohesion behavior
		steerForCohesion:function(entity,maxDistance,cosMaxAngle,flock)
		{

		},


		// ------------------------------------------------------------------------
		// pursuit of another vehicle (& version with ceiling on prediction time)
		steerForPursuit:function(entity,targetEntity)
		{

		},

		steerForPursuit:function(entity,targetEntity,maxPredictionTime)
		{

		},

		// ------------------------------------------------------------------------
		// evasion of another vehicle
		steerForEvasion:function(entity, other,maxPredictionTime)
		{

		},


		// ------------------------------------------------------------------------
		// tries to maintain a given speed, returns a maxForce-clipped steering
		// force along the forward/backward axis
		steerForTargetSpeed:function(entity,targetSpeed)
		{

		}
	});
});


