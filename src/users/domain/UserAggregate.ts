import {UserFactory} from "./UserFactory.ts";
import {UserDto} from "../infrastructure/adapters/secondary/user.dto.ts";

export class UserAggregate<U> {
    createUser(id: number, name: string, email: string): U {
        const userFactory = new UserFactory();
        return userFactory.create(id, name, email).toJson() as U;
    }

    listUsers(users: UserDto[]): U[] {
        const dataUsers = users.map(user => {
            const userFactory = new UserFactory();
            return userFactory.create(user.id, user.name, user.email).toJson();
        })

        return dataUsers as U[];
    }

}
