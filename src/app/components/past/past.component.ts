import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Feature, Keyword, PastProductData } from 'src/app/models/data';
import _data from '../../../assets/explore/past_data.json';
import featureData from '../../../assets/explore/past_features.json';
import keywordData from '../../../assets/explore/past_keys.json';
import { BooleanCellRendererComponent } from '../boolean-cell-renderer/boolean-cell-renderer.component';
import { ButtonRendererComponent } from '../button/button.component';
import { FeatureModalComponent } from '../feature-modal/feature-modal.component';
import { KeywordModalComponent } from '../keyword-modal/keyword-modal.component';
import { PolicyTextModalComponent } from '../policy-text-modal/policy-text-modal.component';
import { UrlRendererComponent } from '../url-renderer/url-renderer.component';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.scss']
})
export class PastComponent {
  @ViewChild('featuresModal') featuresModal: FeatureModalComponent;
    selected: PastProductData[] = [];
    showFeatures: boolean;
    columnDefs: ColDef[] = [
        {
            headerName: 'Keywords',
            headerTooltip: 'Click to view more information on keywords',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onKeywordButtonClick.bind(this),
                label: 'Click',
            },
            width: 150,
        },
        {
            headerName: 'Features',
            headerTooltip: 'Click to view more information on features',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onFeatureButtonClick.bind(this),
                label: 'Click',
            },
            width: 150,
        },
        { field: 'manufacturer', pinned: 'left', minWidth: 160 },
        {
            headerName: 'Manufacturer URL',
            field: 'manufacturer_url',
            cellRenderer: 'urlRenderer',
            minWidth: 200,
        },
        { field: 'year' },
        
        {
            headerName: 'Policy URL',
            field: 'policy_url',
            cellRenderer: 'urlRenderer',
        },
        {
            headerName: 'Policy',
            headerTooltip: 'Click to view the privacy policy',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onPrivacyButtonClick.bind(this),
                label: 'Click for policy',
            },
        },
    ];
    public keywordColumnDefs: ColDef[] = [
        {
            headerName: 'Manufacturer URL',
            field: 'url',
            pinned: 'left',
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

    featureColumnDefs: ColDef[] = [
        { headerName: 'Manufacturer URL', field: 'url', pinned: 'left' },
        {
            headerName: 'Coherence Score',
            field: 'coherence_score',
        },
        {
            field: 'entropy',
        },
        {
            headerName: 'Unique Words',
            field: 'unique_words',
        },
        {
            headerName: 'Reading Time',
            field: 'reading_time',
        },
        {
            headerName: 'Reading Level',
            field: 'fkgl',
        },
        {
            headerName: 'Imprecise Words',
            field: 'imprecise_words',
        },
        {
            headerName: 'Connective Words',
            field: 'connective_words',
        },
        {
            headerName: 'Grammatical Errors',
            field: 'spelling_errors',
        },
    ];

    featureRowData$!: Feature[];
    keywordRowData$!: Keyword[];
    rowData: PastProductData[];
    featuresData: any[];
    keywordData: any[];
    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        minWidth: 100,
        resizable: true,
    };

    frameworkComponents = {
        buttonRenderer: ButtonRendererComponent,
        booleanCellRenderer: BooleanCellRendererComponent,
        urlRenderer: UrlRendererComponent,
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

    onChange(param: PastProductData[]): void {
        this.selected = param;
        this.featuresData = this.selected.map((element) => element?.features);
        this.keywordData = this.selected.map((element) => element?.keywords);
        this.featureRowData$ = this.featuresData;
        this.keywordRowData$ = this.keywordData;
        this.showFeatures = this.selected.length > 0;
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
            params.api.sizeColumnsToFit();
        }
}
