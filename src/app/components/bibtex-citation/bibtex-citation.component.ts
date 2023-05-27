import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';

@Component({
    selector: 'app-bibtex-citation',
    templateUrl: './bibtex-citation.component.html',
    animations: [
        trigger('copyState', [
            state(
                'default',
                style({
                    transform: 'scale(1)',
                })
            ),
            state(
                'copied',
                style({
                    transform: 'scale(1.1)',
                })
            ),
            transition('default => copied', animate('100ms ease-in')),
            transition('copied => default', animate('100ms ease-out')),
        ]),
    ],
})
export class BibtexCitationComponent {
    @Input() entryType: string;
    @Input() citationKey: string;
    @Input() title: string;
    @Input() author: string;
    @Input() journal: string;
    @Input() volume: number;
    @Input() num: number;
    @Input() pages: string;
    @Input() year: number;
    @Input() publisher: string;
    copyState: string = 'default';

    constructor(private clipboard: Clipboard) {}

    get citationText(): string {
        return `@${this.entryType}{${this.citationKey},
        title={${this.title}},
        author={${this.author}},
        journal={${this.journal}},
        volume={${this.volume}},
        number={${this.num}},
        pages={${this.pages}},
        year={${this.year}},
        publisher={${this.publisher}}
      }`;
    }

    copyToClipboard(): void {
        this.clipboard.copy(this.citationText);
        this.copyState = 'copied';
        setTimeout(() => (this.copyState = 'default'), 500);
    }
}
