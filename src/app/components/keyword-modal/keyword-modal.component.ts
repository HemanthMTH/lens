
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Feature, FeatureType } from 'src/app/models/data';


@Component({
  selector: 'app-keyword-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">{{ title }}</h5>
      <button type="button" class="btn-close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      <div class="container">
        <div class="row row-cols-3 g-4">
          <div class="col" *ngFor="let key of objectKeys(features)">
            <div class="card h-100" [ngStyle]="{'background-color': getGradientColor(getKeywordValue(key))}">
              <div class="card-header">{{ getKeywordLabel(key) }}</div>
              <div class="card-body">
                <p class="card-text">{{ getKeywordValue(key) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Close</button>
    </div>
  `,
})
export class KeywordModalComponent implements OnInit {
  @Input() title: string;
  @Input() features: Feature;

  minValue: number;
  maxValue: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.minValue = this.getMinValue();
    this.maxValue = this.getMaxValue();
  }

  objectKeys(item: Feature) {
    return Object.keys(item).filter(key => key !== 'url'); // Exclude 'url' key
  }

  getKeywordValue(key: string): any {
    return this.features[key as keyof Feature];
  }

  getKeywordLabel(key: string): string {
    return FeatureType[key as keyof typeof FeatureType] || key;
  }

  getMinValue(): number {
    return Math.min(...this.objectKeys(this.features).map(key => this.getKeywordValue(key)));
  }

  getMaxValue(): number {
    return Math.max(...this.objectKeys(this.features).map(key => this.getKeywordValue(key)));
  }

  getGradientColor(value: number): string {
    const percentage = ((value - this.minValue) / (this.maxValue - this.minValue)) * 100;
    return `hsl(${percentage}, 100%, 50%)`;
  }
}

