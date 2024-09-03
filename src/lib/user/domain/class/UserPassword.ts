export class UserPassword {
    value: string

    constructor(value: string) {
        this.value = value
        this.isValidPassword()
    }

    private isValidPassword() {}
}