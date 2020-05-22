import { Saaslify } from '../types';
import { getConfiguration } from '../config';

export namespace GetLogoutURL {
    export type Request = {
        callbackURL: string;
    };
    export type ResponseData = string;
    export type Method = Saaslify.Method<Request, ResponseData>;
    export type FactoryMethod = Saaslify.FactoryMethod<Request, ResponseData>;
}

const getLogoutURL: GetLogoutURL.FactoryMethod = (opts) => (x) =>
    Promise.resolve({
        data: `${getConfiguration(opts).oauth.basedomain}/logout/${opts.saasId}?callback=${encodeURIComponent(
            x.callbackURL,
        )}`,
    });

export default getLogoutURL;
export { getLogoutURL };
