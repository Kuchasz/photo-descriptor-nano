import * as electron from 'electron';

import {format} from 'url';
import {join} from 'path';

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