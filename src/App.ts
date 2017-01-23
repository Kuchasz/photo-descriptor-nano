import * as electron from 'electron';

import {format} from 'url';
import {join} from 'path';

import {processImages} from "./Utils/Image";
import {writeFile} from "fs";

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

electron.ipcMain.on('process-images', (event, arg) => {

    const _images = JSON.parse(arg);

    processImages(_images, (progress) => {
        event.sender.send('image-processed', progress);
    });

});