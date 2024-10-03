import { createReadStream } from 'fs';
import { stdout } from 'process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const readFileName = 'fileToRead.txt';
const readFile = join(__dirname, filesFolderName, readFileName);

const read = async () => {
    const readStream = createReadStream(readFile, 'utf-8');
    readStream.on("data", (chunck) => stdout.write(chunck + "\n"))
};

await read();