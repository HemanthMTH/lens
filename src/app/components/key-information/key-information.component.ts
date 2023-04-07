import { Component } from '@angular/core';
import deviceData from '../../../assets/data/device_type.json';
import countryData from '../../../assets/data/countries.json';
import distributedData from '../../../assets/data/country_dist_device.json';
import {
    CountryInfo,
    DeviceInfo,
    DistributionInfo,
} from 'src/app/models/key-info';
import { BarChartInput } from 'src/app/models/charts';

@Component({
    selector: 'app-key-information',
    templateUrl: './key-information.component.html',
    styleUrls: ['./key-information.component.scss'],
})
export class KeyInformationComponent {
    deviceInfo: DeviceInfo[];
    deviceData: BarChartInput[] = [];

    countryInfo: CountryInfo[];
    countryData: BarChartInput[] = [];

    distInfo: DistributionInfo[];

    countries: string[];
    selectedCity: string;

    deviceLayout = {
        barmode: 'stack',
        title: 'Percentage of Policies with Mention and No Mention of Devices',
        xaxis: { tickmode: 'linear', tickangle: 45, tickfont: { size: 9 } },
        yaxis: {
            title: 'Percentage',
        },
        width: 800,
        height: 500,
    };

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

    
    currentCountryData: BarChartInput[] = [];
    barLayout = {
        title: 'Distribution of Device Type for a Country',
        yaxis: { title: 'Occurrences' },
        xaxis: { tickmode: 'linear', tickangle: 45, tickfont: { size: 9 } },
        width: 800,
        height: 500,
    };

    constructor() {
        this.deviceInfo = deviceData;
        this.distInfo = distributedData;
        this.countries = countryData.map((t) => t.country);
        this.deviceData = this.getDeviceData(deviceData);
        this.countryData = this.getCountryData(countryData);
    }

    getDeviceData(data: DeviceInfo[]): BarChartInput[] {
        return [
            {
                x: data.map((d) => d.device_type),
                y: data.map((d) => (d.not_mentioned / d.total) * 100),
                name: 'No mention of smart device',
                type: 'bar',
            },
            {
                x: data.map((d) => d.device_type),
                y: data.map((d) => (d.mentioned / d.total) * 100),
                name: 'Mention of smart device',
                type: 'bar',
            },
        ];
    }

    getCountryData(data: CountryInfo[]): BarChartInput[] {
        return [
            {
                x: data.map((d) => d.country),
                y: data.map((d) => (d.not_mentioned / d.total) * 100),
                name: 'No mention of smart device',
                type: 'bar',
            },
            {
                x: data.map((d) => d.country),
                y: data.map((d) => (d.mentioned / d.total) * 100),
                name: 'Mention of smart device',
                type: 'bar',
            },
        ];
    }

    onChange(param: string): void {
        const rec = this.distInfo.find((t) => t.country == param);
        if (!!rec) {
            this.currentCountryData = [
                {
                    x: Object.keys(rec).filter((t) => t != 'country'),
                    y: Object.values(rec).slice(1),
                    name: 'No mention of smart device',
                    type: 'bar',
                    marker: {
                        color: [
                            "#fc5185",
                            "#fd6a6d",
                            "#f7b731",
                            "#4b4b4b",
                            "#0abde3",
                            "#f5d547",
                            "#1dd1a1",
                            "#ff9ff3",
                            "#ffbe76",
                            "#ff7979",
                            "#badc58",
                            "#dff9fb",
                            "#f3a683",
                            "#f7d794",
                            "#778beb",
                            "#2d3436",
                            "#b2bec3",
                            "#e77f67",
                            "#2c2c54",
                            "#474787",
                            "#d1ccc0",
                            "#f5cd79",
                            "#c44569",
                            "#a5b1c2",
                          ],
                      },
                },
            ];
        }
        else{
            throw new Error('Country Not Found');
        }
    }
}
