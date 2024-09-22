import { createGzip } from 'zlib';
import { createReadStream, createWriteStream, promises } from 'fs';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const filesFolderName = 'files';
const fileToCompressName = 'fileToCompress.txt';
const compressedFileName = 'archive.gz';
const fileToCompress = join(__dirname, filesFolderName, fileToCompressName);
const compressedFile = join(__dirname, filesFolderName, compressedFileName);

const compress = async () => {
    try {
        await promises.access(fileToCompress);

        const gzip = createGzip();
        const readStream = createReadStream(fileToCompress);
        const writeStream = createWriteStream(compressedFile);

        readStream.pipe(gzip).pipe(writeStream);

        writeStream.on('finish', async () => {
            console.log('\x1b[32mCompression successful!');
            await promises.unlink(fileToCompress);
        });
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Compression failed');
        } else {
            console.error(err);
        }
    }
};

await compress();