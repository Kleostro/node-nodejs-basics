import { promises } from 'fs';
import { join, basename } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const filesFolderName = 'files';
const filesFolderPath = join(__dirname, filesFolderName);

const readFilesFolder = async (folderPath) => {
    try {
        const filesFolder = await promises.readdir(folderPath);
        return filesFolder;
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(err);
        }
        return null;
    }
};

const list = async () => {
    const filesFolder = await readFilesFolder(filesFolderPath);
    if (!filesFolder) {
        return;
    }
    const fileNamesArr = filesFolder.map((file) => basename(file));
    const fileNamesList = fileNamesArr.join('\n');

    console.table(fileNamesArr);
    console.log('\n');
    console.log(fileNamesList);
};

await list();