import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Ambiguity } from 'src/app/models/ambiguity';
import ambiguityData from '../../../assets/data/ambiguity_data.json';

@Component({
    selector: 'app-ambiguity',
    templateUrl: './ambiguity.component.html',
    styleUrls: ['./ambiguity.component.scss'],
})
export class AmbiguityComponent {
    dataSource: Ambiguity[] = [];
   

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

    public columnDefs: ColDef[] = [
        {
            field: 'url',
            pinned: 'left',
            width: 250,
        },
        {
            headerName: 'Coherence Score',
            field: 'coherence_score',
        },
        {
            field: 'entropy',
        },
        {
            headerName: 'Reading Time',
            field: 'reading_time',
        },
        {
            headerName: 'Imprecise Words',
            field: 'imprecise_words',
        },
        {
            headerName: 'Connective Words',
            field: 'connective_words',
        },
        {
            headerName: 'Spelling Errors',
            field: 'spelling_errors',
        },
    ];
    rowData$!: any[];
    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
    };
    gridOptions: GridOptions = {
        pagination: true,
        paginationPageSize: 10,
    };

    constructor() {
        this.dataSource = ambiguityData;
    }

    onGridReady(params: GridReadyEvent) {
        this.rowData$ = ambiguityData;
    }
}
