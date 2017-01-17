import {open} from 'lwip';
import {dirname, basename} from 'path';
import {mkdir} from 'fs';
import {freemem} from 'os';
import {Observable} from 'rxjs';

export function processImages(imagesPaths: string[]) {
    if (imagesPaths.length > 0) {

        const _dir = dirname(imagesPaths[0]);
        const _targetDir = `${_dir}/thumb`;

        Observable
            .bindCallback(mkdir)(_targetDir)
            .mergeMap(() => imagesPaths)
            // .mergeMap(path => Observable.fromPromise(processImageAsync(path, _targetDir)), 1)
            .mergeMap(path => Observable.create((subscriber) => {
                console.log('starting...');
                processImageAsync(path, _targetDir).then(() => subscriber.complete());
            }), 1)
            .subscribe((path) => {
                console.log(freemem());
                console.log(`Image processed: ${path}`);
            });
    }
}

function processImageAsync(imagePath: string, targetDir: string): Promise<void> {
    return new Promise<void>((res, rej) => {
        open(imagePath, (err, img) => {
            img.batch()
                .scale(calculateTargetRatio(img.width(), img.height()))
                .writeFile(`${targetDir}/${basename(imagePath)}`, (err) => {
                    console.log(freemem());
                    if (err)
                        rej('Image not saved');
                    res();
                });
        });
    });
}
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