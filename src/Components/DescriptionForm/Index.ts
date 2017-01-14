import * as Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    template: `
        <div class="description-form">
            <md-input-container>
                <label>Opis zdjęcia</label>
                <md-input v-model="description" placeholder="Wpisz opis do zdjęcia"></md-input>
            </md-input-container>
            <md-input-container>
                <label>Tagi zdjęcia</label>
                <md-input v-model="tags" placeholder="Wpisz tagi do zdjęcia"></md-input>
            </md-input-container>
        </div>
`
})
export class DescriptionForm extends Vue {
    description: string = '';
    tags: string = '';
}