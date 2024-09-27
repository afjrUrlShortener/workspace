import {directoryExists, resolvePath} from "../utils/utils";
import fs from "node:fs/promises";
import {Repository} from "../types/repository";
import child_process from 'node:child_process';
import * as util from "node:util";

const exec = util.promisify(child_process.exec)

export async function init(repositories: Repository[]) {
    // to avoid race condition while creating the directories, it should be made sequentially
    for (const repository of repositories) {
        const exists = await directoryExists(repository.directories);
        if (exists) continue;
        await fs.mkdir(resolvePath(repository.directories), {recursive: true});
    }

    // cloning all repositories concurrently
    await Promise.all(repositories.map(async (repository) => {
        console.info(`cloning ${repository.sshUrl}`);

        const resolvedPath = resolvePath(repository.directories);
        console.info(`into ${resolvedPath}`);
        console.log('');

        return exec(`git clone ${repository.sshUrl} ${resolvedPath}`);
    }));
}