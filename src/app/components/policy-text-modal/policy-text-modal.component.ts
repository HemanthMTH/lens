
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-policy-text-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">{{ title }}</h5>
      <button type="button" class="btn-close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body" style="text-align: justify;">
      <p>{{ policyText }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Close</button>
    </div>
  `,
})
export class PolicyTextModalComponent {
  @Input() title: string;
  @Input() policyText: string;

  constructor(public activeModal: NgbActiveModal) { }
}


