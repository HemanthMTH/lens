import { Component, ViewChild } from '@angular/core';
import { PolicyData, Similarity } from 'src/app/models/similarity';

import { DataItem, Series } from '@swimlane/ngx-charts';
import * as umap from 'umap-js';
import * as dfd from 'danfojs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import _heatmapData from '../../../assets/data/heat.json';
import embedData from '../../../assets/data/embed.json';
import similarityData from '../../../assets/data/similarity_data.json';
import { AgGridAngular } from 'ag-grid-angular';
import {
    ColDef,
    GridApi,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community';


interface HeatMapEntry {
    name: string;
    value: number;
  }
  
  interface HeatMapPolicy {
    name: string;
    series: HeatMapEntry[];
  }

@Component({
    selector: 'app-charts',
    templateUrl: './similarity.component.html',
    styleUrls: ['./similarity.component.scss'],
})
export class SimilarityComponent {
    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

    dataSource: Similarity[] = [];

    // reactive form for range selection
    heatMapForm: FormGroup = this.fb.group({
        min: [
            null,
            Validators.compose([Validators.required, Validators.min(1)]),
        ],
        max: [
            null,
            Validators.compose([Validators.required, Validators.min(1)]),
        ],
    });
    outOfBound: boolean;
    submitted: boolean;
    showChart: boolean;
    isLoading: boolean = true;

    // Plotly heatmap
    _data: any[] = [];
    hmData: HeatMapPolicy[] = [];
    layout: any = {
        title: 'Heatmap that represents the similarities in policies among various manufacturers',
        width: 1000,
        height: 800,
        xaxis: {
          tickmode: 'array',
          tickvals: [],
          showticklabels: false,
          title: 'Websites',
        },
        yaxis: {
          tickmode: 'array',
          tickvals: [],
          showticklabels: false,
          title: 'Websites',
        },
      };
      
    config: any = {
        responsive: true,
    };

    // Dynamic heatmap
    view: [number, number] = [700, 500];
    showXAxis = true;
    showYAxis = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    colorScheme = {
        domain: [
            '#9370DB',
            '#87CEFA',
            '#FA8072',
            '#FF7F50',
            '#90EE90',
            '#9370DB',
        ],
    };
    legend: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    xAxisLabelH: string = 'Policies';
    yAxisLabelH: string = 'Policies';
    heatMapChartData: Series[] = [];

    // Plotly UMAP
    umapData: any[] = [];
    umapLayout = {
        title: 'UMAP Embeddings',
        xaxis: {
            title: 'UMAP Dimension 1',
        },
        yaxis: {
            title: 'UMAP Dimension 2',
        },
        width: 1000,
        height: 800,
    };
    public columnDefs: ColDef[] = [
        {
            headerName: 'S No.',
            field: 'reference',
        },
        {
            headerName: 'URL',
            field: 'url',
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
        suppressHorizontalScroll: true,
    };

    selectedWebsites: HeatMapPolicy[] = [];
    chartHeatmapData: Series[] = [];

    constructor(private fb: FormBuilder) {
        this.hmData = _heatmapData as HeatMapPolicy[];
        
        this.prepareData();
        this.heatMapForm.valueChanges.subscribe((x) => {
            this.outOfBound = true
                ? x.min &&
                  x.max &&
                  (x.min > x.max ||
                      (x.max - x.min || x.min == x.m) > 30 ||
                      x.min == x.max ||
                      x.max > this.dataSource.length ||
                      x.min > this.dataSource.length)
                : false;
        });
        this.preparePlotlyHeatMap();
        this.preparePlotlyUMAP(this.getUMAPVector());
        this.isLoading = false;
    }

    onGridReady(params: GridReadyEvent) {
        this.rowData$ = this.dataSource;
        const gridApi: GridApi = params.api;
        gridApi.sizeColumnsToFit();
    }

    prepareData(): void {
        similarityData.forEach((element: any, index: number) => {
            this.dataSource.push(
                new Similarity(
                    index + 1,
                    element.url,
                    element.policy_text,
                    element.policy_text_processed,
                    element.policy_text_gensim
                )
            );
        });
    }

    preparePlotlyUMAP(mapper: number[][]): void {
        this.umapData = [
            {
                x: mapper.map((e) => e[0]),
                y: mapper.map((e) => e[1]),
                mode: 'markers',
                type: 'scatter',
            },
        ];
    }

    preparePlotlyHeatMap(): void {
        this._data = [
            {
              z: this.hmData.map((policy: HeatMapPolicy) =>
                  policy.series.map((entry: HeatMapEntry) => entry.value)
              ),
              x: this.hmData.map((policy: HeatMapPolicy) => policy.name),
              y: this.hmData.length > 0 ? this.hmData[0].series.map((entry: HeatMapEntry) => entry.name) : [],
              type: 'heatmap',
              hovertemplate: 'X: %{x}, Y: %{y} => Similarity score: %{z}<extra></extra>',
            },
          ];    
          
    }

    getUMAPVector(): number[][] {
        const jsonData: any[] = embedData;
        const policyData: PolicyData[] = jsonData.map((item) => {
            const processedText = item.policy_text_processed
                .replace('[', '')
                .replace(']', '')
                .split(/\s+/)
                .map((val: string) => parseFloat(val));

            return {
                policy_text_processed: processedText,
            };
        });

        const embeddings_df = new dfd.DataFrame(policyData);
        const processedDf = this.processPolicyTextColumn(embeddings_df);
        const vectors = processedDf.values.map((row) => {
            if (Array.isArray(row)) {
                return row.map((val) =>
                    typeof val === 'number' ? val : Number(val)
                );
            } else {
                if (typeof row === 'number') {
                    return [row];
                } else if (typeof row === 'boolean') {
                    return [row ? 1 : 0];
                } else {
                    return [NaN];
                }
            }
        });
        return new umap.UMAP({ nNeighbors: 15 }).fit(vectors);
    }

    processPolicyTextColumn(df: dfd.DataFrame) {
        const parsedData = df.values.map((row: any) => {
            return row[0].filter((val: any) => !isNaN(val));
        });

        return new dfd.DataFrame(parsedData);
    }

    // prepareHeatMapData(minValue: number, maxValue: number): void {
    //     for (let i = minValue; i < maxValue + 1; i++) {
    //         let series: Series = {
    //             name: '',
    //             series: [],
    //         };
    //         series.name = Object.values(similarityData)[i - 1].url;
    //         let data: DataItem[] = [];
    //         for (let j = minValue; j < maxValue + 1; j++) {
    //             let item: DataItem = {
    //                 name: '',
    //                 value: '',
    //             };
    //             item.name = Object.values(similarityData)[j - 1].url;

    //             item.value =
    //                 Object.values(_heatmapData[i].series[j])[1] == null
    //                     ? 0
    //                     : (Object.values(
    //                           _heatmapData[i].series[j]
    //                       )[1] as number);
    //             data.push(item);
    //         }
    //         series.series = data;
    //         this.heatMapChartData.push(series);
    //     }
    // }

    onWebsiteChange(param: HeatMapPolicy[]): void {
        this.selectedWebsites = param;
        this.updateHeatmapData();
        this.showChart = this.selectedWebsites.length > 1;
    }

    updateHeatmapData() {
        this.chartHeatmapData = this.selectedWebsites.map(website => {
          return {
            name: website.name,
            series: website.series.filter(seriesItem => 
              this.selectedWebsites.some(selectedWebsite => selectedWebsite.name === seriesItem.name)
            )
          };
        });
      }

    // onSubmit(params: any): void {
    //     this.heatMapChartData = [];
    //     this.submitted = true;
    //     this.prepareHeatMapData(params.value.min, params.value.max);
    // }

}
