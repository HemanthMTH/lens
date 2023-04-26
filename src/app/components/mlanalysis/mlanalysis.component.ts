import { Component } from '@angular/core';
import featureImportanceData from '../../../assets/data/model/feature_importance.json';
import { BarChartInput } from 'src/app/models/charts';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

interface Metric {
    class: string;
    precision: number;
    recall: number;
    f1_score: number;
}
@Component({
    selector: 'app-mlanalysis',
    templateUrl: './mlanalysis.component.html',
    styleUrls: ['./mlanalysis.component.scss'],
})
export class MLAnalysisComponent {
    metrics: Metric[] = [
        {
            class: 'Class 0',
            precision: 0.96,
            recall: 0.96,
            f1_score: 0.96,
        },
        {
            class: 'Class 1',
            precision: 0.67,
            recall: 0.67,
            f1_score: 0.67,
        },
    ];
    public columnDefs: ColDef[] = [
        {
            field: 'class',
        },
        {
            field: 'precision',
        },
        {
            field: 'recall',
        },
        {
            headerName: 'F1-score',
            field: 'f1_score',
        },
    ];
    rowData$!: any[];
    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
    };
    data: BarChartInput[] = [];
    layout = {
        title: 'Logistic Regression Feature Importance',
        xaxis: {
            title: 'Importance Value',
        },
        yaxis: {
            automargin: true,
        },
        width: 1000,
        height: 600,
    };

    confusionMatrixData = [
        {
            z: [
                [1, 2],
                [26, 2],
            ], // replace with your own confusion matrix values
            type: 'heatmap',
            colorscale: 'Blues',
            xaxis: 'x',
            yaxis: 'y',
            reversescale: true,
        },
    ];

    confusionMatrixLayout = {
        title: 'Confusion Matrix',
        xaxis: {
            title: 'Predicted',
            tickvals: [0, 1],
            ticktext: ['Class 0', 'Class 1'],
        },
        yaxis: {
            title: 'True',
            tickvals: [0, 1],
            ticktext: ['Class 1', 'Class 0'],
        },
    };

    constructor() {
        const values = featureImportanceData.map((t) => t.value);
        this.data = [
            {
                x: values,
                y: featureImportanceData.map((t) => t.name),
                type: 'bar',
                orientation: 'h',
                marker: {
                    color: values,
                    colorscale: 'RdBu',
                    cmin: Math.min(...values),
                    cmax: Math.max(...values),
                    reversescale: true,
                },
            },
        ];
    }
    onGridReady(params: GridReadyEvent) {
        this.rowData$ = this.metrics;
        params.api.sizeColumnsToFit()
    }
}
