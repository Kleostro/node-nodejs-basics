import { promises } from 'fs';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const filesFolderName = 'files';
const beforeRenameFileName = 'wrongFilename.txt';
const afterRenameFileName = 'renamedFile.md';
const renamedFile = join(__dirname, filesFolderName, beforeRenameFileName);

const rename = async () => {
    try {
        await promises.access(renamedFile);
        await promises.rename(renamedFile, join(__dirname, filesFolderName, afterRenameFileName));
    } catch (err) {
        console.error('FS operation failed');
    }
};

await rename();