export class UserEmail {
    value: string

    constructor(value: string) {
        this.value = value
        this.isValidEmail()
    }

    private isValidEmail() {}
}