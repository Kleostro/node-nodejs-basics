import { release, version } from 'os';
import { createServer } from 'http';
import { promises } from 'fs';
import { path } from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const aFileName = 'a.json';
const bFileName = 'b.json';
const aFilePath = path.join(__dirname, filesFolderName, aFileName);
const bFilePath = path.join(__dirname, filesFolderName, bFileName);
const a = await promises.readFile(aFilePath, 'utf-8');
const b = await promises.readFile(bFilePath, 'utf-8');

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = a;
} else {
    unknownObject = b;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

const myServer = createServer((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};