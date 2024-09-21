import { createReadStream } from 'fs';
import { join } from 'path';
import { stdout } from 'process';

const __dirname = new URL('.', import.meta.url).pathname;
const filesFolderName = 'files';
const readFileName = 'fileToRead.txt';
const readFile = join(__dirname, filesFolderName, readFileName);

const read = async () => {
    const readStream = createReadStream(readFile, 'utf-8');
    readStream.on("data", (chunck) => stdout.write(chunck + "\n"))
};

await read();