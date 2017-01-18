import {open} from 'lwip';
import {dirname, basename} from 'path';
import {mkdir} from 'fs';
import {freemem} from 'os';
import {Observable} from 'rxjs';
import {ipcRenderer} from 'electron';
import {createReadStream} from "fs";
import {createWriteStream} from "fs";
import {IFile} from "./File";


export function processImages(images: any[]) {
    if (images.length > 0) {

        const _dir = dirname(images[0].path);
        const _targetDir = `${_dir}/thumb`;

        Observable
            .bindCallback(mkdir)(_targetDir)
            .mergeMap(() => images)
            .mergeMap(image => Observable.create((subscriber) => {
                console.log('starting...');
                processImageAync(image.path, _targetDir, image.tags, image.id).then(() => subscriber.complete());
            }), 1)
            .subscribe((path) => {
                console.log(freemem());
                console.log(`Image processed: ${path}`);
                global.gc();
            });
    }
}

export function processImageAync(imagePath: string, targetDir: string, tags: string, id: number): Promise<void> {
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

function processImageExternally(imagePath: string, targetDir: string): Promise<void> {
    return new Promise<void>((res, rej) => {
        ipcRenderer.send('process-image', JSON.stringify({imagePath, targetDir}));
        ipcRenderer.on('image-processed', () => {
            res();
        })
    });
}

// export function processImageAsync(imagePath: string, targetDir: string): Promise<void> {
//     return new Promise<void>((res, rej) => {
//         open(imagePath, (err, img) => {
//             img.batch()
//                 .scale(calculateTargetRatio(img.width(), img.height()))
//                 .writeFile(`${targetDir}/${basename(imagePath)}`, (err) => {
//                     console.log(freemem());
//                     if (err)
//                         rej('Image not saved');
//                     res();
//                 });
//
//         });
//     });
// }
//
// function processImage(imagesPaths: string[], targetDir: string, currentPathIndex: number = 0) {
//     const path = imagesPaths[currentPathIndex];
//     open(path, (err, image) => {
//         image.batch()
//             .scale(calculateTargetRatio(image.width(), image.height()))
//             .writeFile(`${targetDir}/${basename(path)}`, (err) => {
//                 console.log(freemem());
//                 if (err)
//                     console.log(err);
//                 else imagesPaths[currentPathIndex + 1] && processImage(imagesPaths, targetDir, currentPathIndex + 1)
//             });
//     });
// };


function calculateTargetRatio(originalWidth: number, originalHeight: number): number {
    return (originalHeight >= originalWidth) ? 1000 / originalHeight : 1000 / originalWidth;
}