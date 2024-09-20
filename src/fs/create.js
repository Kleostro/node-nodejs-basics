import { promises } from 'fs';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const filesFolderName = 'files';
const newFileName = 'fresh.txt';
const newFile = join(__dirname, filesFolderName, newFileName);

const create = async () => {
    try {
        await promises.access(newFile);
        console.error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await promises.writeFile(newFile, 'I am fresh and young');
        } else {
            console.error(err);
        }
    }
};

await create();