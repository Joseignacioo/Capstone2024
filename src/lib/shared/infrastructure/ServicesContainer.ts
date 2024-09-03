import { UserCreate } from "../../user/application/UserCreate/UserCreate";
import { UserGetAll } from "../../user/application/UserGetAll/UserGetAll";
import { UserGetOneById } from "../../user/application/UserGetOneById/UserGetOneById";
import { PostgresUserRepository } from "../../user/infrastructure/PostgresUserRepository";

const userRepository = new PostgresUserRepository('url')

export const ServicesContainer = {
    User: {
        getAll: new UserGetAll(userRepository),
        getOneById: new UserGetOneById(userRepository),
        create: new UserCreate(userRepository),
    }
}