import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    devices: number = 7300;
    policies: number = 1200;
    collected: number = 1200;

    lastUpdatedDate: Date = new Date(2023, 5, 16, 3, 22);
}
