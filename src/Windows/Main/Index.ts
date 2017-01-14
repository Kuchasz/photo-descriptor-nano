import * as Vue from 'vue';

import {DescriptionForm} from "../../Components/DescriptionForm/Index";
import {StatusBar} from "../../Components/StatusBar/Index";
import {FolderSelector} from "../../Components/FolderSelector/Index";
import {ImagesList} from "../../Components/ImagesList/Index";
import {ImagePlaceholder} from "../../Components/ImagePlaceholder/Index";
import {IFile} from "../../Utils/File";

Vue.use(require('vue-material'));
Vue.use(require('vue-moment'));

var _app = new Vue({
    el: "#app",
    components: {
        DescriptionForm,
        StatusBar,
        FolderSelector,
        ImagesList,
        ImagePlaceholder
    },
    methods: {
        selectFiles: (e:{files: IFile[], path: string}) => {
            _app.filesAmount = e.files.length;
            _app.folderPath = e.path;
        }
    },
    data: {
        filesAmount: 0,
        folderPath: ''
    }
});