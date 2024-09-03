import { User } from "../../domain/class/User";
import { UserEmail } from "../../domain/class/UserEmail";
import { UserFirstName } from "../../domain/class/UserFirstName";
import { UserId } from "../../domain/class/UserId";
import { UserLastName } from "../../domain/class/UserLastName";
import { UserPassword } from "../../domain/class/UserPassword";
import { UserRepository } from "../../domain/contract/UserRepository";

export class UserCreate {
    constructor(private repository: UserRepository) {}

    async run(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Promise<void> {
        const user = new User(
            new UserId(id),
            new UserFirstName(firstName),
            new UserLastName(lastName),
            new UserEmail(email),
            new UserPassword(password)
        )
        return this.repository.create(user)
    }
}