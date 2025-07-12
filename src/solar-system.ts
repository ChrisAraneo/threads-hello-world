import { SOLAR_BODIES } from './solar-bodies';

interface Vector2D {
  x: number;
  y: number;
}

interface CelestialBody {
  name: string;
  position: Vector2D;
  velocity: Vector2D;
  radius: number;
  mass: number;
  trail: Vector2D[];
  isFixed: boolean;
}

class SolarSystemSimulation {
  private bodies: CelestialBody[] = SOLAR_BODIES;
  private timeStep: number = 0.01;
  private G: number = 6.6743e-11;
  private scale: number = 1e-9;
  private maxTrailLength: number = 50;
  private simulationTime: number = 0;
  private frameCount: number = 0;

  constructor() {}

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

      body.velocity.x += accelerationX * this.timeStep;
      body.velocity.y += accelerationY * this.timeStep;
    }

    for (const body of this.bodies) {
      if (body.isFixed) continue;

      body.position.x += body.velocity.x * this.timeStep;
      body.position.y += body.velocity.y * this.timeStep;

      body.trail.push({
        x: body.position.x,
        y: body.position.y,
      });

      if (body.trail.length > this.maxTrailLength) {
        body.trail.shift();
      }
    }

    this.simulationTime += this.timeStep;
  }

  public async simulate(steps: number = 1000): Promise<void> {
    for (let step = 0; step < steps; step++) {
      this.updatePhysics();
      this.frameCount++;
    }
  }

  public getSystemData(): CelestialBody[] {
    return this.bodies.map((body) => ({ ...body }));
  }

  public getSimulationTime(): number {
    return this.simulationTime;
  }

  public getFrameCount(): number {
    return this.frameCount;
  }

  public getBodyByName(name: string): CelestialBody | undefined {
    const body = this.bodies.find((b) => b.name === name);
    return body ? { ...body } : undefined;
  }

  public getDistanceBetweenBodies(name1: string, name2: string): number {
    const body1 = this.bodies.find((b) => b.name === name1);
    const body2 = this.bodies.find((b) => b.name === name2);

    if (!body1 || !body2) return 0;

    const dx = body2.position.x - body1.position.x;
    const dy = body2.position.y - body1.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public getSystemStats(): {
    totalMass: number;
    centerOfMass: Vector2D;
    totalKineticEnergy: number;
    totalPotentialEnergy: number;
  } {
    let totalMass = 0;
    let centerX = 0;
    let centerY = 0;
    let totalKineticEnergy = 0;
    let totalPotentialEnergy = 0;

    for (const body of this.bodies) {
      totalMass += body.mass;
      centerX += body.position.x * body.mass;
      centerY += body.position.y * body.mass;

      const speed = Math.sqrt(
        body.velocity.x * body.velocity.x + body.velocity.y * body.velocity.y,
      );
      totalKineticEnergy += 0.5 * body.mass * speed * speed;
    }

    centerX /= totalMass;
    centerY /= totalMass;

    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const body1 = this.bodies[i];
        const body2 = this.bodies[j];
        const distance = this.getDistanceBetweenBodies(body1.name, body2.name);

        if (distance > 0) {
          totalPotentialEnergy -= (this.G * body1.mass * body2.mass) / distance;
        }
      }
    }

    return {
      totalMass,
      centerOfMass: { x: centerX, y: centerY },
      totalKineticEnergy,
      totalPotentialEnergy,
    };
  }

  public reset(): void {
    this.simulationTime = 0;
    this.frameCount = 0;
    this.bodies = SOLAR_BODIES;
  }
}

export { SolarSystemSimulation, CelestialBody, Vector2D };
