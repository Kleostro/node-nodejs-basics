import { createInterface } from 'readline';
import process from 'process';
import { Transform } from 'stream';

const input = createInterface({
    input: process.stdin,
    output: process.stdout
});

const reverseTransform = new Transform({
    transform(chunk, _, callback) {
        const reversed = chunk.toString().split('').reverse().join('');
        callback(null, reversed);
    }
});

const transform = async () => {
    process.stdout.write('Hi! Print something: \n');
    input.on('line', (message) => reverseTransform.write(message + '\n'));
};

reverseTransform.pipe(process.stdout);

await transform();