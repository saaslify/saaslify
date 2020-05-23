import { verify, VerifyErrors, Algorithm } from 'jsonwebtoken';
import { Saaslify } from '../types';
import { getConfiguration } from '../config';

export namespace VerifyJWT {
    export type Request = {
        jwt: string;
        privateKeyId: string;
    };

    export type ResponseData = object;

    export type Method = Saaslify.Method<Request, ResponseData>;
    export type FactoryMethod = Saaslify.FactoryMethod<Request, ResponseData>;
}

type Result = {
    err: VerifyErrors | string | null,
    data: object | undefined
  }

export const verifyJWTToken = <T> (
    signature: string,
    publicKey: string,
    algorithms: Algorithm[] = ["RS256"]
) => new Promise<Result>((resolve, reject) => {
    verify(
        signature,
        String(publicKey),
        { algorithms },
        (err: VerifyErrors | null, data: object | undefined) => resolve({ err, data })
    )
});

type PublicKey = {
    use: 'sig';
    kty: 'RSA';
    kid: string;
    n: string;
    alg: Algorithm;
}

let publicKeys: PublicKey[] | undefined = undefined


const getPublicKeys = async (config: Saaslify.Config) => {
    const configuration = getConfiguration(config);

    publicKeys = publicKeys || await (config.fetch || window.fetch)(
        configuration.oauth.basedomain + `/wellknown`
    ).then(_ => _.json())

    return publicKeys
}


export const verifyJWT: VerifyJWT.FactoryMethod = (config) => async (args) => {
    const publicKeys = await getPublicKeys(config)
    const key = publicKeys?.find(x => x.kid === args.privateKeyId)
    if (!key) {
        throw new Error(`E4353: No public key found`)
    }

    return { data: await verifyJWTToken(args.jwt, key?.n, [key?.alg]) }
};

export default verifyJWT;
