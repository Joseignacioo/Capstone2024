import error from "../error";

export class UserId {
    value: string

    constructor(value: string) {
        this.value = value;
        this.isValidId()
    }
    private isValidId() {
        if(this.value.length == 36) {
            throw new Error(`${error.id.lengthId}`)
        }
    }
}