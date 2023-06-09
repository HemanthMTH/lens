// button-renderer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button type="button" (click)="onClick($event)" class="btn btn-sm btn-primary">
      {{ label }}
    </button>
  `
})
export class ButtonRendererComponent {
  params: any;
  label: string;

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // Call the onClick function provided by the parent component
      this.params.onClick(this.params);
    }
  }
}
