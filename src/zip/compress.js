import { createGzip } from 'zlib';
import { createReadStream, createWriteStream, promises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
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
            throw new Error('Compression failed');
        } else {
            throw err;
        }
    }
};

await compress().catch((err) => {
    console.error(err.message);
});