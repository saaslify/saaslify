export namespace Saaslify {
    export const Production = 'production';
    export const Sandbox = 'sandbox';
    export const Mock = 'mock';
    export const Localhost = 'localhost';
    export type Endpoints = typeof Production | typeof Sandbox | typeof Mock | typeof Localhost;
    export type Config = {
        saasId: string;
        endpoint: Endpoints;
        fetch?: typeof window.fetch;
    };

    export type SDK<ApiDef> = (config: Config) => ApiDef;
    export type Method<Request, ResponseData> = (request: Request) => Promise<{ data: ResponseData }>;
    export type FactoryMethod<Request, ResponseData> = (config: Config) => Method<Request, ResponseData>;
}
