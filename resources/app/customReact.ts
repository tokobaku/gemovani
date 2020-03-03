/* eslint-disable */
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 *
 * @description adds custom attributes to DOM elements
 */

import * as React from 'react';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // Add BEM attributes
        block?: string;
        elem?: string;
        mods?: object;
    }
}
