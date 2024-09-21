import { createGunzip } from 'zlib';
import { createReadStream, createWriteStream, promises } from 'fs';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const filesFolderName = 'files';
const fileToCompressName = 'fileToCompress.txt';
const compressedFileName = 'archive.gz';
const fileToCompress = join(__dirname, filesFolderName, fileToCompressName);
const compressedFile = join(__dirname, filesFolderName, compressedFileName);

const decompress = async () => {
    try {
        await promises.access(compressedFile);

        const gunzip = createGunzip();
        const readStream = createReadStream(compressedFile);
        const writeStream = createWriteStream(fileToCompress);

        readStream.pipe(gunzip).pipe(writeStream);

        writeStream.on('finish', async () => {
            console.log('\x1b[32mDecompression successful!');
            await promises.unlink(compressedFile);
        });
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Decompression failed');
        } else {
            console.error(err);
        }
    }
};

await decompress();