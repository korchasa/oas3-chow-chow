export interface ChowErrorMeta {
    in: string;
    name: string;
    rawErrors?: string[];
    code?: number;
}
export default class ChowError extends Error {
    private meta;
    constructor(message: string, meta: ChowErrorMeta);
    toJSON(): {
        code: number;
        location: {
            in: string;
            name: string;
        };
        message: string;
        rawErrors: string[];
    };
}
