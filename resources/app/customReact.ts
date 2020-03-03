/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 *
 * @description adds custom attributes to DOM elements
 */

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import * as React from 'react';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // Add BEM attributes
        block?: string;
        elem?: string;
        mods?: object;
    }
}
