import { Measurement, SizeRun, SortRun } from "../models/runInstance";

export const KILLOWATT_GRAM_CARBON_RATIO = 238;
export const CPU_ENERGY_LABEL = 'CPU Energy';

export function carbonUsed(killoWatts: number) { 
    return killoWatts * KILLOWATT_GRAM_CARBON_RATIO;
}

function getValidMeasures(sortRun: SortRun, label: string): Measurement[] {
    return sortRun.runs
        .flatMap(run => run.measurements)
        .filter(measure => measure.label === label);
}

export function avgMeasurement(sortRun: SortRun, label: string): number {
    const validMeasures = getValidMeasures(sortRun, label);
    
    return validMeasures.reduce((a, b) => a + b.value , 0) / validMeasures.length;
}

export function sumMeasurement(sortRun: SortRun, label: string): number {
    return getValidMeasures(sortRun, label).reduce((a, b) => a + b.value , 0);
}

export function calculateCarbonForSizeRun(sizeRun: SizeRun): number {
    return carbonUsed(sizeRun.measurements.find(measure => measure.label === CPU_ENERGY_LABEL)?.total ?? 0) / 1e+6;
}

export function calculateCarbonForSort(sortRun: SortRun): number {
    return sortRun.runs.reduce((a, b) => a + calculateCarbonForSizeRun(b), 0);
}

export function calculateCarbonForSeries(sortRuns: SortRun[]): number {
    return sortRuns.reduce((a, b) => a + calculateCarbonForSort(b), 0);
}