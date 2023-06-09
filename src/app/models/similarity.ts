export class Similarity {
    reference: number;
    url: string;

    constructor( reference: number, url: string) {
        this.url = url;
        this.reference = reference;
    }

    prepare(text: string): string[] {
        let output_list: string[] = text.split("', '");
        output_list[0] = output_list[0].slice(2);
        output_list[output_list.length - 1] = output_list[
            output_list.length - 1
        ].slice(0, -2);

        return output_list;
    }
}

export interface PolicyData {
    policy_text_processed: string[];
}
