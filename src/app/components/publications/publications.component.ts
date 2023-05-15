import { Component } from '@angular/core';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent {
    papers = [{ title: 'Sample', pdfUrl: '../../../assets/sample.pdf' }];

    selectedPaper: { title: string; pdfUrl: string } | null = null;
}
