import { expose } from "threads/worker"
import { SolarSystemSimulation } from "../solar-system";

expose({
    async runSimulation(seconds) {
        return await new SolarSystemSimulation().simulate(seconds);
    }
});