import axios, { AxiosInstance } from 'axios';
import {HttpPort} from "../../../../domain/ports/secondary/http-port.ts";
export class AxiosService<D, R> implements HttpPort<D, R>{
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios;
    }

    public async get(url: string, config?: any): Promise<R> {
        return this.axiosInstance.get(url, config);
    }

    public async post(url: string, data?: D, config?: any): Promise<R> {
        return this.axiosInstance.post(url, data, config);
    }

    public async put(url: string, data?: D, config?: any): Promise<R> {
        return this.axiosInstance.put(url, data, config);
    }

    public async delete(url: string, config?: any): Promise<R> {
        return this.axiosInstance.delete(url, config);
    }

    public async patch(url: string, data?: D, config?: any): Promise<R> {
        return this.axiosInstance.patch(url, data, config);
    }
}
