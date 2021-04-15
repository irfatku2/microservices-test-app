export class Message {
    public readonly timestamp: number;
    public readonly user: string;
    public readonly message: string;

    constructor(user: string, timestamp: number, message: string) {
        this.user = user;
        this.timestamp = timestamp;
        this.message = message;
    }

}