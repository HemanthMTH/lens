// export class Keyword {
//     url: string;
//     do_not_track: number;
//     data_security: number;
//     first_party_collection: number;
//     third_party_collection: number;
//     opt_out: number;
//     user_choice: number;
//     data: number;
//     legislation: number;
//     access_edit_delete: number;
//     policy_change: number;

//     constructor(
//         url: string,
//         do_not_track: number,
//         data_security: number,
//         first_party_collection: number,
//         third_party_collection: number,
//         opt_out: number,
//         user_choice: number,
//         data: number,
//         legislation: number,
//         access_edit_delete: number,
//         policy_change: number
//     ) {
//         this.url = url;
//         this.do_not_track = do_not_track;
//         this.data_security = data_security;
//         this.first_party_collection = first_party_collection;
//         this.third_party_collection = third_party_collection;
//         this.opt_out = opt_out;
//         this.user_choice = user_choice;
//         this.data = data;
//         this.legislation = legislation;
//         this.access_edit_delete = access_edit_delete;
//         this.policy_change = policy_change;
//     }
// }

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

export interface Results {
    category: string;
    min: number;
    average: number;
    max: number;
}

export enum KeywordType{
    do_not_track = 'Do Not Track',
    data_security = 'Data Security',
    first_party_collection = 'First Party Collection',
    third_party_collection = 'Third Party Collection',
    opt_out= 'OPTOUT',
    user_choice= 'User Choice',
    data = 'Data',
    legislation = 'Legislation',
    access_edit_delete = 'Access-Edit-Delete',
    policy_change = 'policy_change',
  }
