import error from "../error";

export class UserFirstName {
    value: string
    
    constructor(value: string) {
        this.value = value;
        this.isValidFirstName()
    }
    private isValidFirstName() {
        if(this.value == null) {
            throw new Error(`${error.firstName.requiredFirstName}`)
        }
        if(this.value.length == 36) {
            throw new Error(`${error.firstName.lenghtFirstName}`)
        }
    }
}