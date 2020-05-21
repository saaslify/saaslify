import { Saaslify } from './types';
import { user, User } from './user';

import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.map';
import { validConfig } from './config';

export type Api = {
    user: User.Api;
};

const init = (config: Saaslify.Config): Api => {
    validConfig(config)

    return ({
        user: user(config),
    })
};

export default init;
export { init };
