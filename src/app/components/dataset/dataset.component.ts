import { Component, OnInit } from '@angular/core';
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
        title: 'Websites in various device type categories',
        xaxis: {
            tickmode: 'linear',
            tickangle: 45,
            tickfont: { size: 10 },
        },
        yaxis: {
            title: 'Number of websites',
        },
        margin: { t: 80, l: 0, r: 60, b: 120 },
        width: 650,
        height: 500,
    };

    pieData: any[];
    pieLayout: {
        title: 'Device Mentions in Privacy Policy',
        width: 300,
        height: 200,
    };

    ngOnInit() {
        this.data = [
            {
                x: _data.map((d) => d.category),
                y: _data.map((d) => d.websites.length),
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
                labels: ['Mentioned', 'Not Mentioned'],
                type: 'pie',
                marker: {
                    colors: ['#440154', '#fde725'],
                },
            },
        ];
    }
}
