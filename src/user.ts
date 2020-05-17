import { Saaslify } from './types';
import { getLoginURL, GetLoginURL } from './user/getLoginURL';
import { getUser, GetUser } from './user/getUser';
import { getJWT, GetJWT } from './jwt/getJWT';
import { verifyJWT, VerifyJWT } from './jwt/verifyJWT';

export namespace User {
    export type Api = {
        getLoginURL: GetLoginURL.Method;
        getUser: GetUser.Method;
        getJWT: GetJWT.Method;
        verifyJWT: VerifyJWT.Method;
    };

    export type SDK = Saaslify.SDK<Api>;
}

export const user: User.SDK = (opts) => ({
    getLoginURL: getLoginURL(opts),
    getUser: getUser(opts),
    getJWT: getJWT(opts),
    verifyJWT: verifyJWT(opts),
});
