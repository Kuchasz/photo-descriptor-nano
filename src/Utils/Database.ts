import {writeFileSync, unlinkSync, existsSync, readFileSync} from 'fs';
import {join} from 'path';
import parse = require("csv-parse/lib/sync");

const _newDbFileName = 'db.pdn';
const _oldDbFileName = 'baza.csv';

export function readFromDirectory(directoryPath: string) {
    const _csvDatabasePath = join(directoryPath, _oldDbFileName);
    const _jsonDatabasePath = join(directoryPath, _newDbFileName);
    
    if (existsSync(_csvDatabasePath)) {
        const _csvString = readFileSync(_csvDatabasePath, 'UTF-8');
        const _database = parse(_csvString, {columns: true});
        const _mappedDb = _database.map((item, id) => ({
            id: item.Id,
            path: item.Url,
            tags: item.Tags,
            description: item.Desc
        }));

        writeFileSync(_newDbFileName, JSON.stringify(_mappedDb), {encoding: 'UTF-8'});
        unlinkSync(_csvDatabasePath);

        return combineRecords(_mappedDb);
    } else if (existsSync(_jsonDatabasePath)) {
        const _jsonString = readFileSync(_jsonDatabasePath, 'UTF-8');
        const _database = JSON.parse(_jsonString);
        return combineRecords(_database);
    } else {
        return {};
    }
}

function combineRecords(records: any[]) {
    return records.reduce((l, r) => Object.assign(l, {[r.id]: r}), {});
}