const prefix = 'RSS_';
const parseEnv = () => {
    const envWithPrefixResult = Object.keys(process.env)
        .filter(key => key.startsWith(prefix))
        .map(key => `${key}=${process.env[key]}`)
        .join('\n');

    console.log(envWithPrefixResult);
};

parseEnv();