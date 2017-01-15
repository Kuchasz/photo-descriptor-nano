import * as Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    template: `
      <md-layout md-flex class="image-placeholder">
        <div v-bind:style="{ backgroundImage: fullSource }"></div>
      </md-layout>
`,
    props: {
        src: String
    }
})
export class ImagePlaceholder extends Vue {
    get fullSource() {
        return `url("${this.src}")`;
    }
}
