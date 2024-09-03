import { User } from "../class/User";
import { UserId } from "../class/UserId";

export interface UserRepository {
    create(user: User): Promise<void>
    getAll(): Promise<User[]>
    getOneById(id: UserId): Promise<User | null>
    edit(user: User): Promise<void>
    delete(id: UserId): Promise<void>
}