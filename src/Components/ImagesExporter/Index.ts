import * as Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    template: `
      <md-layout md-flex class="images-exporter">
        <md-input-container>
            <label>Alias do galerii</label>
            <md-input v-model="galleryAlias" placeholder="Wpisz alias do galerii"></md-input>
        </md-input-container>
        <md-button @click="exportImages" class="md-raised md-primary">Exportuj zdjęcia</md-button>
        <md-spinner :md-progress="progress"></md-spinner>
      </md-layout>
`,
    props: {
        progress: Number
    }
})
export class ImagesExporter extends Vue {
    galleryAlias: string = 'sss';
    exportImages() {
        this.$emit('export-images');
    }
}