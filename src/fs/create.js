import { promises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const newFileName = 'fresh.txt';
const newFile = join(__dirname, filesFolderName, newFileName);

const create = async () => {
    try {
        await promises.access(newFile);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await promises.writeFile(newFile, 'I am fresh and young');
        } else {
            throw err;
        }
    }
};

await create().catch((err) => {
    console.error(err.message);
});
