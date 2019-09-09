import axios from 'axios';
import store from './../store';
import { app } from 'electron'
const electron = require('electron').ipcMain;
const os = require("os");
const {download} = require('electron-dl');


const instance = axios.create({
    timeout: 5000,
})

instance.interceptors.request.use(request => {
    const baseUrl = store.getters.getBaseUrl;
    request.url = baseUrl + request.url;
    return request;
})

export const checkForUpdate = (context) => {
    context.webContents.send('startLoading');

    instance.get(`/api/v1/version/check/${app.getVersion()}/${mapOperatingSystemType(os.type())}`)
        .then(response => {
            if (response.data.newVersion) {
                console.log(response.data);
                context.webContents.send('stopLoading');
                context.webContents.send('updateAvailable', response.data);
            } else {
                context.webContents.send('snackbar', {
                    text: 'No new updates found'
                });
            }
          
        }, error => {
            console.log(error);
            context.webContents.send('snackbar', {
                text: 'Failed when retrieving for updates'
            });
        })
}

export const downloadUpdate = (context, url) => {
    download(context, url)
    context.webContents.send('snackbar', {
        text: 'Download has started'
    });
}

/**
 * Maps the types that are returned from os.type to 'normal' OS names
 * @param {*} type 
 */
const mapOperatingSystemType = (type) => {
    console.log(type);
    if (type.toLowerCase() === 'darwin') {
        return 'macos'
    } 
    if (type.toLowerCase() === 'win32' || type.toLowerCase() == 'win64') {
        return 'windows'
    }
}
