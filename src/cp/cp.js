import { join } from 'path';
import { spawn } from 'child_process';

const __dirname = new URL('.', import.meta.url).pathname;
const filesFolderName = 'files';
const scriptFileName = 'script.js';
const scriptFileNamePath = join(__dirname, filesFolderName, scriptFileName);

const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [scriptFileNamePath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe'],
    });

    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);
    return childProcess;
};

spawnChildProcess(['someArgument1', 'someArgument2']);

