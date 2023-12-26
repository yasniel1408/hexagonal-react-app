import {useAppDispatch, useAppSelector} from "../infrastructure/adapters/secondary/redux/hooks.ts";
import {RootState} from "../infrastructure/adapters/secondary/redux/redux.ts";
import {useCallback, useEffect, useState} from "react";
import {addUsers} from "../infrastructure/adapters/secondary/redux/users/usersSlice.ts";
import {UserDto} from "../infrastructure/adapters/secondary/redux/users/user.dto.ts";
import {UserAggregate} from "../domain/UserAggregate.ts";
import {AxiosService} from "../infrastructure/adapters/secondary/http/axios-service.ts";
import {LocalStorageService} from "../infrastructure/adapters/secondary/storage/localstorage-service.ts";

export const useListUsers = () => {
    const [loading, setLoading ] = useState(true);
    const { users } = useAppSelector((state: RootState) => state.user);

    const dispatch = useAppDispatch();

    const getUsers = useCallback(async() => {
        // llamada http request para traer los datos de los usuarios
        const request = new AxiosService<UserDto, any>();
        const usersRequest = await request.get("https://jsonplaceholder.typicode.com/users");

        // pasar al dominio los datos para que los valide
        const userAggregate = new UserAggregate<UserDto>();
        const usersData = userAggregate.listUsers(usersRequest.data);

        // guardar en el localstorage
        new LocalStorageService<UserDto>().set("users", usersData);

        // meter en el store de redux
        dispatch(addUsers(usersData))
    },[])

    const loadDataFromStorageCache = useCallback(async () => {
        // cargar los datos del localstorage
        const data = new LocalStorageService<UserDto>().get("users") as UserDto[];
        if(data) {
            const userAggregate = new UserAggregate<UserDto>();
            const usersData = userAggregate.listUsers(data);
            dispatch(addUsers(usersData))
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

    return { getUsers, users, loading };
}
