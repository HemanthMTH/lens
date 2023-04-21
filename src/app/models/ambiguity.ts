// export class Ambiguity {
//     url: string;
//     coherence_score: number;
//     entropy: number;
//     unique_words: number;
//     reading_time: number;
//     fkgl: number;
//     imprecise_words: number;
//     connective_words: number;
//     spelling_errors: number;

//     constructor(url: string,
//                 coherence_score: number,
//                 entropy: number,
//                 unique_words: number,
//                 reading_time: number,
//                 fkgl: number,
//                 imprecise_words: number,
//                 connective_words: number,
//                 spelling_errors: number,) {
//         this.url = url
//         this.coherence_score = coherence_score
//         this.entropy = entropy
//         this.unique_words = unique_words
//         this.reading_time = reading_time
//         this.fkgl = fkgl
//         this.imprecise_words = imprecise_words
//         this.connective_words = connective_words
//         this.spelling_errors = spelling_errors

//     }
// }

export interface Ambiguity extends Model{
    url: string;
}

export interface Model {
    name?: string;
    coherence_score: number;
    entropy: number;
    unique_words: number;
    reading_time: number;
    fkgl: number;
    imprecise_words: number;
    connective_words: number;
    spelling_errors: number;
    target?: number
}

export interface Metrics {
    policy_features: string;
    min: number;
    avg: number;
    max: number;
}

export interface F1Score {
    ambiguity_class: string;
    number_of_policies: number;
    random_forrest_classifier: number;
    logistic_regression: number;
}