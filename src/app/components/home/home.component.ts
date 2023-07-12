import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import features from '../../../assets/explore/features.json';
import pastFeatures from '../../../assets/latest/past_features.json';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    devices: number = 7300;
    policies: number = 1460;
    collected: number = 1200;
    humanTime: string;

    lastUpdatedDate: Date = new Date(2023, 5, 25, 2, 18);

    constructor() {
        let sum1 = 0;
        features.forEach(element => {
            sum1 = sum1 + element.reading_time
        });
        let sum2 = 0;
        pastFeatures.forEach(element => {
            sum2 = sum2 + element.reading_time
        });
        this.humanTime = Number((sum1 + sum2) / 60).toFixed(2);
    }
}
