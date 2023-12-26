import {useListUsers} from "../../../../../application/useListUsers.ts";
import {UserDto} from "../../../secondary/redux/users/user.dto.ts";

export const ListUserPage = () => {

    const {loading, users} = useListUsers()

    return (
        <div className="container">
            <h2>Users Page</h2>
            {users?.map((user:UserDto)=>
                <div key={user.id}>
                    <h3>{user.email}</h3>
                </div>
            )}
            {!loading && users?.length === 0 && <p>No hay users</p>}
            {loading && <p>Cargando users...</p>}
        </div>
    );
}
