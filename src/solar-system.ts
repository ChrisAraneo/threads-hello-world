import { SOLAR_BODIES } from './solar-bodies';

interface Vector2D {
  x: number;
  y: number;
}

interface TimestampedPosition {
  timestamp: number;
  position: Vector2D;
}

interface CelestialBody {
  name: string;
  position: Vector2D;
  velocity: Vector2D;
  radius: number;
  mass: number;
  trail: TimestampedPosition[];
  isFixed: boolean;
  startingTimestamp: number;
  startingPosition: Vector2D;
  endTimestamp?: number;
  endPosition?: Vector2D;
}

class SolarSystemSimulation {
  private bodies: CelestialBody[] = [];
  private timeStepInSeconds: number = 0.0001;
  private G: number = 6.6743e-11;
  private simulationTimeInSeconds: number = 0;
  private frameCount: number = 0;
  private lastTrailRecordTime: number = 0;
  private trailIntervalSeconds: number = 60;

  constructor() {
    this.initializeBodies();
  }

  private initializeBodies(): void {
    this.bodies = SOLAR_BODIES.map((body) => ({
      ...body,
      startingTimestamp: 0,
      startingPosition: { x: body.position.x, y: body.position.y },
      trail: [],
    }));
  }

  async simulate(seconds: number): Promise<CelestialBody[]> {
    const steps = seconds / this.timeStepInSeconds;

    for (let step = 0; step < steps; step++) {
      this.updatePhysics();
      this.frameCount++;
    }

    for (const body of this.bodies) {
      body.endTimestamp = this.simulationTimeInSeconds;
      body.endPosition = { x: body.position.x, y: body.position.y };
    }

    const result = this.bodies.map((body) => ({ ...body }));

    this.reset();

    return result;
  }

  private calculateGravitationalForce(
    body1: CelestialBody,
    body2: CelestialBody,
  ): Vector2D {
    const dx = body2.position.x - body1.position.x;
    const dy = body2.position.y - body1.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return { x: 0, y: 0 };

    const force = (this.G * body1.mass * body2.mass) / (distance * distance);
    const forceX = force * (dx / distance);
    const forceY = force * (dy / distance);

    return { x: forceX, y: forceY };
  }

  private updatePhysics(): void {
    for (let i = 0; i < this.bodies.length; i++) {
      const body = this.bodies[i];
      if (body.isFixed) continue;

      let totalForceX = 0;
      let totalForceY = 0;

      for (let j = 0; j < this.bodies.length; j++) {
        if (i === j) continue;

        const otherBody = this.bodies[j];
        const force = this.calculateGravitationalForce(body, otherBody);
        totalForceX += force.x;
        totalForceY += force.y;
      }

      const accelerationX = totalForceX / body.mass;
      const accelerationY = totalForceY / body.mass;

      body.velocity.x += accelerationX * this.timeStepInSeconds;
      body.velocity.y += accelerationY * this.timeStepInSeconds;
    }

    for (const body of this.bodies) {
      if (body.isFixed) continue;

      body.position.x += body.velocity.x * this.timeStepInSeconds;
      body.position.y += body.velocity.y * this.timeStepInSeconds;

      if (
        this.simulationTimeInSeconds - this.lastTrailRecordTime >=
        this.trailIntervalSeconds
      ) {
        body.trail.push({
          timestamp: this.simulationTimeInSeconds,
          position: {
            x: body.position.x,
            y: body.position.y,
          },
        });
      }
    }

    if (
      this.simulationTimeInSeconds - this.lastTrailRecordTime >=
      this.trailIntervalSeconds
    ) {
      this.lastTrailRecordTime = this.simulationTimeInSeconds;
    }

    this.simulationTimeInSeconds += this.timeStepInSeconds;
  }

  private reset(): void {
    this.simulationTimeInSeconds = 0;
    this.frameCount = 0;
    this.lastTrailRecordTime = 0;
    this.initializeBodies();
  }
}

export { SolarSystemSimulation, CelestialBody, Vector2D, TimestampedPosition };
