import { getUser } from './getUser';

describe('getUser', () => {
    it('should get correct url', async () => {
        const { data } = await getUser({ endpoint: 'mock', saasId: 'saaslify' })({});

        expect(data).toMatchInlineSnapshot(`
            Object {
              "avatar": "",
              "email": "",
              "id": "58D5E212-165B-4CA0-909B-C86B9CEE0111",
              "logins": Array [],
              "name": "",
              "orgs": Array [],
              "products": Array [],
            }
        `);
    });
});
