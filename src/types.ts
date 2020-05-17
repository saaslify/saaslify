export namespace Saaslify {
    export type Endpoints = 'production' | 'sandbox' | 'mock';
    export type Config = {
        saasId: string;
        endpoint: Endpoints;
    };

    export type SDK<ApiDef> = (config: Config) => ApiDef;
    export type Method<Request, ResponseData> = (request: Request) => Promise<{ data: ResponseData }>;
    export type FactoryMethod<Request, ResponseData> = (config: Config) => Method<Request, ResponseData>;
}
