export interface Batch {
    id?: string;
    course?: string;
    semester?: string;
    department?: string;
    section?: string;
    batch?: string;
    Department?: string;
    $key?: String;
}

export interface Student {
    name?: string;
    id?: String;
    batcg_id?: String;
    batch_key?: string;
    $key?: String;
}