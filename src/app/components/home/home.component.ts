import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    devices: number = 24;
    policies: number = 462;
    collected: number = 1500;

    lastUpdatedDate: Date = new Date(2023, 4, 24, 12, 30);
}
