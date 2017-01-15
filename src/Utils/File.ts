import {readdirSync} from 'fs';
import {join, extname, dirname, resolve} from 'path';
import {format} from 'url';

export interface IFile {
    path: string;
    name: string;
    url: string;
}

function getFileUrl(str) {
    if (typeof str !== 'string') {
        throw new Error('Expected a string');
    }

    var pathName = resolve(str).replace(/\\/g, '/');

    if (pathName[0] !== '/') {
        pathName = '/' + pathName;
    }

    return encodeURI('file://' + pathName);
};

export function getJpegsFromFilePath(filePath: string): IFile[] {
    const folderPath = getFolderPathFromFilePath(filePath);
    const _files = [];
    readdirSync(folderPath).forEach(fileName => {
        if (extname(fileName).toLowerCase() === '.jpg')
            _files.push({
                name: fileName, path: join(folderPath, fileName), url: getFileUrl(join(folderPath, fileName))
            })
    });
    return _files;
}

export function getFolderPathFromFilePath(filePath: string): string {
    return dirname(filePath);
}