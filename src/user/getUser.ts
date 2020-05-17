import { Saaslify } from '../types';
import { GetLoginURL } from './getLoginURL';

export namespace GetUser {
    type ID = {
        id: string;
        name: string;
    };

    type Plan = {
        typeId: string;
        active: boolean;
        valid: {
            from: string;
            to: string;
        };
    } & ID;

    type Product = {
        org?: ID;
        plan?: Plan;
    } & ID;

    type UserInformation = {
        avatar: string;
        email: string;
        orgs: ID[];
        logins: GetLoginURL.LoginOpts[];
        products: Product[];
    };

    type LoginProvider = 'github';

    export type LoginOpts = { provider: LoginProvider; scopes: string[] };

    export type Request = {} | undefined;
    export type ResponseData = UserInformation | undefined;
    export type Method = Saaslify.Method<Request, ResponseData>;
    export type FactoryMethod = Saaslify.FactoryMethod<Request, ResponseData>;
}

export const getUser: GetUser.FactoryMethod = (opts) => (x = {}) =>
    Promise.resolve({
        data: {
            id: '58D5E212-165B-4CA0-909B-C86B9CEE0111',
            avatar: '',
            name: '',
            email: '',
            logins: [],
            orgs: [],
            products: [],
        },
    });

export default getUser;
