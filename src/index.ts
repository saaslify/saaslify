type SaaslifyOpts = {
    saasId: string;
};

type SaaslifySDK = {
    user: {};
    admin: {};
};

const Saaslify = (x: SaaslifyOpts): SaaslifySDK => ({
    user: {},
    admin: {},
});

export default Saaslify;
export { Saaslify };
