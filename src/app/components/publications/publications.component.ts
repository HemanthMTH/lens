import { Component } from '@angular/core';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent {
    papers = [{ title: 'Privacy Lens', pdfUrl: '../../../assets/paper.pdf' }];

    selectedPaper: { title: string; pdfUrl: string } | null = null;
}
