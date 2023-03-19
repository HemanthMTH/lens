import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Ambiguity } from 'src/app/models/ambiguity';
import ambiguityData from '../../../assets/data/ambiguity_data.json';

@Component({
  selector: 'app-ambiguity',
  templateUrl: './ambiguity.component.html',
  styleUrls: ['./ambiguity.component.scss']
})
export class AmbiguityComponent {

  displayedColumns: string[] = ['url', 'coherence_score', 'entropy', 'unique_words', 'reading_time',
                                 'imprecise_words', 'connective_words', 'spelling_errors'];
  dataSource: Ambiguity[] = [];
  page = 1;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor() {
    ambiguityData.forEach((element: any) => {
      this.dataSource.push(new Ambiguity(element.url, element.Coherence_Score,
        element.Entropy, element.Unique_words, element.Reading_Time, element.flesch_kincaid_grade_level_normalized,
        element.Imprecise_Words, element.Connective_Words, element.spelling_errors))
    });
  }
  
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

}
