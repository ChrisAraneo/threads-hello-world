import { SolarSystemSimulation } from './solar-system';

async function main(): Promise<void> {
  const simulation = new SolarSystemSimulation();
  const earthDayInSeconds = 3600 * 2;

  const systemData = await simulation.simulate(earthDayInSeconds);

  console.log(JSON.stringify(systemData, null, 2));
}

process.on('SIGINT', () => {
  process.exit(0);
});

main().catch(console.error);
