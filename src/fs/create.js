import { promises } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

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