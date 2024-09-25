import { promises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const readFileName = 'fileToRead.txt';
const readFile = join(__dirname, filesFolderName, readFileName);

const read = async () => {
    try {
        await promises.access(readFile);
        const fileContent = await promises.readFile(readFile, 'utf-8');
        console.log(fileContent);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(err);
        }
    }
};

await read();