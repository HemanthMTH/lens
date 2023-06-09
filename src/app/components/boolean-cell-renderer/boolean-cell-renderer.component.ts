import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-boolean-cell-renderer',
    template: `
        <div class="container" [ngClass]="params.value ? 'true' : 'false'">
            <span class="value">{{ params.value ? 'Yes' : 'No' }}</span>
        </div>
    `,
    styles: [`
        .container {
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container.true {
            background: #4CAF50;
        }
        .container.false {
            background: #F44336;
        }
        .value {
            padding: 0.5rem;
            border-radius: 0.25rem;
        }
    `]
})
export class BooleanCellRendererComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
    }
}
