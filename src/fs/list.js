import { promises } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const filesFolderPath = join(__dirname, filesFolderName);

const readFilesFolder = async (folderPath) => {
    try {
        const filesFolder = await promises.readdir(folderPath);
        return filesFolder;
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

const list = async () => {
    const filesFolder = await readFilesFolder(filesFolderPath);
    const fileNamesArr = filesFolder.map((file) => basename(file));
    const fileNamesList = fileNamesArr.join('\n');

    console.table(fileNamesArr);
    console.log('\n');
    console.log(fileNamesList);
};

await list().catch((err) => {
    console.error(err.message);
});
