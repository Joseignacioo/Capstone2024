import { UserEmail } from "./UserEmail"
import { UserFirstName } from "./UserFirstName"
import { UserId } from "./UserId"
import { UserLastName } from "./UserLastName"
import { UserPassword } from "./UserPassword"

export class User {
    constructor(readonly id: UserId, readonly firstName: UserFirstName, readonly lastName: UserLastName, readonly email: UserEmail, readonly password: UserPassword) {
        return new User(id,firstName,lastName,email,password)
    }

    static fromPrimitives(id: string, firstName: string, lastName: string, email: string, password: string) {
        return new User(new UserId(id), new UserFirstName(firstName), new UserLastName(lastName), new UserEmail(email), new UserPassword(password))
    }   
}