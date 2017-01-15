import * as Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: `
        <md-layout md-gutter md-flex="5" md-column class="status-bar">
            <md-progress :md-progress="progress"></md-progress>
            <md-layout md-gutter md-row>
                <md-theme class="save-spinner">
                  <md-button class="md-fab md-clean">
                    <md-icon>cached</md-icon>
                  </md-button>
                  <md-spinner v-if="saving" :md-stroke="2.2" :md-size="64" md-indeterminate></md-spinner>
                </md-theme>
                <md-layout md-align="center" md-column>
                    <span class="md-headline">{{folderPathSummary}}</span>
                    <span class="md-subheading">Opisano {{validFilesAmount}} na {{filesAmount}} zdjęć.</span>
                    <span class="md-caption">Ostatni zapis miał miejsce: {{ lastSave | moment('HH:mm:ss') }}</span>
                </md-layout>
            </md-layout>
        </md-layout>
    `,
    props: {
        filesAmount: Number,
        validFilesAmount: Number,
        folderPath: String,
        lastSave: Date,
        saving: Boolean
    }
})
export class StatusBar extends Vue {
    get folderPathSummary() {
        return this.folderPath || 'Nie wybrano folderu';
    }

    get progress() {
        return this.validFilesAmount / this.filesAmount * 100;
    };
}