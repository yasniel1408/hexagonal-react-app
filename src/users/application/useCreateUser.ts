import {useState} from "react";
import {UserAggregate} from "../domain/UserAggregate.ts";
import {useNavigate} from "react-router-dom";
import {UserDto} from "../infrastructure/adapters/secondary/user.dto.ts";
import {AxiosService} from "../infrastructure/adapters/secondary/http/axios-service.ts";
import {LocalStorageService} from "../infrastructure/adapters/secondary/storage/localstorage-service.ts";
import UserReduxService from "../infrastructure/adapters/secondary/redux/user-redux-service.ts";
import {useDispatch} from "react-redux";

export const useCreateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error   , setError   ] = useState("");
    const [loading, setLoading ] = useState(false);
    const [name    , setName    ] = useState("");
    const [email    , setEmail    ] = useState("");


    const createUser = async () => {
        setLoading(true)
        try {
            const userAggregate = new UserAggregate<UserDto>();
            const user = userAggregate.createUser( 0, name, email);

            // llamada http request para guardar el nuevo usuario
            const request = new AxiosService();
            const userRequest = await request.post("https://jsonplaceholder.typicode.com/users", {
                name: user.name,
                email: user.email
            });

            // guardar en localstorage
            new LocalStorageService<UserDto>().add("users", userRequest.data)

            // meter en el store de redux
            dispatch(UserReduxService.addUser(user))
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
