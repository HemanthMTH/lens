import { Component } from '@angular/core';

import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Ambiguity, Model } from 'src/app/models/ambiguity';
import ambiguityData from '../../../assets/data/ambiguity_data.json';
import featuresData from '../../../assets/data/tables/policy_features.json';
import metricData from '../../../assets/data/tables/metrics.json';
import f1ScoreData from '../../../assets/data/tables/f1scores.json';
import ambiguityLevelData from '../../../assets/data/tables/ambiguity_levels.json';
// import { Papa } from 'ngx-papaparse';
// import testData from '../../../assets/data/model/test.json'
// import trainData from '../../../assets/data/model/train.json'

@Component({
    selector: 'app-ambiguity',
    templateUrl: './ambiguity.component.html',
    styleUrls: ['./ambiguity.component.scss'],
})
export class AmbiguityComponent {
    dataSource: Ambiguity[] = [];
    features: Model[] = [];
   

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
            headerName: 'URL',
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
            headerName: 'Unique Words',
            field: 'unique_words',
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

    public featureColumnDefs: ColDef[] = [
        {
            field: 'name',
            headerName: 'Company Name',
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
            headerName: 'Unique Words',
            field: 'unique_words',
        },
        {
            headerName: 'Reading Time',
            field: 'reading_time',
        },
        {
            headerName: 'Reading Level',
            field: 'fkgl',
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
            headerName: 'Correct Grammar',
            field: 'spelling_errors',
        },
    ];

    public metricColumnDefs: ColDef[] = [
        {
            headerName: 'Policy Features',
            field: 'policy_features',
        },
        {
            headerName: 'Min Value',
            field: 'min',
            width: 150,
        },
        {
            headerName: 'Average Value',
            field: 'avg',
            width: 150,
        },
        {
            headerName: 'Max Value',
            field: 'max',
            width: 150,
        },
    ];
    public f1ScoreColumnDefs: ColDef[] = [
        {
            headerName: 'Ambiguity Class',
            field: 'ambiguity_class',
        },
        {
            headerName: 'No. of Policies',
            field: 'number_of_policies',
        },
        {
            headerName: 'Random Forrest Classifier',
            field: 'random_forrest_classifier',
        },
        {
            headerName: 'Logistic Regression',
            field: 'logistic_regression',
        },
    ];

    public ambiguityLevelColumnDefs: ColDef[] = [
        {
            headerName: 'Manufacturer Country',
            field: 'country',
        },
        {
            headerName: 'Not Ambiguous',
            field: 'not_ambiguous',
        },
        {
            headerName: 'Very Ambiguous',
            field: 'very_ambiguous',
        },
        {
            headerName: ' Somewhat Ambiguous',
            field: 'somewhat_ambiguous',
        },
    ];

    rowData$!: any[];
    featureRowData$!: any[];
    metricRowData$!: any[];
    f1ScoreRowData$!: any[];
    ambiguityLevelRowData$!: any[];
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
        this.features = featuresData;
    }

    onGridReady(params: GridReadyEvent) {
        this.rowData$ = ambiguityData;
    }

    onFeatureGridReady(params: GridReadyEvent) {
        this.featureRowData$ = featuresData;
        params.api.sizeColumnsToFit()
    }

    onMetricsGridReady(params: GridReadyEvent) {
        this.metricRowData$ = metricData;
        params.api.sizeColumnsToFit()
    }

    onF1ScoreGridReady(params: GridReadyEvent) {
        this.f1ScoreRowData$ = f1ScoreData;
        params.api.sizeColumnsToFit()
    }

    onAmbiguityLevelGridReady(params: GridReadyEvent) {
        this.ambiguityLevelRowData$ = ambiguityLevelData;
        params.api.sizeColumnsToFit()
    }
}
