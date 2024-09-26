import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filesFolderName = 'files';
const scriptFileName = 'script.js';
const scriptFileNamePath = join(__dirname, filesFolderName, scriptFileName);
const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [scriptFileNamePath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit'],
    });

    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);

    return new Promise((resolve, reject) => {
        childProcess.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Child process exited with code ${code}`));
            }
        });
    });
};

spawnChildProcess(['someArgument1', 'someArgument2']).catch(console.error);