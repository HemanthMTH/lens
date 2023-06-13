import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Color, ScaleType, Series } from '@swimlane/ngx-charts';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { interpolateRgbBasis } from 'd3-interpolate';
import { Similarity } from 'src/app/models/similarity';
import ambiguityLevelData from '../../../assets/data/tables/ambiguity_levels.json';
import f1ScoreData from '../../../assets/data/tables/f1scores.json';
import ambiguityData from '../../../assets/explore/features.json';
import similarityData from '../../../assets/explore/manufacturers.json';
import _heatmapData from '../../../assets/explore/matrix.json';
import metricData from '../../../assets/explore/result.json';
import { ModalComponent } from '../modal/modal.component';

interface HeatMapEntry {
    name: string;
    value: number;
}

interface HeatMapPolicy {
    name: string;
    series: HeatMapEntry[];
}

function getRandomUniqueInts(
    min: number,
    max: number,
    numOfInts: number
): number[] {
    let uniqueInts: number[] = [];
    while (uniqueInts.length < numOfInts) {
        let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!uniqueInts.includes(randomInt)) {
            uniqueInts.push(randomInt);
        }
    }
    return uniqueInts;
}

function generateColorScheme(steps: number): string[] {
    const interpolator = interpolateRgbBasis([
        '#FF0000', // Red for value 0
        '#FFFF00', // Yellow for value 0.25
        '#00FF00', // Green for value 0.5
        '#00FFFF', // Cyan for value 0.75
        '#0000FF', // Blue for value 1
    ]);

    const colors: string[] = [];
    for (let i = 0; i <= steps; i++) {
        const rate = i / steps;
        colors.push(interpolator(rate));
    }

    return colors;
}

@Component({
    selector: 'app-lawyer',
    templateUrl: './lawyer.component.html',
    styleUrls: ['./lawyer.component.scss'],
})
export class LawyerComponent implements OnInit {
    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

    dataSource: Similarity[] = [];

    hmData: HeatMapPolicy[] = [];
    ambiguityLevelRowData$!: any[];
    f1ScoreRowData$!: any[];

    // Dynamic heatmap
    view: [number, number] = [700, 500];
    showXAxis = true;
    showYAxis = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    steps = 10;
    customColor: Color = {
        name: 'Custom',
        selectable: true,
        group: ScaleType.Linear,
        domain: generateColorScheme(this.steps),
    };

    minVal: number;
    maxVal: number;

    legend: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    xAxisLabelH: string = 'Policies';
    yAxisLabelH: string = 'Policies';
    heatMapChartData: Series[] = [];

    public columnDefs: ColDef[] = [
        {
            headerName: 'S No.',
            field: 'reference',
        },
        {
            headerName: 'Manufacturer URL',
            field: 'url',
        },
    ];
    rowData$!: any[];
    featureRowData$!: any[];
    metricRowData$!: any[];
    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        minWidth: 100,
        resizable: true,
    };

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

    selectedWebsites: HeatMapPolicy[] = [];
    chartHeatmapData: Series[] = [];

    public featureColumnDefs: ColDef[] = [
        {
            field: 'url',
            headerName: 'Manufacturer URL',
            pinned: 'left',
            width: 250,
        },
        {
            headerName: 'Coherence Score',
            field: 'coherence_score',
            width: 250,
        },
        {
            field: 'entropy',
        },
        {
            headerName: 'Unique Words',
            field: 'unique_words',
            width: 200,
        },
        {
            headerName: 'Reading Level',
            field: 'fkgl',
            width: 200,
        },
        {
            headerName: 'Reading Time (mins)',
            field: 'reading_time',
            width: 200,
        },
        {
            headerName: 'Imprecise Words',
            field: 'imprecise_words',
            width: 200,
        },
        {
            headerName: 'Connective Words',
            field: 'connective_words',
            width: 200,
        },
        {
            headerName: 'Grammatical Errors',
            field: 'spelling_errors',
            width: 200,
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

    constructor(private modalService: NgbModal) {}
    ngOnInit() {
        this.hmData = _heatmapData as HeatMapPolicy[];
        let uniqueIndices = getRandomUniqueInts(0, 862, 10);

        setTimeout(() => {
            this.selectedWebsites = uniqueIndices.map(
                (index) => this.hmData[index]
            );
            this.onWebsiteChange(this.selectedWebsites);
        }, 1000);

        this.prepareData();
    }

    open() {
        const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
        modalRef.componentInstance.name = 'Modal';
    }

    

    onGridReady(params: GridReadyEvent) {
        this.rowData$ = this.dataSource;
        params.api.sizeColumnsToFit();
    }

    onFeatureGridReady(params: GridReadyEvent) {
        this.featureRowData$ = ambiguityData;
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

    prepareData(): void {
        similarityData.forEach((element: any, index: number) => {
            this.dataSource.push(new Similarity(index + 1, element.url));
        });
    }

    onWebsiteChange(param: HeatMapPolicy[]): void {
        this.selectedWebsites = param;
        this.updateHeatmapData();
    }

    updateHeatmapData() {
        this.chartHeatmapData = this.selectedWebsites.map((website) => {
            return {
                name: website.name,
                series: website.series.filter((seriesItem) =>
                    this.selectedWebsites.some(
                        (selectedWebsite) =>
                            selectedWebsite.name === seriesItem.name
                    )
                ),
            };
        });
    }
}
