import {useState} from "react";
import {UserAggregate} from "../domain/UserAggregate.ts";
import {useAppDispatch} from "../infrastructure/adapters/secondary/redux/hooks.ts";
import {addUser} from "../infrastructure/adapters/secondary/redux/users/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import {UserDto} from "../infrastructure/adapters/secondary/redux/users/user.dto.ts";
import {AxiosService} from "../infrastructure/adapters/secondary/http/axios-service.ts";
import {LocalStorageService} from "../infrastructure/adapters/secondary/storage/localstorage-service.ts";

export const useCreateUser = () => {
    const navigate = useNavigate();
    const [error   , setError   ] = useState("");
    const [loading, setLoading ] = useState(false);
    const [name    , setName    ] = useState("");
    const [email    , setEmail    ] = useState("");

    const dispatch = useAppDispatch();

    const createUser = async () => {
        setLoading(true)
        try {
            const userAggregate = new UserAggregate<UserDto>();
            const user = userAggregate.createUser( 0, name, email);

            // llamada http request para guardar el nuevo usuario
            const request = new AxiosService<Partial<UserDto>, any>();
            const userRequest = await request.post("https://jsonplaceholder.typicode.com/users", {
                name: user.name,
                email: user.email
            });

            // guardar en localstorage
            new LocalStorageService<UserDto>().add("users", userRequest)

            // meter en el store de redux
            dispatch(addUser(user))
        }catch (e: any) {
            setError(e?.message)
            setTimeout(() => {
                setError("")
            }, 2000)
        }

        setEmail("")
        setName("")
        setLoading(false)

        navigate("/users")
    }

    return { email, setEmail, name, setName, createUser, error, loading };
}
