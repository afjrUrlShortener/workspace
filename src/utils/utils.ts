import path from "node:path";
import * as fs from "node:fs/promises";
import util from "node:util";
import child_process from "node:child_process";
import {Repository} from "../types/repository";

export const execAsync = util.promisify(child_process.exec);

export async function getRepositories() {
    const file = await fs.readFile(resolvePath(['repositories.json']), 'utf8');
    return JSON.parse(file) as Repository[];
}

export const args = process.argv.slice(2);

export function resolvePath(p: string[]) {
    return path.resolve(process.cwd(), ...p);
}

// will always work inside the context of the project directories
export async function directoryExists(dirPath: string[]) {
    const resolvedPath = resolvePath(dirPath);

    try {
        await fs.access(resolvedPath, fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (err) {
        return false;
    }
}