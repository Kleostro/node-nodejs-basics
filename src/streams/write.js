import { createWriteStream } from 'fs';
import { createInterface } from 'readline';
import process from 'process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const writeFileName = 'fileToWrite.txt';
const writeFile = join(__dirname, filesFolderName, writeFileName);
const input = createInterface(process.stdin);
const output = createWriteStream(writeFile, 'utf-8');

const write = async () => {
    process.stdout.write('Hi! Print something: \n');
    input.on('line', (message) => output.write(message + '\n'));
};

await write();