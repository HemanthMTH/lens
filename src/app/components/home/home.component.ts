import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    devices: number = 24;
    policies: number = 638;

    lastUpdatedDate1: Date = new Date();
    lastUpdatedDate2: Date = new Date();
}
