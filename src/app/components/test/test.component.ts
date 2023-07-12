import {
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import * as diff from 'diff';
import * as Diff2html from 'diff2html';
import * as levenshtein from 'fastest-levenshtein';
import pastPolicyData from '../../../assets/latest/past_policies.json';
import policyData from '../../../assets/latest/policies.json';

interface SentencePair {
    leftSentence: string;
    rightSentence: string;
}

@Component({
    selector: 'app-test',
    template: `
        <div class="container">
            <h2 class="policy-title">Policy Comparison</h2>
            <div class="policy-version">
                <h3 class="version-title">Past Policy (2019)</h3>
                <h3 class="version-title">Current Policy</h3>
            </div>
            <div
                #diffContainer
                class="diffContainer"
                [innerHtml]="outputHtml"
            ></div>
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

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
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

        let outputHtml = '';

        const maxLen = Math.max(this.rightText.length, this.leftText.length);

        for (let i = 0; i < maxLen; i++) {
            let left = this.leftText[i] || '';
            let right = this.rightText[i] || '';

            const mostSimilarIndex = this.findMostSimilarSentenceIndex(
                left,
                this.rightText
            );
            if (mostSimilarIndex !== i && mostSimilarIndex !== -1) {
                // If the most similar sentence is not in the same position, compare with the most similar one.
                right = this.rightText[mostSimilarIndex];
                this.rightText.splice(mostSimilarIndex, 1); // remove this sentence from further consideration
            }

            const diffText = diff.createTwoFilesPatch(' ', ' ', left, right);

            // Only add diffText to outputHtml if it includes '@@', which indicates changes
            if (diffText.includes('@@')) {
                let html = Diff2html.html(diffText, {
                    drawFileList: false,
                    matching: 'none',
                    outputFormat: 'side-by-side',
                });

                // Use DOMParser to manipulate the HTML
                let parser = new DOMParser();
                let htmlDoc = parser.parseFromString(html, 'text/html');

                // Update the label based on whether the left or right text was empty
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

                // Serialize the manipulated HTML document back into a string
                let serializer = new XMLSerializer();
                html = serializer.serializeToString(htmlDoc);

                outputHtml += html;
            }
        }

        this.outputHtml = outputHtml;
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
                        rightSentences.splice(mostSimilarIndex, 1); // Remove the matched sentence from the list
                    }
                }
            }
        }

        // Filter out pairs with empty or null strings on both sides
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
