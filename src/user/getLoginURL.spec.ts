import getLoginURL from './getLoginURL';
import { Saaslify } from '../types';

describe('getLoginURL', () => {
    it.each([
        ['mock', 'http://oauth_basedomain'],
        ['sandbox', 'https://oauth-dev.saaslify.io'],
        ['production', 'https://oauth-prod.saaslify.io'],
    ])('should get correct url for %s', async (endpoint, domain) => {
        const { data } = await getLoginURL({ endpoint: endpoint as Saaslify.Endpoints, saasId: 'saaslify' })({
            provider: 'github',
            scopes: ['email', 'repo'],
            callbackURL: 'https://www.google.com',
        });

        expect(data).toBe(
            `${domain}/connect/github?saas_provider=saaslify&scope=email,&scope=repo&callback=https%3A%2F%2Fwww.google.com`,
        );
    });
});
