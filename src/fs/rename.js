import { promises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const beforeRenameFileName = 'wrongFilename.txt';
const afterRenameFileName = 'renamedFile.md';
const renamedFile = join(__dirname, filesFolderName, beforeRenameFileName);

const rename = async () => {
    try {
        await promises.access(renamedFile);
        await promises.rename(renamedFile, join(__dirname, filesFolderName, afterRenameFileName));
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await rename().catch((err) => {
    console.error(err.message);
});
