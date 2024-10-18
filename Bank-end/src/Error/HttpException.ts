class HttpException extends Error {
    constructor(public status: number, public message: any) {
        super(message);
        this.status = status;
    }
}

export default HttpException;