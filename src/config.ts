import { Saaslify } from './types';

export const Configurations = {
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
    [Saaslify.Localhost]: {
        oauth: {
            basedomain: 'http://localhost:3000',
        },
    },
};

export const validConfig = (config: Saaslify.Config) => {
    if (!config.saasId) {
        throw new Error(`Saaslify.Saalify needs a saasId of type string.`);
    }
    if (!Configurations[config.endpoint]) {
        throw new Error(
            `Submitted endpoint = ${config.endpoint}. Saaslify.Saalify needs a and endpoints of 'production' | 'sandbox' | 'mock' | 'localhost'.`,
        );
    }
};

export const getConfiguration = (config: Saaslify.Config) => {
    return Configurations[config.endpoint];
};
