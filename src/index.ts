import { spawn, Thread, Worker } from 'threads';

async function singleThread() {
  const runSimulation = await spawn(new Worker('./workers/run-simulation'));

  await Promise.all([
    runSimulation.runSimulation(3600),
    runSimulation.runSimulation(3600),
    runSimulation.runSimulation(3600),
    runSimulation.runSimulation(3600),
  ]);

  await Thread.terminate(runSimulation);
}

async function multipleThreads() {
  const runSimulation1 = await spawn(new Worker('./workers/run-simulation'));
  const runSimulation2 = await spawn(new Worker('./workers/run-simulation'));
  const runSimulation3 = await spawn(new Worker('./workers/run-simulation'));
  const runSimulation4 = await spawn(new Worker('./workers/run-simulation'));

  await Promise.all([
    runSimulation1.runSimulation(3600),
    runSimulation2.runSimulation(3600),
    runSimulation3.runSimulation(3600),
    runSimulation4.runSimulation(3600),
  ]);

  await Thread.terminate(runSimulation1);
  await Thread.terminate(runSimulation2);
  await Thread.terminate(runSimulation3);
  await Thread.terminate(runSimulation4);
}

async function main() {
  const startTime = process.hrtime();

  await singleThread();

  const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
  console.log('Single thread took ' + elapsedSeconds + 'seconds');

  //

  const startTime2 = process.hrtime();

  await multipleThreads();

  const elapsedSeconds2 = parseHrtimeToSeconds(process.hrtime(startTime2));
  console.log('Multiple threads took ' + elapsedSeconds2 + 'seconds');
}

function parseHrtimeToSeconds(hrtime) {
  var seconds = (hrtime[0] + hrtime[1] / 1e9).toFixed(3);
  return seconds;
}

main().catch(console.error);
