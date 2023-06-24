import { Component, OnInit } from '@angular/core';
import { BarChartInput } from 'src/app/models/charts';
import { CountryInfo } from 'src/app/models/key-info';
import countryData from '../../../assets/data/countries.json';
import _data from '../../../assets/data/grouped_data.json';
import mentioned_data from '../../../assets/data/grouped_mentioned_data.json';
import cData from '../../../assets/latest/countryPol.json';
import metaData from '../../../assets/latest/deviceData.json';

@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.scss'],
})
export class DatasetComponent implements OnInit {
    data: any[];

    layout = {
        xaxis: {
            tickmode: 'linear',
            tickangle: 45,
            tickfont: { size: 10 },
        },
        yaxis: {
            title: 'Number of privacy policies',
        },
        margin: { t: 80, l: 0, r: 60, b: 120 },
        width: 650,
        height: 500,
    };

    pieData: any[];
    pieLayout: {
        title: 'Device Mentions in Privacy Policy';
        width: 300;
        height: 200;
    };
    countryData: BarChartInput[] = [];
    countryLayout = {
        //title: 'Percentage of Policies with Explicit Mention of Devices',
        geo: {
            projection: {
                type: 'robinson',
            },
        },
        width: 800,
        height: 600,
    };

    countryPolicyData: any[] = [];
    countryPolicyLayout = {
        //title: 'Percentage of Policies with Explicit Mention of Devices',
        geo: {
            projection: {
                type: 'robinson',
            },
        },
        width: 800,
        height: 600,
    };
    total: number;
    metaDataSize: number;

    constructor() {
        this.countryData = this.getCountryData(countryData);
        this.total = cData.reduce((total, item) => total + item.count, 0);
        this.metaDataSize = metaData.length;
        this.countryPolicyData = [{
            type: 'choropleth',
            locationmode: 'country names',
            locations: cData.map((d) => d.country),
            z: cData.map((d) => ((d.count / this.total) * 100).toFixed(2)),
            text: cData.map((d) => `${d.country}: ${((d.count / this.total) * 100).toFixed(2)}%`),
            hoverinfo: 'text',
            colorscale: 'RdBu',
            reversescale: true,
          }];
    }

    ngOnInit() {
        this.data = [
            {
                x: _data.map((d) => d.category),
                y: _data.map((d) => d.size),
                type: 'bar',
                marker: {
                    color: _data.map((d) => d.size),
                    colorscale: 'Viridis',
                    showscale: true,
                },
            },
        ];

        this.pieData = [
            {
                values: [
                    mentioned_data[0].mentioned,
                    mentioned_data[0].not_mentioned,
                ],
                labels: [
                    'Explicit mention of smart device',
                    'No explicit mention of smart device',
                ],
                type: 'pie',
                hoverinfo: 'label+percent',
            },
        ];
    }

    getCountryData(data: CountryInfo[]): any[] {
        return [{
            type: 'choropleth',
            locationmode: 'country names',
            locations: data.map((d) => d.country),
            z: data.map((d) => ((d.mentioned / d.total) * 100).toFixed(2)),
            text: data.map((d) => `${d.country}: ${((d.mentioned / d.total) * 100).toFixed(2)}%`),
            hoverinfo: 'text',
            colorscale: 'RdBu',
            reversescale: true,
          }];
    }
}
