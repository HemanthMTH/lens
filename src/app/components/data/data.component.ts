import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    ColDef,
    GridApi,
    GridReadyEvent,
    ICellRendererParams,
} from 'ag-grid-community';
import { ProductData } from 'src/app/models/data';
import _data from '../../../assets/dataset/combined.json';
import featureData from '../../../assets/dataset/features.json';
import keywordData from '../../../assets/dataset/keywords.json';
import { BooleanCellRendererComponent } from '../boolean-cell-renderer/boolean-cell-renderer.component';
import { ButtonRendererComponent } from '../button/button.component';
import { FeatureModalComponent } from '../feature-modal/feature-modal.component';
import { KeywordModalComponent } from '../keyword-modal/keyword-modal.component';
import { PolicyTextModalComponent } from '../policy-text-modal/policy-text-modal.component';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss'],
})
export class DataComponent {
    @ViewChild('featuresModal') featuresModal: FeatureModalComponent;

    columnDefs: ColDef[] = [
        {
            headerName: 'Keywords',
            headerTooltip: 'Click to view more information on keywords',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onKeywordButtonClick.bind(this),
                label: 'Click',
            },
        },
        {
            headerName: 'Features',
            headerTooltip: 'Click to view more information on features',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onFeatureButtonClick.bind(this),
                label: 'Click',
            },
        },
        { field: 'manufacturer', pinned: 'left', },
        {
            headerName: 'Manufacturer URL',
            field: 'manufacturer_url',
        },
        { field: 'country' },
        {
            headerName: 'Mentioned?',
            headerTooltip: 'Explicit mention of Device Type Name in Policy',
            field: 'mentioned',
            cellRenderer: 'booleanCellRenderer',
        },
        { field: 'category' },
        {
            headerName: 'Privacy Policy',
            headerTooltip: 'Click to view the privacy policy',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onPrivacyButtonClick.bind(this),
                label: 'Click for policy',
            },
        },
    ];

    rowData: ProductData[];
    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
        resizable: true,
    };

    gridApi: GridApi;
    frameworkComponents = {
        buttonRenderer: ButtonRendererComponent,
        booleanCellRenderer: BooleanCellRendererComponent,
    };

    constructor(private modalService: NgbModal) {
        this.rowData = _data;
        this.rowData.forEach((element) => {
            element.keywords = keywordData.find(
                (k) => k.url === element.manufacturer_url
            );
            element.features = featureData.find(
                (f) => f.url === element.manufacturer_url
            );
        });
    }

    onKeywordButtonClick(params: ICellRendererParams) {
        const modalRef = this.modalService.open(FeatureModalComponent, {
            size: 'lg',
        });
        modalRef.componentInstance.title = params.data.manufacturer;
        modalRef.componentInstance.keywords = params.data.keywords;
    }

    onFeatureButtonClick(params: ICellRendererParams) {
        const modalRef = this.modalService.open(KeywordModalComponent, {
            size: 'lg',
        });
        modalRef.componentInstance.title = params.data.manufacturer;
        modalRef.componentInstance.features = params.data.features;
    }

    onPrivacyButtonClick(params: ICellRendererParams) {
        const modalRef = this.modalService.open(PolicyTextModalComponent, {
            size: 'lg',
        });
        modalRef.componentInstance.title = params?.data?.manufacturer;
        modalRef.componentInstance.policyText = params?.data?.policy_text;
    }

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        params.api.sizeColumnsToFit();
    }
}
