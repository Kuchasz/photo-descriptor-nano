import {open} from 'lwip';
import {dirname, basename} from 'path';
import {mkdir} from 'fs';
import {freemem} from 'os';
import {Observable} from 'rxjs';
import {ipcRenderer} from 'electron';
import {createReadStream} from "fs";
import {createWriteStream} from "fs";
import {IFile} from "./File";
import {writeFileSync} from "fs";


export function processImagesExternally(images: any[], onProgress: {(progress: number): void}) {

    ipcRenderer.send('process-images', JSON.stringify(images));
    ipcRenderer.on('image-processed', (sender, progress: number) => {
        onProgress(progress);
    });
}

export function processImages(images: any[], onProgress: {(progress: number): void}): Promise<void> {
    return new Promise<void>((res, rej) => {
        if (images.length > 0) {

            const _maxImages = images.length;
            let currentImageIndex = 0;

            const _dir = dirname(images[0].path);
            const _targetDir = `${_dir}/thumb`;

            Observable
                .bindCallback(mkdir)(_targetDir)
                .mergeMap(() => images)
                .mergeMap(image => Observable.fromPromise(copyImageAsync(image.path, _targetDir, image.tags, image.id)))
                .subscribe((path) => {
                    currentImageIndex++;
                    onProgress(currentImageIndex / _maxImages * 100);
                    if (currentImageIndex === (_maxImages-1)) {
                        const _queries = images.map(image => {
                            const photoUrl = `${image.tags.split(' ').map(tag => tag.toLocaleLowerCase()).join('-')}-${image.id}.jpg`;
                            return `INSERT INTO photo(GalleryId, photourl, alttext) VALUES ([GalleryId],${photoUrl},${image.description})`;
                        }).reduce((l, r) => {
                            return l + '; ' + r;
                        }, '');

                        writeFileSync(`${_targetDir}/sql.txt`, _queries);

                        res();
                    }
                });
        } else
            res();
    });
}

export function copyImageAsync(imagePath: string, targetDir: string, tags: string, id: number): Promise<void> {
    return new Promise<void>((res, rej) => {
        copyFile(imagePath, `${targetDir}/${tags.split(' ').map(tag => tag.toLocaleLowerCase()).join('-')}-${id}.jpg`, (err) => {
            err && rej(err);
            res();
        });
    });
}

function copyFile(source, target, cb) {
    let cbCalled = false;

    const rd = createReadStream(source);
    rd.on("error", function (err) {
        done(err);
    });
    const wr = createWriteStream(target);
    wr.on("error", function (err) {
        done(err);
    });
    wr.on("close", function (ex) {
        done();
    });
    rd.pipe(wr);

    function done(err?) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}