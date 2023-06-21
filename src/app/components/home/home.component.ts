import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import features from '../../../assets/explore/features.json';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    devices: number = 7300;
    policies: number = 1200;
    collected: number = 1200;
    humanTime: string;

    lastUpdatedDate: Date = new Date(2023, 5, 16, 3, 22);

    constructor() {
        let sum = 0;
        features.forEach(element => {
            sum = sum + element.reading_time
        });
        this.humanTime = Number(sum/60).toFixed(2);
    }
}
