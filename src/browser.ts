import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.map';

import { init } from '.';


import { Saaslify } from './types';

const { Production, Sandbox, Mock} = Saaslify

const endpoint = {
    Production, Sandbox, Mock
}


export {
    init,
    endpoint
}
