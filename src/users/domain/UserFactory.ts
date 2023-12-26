import {UserEntity} from "./models/UserEntity.ts";
import {EmailObjectValue} from "./objects-values/EmailObjectValue.ts";
import {UserDto} from "../infrastructure/adapters/secondary/user.dto.ts";

export class UserFactory {
    create(id:number, name: string, email: string) {
        const emailObjectValue = new EmailObjectValue(email);
        const userId = id ? id : Math.floor(Math.random() * 1000) + 1;
        return new UserEntity<UserDto>(userId, name, emailObjectValue);
    }
}
