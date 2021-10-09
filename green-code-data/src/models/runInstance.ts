export interface SortRun {
    id: string;
    datetime: Date;
    sort: string;
    runs: SizeRun[];
}

export interface SizeRun {
    size: number,
    total_time: number,
    measurements: Measurement[];
}

export interface Measurement {
    label: string;
    unit: string;
    value: number;
}

