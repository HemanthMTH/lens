import { Component, OnInit } from '@angular/core';
import { BarChartInput } from 'src/app/models/charts';
import { CountryInfo } from 'src/app/models/key-info';
import countryData from '../../../assets/data/countries.json';
import _data from '../../../assets/data/grouped_data.json';
import mentioned_data from '../../../assets/data/grouped_mentioned_data.json';

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
        barmode: 'stack',
        title: ' Percentage of Countries with Mention and No Mention of Devices',
        xaxis: { tickmode: 'linear', tickangle: 45, tickfont: { size: 9 } },
        yaxis: {
            title: 'Percentage',
        },
        width: 800,
        height: 500,
    };

    constructor() {
        this.countryData = this.getCountryData(countryData);
    }

    ngOnInit() {
        this.data = [
            {
                x: _data.map((d) => d.category),
                y: _data.map((d) => d.size),
                type: 'bar',
                marker: {
                    color: _data.map((d) => d.websites.length),
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
                // marker: {
                //     colors: ['#440154', '#fde725'],
                // },
            },
        ];
    }

    getCountryData(data: CountryInfo[]): any[] {
        return [
            {
                x: data.map((d) => d.country),
                y: data.map((d) => (d.not_mentioned / d.total) * 100),
                name: 'No explicit mention of smart device',
                type: 'bar',
            },
            {
                x: data.map((d) => d.country),
                y: data.map((d) => (d.mentioned / d.total) * 100),
                name: 'Explicit mention of smart device',
                type: 'bar',
            },
        ];
    }
}
