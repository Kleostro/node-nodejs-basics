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
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

const createCopyFilesFolder = async (dirname, folderCopyName) => {
    try {
        await promises.mkdir(join(dirname, folderCopyName));
        return true;
    } catch (err) {
        if (err.code === 'EEXIST') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

const copyRecursive = async (sourcePath, destPath) => {
    const stats = await promises.stat(sourcePath);
    if (stats.isFile()) {
        await promises.copyFile(sourcePath, destPath);
    } else if (stats.isDirectory()) {
        await promises.mkdir(destPath, { recursive: true });
        const files = await promises.readdir(sourcePath);
        await Promise.all(files.map(file =>
            copyRecursive(join(sourcePath, file), join(destPath, file))
        ));
    }
};

const copy = async () => {
    const filesFolder = await readFilesFolder(filesFolderPath);
    await createCopyFilesFolder(__dirname, filesCopyFolderName);

    await Promise.all(filesFolder.map(file =>
        copyRecursive(join(filesFolderPath, file), join(__dirname, filesCopyFolderName, file))
    ));
};

await copy().catch((err) => {
    console.error(err.message);
});
