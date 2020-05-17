# Cookie Banner

Legally compliant cookie banner implementation

[![Travis](https://api.travis-ci.com/Jimdo/cookie-banner.svg?token=4y5uJAiprb3hE1cWrNL6&branch=master&status=started)](https://travis-ci.com/github/Jimdo/cookie-banner)

[![NPM](https://nodei.co/npm/@jimdo/cookie-banner.png?mini=true)](https://npmjs.org/package/@jimdo/cookie-banner)

## Getting Started

```shell
git clone https://github.com/Jimdo/cookie-banner.git
cd cookie-banner
yarn
yarn start
```

## Usage

```javascript
import  JimdoCookieBanner  from '@jimdo/cookie-banner';

JimdoCookieBanner.init({
    websiteId: '',
    skipCookieBanner: false,
    callback: (state, source) => {},
    forceLanguage: 'en',
});

JimdoCookieBanner.track({
    category: 'event-category',
    action: 'event-action',
    label: 'event-label',
    payload: {
        auto: true
    }
});

JimdoCookieBanner.getState(); // loading | error | hidden | showing | closed
JimdoCookieBanner.getSource(); // none | banner | cookie
JimdoCookieBanner.isOptedIn('PERFORMANCE'); // true | false
```

## Relaese

Automagically release base on these [rules](https://github.com/semantic-release/commit-analyzer#default-rules-matching).

## End to End tests

The end to end test is implemented using Travis Cron feature and runs daily. You can run the end to end test locally using `yarn e2e`.

The purpose of the e2e test is to make sure the cookie banner works on all the Jimdo landing pages. Therefore it is decoupled from the ordinary build. Changes in downstream projects can cause the test to fail, so it should be checked regularly.
