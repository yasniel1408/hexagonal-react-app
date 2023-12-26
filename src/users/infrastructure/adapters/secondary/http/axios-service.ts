import axios, { AxiosInstance } from 'axios';
import {HttpPort} from "../../../../domain/ports/secondary/http-port.ts";
import {UserDto} from "../user.dto.ts";
export class AxiosService implements HttpPort<UserDto, any>{
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios;
    }

    public async get(url: string, config?: any) {
        return this.axiosInstance.get(url, config);
    }

    public async post(url: string, data?: Partial<UserDto>, config?: any) {
        return this.axiosInstance.post(url, data, config);
    }

    public async put(url: string, data?: UserDto, config?: any) {
        return this.axiosInstance.put(url, data, config);
    }

    public async delete(url: string, config?: any) {
        return this.axiosInstance.delete(url, config);
    }

    public async patch(url: string, data?: UserDto, config?: any) {
        return this.axiosInstance.patch(url, data, config);
    }
}
