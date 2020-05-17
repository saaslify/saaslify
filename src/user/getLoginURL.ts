import { Saaslify } from '../types';
import { configuration } from '../config';

export namespace GetLoginURL {
    type LoginProvider = 'github';

    export type LoginOpts = { provider: LoginProvider; scopes: string[] };

    export type Request = LoginOpts & {
        callbackURL: string;
    };
    export type ResponseData = string;
    export type Method = Saaslify.Method<Request, ResponseData>;
    export type FactoryMethod = Saaslify.FactoryMethod<Request, ResponseData>;
}

const getLoginURL: GetLoginURL.FactoryMethod = (opts) => (x) =>
    Promise.resolve({
        data: `${configuration(opts).oauth.basedomain}/connect/${x.provider}?saas_provider=${opts.saasId}${x.scopes.map(
            (scope) => `&scope=${scope}`,
        )}&callback=${encodeURIComponent(x.callbackURL)}`,
    });

export default getLoginURL;
export { getLoginURL };
