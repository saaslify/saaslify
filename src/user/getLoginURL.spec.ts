import getLoginURL from './getLoginURL';

describe('getLoginURL', () => {
    it('should get correct url', async () => {
        const { data } = await getLoginURL({ endpoint: 'mock', saasId: 'saaslify' })({
            provider: 'github',
            scopes: ['email', 'repo'],
            callbackURL: 'https://www.google.com',
        });

        expect(data).toBe(
            `http://oauth_basedomain/connect/github?saas_provider=saaslify&scope=email,&scope=repo&callback=https%3A%2F%2Fwww.google.com`,
        );
    });
});
