import {Repository} from "../types/repository";
import {execAsync, resolvePath} from "../utils/utils";

export async function git(repositories: Repository[], command: string) {
    return Promise.all(repositories.map(async (repository) => {
        const resolvedPath = resolvePath(repository.directories);
        console.info(`executing command "${command}" at ${resolvedPath}`);
        try {
            const executed = await execAsync(command, {cwd: resolvedPath});
            console.info(`executed "${command}" at ${resolvedPath}`);
            console.info(executed.stdout);
        } catch (e) {
            console.info(`executed "${command}" at ${resolvedPath}`);
            console.error(e);
        }
        console.log('================================');
    }));
}