import { Component, ViewChild } from '@angular/core';
import { BarChartInput, GroupedAttributeData } from 'src/app/models/charts';
import { Keyword, KeywordType, Results } from 'src/app/models/keywords';
import keywordData from '../../../assets/data/keyword_analysis_data.json';
import legislationData from '../../../assets/data/keywords/no_device/legislation.json';
import policyChangeData from '../../../assets/data/keywords/no_device/policy_change.json';
import noDeviceLegislationData from '../../../assets/data/keywords/device/legislation_device.json';
import noDevicePolicyChangeData from '../../../assets/data/keywords/device/policy_change_device.json';
import firstPartyCollectionData from '../../../assets/data/keywords/no_device/first_party_collection.json';
import noDeviceFirstPartyCollectionData from '../../../assets/data/keywords/device/first_party_collection_device.json';
import thirdPartyCollectionData from '../../../assets/data/keywords/no_device/third_party_collection.json';
import noDeviceThirdPartyCollectionData from '../../../assets/data/keywords/device/third_party_collection_device.json';
import userChoiceData from '../../../assets/data/keywords/no_device/user_choice.json';
import noDeviceUserChoiceData from '../../../assets/data/keywords/device/user_choice_device.json';
import dataSecurityData from '../../../assets/data/keywords/no_device/user_choice.json';
import noDeviceDataSecurityData from '../../../assets/data/keywords/device/user_choice_device.json';
import optOutData from '../../../assets/data/keywords/no_device/optout.json';
import noDeviceOptOutData from '../../../assets/data/keywords/device/optout_device.json';
import doNotTrackData from '../../../assets/data/keywords/no_device/do_not_track.json';
import noDeviceDoNotTrackData from '../../../assets/data/keywords/device/do_not_track_device.json';
import accessEditDeleteData from '../../../assets/data/keywords/no_device/access_edit_delete.json';
import noDeviceAccessEditDeleteData from '../../../assets/data/keywords/device/access_edit_delete_device.json';
import dataKeywordData from '../../../assets/data/keywords/no_device/access_edit_delete.json';
import noDeviceDataKeywordData from '../../../assets/data/keywords/device/access_edit_delete_device.json';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
    selector: 'app-keyword',
    templateUrl: './keyword.component.html',
    styleUrls: ['./keyword.component.scss'],
})
export class KeywordComponent {
    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

    dataSource: Keyword[];
    data: BarChartInput[] = [];
    layout = {
        barmode: 'group',
        xaxis: { title: 'Frequency' },
        yaxis: {
            tickmode: 'linear',
            tickangle: 45,
            tickfont: { size: 10 },
        },
        width: 1000,
        height: 800,
    };

    type: KeywordType;
    results: Results[];
    results_data: BarChartInput[] = [];
    no_device_results_data: BarChartInput[] = [];
    device_results_layout = {
        barmode: 'stack',
        title: 'Mentioned Devices',
        xaxis: { title: 'Device Type' },
        yaxis: {
            tickmode: 'linear',
            tickangle: 45,
            tickfont: { size: 8 },
        },
        width: 500,
        height: 500,
    };
    results_layout = {
        barmode: 'stack',
        title: 'Not Mentioned Devices',
        xaxis: { title: 'Device Type' },
        yaxis: {
            tickmode: 'linear',
            tickangle: 45,
            tickfont: { size: 8 },
        },
        width: 500,
        height: 500,
    };

