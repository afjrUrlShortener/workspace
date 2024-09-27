import {Repository} from "./types/repository";
import {args} from "./utils/utils";
import {init} from "./operations/init";
import {pull} from "./operations/pull";
import {prune} from "./operations/prune";

const repositories: Repository[] = [
    {
        sshUrl: 'git@github.com:afjrUrlShortener/urlshortener-backend.git',
        directories: ['repositories', 'urlshortener-backend']
    },
    {
        sshUrl: 'git@github.com:afjrUrlShortener/urlshortener-frontend.git',
        directories: ['repositories', 'urlshortener-frontend']
    },
    {
        sshUrl: 'git@github.com:afjrUrlShortener/watcher.git',
        directories: ['repositories', 'watcher']
    }
];

async function main() {
    if (args.includes('--init')) {
        await init(repositories);
        console.info('all repositories were cloned');
        return;
    }

    if (args.includes('--pull')) {
        await pull(repositories);
        console.info('all repositories were pulled');
        return;
    }

    if (args.includes('--prune')) {
        await prune(repositories);
        console.info('all repositories were removed');
        return;
    }
}

await main();
