import * as Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    template: `
        <md-layout md-row md-gutter class="images-list">
            <md-theme v-for="image in images">
                <md-button @click="selectImage(image.id)" v-if="image.valid" class="md-icon-button md-raised md-primary">
                  <span>{{image.id}}</span>
                </md-button>
                <md-button @click="selectImage(image.id)" v-if="!image.valid" class="md-icon-button md-raised md-accent">
                  <span>{{image.id}}</span>
                </md-button>
            </md-theme>
        </md-layout>
`,
})
export class ImagesList extends Vue {
    images: any[] = Array.from(new Array(50)).map((_, id) => ({id, valid: Math.random()>0.3}));
    selectImage(id: number){
        this.$emit('imageSelect', id);
    }
}