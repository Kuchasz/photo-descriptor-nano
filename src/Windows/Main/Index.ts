import * as Vue from 'vue';

import {DescriptionForm} from "../../Components/DescriptionForm/Index";
import {StatusBar} from "../../Components/StatusBar/Index";
import {FolderSelector} from "../../Components/FolderSelector/Index";
import {ImagesList} from "../../Components/ImagesList/Index";
import {ImagePlaceholder} from "../../Components/ImagePlaceholder/Index";
import {IFile, getFileUrl} from "../../Utils/File";
import {readFromDirectory, saveToDirectoryAsync} from "../../Utils/Database";
import {ImagesExporter} from "../../Components/ImagesExporter/Index";
import {processImages, processImagesExternally} from "../../Utils/Image";

Vue.use(require('vue-material'));
Vue.use(require('vue-moment'));

var _app = new Vue({
    el: "#app",
    components: {
        DescriptionForm,
        StatusBar,
        FolderSelector,
        ImagesList,
        ImagePlaceholder,
        ImagesExporter
    },
    computed: {
        allImagesCount: function () {
            return this.images.length;
        },
        validImagesCount: function () {
            return this.images.filter(im => (im.tags && im.description)).length;
        }
    },
    methods: {
        selectDirectory: (e: {files: IFile[], path: string}) => {
            _app.folderPath = e.path;

            const _db = readFromDirectory(e.path);

            const _merged = e.files.map((file, id) => ({
                id,
                path: file.path,
                url: getFileUrl(file.path),
                name: file.name,
                tags: (_db.find(r => r.path === file.path) || {tags: ""}).tags,
                description: (_db.find(r => r.path === file.path) || {description: ""}).description,
            }));

            _app.images = _merged;
        },
        selectImage: (imageId: number) => {
            _app.currentImage = _app.images.find(im => im.id === imageId);
        },
        updateDescription: (description: string) => {
            if (_app.currentImage) {
                _app.currentImage.description = description;
            }
        },
        updateTags: (tags: string) => {
            _app.currentImage.tags = tags;
        },
        exportImages: () => {
            processImagesExternally(_app.images, (progress: number)=>{
                _app.imagesProcessingProgress = Math.floor(progress);
                if(progress===100)_app.imagesProcessingProcess = 0;
            });
        }
    },
    data: {
        folderPath: '',
        currentImage: {},
        images: [],
        _images: [],
        lastSaveDate: new Date(),
        savingData: false,
        imagesProcessingProgress: 0
    }
});

setInterval(() => {
    if (_app.folderPath === "") return;
    _app.savingData = true;
    saveToDirectoryAsync(_app.folderPath, _app.images).then(() => {
        _app.savingData = false;
        _app.lastSaveDate = new Date();
    });
}, 10000);