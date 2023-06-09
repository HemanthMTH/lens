export interface ProductData {
    manufacturer_url: string;
    manufacturer: string;
    country: string;
    category: string;
    policy_text: string;
    mentioned: boolean;
    policy_url?: string | null;
    keywords?: Keyword;
    features?: Feature;
}

export interface Keyword {
    do_not_track: number;
    data_security: number;
    first_party_collection: number;
    third_party_collection: number;
    opt_out: number;
    user_choice: number;
    data: number;
    legislation: number;
    access_edit_delete: number;
    policy_change: number;
    url: string;
}

export interface Feature {
    url: string;
    coherence_score: number;
    entropy: number;
    unique_words: number;
    reading_time: number;
    fkgl: number;
    imprecise_words: number;
    connective_words: number;
    spelling_errors: number;
}

export enum FeatureType {
    coherence_score = 'Coherence Score',
    entropy = 'Entropy',
    unique_words = 'Unique Words',
    reading_time = 'Reading Time',
    fkgl = 'Reading Level',
    imprecise_words = 'Imprecise Words',
    connective_words = 'Connective Words',
    spelling_errors = 'Grammatical Errors',
}
