import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-boolean-cell-renderer',
    template: `
        <div class="container">
            <span class="value" [ngClass]="params.value ? 'true' : 'false'">{{ params.value ? 'Yes' : 'No' }}</span>
        </div>
    `,
    styles: [`
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .value {
            padding: 0.5rem;
            border-radius: 0.25rem;
            color: #fff;
        }
        .value.true {
            background: #28a745;
        }
        .value.false {
            background: #dc3545;
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
