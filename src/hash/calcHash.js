import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const fileName = 'fileToCalculateHashFor.txt';
const file = join(__dirname, filesFolderName, fileName);

const calculateHash = async () => {
    const hash = createHash('sha256');
    const fileStream = createReadStream(file);

    fileStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    fileStream.on('end', () => {
        const hashHex = hash.digest('hex');
        console.log(hashHex);
    });
};

await calculateHash();