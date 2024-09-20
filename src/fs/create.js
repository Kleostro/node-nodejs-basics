import { promises } from 'fs';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');

    try {
        await promises.access(filePath);
        console.error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await promises.writeFile(filePath, 'I am fresh and young');
        } else {
            console.error(err);
        }
    }
};

await create();