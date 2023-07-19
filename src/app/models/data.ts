export interface MetaData {
    url: string;
    manufacturer_url: string;
    manufacturer: string;
    device: string;
    country: string;
    category: string;
    policy_text?: string;
    year: number;
    policy_url: string;
    keywords?: Keyword;
    features?: Feature;
}

export class Policy {
    manufacturer: string;
    policy_text?: string;
    year?: number;

    constructor(manufacturer: string, policy_text: string, year?: number) {
        this.manufacturer = manufacturer;
        this.policy_text = policy_text;
        this.year = year;
    }
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
    manufacturer: string;
    mentioned: boolean;
    compliance?: string | null;
    last_update?: string | null;
    assessment?: string | null;
    policy_text?: string;
    year?: number;
}

export interface Feature {
    manufacturer: string;
    coherence_score: number;
    entropy: number;
    unique_words: number;
    reading_time: number;
    fkgl: number;
    imprecise_words: number;
    connective_words: number;
    spelling_errors: number;
    policy_text?: string;
    year?: number;
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
