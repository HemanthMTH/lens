import {
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { end } from '@popperjs/core';
import {
    ColDef,
    GridApi,
    GridReadyEvent,
    ICellRendererParams,
} from 'ag-grid-community';
import * as diff from 'diff';
import * as Diff2html from 'diff2html';
import * as levenshtein from 'fastest-levenshtein';
import { MetaData, Policy } from 'src/app/models/data';
import pastPolicyData from '../../../assets/latest/past_policies.json';
import policyData from '../../../assets/latest/policies.json';
import { ButtonRendererComponent } from '../button/button.component';
import { PolicyTextModalComponent } from '../policy-text-modal/policy-text-modal.component';

interface SentencePair {
    leftSentence: string;
    rightSentence: string;
}

interface PolicyEntry {
    manufacturer: string;
    year: number;
    policyText: string;
}

@Component({
    selector: 'app-test',
    template: `
        <div class="container">
            <p class="lead">
                You can use PrivacyLens to understand how the privacy policies
                of a device have changed over the years.
            </p>
            <p class="lead">
                The first manufacturer on the list has been selected by default.
                Feel free to select a different manufacturer if you wish to
                compare their privacy policies over the years.
            </p>

            <ng-select
                class="my-3 highlighted-select"
                [items]="uniqueManufacturers"
                placeholder="Select Manufacturer"
                [multiple]="false"
                [(ngModel)]="selectedManufacturer"
                (change)="onChange($event)"
            >
            </ng-select>

            <div *ngIf="rowData.length > 0" class="container">
                <p class="lead">
                    The table below presents the privacy policies of the default
                    manufacturer for different years. If you've chosen a
                    different manufacturer, their data will be shown here.
                </p>

                <div style="height: 40vh" class="ag-theme-alpine">
                    <ag-grid-angular
                        style="width: 100%; height: 100%"
                        [rowData]="rowData"
                        [columnDefs]="columnDefs"
                        [frameworkComponents]="frameworkComponents"
                        [defaultColDef]="defaultColDef"
                        [animateRows]="true"
                        [paginationAutoPageSize]="true"
                        [pagination]="true"
                        (gridReady)="onGridReady($event)"
                    >
                    </ag-grid-angular>
                </div>
                <p class="lead mt-4">
                    The earliest and latest years of privacy policies have been
                    selected by default for comparison. Please feel free to
                    select different years if you wish. Make sure the start year
                    is earlier than the end year.
                </p>

                <form [formGroup]="yearSelectionForm" class="row g-3 mt-2">
                    <div class="col">
                        <label for="startYear" class="form-label"
                            >Select Start Year</label
                        >
                        <select
                            id="startYear"
                            class="form-select"
                            formControlName="startYear"
                        >
                            <option
                                *ngFor="let year of uniqueYears"
                                [value]="year"
                            >
                                {{ year }}
                            </option>
                        </select>
                    </div>

                    <div class="col">
                        <label for="endYear" class="form-label"
                            >Select End Year</label
                        >
                        <select
                            id="endYear"
                            class="form-select"
                            formControlName="endYear"
                            [disabled]="
                                !yearSelectionForm.get('startYear')?.value
                            "
                        >
                            <option
                                *ngFor="let year of uniqueYears"
                                [value]="year"
                            >
                                {{ year }}
                            </option>
                        </select>
                    </div>
                </form>

                <div
                    *ngIf="disable"
                    class="alert alert-danger mt-2 text-center"
                    role="alert"
                >
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    Invalid selection! The year selected on the left should be
                    earlier than the year selected on the right.
                </div>

                <div *ngIf="!disable">
                    <p class="lead mt-4">
                        The section below presents a comparison between the
                        privacy policies of the selected years. Differences are
                        highlighted for easy identification.
                    </p>

                    <h2 class="policy-title">Policy Comparison</h2>
                    <div class="policy-version">
                        <h3 class="version-title">Policy ({{ left }})</h3>
                        <h3 class="version-title">Policy ({{ right }})</h3>
                    </div>

                    <div
                        #diffContainer
                        class="diffContainer"
                        [innerHTML]="outputHtml"
                    ></div>
                </div>
            </div>
        </div>
    `,

    styles: [
        `
            :host ::ng-deep .d2h-wrapper {
                height: auto !important;
            }
            :host ::ng-deep .d2h-changed {
                color: #333;
                background-color: #e3c451;
                padding: 2px 4px;
                border-radius: 4px;
                font-size: 0.85rem;
                font-weight: bold;
            }
            :host ::ng-deep .d2h-added {
                color: #333;
                background-color: #85bf71;
                padding: 2px 4px;
                border-radius: 4px;
                font-size: 0.85rem;
                font-weight: bold;
            }
            :host ::ng-deep .d2h-removed {
                color: #333;
                background-color: #f5b7b1;
                padding: 2px 4px;
                border-radius: 4px;
                font-size: 0.85rem;
                font-weight: bold;
            }
            :host ::ng-deep .d2h-code-line-ctn {
                white-space: pre-wrap;
                word-break: break-word;
                overflow-wrap: break-word;
            }
            :host ::ng-deep .d2h-code-side-line {
                padding: 0 4.5em;
                width: calc(100% - 0em);
            }
            .policy-title {
                text-align: center;
                font-weight: bold;
                margin: 20px 0;
            }
            .policy-version {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
            }
            .version-title {
                font-weight: 500;
            }
            .diffContainer {
                border: 1px solid #ddd;
                padding: 15px;
                border-radius: 5px;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            }
        `,
    ],
})
export class TestComponent implements OnInit {
    @ViewChild('diffContainer') diffContainer: ElementRef;

    rightText: string[];
    leftText: string[];
    outputHtml: string;
    policies: Policy[] = [];
    pastPolicies: Policy[] = [];
    policyEntries: PolicyEntry[] = [];
    rowData: PolicyEntry[] = [];
    uniqueManufacturers: string[] = [];
    selectedManufacturer: string;

    uniqueYears: number[] = [];
    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        minWidth: 100,
        resizable: true,
    };
    yearSelectionForm: FormGroup;
    isSelectionComplete: boolean = false;

    gridApi: GridApi;
    frameworkComponents = {
        buttonRenderer: ButtonRendererComponent,
    };
    disable: boolean;
    left: number;
    right: number;

    columnDefs: ColDef[] = [
        { field: 'manufacturer' },
        { field: 'year' },
        {
            headerName: 'Privacy Policy',
            headerTooltip: 'Click to view the privacy policy',
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
                onClick: this.onPrivacyButtonClick.bind(this),
                label: 'Click for policy',
            },
            minWidth: 200,
        },
    ];

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) {
        this.prepareForm();

        this.yearSelectionForm.valueChanges.subscribe(() => {
            const start = this.yearSelectionForm.controls['startYear'];
            const end = this.yearSelectionForm.controls['endYear'];
            if (!!start.value && !!end.value) {
                this.disable = Number(start.value) >= Number(end.value);
                if (!this.disable) {
                    this.onSelectionComplete();
                }
            }
        });
        policyData.forEach(
            (element: { manufacturer: string; policy_text: string }) => {
                this.policies.push(
                    new Policy(element.manufacturer, element.policy_text, 2023)
                );
            }
        );
        pastPolicyData.forEach(
            (element: {
                manufacturer: string;
                policy_text: string;
                year: number;
            }) => {
                this.pastPolicies.push(
                    new Policy(
                        element.manufacturer,
                        element.policy_text,
                        element.year
                    )
                );
            }
        );

        this.policyEntries = this.getCommonPolicies();
        this.uniqueManufacturers = this.policyEntries
            .filter(
                (product, index, self) =>
                    index ===
                    self.findIndex(
                        (p) => p.manufacturer === product.manufacturer
                    )
            )
            .map((p) => p.manufacturer);

        this.selectedManufacturer = 'amazfit';
        this.onChange(this.selectedManufacturer);
        this.patchFormValue();
        this.onSelectionComplete();
    }

    patchFormValue(): void {
        let initial = {
            startYear: Math.min(...this.uniqueYears),
            endYear: Math.max(...this.uniqueYears),
        };

        this.yearSelectionForm.patchValue(initial);
    }

    ngOnInit() {}

    prepareForm(): void {
        this.yearSelectionForm = this.formBuilder.group({
            startYear: [null, Validators.required],
            endYear: [null, Validators.required],
        });
    }

    prepareDiffView(leftText: string[], rightText: string[]): void {
        let outputHtml = '';

        const maxLen = Math.max(rightText.length, leftText.length);

        for (let i = 0; i < maxLen; i++) {
            let left = leftText[i] || '';
            let right = rightText[i] || '';

            const mostSimilarIndex = this.findMostSimilarSentenceIndex(
                left,
                rightText
            );
            if (mostSimilarIndex !== i && mostSimilarIndex !== -1) {
                // If the most similar sentence is not in the same position, compare with the most similar one.
                right = rightText[mostSimilarIndex];
                rightText.splice(mostSimilarIndex, 1); // remove this sentence from further consideration
            }

            const diffText = diff.createTwoFilesPatch(' ', ' ', left, right);

            // Only add diffText to outputHtml if it includes '@@', which indicates changes
            if (diffText.includes('@@')) {
                let html = Diff2html.html(diffText, {
                    drawFileList: false,
                    matching: 'none',
                    outputFormat: 'side-by-side',
                });
                let parser = new DOMParser();
                let htmlDoc = parser.parseFromString(html, 'text/html');

                let labels = htmlDoc.querySelectorAll('.d2h-tag.d2h-changed');
                labels.forEach((label: Element) => {
                    if (left.trim() === '') {
                        (label as HTMLElement).textContent = 'ADDED';
                        (label as HTMLElement).className = 'd2h-added';
                    } else if (right.trim() === '') {
                        (label as HTMLElement).textContent = 'REMOVED';
                        (label as HTMLElement).className = 'd2h-removed';
                    } else {
                        (label as HTMLElement).textContent = 'CHANGED';
                        (label as HTMLElement).className = 'd2h-changed';
                    }
                });

                let serializer = new XMLSerializer();
                html = serializer.serializeToString(htmlDoc);

                outputHtml += html;
            }
        }

        this.outputHtml = outputHtml;
    }

    onSelectionComplete() {
        const startYear = this.yearSelectionForm.value.startYear;
        const endYear = this.yearSelectionForm.value.endYear;
        const left = this.rowData.find(
            (row) => row.year === Number(startYear)
        )?.policyText;
        const right = this.rowData.find(
            (row) => row.year === Number(endYear)
        )?.policyText;
        this.left = startYear;
        this.right = endYear;
        const leftText = left ? this.splitIntoSentences(left) : [];
        const rightText = right ? this.splitIntoSentences(right) : [];

        this.prepareDiffView(leftText, rightText);
    }

    getCommonPolicies(): PolicyEntry[] {
        const commonPolicyEntries: PolicyEntry[] = [];
        const commonManufacturers = this.policies
            .map((policy) => policy.manufacturer)
            .filter(
                (manufacturer, index, array) =>
                    this.pastPolicies
                        .map((policy) => policy.manufacturer)
                        .includes(manufacturer) &&
                    array.indexOf(manufacturer) === index
            );

        for (const manufacturer of commonManufacturers) {
            const policiesForManufacturer = [
                ...this.policies.filter(
                    (policy) => policy.manufacturer === manufacturer
                ),
                ...this.pastPolicies.filter(
                    (policy) => policy.manufacturer === manufacturer
                ),
            ];

            for (const policy of policiesForManufacturer) {
                if (policy.year && policy.policy_text) {
                    const policyEntry: PolicyEntry = {
                        manufacturer: manufacturer,
                        year: policy.year,
                        policyText: policy.policy_text,
                    };

                    commonPolicyEntries.push(policyEntry);
                }
            }
        }

        return commonPolicyEntries;
    }

    onChange(param: string): void {
        this.rowData = this.policyEntries
            .filter((p) => p.manufacturer === param)
            .sort((a, b) => a.year - b.year);
        this.uniqueYears = this.rowData.map((p) => p.year);
    }

    onGridReady(params: GridReadyEvent) {
        params.api.sizeColumnsToFit();
    }

    onPrivacyButtonClick(params: ICellRendererParams) {
        const modalRef = this.modalService.open(PolicyTextModalComponent, {
            size: 'lg',
        });
        modalRef.componentInstance.title = params?.data?.manufacturer;
        modalRef.componentInstance.policyText = params?.data?.policyText;
    }

    splitIntoSentences(text: string) {
        const normalizedText = text.replace(/ \./g, '.');

        return (
            normalizedText.match(/[^\.!\?]+[\.!\?]+|\S[^\.!\?]*$/g) || []
        ).filter((sentence) => sentence.trim().length > 0);
    }

    findAndCompareSimilarSentences(
        leftSentences: string[],
        rightSentences: string[]
    ) {
        const similarityThreshold = 0.8;
        const exactMatchThreshold = 0.99;
        let sentencePairs: SentencePair[] = [];

        for (let leftSentence of leftSentences) {
            let mostSimilarIndex = this.findMostSimilarSentenceIndex(
                leftSentence,
                rightSentences
            );
            if (mostSimilarIndex != -1) {
                const similarityScore = this.similarity(
                    leftSentence,
                    rightSentences[mostSimilarIndex]
                );
                if (
                    similarityScore > similarityThreshold &&
                    similarityScore < exactMatchThreshold
                ) {
                    if (
                        leftSentence.trim() !== '' &&
                        rightSentences[mostSimilarIndex].trim() !== ''
                    ) {
                        sentencePairs.push({
                            leftSentence: leftSentence,
                            rightSentence: rightSentences[mostSimilarIndex],
                        });
                        rightSentences.splice(mostSimilarIndex, 1);
                    }
                }
            }
        }
        sentencePairs = sentencePairs.filter(
            (pair) =>
                pair.leftSentence.trim() !== '' &&
                pair.rightSentence.trim() !== ''
        );

        return sentencePairs;
    }

    similarity(a: string, b: string) {
        let maxLength = Math.max(a.length, b.length);
        if (maxLength === 0) return 1;
        return 1 - levenshtein.distance(a, b) / maxLength;
    }

    findMostSimilarSentenceIndex(base: string, targets: string[]) {
        let maxSimilarityIndex = -1;
        let maxSimilarity = -1;
        targets.forEach((target, index) => {
            let sim = this.similarity(base, target);
            if (sim > maxSimilarity) {
                maxSimilarity = sim;
                maxSimilarityIndex = index;
            }
        });
        return maxSimilarityIndex;
    }
}
