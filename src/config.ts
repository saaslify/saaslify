import { Saaslify } from './types';

const Configurations = {
    sandbox: {
        oauth: {
            basedomain: 'https://oauth-dev.saaslify.io',
        },
    },
    production: {
        oauth: {
            basedomain: 'https://oauth-prod.saaslify.io',
        },
    },
    mock: {
        oauth: {
            basedomain: 'http://oauth_basedomain',
        },
    },
};
export const configuration = (config: Saaslify.Config) => {
    return Configurations[config.endpoint];
};
