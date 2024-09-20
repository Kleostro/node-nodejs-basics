const parseArgs = () => {
    const args = process.argv.slice(2);
    args.forEach((arg, index) => {
        if (arg.startsWith('--')) {
            const propName = arg.replace('--', '');
            const value = args[index + 1];
            console.log(`${propName} is ${value}`);
        }
    })
};

parseArgs();