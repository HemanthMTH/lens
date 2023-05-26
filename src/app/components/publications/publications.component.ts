import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
    animations: [
        trigger('fadeInOut', [
          state('void', style({
            opacity: 0
          })),
          transition('void <=> *', animate(500)),
        ])
      ]      
})
export class PublicationsComponent {
    showImage = false;
    papers = [{ title: 'Sample', pdfUrl: '../../../assets/sample.pdf', year: 2022 }];

    selectedPaper: { title: string; pdfUrl: string; year: number } | null = null;
}
