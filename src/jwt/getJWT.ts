import { Saaslify } from '../types';

export namespace GetJWT {
    export type Request = {
        privateKeyId?: string;
        forOrgs?: string[];
        forProducts?: string[];
    };

    export type ResponseData = {
        jwt: string;
        privateKeyId: string;
    };

    export type Method = Saaslify.Method<Request, ResponseData>;
    export type FactoryMethod = Saaslify.FactoryMethod<Request, ResponseData>;
}

export const getJWT: GetJWT.FactoryMethod = (opts) => (method) =>
    Promise.resolve({
        data: {
            privateKeyId: '',
            jwt: '',
        },
    });

export default getJWT;
