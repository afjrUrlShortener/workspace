import {args, getRepositories} from "./utils/utils";
import {init} from "./operations/init";
import {git} from "./operations/git";

async function main() {
    const repositories = await getRepositories();

    if (args.includes('--init')) {
        await init(repositories);
        console.info('all repositories were cloned');
        return;
    }

    await git(repositories, `git ${args.join(' ')}`);
}

await main();
