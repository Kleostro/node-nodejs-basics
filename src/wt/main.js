import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const fileWorkerName = 'worker.js';
const fileWorker = join(__dirname, fileWorkerName);
const numCPUs = cpus().length;
const initialCounter = 10;

const createWorker = (counter) => {
    const worker = new Worker(fileWorker);
    worker.postMessage(counter);
    return new Promise((resolve) => {
        worker.on('message', (value) => resolve({ status: 'resolved', data: value }));
        worker.on('error', () => resolve({ status: 'error', data: null }));
    });
};

const performCalculations = async () => {
    const workers = Array.from({ length: numCPUs }, (_, i) => createWorker(initialCounter + i));
    const results = await Promise.allSettled(workers);
    console.log('Array of results: \n');
    console.log(results.map((result) => result.value));
    console.log('\n');
    console.log('List of results: \n');
    results.forEach((result) => console.log(result.value));
};

await performCalculations();