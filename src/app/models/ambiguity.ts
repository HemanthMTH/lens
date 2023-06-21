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