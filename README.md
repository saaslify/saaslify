# Saaslify

- [Saaslify](#saaslify)
  - [How to use the SDK?](#how-to-use-the-sdk)
  - [Authentication - Who am I?](#authentication---who-am-i)
    - [Recipe 1 - Login Button](#recipe-1---login-button)
    - [Recipe 2 - Check whether is loggedin](#recipe-2---check-whether-is-loggedin)
    - [Recipe 3 - Automatic redirect if not loggedin](#recipe-3---automatic-redirect-if-not-loggedin)
  - [Authorization - What can I access?](#authorization---what-can-i-access)
    - [Pure frontend applications](#pure-frontend-applications)
    - [Recipe for mixed frontend and backend authorization](#recipe-for-mixed-frontend-and-backend-authorization)
    - [Other server side programming language](#other-server-side-programming-language)
    - [Recipe for machine to machine authorization](#recipe-for-machine-to-machine-authorization)
  - [Remarks: Security & limitations](#remarks-security--limitations)
    - [Other Backend langueges](#other-backend-langueges)
    - [Key rotations](#key-rotations)
    - [Never persist the JWT](#never-persist-the-jwt)
    - [Custom fetch](#custom-fetch)
    - [Caching](#caching)
  - [Contributing](#contributing)
    - [Join the community](#join-the-community)
    - [Make a PR](#make-a-pr)
    - [Build your own SAAS](#build-your-own-saas)
    - [Implement a feature](#implement-a-feature)
    - [Make a donation for a feature to be implemented](#make-a-donation-for-a-feature-to-be-implemented)

## How to use the SDK?

We will just touch JavaScript Client SDK and NodeJS

```javascript
import { Saaslify } from '/saaslify'
const saaslify = Saaslify({ saasId: 'your-awesome-app' })
...
```

or use our CDN
```javascript
const script = document.createElement('script')
script.src = "https://unpkg.com/saaslify"
script.async = true
script.onload = () => {
    const saaslify = window.Saaslify({ saasId: 'your-awesome-app' })
    ...
}
document.head.appendChild(script)
```

More efficient use of CDN



## Authentication - Who am I?

### Recipe 1 - Login Button

We assume you have a button some where
```html
<span id="login" data-provider="" data-scopes="">login with github</span>
```

```javascript
document.querySelector(`#login`).addEventListener('click', async (e) => {
    const loginURL = await saalify.user.getLoginUrl({
        provider: e.target.dataset['provider'],
        scopes: e.target.dataset['scopes'].split(';'),
        callbackURL: document.location.href // redirect to this page again
    })

    window.location.href === loginURL
})
```


### Recipe 2 - Check whether is loggedin

```javascript
const user = await saalify.user.getUser({
    provider: e.target.dataset['provider'],
    scopes: e.target.dataset['scopes'].split(';')
})

const isLoggedIn = Boolean(user)
```


### Recipe 3 - Automatic redirect if not loggedin

```javascript
const user = await Saalify.user.getUser()

const isLoggedIn = Boolean(user)

if (!isLoggedIn) {
    const loginURL = await Saalify.user.getLoginUrl({
        provider: e.target.dataset['provider'],
        scopes: e.target.dataset['scopes'].split(';')
    })

    window.location.replace(loginURL) // `replace` overwrites the browser history
}
```

## Authorization - What can I access?

### Pure frontend applications

```javascript
const user = await saalify.user.getUser()
```

Returns
```

```

### Recipe for mixed frontend and backend authorization

In your browser

```javascript
const body = {
    bananas: 5
}

Saalify.user.fetch(`https://your.api-endpoint.com/order`, {
    method: 'POST',
    body: body, // remark *
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
    }
})
```

Our fetch method differs from the normal in that we transform the body and add an additional field.

```json
{
    "jwt": "...",
    "bananas": 5
}
```

Here is an example of a receiving node js server:
```javascript
import * as express from 'express'

const app = express();

app.use(express.json());

app.post('/order', async (request, response) => {
    const { jwt, bananas } = request

    try {
        const userData = await saaslify.user.jwtVerify(jwt)

        const bananaPlan = userData.products.find(x => x.plan.name === 'banana')

        if (bananaPlan) {
            // ... order 5 bananas
            response.status(201).json({ data })
            return
        } else {
            response.status(201).json({ error: `User ${jwt.userId} has no plan "banana".` })
            return
        }
    } catch (e) {
        response.status(401).json({ error: e.message })
        return
    }
})

app.listen(3000, () => {
    console.log(`Server is listening at port 3000`)
})

```

### Other server side programming language

The only part which we have to use Saaslify library is:

```
await Saaslify.jwtVerify(jwt)
```



### Recipe for machine to machine authorization

For cli or server to server applications, you will need some sort of api keys.

Either use our custom user management to allow users to generate machine tokens or build your own frontend with our Client SDK. User need to be logged in for this.
```javascript
const token = await Saaslify.user.generateMachineToken({ name: 'terminator' })
```

Machines fetch just like browsers:

```javascript
const machine = Saaslify.auth({ token, name, userId })

machine.fetch(`https://your.api-endpoint.com/order`, {
    method: 'POST',
    body: body, // remark *
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
    }
})
```

You can double check on the server whether it is a machine jwt you are communicating with
```javascript
const machineName = await Saaslify.user.jwtVerify(jwt).then(x => x.machine?.name)

const isMachine = Boolean(machineName)
```



## Remarks: Security & limitations

### Other Backend langueges

For other programming language, we you can simply request a JWT

```sh
curl https://auth-(dev|prod).saaslify.io/${saas_provider}/user/${user_id}/machine/${name}
    -X GET
    -H "X-SAASLIFY-MACHINE_AUTH: ${token}"
```

```json
{
    "jwt": "..."
}
```

Send your requests against the real server and verify them against the following public keys
```sh
curl https://auth-(dev|prod).saaslify.io/${saas_provider}/.wellknown
    -X GET
    -H "X-SAASLIFY-MACHINE_AUTH: ${token}"
```

```json
[{
    "privateKeyId": "...",
    "timestamp": 0,
    "publicKey": ""
}]
```

Please check the library section of [jwt.io](https://jwt.io/).

If you have a working solution in another language, please make a PR.

### Key rotations
We rotate keys on a regular bases. Keys which should be active can be found here

### Never persist the JWT
The client SDK hides away the jwt away. It is only safe to keep them in memory.

### Custom fetch
The body in the fetch method is enriched with `jwt`, potentially overwriting an existing field. Also the body is required to be an object. This is necessary, because our JWT can exceed the size of accept headers because we don't want to limit the number of products your customer has access to.

### Caching
The SDK has some build in memory caching. On the server, you might want to tune performance by shipping your own redis caching.


## Contributing
### Join the community
### Make a PR
### Build your own SAAS
### Implement a feature
### Make a donation for a feature to be implemented