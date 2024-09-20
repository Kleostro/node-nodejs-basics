
import { promises } from 'fs';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const filesFolderName = 'files';
const deletedFileName = 'fileToRemove.txt';
const deletedFile = join(__dirname, filesFolderName, deletedFileName);

const remove = async () => {
    try {
        await promises.access(deletedFile);
        await promises.unlink(deletedFile);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(err);
        }
    }
};

await remove();