    public columnDefs: ColDef[] = [
        {
            headerName: 'URL',
            field: 'url',
            pinned: 'left',
            width: 250,
        },
        {
            headerName: 'Do Not Track',
            field: 'do_not_track',
        },
        {
            headerName: 'Data Security',
            field: 'data_security',
        },
        {
            headerName: 'First Party Collection',
            field: 'first_party_collection',
        },
        {
            headerName: 'Third Party Collection',
            field: 'third_party_collection',
        },
        {
            headerName: 'OPT-OUT',
            field: 'opt_out',
        },
        {
            headerName: 'User Choice',
            field: 'user_choice',
        },
        {
            headerName: 'Data',
            field: 'data',
        },
        {
            headerName: 'Legislation',
            field: 'legislation',
        },
        {
            headerName: 'Access/Edit/Delete',
            field: 'access_edit_delete',
        },
        {
            headerName: 'Policy Change',
            field: 'policy_change',
        },
    ];
    public rowData$!: any[];
    public defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        // cellStyle: {
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     textAlign: 'center',
        // },
    };
    gridOptions: GridOptions = {
        pagination: true,
        paginationPageSize: 10,
    };

    constructor() {
        this.dataSource = keywordData;

        const properties = Object.keys(keywordData[0]).filter(
            (t) => t != 'url'
        );

        const result: GroupedAttributeData[] = properties.map((property) => {
            const values = this.dataSource.map(
                (item) => item[property as keyof Keyword]
            );
            const sum = values.reduce(
                (total, value) => Number(total) + Number(value),
                0
            );
            const mean = Number(sum) / values.length;

            const min = Math.min(...values.map((t) => Number(t)));
            const max = Math.max(...values.map((t) => Number(t)));
            return {
                group_name: property,
                minimum: min,
                maximum: max,
                mean: mean,
            };
        });

        this.data = [
            {
                x: result.map((d) => d.mean),
                y: result.map((d) => d.group_name),
                name: 'Mean',
                type: 'bar',
                orientation: 'h',
            },
            {
                x: result.map((d) => d.maximum),
                y: result.map((d) => d.group_name),
                name: 'Maximum',
                type: 'bar',
                orientation: 'h',
            },
            {
                x: result.map((d) => d.minimum),
                y: result.map((d) => d.group_name),
                name: 'Minimum',
                type: 'bar',
                orientation: 'h',
            },
        ];
    }

    onGridReady(params: GridReadyEvent) {
        this.rowData$ = keywordData;
    }

    onBarClick(param: any) {
        const keyword = param.points[0].label;
        for (const key in KeywordType) {
            if (key === keyword) {
                Object.entries(KeywordType).forEach((element) => {
                    if (element[0] == keyword) {
                        this.type = element[1];
                        return;
                    }
                });
                break;
            }
        }
        const results = this.getBarChart(this.type);
        this.results_data = this.prepareStackedBarData(results[0]);
        this.no_device_results_data = this.prepareStackedBarData(results[1]);
    }

    prepareStackedBarData(data: Results[]): BarChartInput[] {
        const categories = data.map((element) => element.category);

        const max_bar: BarChartInput = {
            x: data.map((element) => element.max),
            y: categories,
            name: 'Maximum',
            type: 'bar',
            orientation: 'h',
        };

        const avg_bar: BarChartInput = {
            x: data.map((element) => element.average),
            y: categories,
            name: 'Average',
            type: 'bar',
            orientation: 'h',
        };

        const min_bar: BarChartInput = {
            x: data.map((element) => element.min),
            y: categories,
            name: 'Minimum',
            type: 'bar',
            orientation: 'h',
        };
        return [min_bar, avg_bar, max_bar];
    }

    getBarChart(type: string): Results[][] {
        this.results_data = [];
        this.no_device_results_data = [];
        switch (type) {
            case KeywordType.legislation:
                return [legislationData, noDeviceLegislationData];
            case KeywordType.policy_change:
                return [policyChangeData, noDevicePolicyChangeData];
            case KeywordType.first_party_collection:
                return [
                    firstPartyCollectionData,
                    noDeviceFirstPartyCollectionData,
                ];
            case KeywordType.third_party_collection:
                return [
                    thirdPartyCollectionData,
                    noDeviceThirdPartyCollectionData,
                ];
            case KeywordType.user_choice:
                return [userChoiceData, noDeviceUserChoiceData];
            case KeywordType.data_security:
                return [dataSecurityData, noDeviceDataSecurityData]; //done
            case KeywordType.opt_out:
                return [optOutData, noDeviceOptOutData];
            case KeywordType.do_not_track:
                return [doNotTrackData, noDeviceDoNotTrackData];
            case KeywordType.access_edit_delete:
                return [accessEditDeleteData, noDeviceAccessEditDeleteData];
            case KeywordType.data:
                return [dataKeywordData, noDeviceDataKeywordData];
            default:
                throw new Error('Unknown Keyword');
        }
    }
}
