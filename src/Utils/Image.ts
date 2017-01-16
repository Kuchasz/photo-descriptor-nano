import {open} from 'lwip';
import {dirname, basename} from 'path';
import {mkdir} from 'fs';
import {freemem} from 'os';

export function processImages(imagesPaths: string[]) {
    if (imagesPaths.length > 0) {
        const _dir = dirname(imagesPaths[0]);
        const _targetDir = `${_dir}/thumb`;
        mkdir(_targetDir, (err) => {
            if (err)return;
            processImage(imagesPaths, _targetDir);
            // imagesPaths.forEach(path => {
            //     open(path, (err, image) => {
            //         console.log(`file-opened: ${basename(path)}`);
            //         image.scale(calculateTargetRatio(image.width(), image.height()), (err, image) => {
            //             console.log(`file-cropped: ${basename(path)}`);
            //             image.writeFile(`${_targetDir}/${basename(path)}`, (err, image) => {
            //                 console.log(`file-written: ${basename(path)}`);
            //             });
            //         });
            //     });
            // });
        })
    }
}

function processImage(imagesPaths: string[], targetDir: string, currentPathIndex: number = 0) {
    const path = imagesPaths[currentPathIndex];
    open(path, (err, image) => {
        image.batch()
            .scale(calculateTargetRatio(image.width(), image.height()))
            .writeFile(`${targetDir}/${basename(path)}`, (err) => {
                console.log(freemem());
                if (err)
                    console.log(err);
                else imagesPaths[currentPathIndex + 1] && processImage(imagesPaths, targetDir, currentPathIndex + 1)
            });
    });
};


function calculateTargetRatio(originalWidth: number, originalHeight: number): number {
    return (originalHeight >= originalWidth) ? 1000 / originalHeight : 1000 / originalWidth;
}