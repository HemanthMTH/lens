import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Keyword } from 'src/app/models/data';
import { KeywordType } from 'src/app/models/keywords';

@Component({
    selector: 'app-feature-modal',
    template: `
        <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
                type="button"
                class="btn-close"
                (click)="activeModal.dismiss()"
            ></button>
        </div>
        <div class="modal-body">
            <div class="container">
                <div class="row row-cols-3 g-4">
                    <div class="col" *ngFor="let key of objectKeys(keywords)">
                        <div
                            class="card shadow h-100"
                            [ngStyle]="{
                                'background-color': getGradientColor(
                                    getKeywordValue(key)
                                )
                            }"
                        >
                            <div class="card-header">
                                {{ getKeywordLabel(key) }}
                            </div>
                            <div class="card-body">
                                <p class="card-text">
                                    {{ getKeywordValue(key) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="row mt-3">
                    <div class="col">
                        <div class="d-flex align-items-center">
                            <small>{{ minValue }}</small>
                            <div
                                class="mx-2 w-100"
                                style="height: 20px; background: linear-gradient(to right, hsl(0, 100%, 50%), hsl(100, 100%, 50%));"
                            ></div>
                            <small>{{ maxValue }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                (click)="activeModal.dismiss()"
            >
                Close
            </button>
        </div>
    `,
})
export class FeatureModalComponent implements OnInit {
    @Input() title: string;
    @Input() keywords: Keyword;

    minValue: number;
    maxValue: number;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.minValue = this.getMinValue();
        this.maxValue = this.getMaxValue();
    }

    objectKeys(item: Keyword) {
        return Object.keys(item).filter((key) => key !== 'url'); // Exclude 'url' key
    }

    getKeywordValue(key: string): any {
        return this.keywords[key as keyof Keyword];
    }

    getKeywordLabel(key: string): string {
        return KeywordType[key as keyof typeof KeywordType] || key;
    }

    getMinValue(): number {
        return Math.min(
            ...this.objectKeys(this.keywords).map((key) =>
                this.getKeywordValue(key)
            )
        );
    }

    getMaxValue(): number {
        return Math.max(
            ...this.objectKeys(this.keywords).map((key) =>
                this.getKeywordValue(key)
            )
        );
    }

    getGradientColor(value: number): string {
        const percentage =
            ((value - this.minValue) / (this.maxValue - this.minValue)) * 100;
        return `hsl(${percentage}, 100%, 50%)`;
    }
}
