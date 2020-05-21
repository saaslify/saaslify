import { Saaslify } from './types';

const Configurations = {
    [Saaslify.Sandbox]: {
        oauth: {
            basedomain: 'https://oauth-dev.saaslify.io',
        },
    },
    [Saaslify.Production]: {
        oauth: {
            basedomain: 'https://oauth-prod.saaslify.io',
        },
    },
    [Saaslify.Mock]: {
        oauth: {
            basedomain: 'http://oauth_basedomain',
        },
    },
};

export const validConfig = (config: Saaslify.Config) => {
    if (!config.saasId) {
        throw new Error(`Saaslify.Saalify needs a saasId of type string.`);
    }
    if (!['production', 'sandbox', 'mock'].find((x) => config.endpoint === x)) {
        throw new Error(`Saaslify.Saalify needs a and endpoints of 'production' | 'sandbox' | 'mock'.`);
    }
};

export const configuration = (config: Saaslify.Config) => {
    return Configurations[config.endpoint];
};
