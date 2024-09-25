
import { promises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const deletedFileName = 'fileToRemove.txt';
const deletedFile = join(__dirname, filesFolderName, deletedFileName);

const remove = async () => {
    try {
        await promises.access(deletedFile);
        await promises.rm(deletedFile);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(err);
        }
    }
};

await remove();