import error from "../error"

export class UserLastName {
    value: string

    constructor(value: string) {
        this.value = value
    }

    private isValidLastName() {
        if(this.value == null) {
            throw new Error(`${error.lastName.lenghLastName}`)
        }
    }
}