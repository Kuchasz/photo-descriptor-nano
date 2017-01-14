import * as Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    template: `
      <md-layout md-flex class="image-placeholder">
        <div v-bind:style="{ backgroundImage: fullSource }"></div>
      </md-layout>
`
})
export class ImagePlaceholder extends Vue {
    src: string = `file:///F:/15 06 2013/21x15/8877d.jpg`;
    get fullSource() {
        return `url("${this.src}")`;
    }
}
