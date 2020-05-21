
const LoginButton = {
    init: () => {
        document.querySelector(`#login`).addEventListener('click', async (e) => {
            const loginURL = await Saaslify.init({
                saasId: 'localhost',
                endpoint: Saaslify.endpoint.Sandbox
            }).user.getLoginURL({
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
    init: () => {
        document.addEventListener('DOMContentLoaded', async (e) => {
            const user = await saalify.user.getUser({
                provider: e.target.dataset['provider'],
                scopes: e.target.dataset['scopes'].split(';')
            })

            console.log({ user })
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
        Object.keys(Modules).filter(prefix => pathname.startsWith(prefix)).forEach(
            x => Modules[x].forEach(_ => _.init())
        );

    }

    document.head.appendChild(scriptTag)
}

main()
