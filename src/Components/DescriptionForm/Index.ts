import * as Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    template: `
        <div class="description-form">
            <md-input-container>
                <label>Opis zdjęcia</label>
                <md-input @input="updateDescription" v-model="localDescription" placeholder="Wpisz opis do zdjęcia"></md-input>
            </md-input-container>
            <md-input-container>
                <label>Tagi zdjęcia</label>
                <md-input @input="updateTags" v-model="localTags" placeholder="Wpisz tagi do zdjęcia"></md-input>
            </md-input-container>
        </div>
`,
    props: {
        description: String,
        tags: String
    }
})
export class DescriptionForm extends Vue {
    get localDescription() {
        return this.description;
    }

    get localTags() {
        return this.tags;
    };

    updateDescription(description: string) {
        this.$emit('update-description', description);
    }

    updateTags(tags: string) {
        this.$emit('update-tags', tags)
    }
}