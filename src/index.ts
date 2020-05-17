import { Saaslify } from './types';
import { user, User } from './user';

export type Api = {
    user: User.Api;
};

const Saaslify = (x: Saaslify.Config): Api => ({
    user: user(x),
});

export default Saaslify;
export { Saaslify };
