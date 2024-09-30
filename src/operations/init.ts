import {directoryExists, execAsync, resolvePath} from "../utils/utils";
import fs from "node:fs/promises";
import {Repository} from "../types/repository";

export async function init(repositories: Repository[]) {
    const mappedRepositories = repositories.map(x => {
        return {
            ...x,
            shouldClone: true
        };
    });

    // to avoid race condition while creating the directories, it should be made sequentially
    for (const repository of mappedRepositories) {
        const exists = await directoryExists(repository.directories);
        if (exists) {
            repository.shouldClone = false;
            continue;
        }

        await fs.mkdir(resolvePath(repository.directories), {recursive: true});
    }

    // cloning all repositories concurrently
    return Promise.all(mappedRepositories.filter(x => x.shouldClone).map(async (repository) => {
        console.info(`cloning ${repository.sshUrl}`);

        const resolvedPath = resolvePath(repository.directories);
        console.info(`into ${resolvedPath}`);
        console.log('');

        return execAsync(`git clone ${repository.sshUrl} ${resolvedPath}`);
    }));
}