import { Component } from '@angular/core';
import { PolicyData, Similarity } from 'src/app/models/similarity';

import heatmapData from '../../../assets/data/Heatmap_data.json';
import data1 from '../../../assets/data/data1.json';
import urlData from '../../../assets/data/urls1.json';
import embedData from '../../../assets/data/embed.json';
import similarityData from '../../../assets/data/similarity_data.json';
import { DataItem, Series } from "@swimlane/ngx-charts";
import * as umap from 'umap-js';
import * as dfd from 'danfojs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  heatMapForm: FormGroup = this.fb.group({
    min: [null, Validators.compose([Validators.required, Validators.min(1)])],
    max: [null, Validators.compose([Validators.required, Validators.min(1)])],
  });;
  outOfBound: boolean;
  submitted: boolean;
  _data: any[] = [];
  umapData: any[] = [];
  layout: any = {
    title: 'Heatmap that represents the similarities in policies among various manufactures',
    width: 1000,
    height: 800
  };

  displayedColumns: string[] = ['url'];
  dataSource: Similarity[] = [];
  page = 1;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  umapLayout = {
    title: 'UMAP Embeddings',
    xaxis: {
      title: 'UMAP Dimension 1'
    },
    yaxis: {
      title: 'UMAP Dimension 2'
    },
    width: 1000,
    height: 800,
  };
  config: any = {
    responsive: true
  };


  view: [number, number] = [1000, 800];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  xAxisLabelH: string = 'Policies';
  yAxisLabelH: string = 'Policies';

  heatMapChartData: Series[] = []

  constructor(private fb: FormBuilder) {
    similarityData.forEach((element: any) => {
      this.dataSource.push(new Similarity(element.url, element.policy_text, element.policy_text_processed, element.policy_text_gensim))
    });
    
    this.heatMapForm.valueChanges.subscribe(x => {
      this.outOfBound = true ? x.min && x.max && (x.min > x.max || (x.max - x.min || x.min == x.m) > 30 || 
       x.min == x.max || x.max > this.dataSource.length || x.min > this.dataSource.length) : false
    })

    const convertedData = data1.map((policy: { series: any[]; }) => policy.series.map(entry => entry.value));
    this._data = [
      {
        z: convertedData,
        type: 'heatmap'
      }
    ];
    const mapper = this.getUMAPVector()
    const trace = {
      x: mapper.map(e => e[0]),
      y: mapper.map(e => e[1]),
      mode: 'markers',
      type: 'scatter',
    };
    this.umapData = [trace];
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  getUMAPVector(): number[][] {
    const jsonData: any[] = embedData
    const policyData: PolicyData[] = jsonData.map((item) => {
      const processedText = item.policy_text_processed
        .replace("[", "")
        .replace("]", "")
        .split(/\s+/)
        .map((val: string) => parseFloat(val));

      return {
        policy_text_processed: processedText,
      };
    });

    const embeddings_df = new dfd.DataFrame(policyData);
    const processedDf = this.processPolicyTextColumn(embeddings_df);
    const vectors = processedDf.values.map(row => {
      if (Array.isArray(row)) {
        return row.map(val => typeof val === 'number' ? val : Number(val));
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

  prepareHeatMapData(minValue: number, maxValue: number): void {
    for (let i = minValue; i < maxValue + 1; i++) {
      let series: Series = {
        name: '',
        series: []
      }
      series.name = Object.values(urlData)[i - 1].url
      let data: DataItem[] = []
      for (let j = minValue; j < maxValue + 1; j++) {
        let item: DataItem = {
          name: '',
          value: ''
        }
        item.name = Object.values(urlData)[j - 1].url
        item.value = Object.values(heatmapData[i])[j] == null ? 0 : Object.values(heatmapData[i])[j]!
        data.push(item)
      }
      series.series = data
      this.heatMapChartData.push(series)
    }
  }

  onSubmit(params: any): void {
    this.heatMapChartData = []
    this.submitted = true
    this.prepareHeatMapData(params.value.min, params.value.max)
  }

  onMapSelect(event: any): void {
    console.log(event)
  }
}
