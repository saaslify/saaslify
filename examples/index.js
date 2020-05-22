const LogoutButton = {
    init: async (saaslify) => {
        document.querySelector("#logout").href = await saaslify.user.getLogoutURL({
            callbackURL: document.location.href // redirect to this page again
        }).then(x => x.data)
    }
}


const LoginButton = {
    init: async (saaslify) => {
        const loginLink = document.querySelector(`#login`)
        loginLink.href = await saaslify.user.getLoginURL({
            provider: loginLink.dataset['provider'],
            scopes: loginLink.dataset['scopes'].split(';'),
            callbackURL: document.location.href // redirect to this page again
        }).then(_ => _.data)
    }
}

const CheckAuth = {
    init: async (saaslify) => {
        console.log('load')

        const target = document.querySelector(`#login`)
        const user = await saaslify.user.getUser({
            provider: target.dataset['provider'],
            scopes: target.dataset['scopes'].split(';')
        }).then(
            _ => _,
            _ => _
        )

        const loginState = ({ color, label }) => `<span style="border-radius:50%;background:${color};text-align:center;">${label}</span>`


        document.querySelector(`#loginstate`).innerHTML = loginState(user.data ? {
            color: 'lightgreen',
            label: 'ON'
        }: {
            color: 'red',
            label: 'OFF'
        })

        if (!user.data) {
            return
        }

        const {
            email,
            name,
            avatar,
            provider
        } = user.data

        const el = document.createElement('div')
        el.innerHTML = `<img src=${avatar} width="50" /><p>Login via ${provider}</p><br />${name} (${email})</bt>`
        document.querySelector('main').appendChild(el)
    }
}

const Modules = {
    '/check-auth': [ LoginButton, LogoutButton, CheckAuth ]
}

const main = () => {
    const scriptTag = document.createElement('script')

    scriptTag.src = '/js/saaslify.min.js'
    scriptTag.onload = () => {
        const pathname = window.document.location.pathname
        const saaslify = Saaslify.init({
            saasId: 'localhost',
            endpoint: Saaslify.endpoint.Localhost
        })
        Object.keys(Modules).filter(prefix => pathname.startsWith(prefix)).forEach(
            x => Modules[x].forEach(_ => _.init(saaslify))
        );

    }

    document.head.appendChild(scriptTag)
}

main()
