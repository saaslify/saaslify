import { Saaslify } from '../types';

export namespace VerifyJWT {
    export type Request = {
        jwt: string;
        privateKeyId: string;
    };

    export type ResponseData = object;

    export type Method = Saaslify.Method<Request, ResponseData>;
    export type FactoryMethod = Saaslify.FactoryMethod<Request, ResponseData>;
}

export const verifyJWT: VerifyJWT.FactoryMethod = (opts) => (args) => Promise.resolve({ data: {} });

export default verifyJWT;
