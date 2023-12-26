
export interface HttpPort<D, R> {
    get(url: string): Promise<R>;
    post(url: string, data?: D): Promise<R>;
    put(url: string, data?: D): Promise<R>;
    delete(url: string): Promise<any>;
    patch(url: string, data?: D): Promise<R>;
}
