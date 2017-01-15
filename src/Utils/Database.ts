import {writeFileSync, writeFile, unlinkSync, existsSync, readFileSync} from 'fs';
import {join} from 'path';
import parse = require("csv-parse/lib/sync");
import {isNullOrUndefined} from "util";

const _newDbFileName = 'db.pdn';
const _oldDbFileName = 'baza.csv';

export function readFromDirectory(directoryPath: string) {
    const _csvDatabasePath = join(directoryPath, _oldDbFileName);
    const _jsonDatabasePath = join(directoryPath, _newDbFileName);

    if (existsSync(_csvDatabasePath)) {
        const _csvString = readFileSync(_csvDatabasePath, 'UTF-8');
        const _oldSchemaRecords = parse(_csvString, {columns: true});
        const _newSchemaRecords = _oldSchemaRecords.map((item, id) => ({
            id: item.Id,
            path: item.Url,
            tags: item.Tags,
            description: item.Desc
        }));

        saveToDirectory(directoryPath, _newSchemaRecords);

        unlinkSync(_csvDatabasePath);

        return _newSchemaRecords;
    } else if (existsSync(_jsonDatabasePath)) {
        const _jsonString = readFileSync(_jsonDatabasePath, 'UTF-8');
        const _newSchemaRecords = JSON.parse(_jsonString);
        return _newSchemaRecords;
    } else {
        return [];
    }
}

export function saveToDirectoryAsync(directoryPath: string, newSchemaRecords: any[]): Promise<void> {
    return new Promise<void>((res, rej) => {
        writeFile(getNewDbPath(directoryPath), JSON.stringify(newSchemaRecords), (err) => {
            if (isNullOrUndefined(err))
                res();
            else
                rej();
        });
    });
}

export function saveToDirectory(directoryPath: string, newSchemaRecords: any[],) {
    writeFileSync(getNewDbPath(directoryPath), JSON.stringify(newSchemaRecords), {encoding: 'UTF-8'});
}

function getNewDbPath(directoryPath: string) {
    return join(directoryPath, _newDbFileName)
};