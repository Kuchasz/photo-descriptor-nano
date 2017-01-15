import * as Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    template: `
      <md-layout md-flex class="images-exporter">
        <md-button @click="exportSql" class="md-raised md-primary">Export do SQL</md-button>
      </md-layout>
`
})
export class ImagesExporter extends Vue {
    exportSql() {
        this.$emit('export-images');
    }
}