import * as Vue from 'vue';
import Component from 'vue-class-component';
import {getJpegsFromFilePath, getFolderPathFromFilePath} from "../../Utils/File";
@Component({
    template: `
      <div class="folder-selector">
          <md-input-container>
              <label>Wybierz katalog</label>
              <md-file v-on:selected="selected"></md-file>
          </md-input-container>
      </div>
`
})
export class FolderSelector extends Vue {
    files: any[] = [];

    selected(param: FileList) {
        var _file = param.item(0);
        if (_file) this.$emit('files-selected', {
            path: getFolderPathFromFilePath(_file.path),
            files: getJpegsFromFilePath(_file.path)
        }); else this.$emit('files-selected', {
            path: '',
            files: []
        })
    }
}
