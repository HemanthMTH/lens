import { Component, OnInit } from '@angular/core';

interface Member {
    name: string;
    affiliation: string;
    position: string;
    website?: string;
    imagePath: string;
}

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
    members: Member[] = [
        {
            name: 'Dr. Roberto Yus',
            affiliation: 'University of Maryland, Baltimore County',
            position: 'Assistant Professor',
            imagePath: '../../../assets/img/dr_yus.png',
            website: 'https://robertoyus.com/',
        },
        {
            name: 'Dr. Tim Finin',
            affiliation: 'University of Maryland, Baltimore County',
            position: 'Professor',
            imagePath: '../../../assets/img/dr_finin.jpg',
            website: 'https://redirect.cs.umbc.edu/~finin/',
        },
        {
            name: 'Dr. Primal Pappachan',
            affiliation: 'Penn State University',
            position: 'Postdoctoral Scholar',
            imagePath: '../../../assets/img/dr_primal.png',
            website: 'https://primalpappachan.com/',
        },

        {
            name: 'Aamir Hamid',
            affiliation: 'University of Maryland, Baltimore County',
            position: 'Ph.D Student',
            imagePath: '../../../assets/img/aamir.jpg',
        },
        {
            name: 'Hemanth Reddy Samidi',
            affiliation: 'University of Maryland, Baltimore County',
            position: 'MS Student',
            imagePath: '../../../assets/img/hemanth.jpg',
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
