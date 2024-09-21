import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const filesFolderName = 'files';
const fileToCompressName = 'fileToCompress.txt';
const compressedFileName = 'archive.gz';
const fileToCompress = join(__dirname, filesFolderName, fileToCompressName);

const compress = async () => {
    const gzip = createGzip();
    const readStream = createReadStream(fileToCompress);
    const writeStream = createWriteStream(join(__dirname, filesFolderName, compressedFileName));

    pipeline(readStream, gzip, writeStream, (err) => {
        if (err) {
            console.error('Compression failed:', err);
        } else {
            console.log('Compression successful!');
        }
    });
};

await compress();