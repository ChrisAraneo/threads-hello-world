import { SolarSystemSimulation } from './solar-system';

async function main(): Promise<void> {
  const simulation = new SolarSystemSimulation();

  try {
    await simulation.simulate(2000);

    const systemData = simulation.getSystemData();
    console.log('Final system state:', JSON.stringify(systemData, null, 2));
  } catch (error) {
    console.error('Simulation error:', error);
  }
}

process.on('SIGINT', () => {
  process.exit(0);
});

main().catch(console.error);
