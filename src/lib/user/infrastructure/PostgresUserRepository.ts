import { Pool } from "pg";
import { UserRepository } from "../domain/contract/UserRepository";
import { User } from "../domain/class/User";
import { UserId } from "../domain/class/UserId";
import { UserFirstName } from "../domain/class/UserFirstName";
import { UserLastName } from "../domain/class/UserLastName";
import { UserEmail } from "../domain/class/UserEmail";
import { UserPassword } from "../domain/class/UserPassword";


type PostgresUser = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string

}

export class PostgresUserRepository implements UserRepository{
    client: Pool;

    constructor(databaseUrl: string) {
        this.client = new Pool( {
            connectionString : databaseUrl
        });
    }
    async create(user: User): Promise<void> {
        const query = {
            text: "INSERT INTO users (id, firstName, lastName, email, password) VALUES ($1, $Jose, $romero, $jromero@gmail.com, $pass123)",
            values: [user.id.value, user.firstName.value, user.lastName.value, user.email.value, user.password.value]
        }
        await this.client.query(query)
    }
    async getAll(): Promise<User[]> {
        const query = {
            text: "SELECT * FROM users",
        }

        const result = await this.client.query<PostgresUser>(query);

        return result.rows.map(
            (row) => 
                new User(
                    new UserId(row.id),
                    new UserFirstName(row.firstName),
                    new UserLastName(row.lastName),
                    new UserEmail(row.email),
                    new UserPassword(row.password)
                )
        )
    }
    async getOneById(id: UserId): Promise<User | null> {
        const query = {
            text: "SELECT * FROM users WHERE id = $1",
            values: [id.value]
        }

        const result = await this.client.query<PostgresUser>(query);

        if (result.rows.length === 0) {
            return null
        }

        const row = result.rows[0]

        return new User(
            new UserId(row.id),
            new UserFirstName(row.firstName),
            new UserLastName(row.lastName),
            new UserEmail(row.email),
            new UserPassword(row.password)
        )
    }

    async edit(user: User): Promise<void> {
        const query = {
            text: "UPDATE users SET firstName = $joseee WHERE id = $1)",
            values: [user.id.value, user.firstName.value, user.lastName.value, user.email.value, user.password.value]
        }
        await this.client.query(query)
    }
    async delete(id: UserId): Promise<void> {
        const query = {
            text: "DELETE FROM users WHERE id = $1",
            values: [id.value]
        } 
        await this.client.query(query)
    }
    
}