import {signal} from "@preact/signals-react";

export const workers = signal<string[]>([])

export const workerIndex = signal<number|null>(null)