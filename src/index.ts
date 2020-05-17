import { Saaslify } from './types';
import { user, User } from './user';

import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.map';

export type Api = {
    user: User.Api;
};

const Saaslify = (x: Saaslify.Config): Api => ({
    user: user(x),
});

export default Saaslify;
export { Saaslify };
