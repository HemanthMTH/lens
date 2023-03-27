import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Ambiguity } from 'src/app/models/ambiguity';
import ambiguityData from '../../../assets/data/ambiguity_data.json';

@Component({
    selector: 'app-ambiguity',
    templateUrl: './ambiguity.component.html',
    styleUrls: ['./ambiguity.component.scss'],
})
export class AmbiguityComponent {
    displayedColumns: string[] = [
        'url',
        'coherence_score',
        'entropy',
        'unique_words',
        'reading_time',
        'imprecise_words',
        'connective_words',
        'spelling_errors',
    ];
    dataSource: Ambiguity[] = [];
    page = 1;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    attributeData = [
        { name: 'Group A', mean: 10, median: 8, q2: 12 },
        { name: 'Group B', mean: 15, median: 12, q2: 18 },
        { name: 'Group C', mean: 8, median: 7, q2: 10 },
    ];

    traceMean = {
        x: this.attributeData.map((d) => d.mean),
        y: this.attributeData.map((d) => d.name),
        name: 'Mean',
        type: 'bar',
        orientation: 'h',
    };

    traceMedian = {
        x: this.attributeData.map((d) => d.median),
        y: this.attributeData.map((d) => d.name),
        name: 'Median',
        type: 'bar',
        orientation: 'h',
    };

    traceQ2 = {
        x: this.attributeData.map((d) => d.q2),
        y: this.attributeData.map((d) => d.name),
        name: 'Q2',
        type: 'bar',
        orientation: 'h',
    };

    data = [this.traceMean, this.traceMedian, this.traceQ2];

    layout = {
        barmode: 'group',
        title: 'Grouped Horizontal Bar Chart',
        xaxis: { title: 'Attribute Values' },
        yaxis: { title: 'Groups' },
    };

    constructor() {
        this.dataSource = ambiguityData
    }

    onPageChange(event: PageEvent): void {
        this.page = event.pageIndex + 1;
        this.pageSize = event.pageSize;
    }
}
