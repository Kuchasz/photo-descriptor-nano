import * as electron from 'electron';

import {format} from 'url';
import {join} from 'path';
import {ipcMain} from 'electron';
import * as cc from 'child_process';
import {processImageAsync} from "./Utils/Image";

var app = electron.app;

app.on('ready', () => {

    var _url = format({
        pathname: join(__dirname, 'Windows/Main/View.html'),
        protocol: 'file:',
        slashes: true
    });

    var _window = new electron.BrowserWindow({width: 800, height: 600});
    _window.loadURL(_url);

});

ipcMain.on('process-image', (evt, arg) => {
    const _arg = JSON.parse(arg);
    processImageAsync(_arg.imagePath, _arg.targetDir).then(() => {
        evt.sender.send('image-processed');
    })
});