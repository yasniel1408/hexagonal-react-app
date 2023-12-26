import {useCallback, useEffect, useState} from "react";
import {UserDto} from "../infrastructure/adapters/secondary/user.dto.ts";
import {UserAggregate} from "../domain/UserAggregate.ts";
import {AxiosService} from "../infrastructure/adapters/secondary/http/axios-service.ts";
import {LocalStorageService} from "../infrastructure/adapters/secondary/storage/localstorage-service.ts";
import UserReduxService from "../infrastructure/adapters/secondary/redux/user-redux-service.ts";
import {useDispatch} from "react-redux";

export const useListUsers = () => {
    const dispatch = useDispatch();
    const [loading, setLoading ] = useState(true);

    const getUsers = useCallback(async() => {
        // llamada http request para traer los datos de los usuarios
        const request = new AxiosService();
        const usersRequest = await request.get("https://jsonplaceholder.typicode.com/users");

        // pasar al dominio los datos para que los valide
        const userAggregate = new UserAggregate<UserDto>();
        const usersData = userAggregate.listUsers(usersRequest.data);

        // guardar en el localstorage
        new LocalStorageService<UserDto>().set("users", usersData);

        // meter en el store de store
        dispatch(UserReduxService.addUsers(usersData))
    },[])

    const loadDataFromStorageCache = useCallback(async () => {
        // cargar los datos del localstorage
        const data = new LocalStorageService<UserDto>().get("users") as UserDto[];
        if(data) {
            const userAggregate = new UserAggregate<UserDto>();
            const usersData = userAggregate.listUsers(data);
            dispatch(UserReduxService.addUsers(usersData))
        }
    },[])

    useEffect(() => {
        setLoading(true)
        loadDataFromStorageCache().then(()=> {
            getUsers().then(() => {
                setLoading(false)
            })
        })
    }, [getUsers, loadDataFromStorageCache]);

    return { getUsers, users: UserReduxService.getState(), loading };
}
