import {readdirSync} from 'fs';
import * as path from 'path';

export interface IFile {
    path: string;
    name: string;
}

export function getJpegsFromFilePath(filePath: string): IFile[] {
    const folderPath = getFolderPathFromFilePath(filePath);
    const _files = [];
    readdirSync(folderPath).forEach(fileName => {
        if (path.extname(fileName).toLowerCase() === '.jpg')
            _files.push({name: fileName, path: path.join(folderPath, fileName)})
    });
    return _files;
}

export function getFolderPathFromFilePath(filePath: string): string{
    return path.dirname(filePath);
}