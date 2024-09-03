import { User } from "../../domain/class/User";
import { UserRepository } from "../../domain/contract/UserRepository";

export class UserGetAll {
    constructor(private repository: UserRepository) {}

    async run(): Promise<User[]> {
        return this.repository.getAll()
    }
}