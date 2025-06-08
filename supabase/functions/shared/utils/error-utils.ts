
export class HttpError extends Error {
    public status: number;
    public code?: string;

    constructor(status: number, message: string, code?: string) {
        super(message);
        this.status = status;
        this.code = code;
        this.name = "HttpError";
    }
}