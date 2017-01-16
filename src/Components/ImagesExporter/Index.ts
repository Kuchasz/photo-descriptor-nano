import * as Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    template: `
      <md-layout md-flex class="images-exporter">
        <md-input-container>
            <label>Alias do galerii</label>
            <md-input v-model="galleryAlias" placeholder="Wpisz alias do galerii"></md-input>
        </md-input-container>
        <md-button @click="exportSql" class="md-raised md-primary">Export do SQL</md-button>
      </md-layout>
`
})
export class ImagesExporter extends Vue {
    galleryAlias: string = 'sss';
    exportSql() {
        this.$emit('export-images');
    }
}