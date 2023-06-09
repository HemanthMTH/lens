import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-url-renderer',
    template: `
        <div class="icon-container" *ngIf="params.value; else noUrlTemplate">
            <a
                [href]="params.value"
                [title]="params.value"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i class="fas fa-link"></i>
            </a>
        </div>
        <ng-template #noUrlTemplate></ng-template>
    `,
    styles: [
        `
            .icon-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
            a {
                cursor: pointer;
            }
        `,
    ],
})
export class UrlRendererComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams): boolean {
        return false;
    }
}
