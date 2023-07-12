import { Component } from '@angular/core';
import * as diff from 'diff';
import pastPolicyData from '../../../assets/latest/past_policies.json';
import policyData from '../../../assets/latest/policies.json';

interface DiffArrayChange extends diff.ArrayChange<string> {}

@Component({
    selector: 'app-diff',
    template: `
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Sentence</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let part of differences">
                    <td>{{ part.value.join(' ') }}</td>
                    <td>
                        <span class="badge" [ngClass]="getBadgeClass(part)">{{
                            getStatus(part)
                        }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    styles: [
        `
            .badge-added {
                background-color: green;
                color: white;
            }

            .badge-removed {
                background-color: red;
                color: white;
            }

            .badge-unchanged {
                background-color: black;
                color: white;
            }
        `,
    ],
})
export class DiffComponent {
    rightText: string[];
    leftText: string[];
    differences: DiffArrayChange[];

    constructor() {
        this.calculateDifferences();
    }

    calculateDifferences() {
        const rightPolicy = policyData.find(
            (p: any) => p.manufacturer === 'amazfit'
        );
        this.rightText = rightPolicy
            ? this.splitIntoSentences(rightPolicy.policy_text)
            : [];

        const leftPolicy = pastPolicyData.find(
            (p: any) => p.manufacturer === 'amazfit' && p.year === 2019
        );
        this.leftText = leftPolicy
            ? this.splitIntoSentences(leftPolicy.policy_text)
            : [];

        this.differences = diff.diffArrays(
            this.leftText,
            this.rightText
        ) as DiffArrayChange[];

        this.differences = this.differences.filter(
            (part) => part.value.join(' ').trim() !== ''
        );
    }

    splitIntoSentences(text: string) {
        const normalizedText = text.replace(/ \./g, '.');
        
        return normalizedText.match(/[^\.!\?]+[\.!\?]+|\S[^\.!\?]*$/g) || [];
    }

    getBadgeClass(part: DiffArrayChange) {
        return part.added
            ? 'badge-added'
            : part.removed
            ? 'badge-removed'
            : 'badge-unchanged';
    }

    getStatus(part: DiffArrayChange) {
        return part.added ? 'Added' : part.removed ? 'Removed' : 'Unchanged';
    }
}
