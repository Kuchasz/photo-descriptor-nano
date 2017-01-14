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
                  <md-spinner :md-stroke="2.2" :md-size="64" md-indeterminate></md-spinner>
                </md-theme>
                <md-layout md-gutter md-column md-flex>
                    <span class="md-headline">{{folderPath}}</span>
                    <span class="md-subheading">Opisano {{fill}} na {{filesAmount}} zdjęć.</span>
                    <span class="md-caption">Ostatni zapis miał miejsce: {{ lastSave | moment('HH:mm:ss') }}</span>
                </md-layout>
            </md-layout>
        </md-layout>
    `,
    props: {
        filesAmount: Number,
        folderPath: String
    }
})
export class StatusBar extends Vue {
    fill: number = 133;
    lastSave: Date = new Date();

    get progress() {
        return this.fill / this.filesAmount * 100;
    };
}