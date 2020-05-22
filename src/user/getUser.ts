import { Saaslify } from '../types';
import { GetLoginURL } from './getLoginURL';
import { getConfiguration } from '../config';

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

    export const json = 'application/json';
    export const jwt = 'application/jwt';

    export type LoginOpts = { provider: LoginProvider; scopes: string[] };

    export type Request = { asJWT?: boolean };
    export type ResponseData = UserInformation | undefined;
    export type Method = Saaslify.Method<Request, ResponseData>;
    export type FactoryMethod = Saaslify.FactoryMethod<Request, ResponseData>;
}

export const getUser: GetUser.FactoryMethod = (config) => (request = {}) => {
    const defaultRequestOpts = {
        asJWT: false,
    };

    const combinedRequest = {
        ...defaultRequestOpts,
        ...(request || {}),
    };

    if (config.endpoint === Saaslify.Mock) {
        return Promise.resolve({
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
    } else {
        const configuration = getConfiguration(config);
        return (config.fetch || window.fetch)(configuration.oauth.basedomain + `/profile`, {
            credentials: 'include',
            headers: { 'content-type': combinedRequest.asJWT ? GetUser.jwt : GetUser.json },
        }).then((_) => _.json());
    }
};

export default getUser;
