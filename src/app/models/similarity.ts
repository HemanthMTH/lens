export class Similarity {
    url: string;
    policy_text: string;
    policy_text_processed: string;
    policy_text_gensim: string[];


    constructor(url: string, policy_text: string,
        policy_text_processed: string, policy_text_gensim: string) {
        this.url = url
        this.policy_text = policy_text
        this.policy_text_processed = policy_text_processed
        this.policy_text_gensim = this.prepare(policy_text_gensim)
    }

    prepare(text: string): string[] {
        
        let output_list: string [] = text.split("', '");
        output_list[0] = output_list[0].slice(2);
        output_list[output_list.length - 1] = output_list[output_list.length - 1].slice(0, -2);

        return output_list
    }
}

export interface PolicyData {
    policy_text_processed: string[];
  }