import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    ColDef,
    GridApi,
    GridReadyEvent,
    ICellRendererParams,
} from 'ag-grid-community';
import { Feature, Keyword, MetaData, Policy } from 'src/app/models/data';

import _data from '../../../assets/latest/deviceData.json';
import featureData from '../../../assets/latest/features.json';
import keywordData from '../../../assets/latest/keyword.json';
import pastFeatureData from '../../../assets/latest/past_features.json';
import pastKeywordData from '../../../assets/latest/past_keywords.json';
import pastPolicyData from '../../../assets/latest/past_policies.json';
import policyData from '../../../assets/latest/policies.json';
import { BooleanCellRendererComponent } from '../boolean-cell-renderer/boolean-cell-renderer.component';
import { ButtonRendererComponent } from '../button/button.component';
import { FeatureModalComponent } from '../feature-modal/feature-modal.component';
import { KeywordModalComponent } from '../keyword-modal/keyword-modal.component';
import { PolicyTextModalComponent } from '../policy-text-modal/policy-text-modal.component';
import { UrlRendererComponent } from '../url-renderer/url-renderer.component';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss'],
})
export class DataComponent {
    @ViewChild('featuresModal') featuresModal: FeatureModalComponent;
    selected: MetaData[] = [];
    showFeatures: boolean;
    policies: Policy[] = [];
    columnDefs: ColDef[] = [
        { field: 'device', pinned: 'left', minWidth: 200 },
        { headerName: 'Device URL', field: 'url', cellRenderer: 'urlRenderer' },
        { field: 'category' },
        { field: 'manufacturer', minWidth: 160 },
        {
            headerName: 'Manufacturer URL',
            field: 'manufacturer_url',
            cellRenderer: 'urlRenderer',
            minWidth: 200,
        },
        { headerName: 'Manufacturer Country', field: 'country' },
        {
            headerName: 'Last Privacy Policy',
            headerTooltip: 'Click to view the privacy policy',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onPrivacyButtonClick.bind(this),
                label: 'Click for policy',
            },
            minWidth: 200,
        },
        {
            headerName: 'Policy URL',
            field: 'policy_url',
            cellRenderer: 'urlRenderer',
        },
        {
            headerName: 'Privacy Analysis',
            headerTooltip: 'Click to view more information on Privacy Analysis',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onKeywordButtonClick.bind(this),
                label: 'Click',
            },
            width: 200,
        },
        {
            headerName: 'Readability Analysis',
            headerTooltip: 'Click to view more information on Readability Analysis',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onFeatureButtonClick.bind(this),
                label: 'Click',
            },
            width: 200,
        },
    ];
    public keywordColumnDefs: ColDef[] = [
        {
            field: 'manufacturer',
            pinned: 'left',
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
        { headerName: 'Policy Year', field: 'year' },
        {
            headerName: 'Mentioned Device?',
            headerTooltip: 'Explicit mention of Device Type Name in Policy',
            field: 'mentioned',
            cellRenderer: 'booleanCellRenderer',
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
    gridOptions = {
        tooltipShowDelay: 0,
      };

    featureColumnDefs: ColDef[] = [
        { field: 'manufacturer', pinned: 'left' },
        {
            headerName: 'Policy',
            headerTooltip: 'Click to view the privacy policy',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onPrivacyButtonClick.bind(this),
                label: 'Click for policy',
            },
        },
        { headerName: 'Policy Year', field: 'year' },
        {
            headerName: 'Coherence Score',
            field: 'coherence_score',
            valueFormatter: (params) => {
                return params.value.toFixed(2);
            },
            headerTooltip: 'How easily the topics are understood by people can be determined using the coherence score in topic modeling. In simplest terms, a coherence score is like a makes sense score for a piece of text. It tells us how well the different parts of the text fit together. If the ideas in the text smoothly flow from one to another and everything seems related, the text has high coherence. But if the text jumps around from one idea to another without clear connections, it has low coherence. It is a way for computers to grade the quality of a text, similar to how a teacher might grade an essay.',
        },
        {
            field: 'entropy',
            valueFormatter: (params) => {
                return params.value.toFixed(2);
            },
            headerTooltip: 'A statistical quantity called the entropy of a language gauges, in a sense, how much information is generated on average for each letter in a text in that language. In simpler terms, it defines the uncertainty or disorder in a text document. The uncertainty of the meaning of textual terms is expressed in two ways: the meaning we get from it and the context in which it is utilized. Entropy was computed by iterating over the policy document characters and noting the frequency of occurrence of each one.'
        },
        {
            headerName: 'Unique Words',
            field: 'unique_words',
            valueFormatter: (params) => {
                return params.value.toFixed(2);
            },
            headerTooltip: 'The goal of the privacy policy document is to provide consumers with relevant and crucial information about how their data is used and if they have control over that data. This knowledge is conveyed using specialized technical jargon which can sometimes be hard to comprehend based on the context. The bounds of certain learning categories are being pushed by these unusual words, and the words around them offer crucial context. People usually don’t encounter low-frequency words which makes it hard for them to understand and comprehend these works which leads to the argument that unique words require unique instruction, because informational texts integrate vocabulary and concepts, it is hard to completely comprehend the material without a solid understanding of the unique, low-frequency phrases. It is hard to skip through complicated jargon while still having a general understanding of the subject matter; therefore, individuals must have expert-level knowledge of these words in order to grasp the content. The frequency of unique words is a measure of how many different words are used in a piece of text. This measure can tell you a lot about a piece of text. For instance, a text with many unique words might have a rich vocabulary or cover a wide range of topics. A text with few unique words might be more repetitive or focused on a single topic.',
        },
        {
            headerName: 'Reading Time',
            field: 'reading_time',
            headerTooltip: 'Privacy policies are hard to read, rarely read, and don’t help customers make informed decisions due to the fact that they are very lengthy and time-consuming. Reading time is calculated using an individual’s typical reading pace (roughly 238 WPM). We used an approach that involved counting all of the words in the document and dividing the total by 238 to produce a decimal number. The minute is the first digit of the decimal number. Then we multiply the second half (the decimal points) by 0.60, these are the seconds. We round up to get a whole number that represents the total reading time of the policy.',
        },
        {
            headerName: 'Reading Level',
            field: 'fkgl',
            valueFormatter: (params) => {
                return params.value.toFixed(2);
            },
            headerTooltip: 'Readability refers to how simple or it is to read something. The readability of a text is determined by how it is presented and the context in which words and phrases in the document are delivered. Additional elements that influence reading are sentence length, sentence structure, and syllable count per word. These aspects work together to determine how well your writing will be comprehended. Readability is crucial since it determines how well a reader understands a piece of text. Policies should be easy to read because they describe the policies and practices of the businesses regarding the data that is gathered from consumers. There are many readability tests which have been devised by linguists and are based on different factors like the vocabulary used, the syntax and the sentence structure. For our study, we used Flesch-Kincaid Grade Level which displays the score in terms of a U.S. grade level.',
        },
        {
            headerName: 'Freq. of Imprecise Words',
            field: 'imprecise_words',
            valueFormatter: (params) => {
                return params.value.toFixed(2);
            },
            minWidth: 200,
            headerTooltip: 'Some terms are naturally imprecise in the English language. Texts may become unclear if such terms are used frequently. For instance, it may be difficult to understand general terms like commonly or normally, which give an incorrect picture of the service provider’s operations and cause uncertainty in determining the statement’s true meaning.',
        },
        {
            headerName: 'Freq. of Connective Words',
            field: 'connective_words',
            valueFormatter: (params) => {
                return params.value.toFixed(2);
            },
            minWidth: 200,
            headerTooltip: 'In the English language, connecting words are used to join clauses or phrases. They are crucial for the creation of coherent sentences. However, overusing connectives makes a text more complicated. The following is an excerpt from a Policy that might be interesting to observe: Like most online service providers, we collect information that online services, portable devices, and cloud services typically make available, including the internet browser, Source IP, unique device identifiers, language choice, referring site, the date and time of access, operating system, and mobile network information. Three times in this phrase, the conjunction and has been used to connect different clauses and reading this sentence is challenging. Research related to textual information suggests counting the number of connective terms to assess the text’s quality in software requirements.'
        },
        {
            headerName: 'Grammatical Errors',
            field: 'spelling_errors',
            valueFormatter: (params) => {
                return params.value.toFixed(2);
            },
            headerTooltip: 'The integrity of a work depends on proper grammar, much as it does on word spelling. Every sentence of a policy document went through the framework to ensure that the grammar was used correctly. Each tokenized text which was produced with the help of NLP is compared to a parse tree to ensure that the Grammar is valid. We track the proportion of sentences with poor grammar in each text relative to the overall number of sentences.'
        },
    ];

    featureRowData$!: Feature[];
    keywordRowData$!: Keyword[];
    rowData: MetaData[];
    featuresData: any[];
    keywordData: any[];
    pastFeaturesData: any[];
    pastKeywordData: any[];
    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        minWidth: 100,
        resizable: true,
    };
    uniqueManufacturerProducts: MetaData[];

    gridApi: GridApi;
    frameworkComponents = {
        buttonRenderer: ButtonRendererComponent,
        booleanCellRenderer: BooleanCellRendererComponent,
        urlRenderer: UrlRendererComponent,
    };

    constructor(private modalService: NgbModal) {
        policyData.forEach(
            (element: { manufacturer: string; policy_text: string }) => {
                this.policies.push(
                    new Policy(element.manufacturer, element.policy_text)
                );
            }
        );
        _data.forEach((element) => {
            element.policy_text =
                this.policies.find(
                    (p) => p.manufacturer === element.manufacturer
                )?.policy_text || ' ';
        });
        this.rowData = _data;
        this.rowData.forEach((element) => {
            element.keywords = keywordData.find(
                (k) => k.manufacturer === element.manufacturer
            );
            element.features = featureData.find(
                (f) => f.manufacturer === element.manufacturer
            );
        });
        this.uniqueManufacturerProducts = this.rowData.filter(
            (product, index, self) =>
                index ===
                self.findIndex((p) => p.manufacturer === product.manufacturer)
        );
    }

    onChange(param: MetaData[]): void {
        this.selected = param;
        this.featuresData = this.selected.map((element) => element?.features);
        this.keywordData = this.selected.map((element) => element?.keywords);
        this.keywordData.forEach(element => {
            const rec = param.find(p => p.manufacturer === element.manufacturer)
            element.policy_text = rec?.policy_text
            element.year = rec?.year
        });
        this.featuresData.forEach(element => {
            const rec = param.find(p => p.manufacturer === element.manufacturer)
            element.policy_text = rec?.policy_text
            element.year = rec?.year
        });
        
        const mans = param.map(p => p.manufacturer)
        this.pastKeywordData = pastKeywordData.filter(keyword => mans.some(m => m === keyword.manufacturer))
        this.pastKeywordData.forEach(element => {
            const rec = pastPolicyData.find(p => p.manufacturer === element.manufacturer && p.year === element.year)
            element.policy_text = rec?.policy_text
        });
        this.pastFeaturesData = pastFeatureData.filter(keyword => mans.some(m => m === keyword.manufacturer))
        this.pastFeaturesData.forEach(element => {
            const rec = pastPolicyData.find(p => p.manufacturer === element.manufacturer && p.year === element.year)
            element.policy_text = rec?.policy_text
        });
        this.keywordRowData$ =  [...this.keywordData, ...this.pastKeywordData];
        this.featureRowData$ = [...this.featuresData, ...this.pastFeaturesData];
        
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

    // onGridReady(params: GridReadyEvent) {
    //     this.gridApi = params.api;
    //     params.api.sizeColumnsToFit();
    // }

    // onSecondGridReady(params: GridReadyEvent) {
    //     params.api.sizeColumnsToFit();
    // }
}
