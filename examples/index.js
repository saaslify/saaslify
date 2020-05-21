
const LoginButton = {
    init: (saaslify) => {
        document.querySelector(`#login`).addEventListener('click', async (e) => {
            const loginURL = await saaslify.user.getLoginURL({
                provider: e.target.dataset['provider'],
                scopes: e.target.dataset['scopes'].split(';'),
                callbackURL: document.location.href // redirect to this page again
            })

            window.location.href = loginURL.data

            console.log({ loginURL })
        })
    }
}

const CheckAuth = {
    init: async (saaslify) => {
        console.log('load')

        const target = document.querySelector(`#login`)
        const user = await saaslify.user.getUser({
            provider: target.dataset['provider'],
            scopes: target.dataset['scopes'].split(';')
        })

        console.log({user})

        const loginState = ({ color, label }) => `<div style="border-radius:50%;background:${color};text-align:center;">${label}</div>`

        document.querySelector(`#loginstate`).innerHTML = loginState(user ? {
            color: 'lightgreen',
            label: 'ON'
        }: {
            color: 'red',
            label: 'OFF'
        })
    }
}

const Modules = {
    '/login-button': [ LoginButton ],
    '/check-auth': [ LoginButton, CheckAuth ]
}

const main = () => {
    const scriptTag = document.createElement('script')

    scriptTag.src = '/js/saaslify.min.js'
    scriptTag.onload = () => {
        const pathname = window.document.location.pathname
        const saaslify = Saaslify.init({
            saasId: 'localhost',
            endpoint: Saaslify.endpoint.Sandbox
        })
        Object.keys(Modules).filter(prefix => pathname.startsWith(prefix)).forEach(
            x => Modules[x].forEach(_ => _.init(saaslify))
        );

    }

    document.head.appendChild(scriptTag)
}

main()
