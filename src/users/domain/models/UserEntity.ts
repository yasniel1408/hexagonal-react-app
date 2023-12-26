import {EmailObjectValue} from "../objects-values/EmailObjectValue.ts";

export class UserEntity<U> {
    constructor(private readonly id:number,
                private readonly name:string,
                private readonly email: EmailObjectValue,
                ) {
    }

    toJson(): U {
        return {
            id:this.id,
            name:this.name,
            email: this.email.value,
        } as U
    }
}
