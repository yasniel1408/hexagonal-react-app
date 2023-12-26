export class EmailObjectValue {
    constructor(private email: string) {
        if (!this.isValid()) {
            throw new Error('Invalid email, the email must be at least 5 characters long and contain @ and .');
        }
    }
    isValid() {
        return this.email.length >= 5 && this.email.includes('@') && this.email.includes('.');
    }

    get value() {
        return this.email;
    }
}
