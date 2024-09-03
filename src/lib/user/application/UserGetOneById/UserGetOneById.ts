import { User } from "../../domain/class/User";
import { UserId } from "../../domain/class/UserId";
import { UserRepository } from "../../domain/contract/UserRepository";

export class UserGetOneById {
    constructor(private repository: UserRepository) {}

    async run(id: string): Promise<User> {
       const user = await this.repository.getOneById(new UserId(id))

       if(!user) throw new Error('User not FOUND ')
        return user
    }
}