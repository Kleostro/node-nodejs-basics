import { promises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const filesCopyFolderName = 'files_copy';
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

const createCopyFilesFolder = async (dirname, folderCopyName) => {
    try {
        await promises.mkdir(join(dirname, folderCopyName));
        return true;
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.error('FS operation failed');
        } else {
            console.error(err);
        }
        return false;
    }
};

const copy = async () => {
    const filesFolder = await readFilesFolder(filesFolderPath);
    if (!filesFolder) {
        return;
    }

    const copyFilesFolder = await createCopyFilesFolder(__dirname, filesCopyFolderName);
    if (!copyFilesFolder) {
        return;
    }
    await Promise.all(filesFolder.map((file) => promises.copyFile(join(filesFolderPath, file), join(__dirname, filesCopyFolderName, file))));
};

await copy();
